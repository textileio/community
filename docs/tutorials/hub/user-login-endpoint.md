# Create a login system for user public keys

The login example shows you how to setup a simple server that will accept a user's public key, verify that they control the private key (via a challenge), and then grant the user access to the Hub APIs.

## Setup

There are a few resources you'll need before you start writing code.

- [An account](../../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
- [A new Typescript project](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript). We recommend using Typescript, as Textile libraries are in a stage rapid of development and type detection is valuable during upgrades.
- A server framework. The example below uses [KoaJS](https://koajs.com/) but could just as easily be written for [Express](https://expressjs.com/) or the basic Node server.

**Install dependencies**

```bash
# Textile libraries
npm install --save @textile/hub

# Other utilities use in example
npm install --save dotenv emittery isomorphic-ws

# Libraries specific to our server framework, koajs
npm install --save koa koa-router koa-logger koa-json koa-bodyparser koa-route koa-websocket
```

### Environment variables

We use a `.env` file in the root of our project repo. The values in the file will be pulled into the app each time it's run. This is where you'll add your Hub API key and secret. 

!!!danger
    The `.env` file should be added to your `.gitignore` so that your key and secret are never shared.

Contents of `.env`.

```txt
USER_API_KEY=<insert user group key>
USER_API_SECRET=<insert user group secret>
```

## Create the server

In our project setup, our main server is defined in `src/index.ts`. Unlike the [simple credentials example](simple-credentials-endpoint.md), our server needs to handle two-way communication with the client during identity verification. The flow is as follows:

* First, the **client** will make a request login.
* The **server** will initiate the request with the Hub and get back an identity challenge.
* The **server** will pass the challenge to the **client**.
* The **client** will confirm they own their private key by signing the challenge and passing it back to the **server**
* The **server** which passes it on to the Hub. 
* If successful, a token is generated for the user.
* If successful, the **server* generates API credentials and passes credentials, token, and API key back to the **client**.
* Now, the **client** can use the Hub APIs directly!

It sounds complicated, but you'll see it happens very fast with only a few lines of code. In our example, we use `websockets` to enable the multi-step communication between the server and the client.

```typescript
/** Provides nodejs access to a global Websocket value, required by Hub API */
;(global as any).WebSocket = require('isomorphic-ws')
import koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import route from "koa-route";
import websockify from "koa-websocket";

import Emittery from "emittery";
import dotenv from "dotenv";

import { Client, UserAuth } from "@textile/hub"

/** Read the values of .env into the environment */
dotenv.config();

/** Port our server will run */
const PORT: number = 3000;

/** Init Koa with Websocket support */
const app = websockify(new koa());

/** Middlewares */
app.use( json() );
app.use( logger() );
app.use( bodyParser() );

/**
 * Add websocket login endpoint
 */

/** Start the server! */
app.listen( PORT, () => console.log( "Server started." ) );
```

## Add a websocket login handler

Next, we'll add a websocket endpoint to our server. Note the `Add websocket login endpoint` location in the server code above.

```typescript
/**
 * Add token websocket endpoint
 */
app.ws.use(route.all('/ws/login', (ctx) => {
  /** Emittery allows us to wait for the challenge response event */
  const emitter = new Emittery();
  ctx.websocket.on('message', async (msg) => {
    try {
      /** All messages from client contain {type: string} */
      const data = JSON.parse(msg);
      switch (data.type) {
        /** The first type is a new token request */
        case 'token': {
          /** A new token request will contain the user's public key */
          if (!data.pubkey) { throw new Error('missing pubkey') }

          /**
           * Init new Hub API Client with the user group API keys
           */
          const db = await Client.withUserKey({
            key: process.env.USER_API_KEY,
            secret: process.env.USER_API_SECRET,
            type: 0,
          })

          /** Request a token from the Hub based on the user public key */
          const token = await db.getTokenChallenge(
            data.pubkey, 
            /** The callback passes the challenge back to the client */
            (challenge: Buffer) => {
            return new Promise((resolve, reject) => {
              /** Pass the challenge to the client */
              ctx.websocket.send(JSON.stringify({
                type: 'challenge',
                value: challenge.toJSON(),
              }))
              /** Wait for the challenge event from our event emitter */
              emitter.on('challenge', (sig) => {
                /** Resolve the promise with the challenge response */
                resolve(Buffer.from(sig))
              });
              /** Give client a reasonable timeout to respond to the challenge */
              setTimeout(() => {
                reject()
              }, 1500);

            })
          })

          /**
           * The challenge was successfully completed by the client
           */

          /** Get API authorization for the user */
          const auth = await getAPISig()

          /** Include the token in the auth payload */
          const payload: UserAuth = {
            ...auth,
            token: token,
            key: process.env.USER_API_KEY,
          };

          /** Return the result to the client */
          ctx.websocket.send(JSON.stringify({
            type: 'token',
            value: payload,
          }))
          break;
        }
        /** The second type is a challenge response */
        case 'challenge': {
          /** A new challenge response will contain a signature */
          if (!data.sig) { throw new Error('missing signature (sig)') }

          /** 
           * If the timeout hasn't passed there is a waiting promise.
           * Emit the challenge signature for the waiting listener above.
           * */
          await emitter.emit('challenge', data.sig);
          break;
        }
      }
    } catch (error) {
      /** Notify our client of any errors */
      ctx.websocket.send(JSON.stringify({
        type: 'error',
        value: error.message,
      }))
    }
  });
}));
```

Now when you refresh your locally running server you should have a websocket endpoint for client token creation.

### Server notes

- Now that the user is verified in your system, you can keep their public key without any security issues.
- However, you should never trust an API call only by the public key, the challenge step is critical.
- The token provided in the response should be considered a secret that only should be shared with a single user. It does not expire.

## Create a client

Back in the browser webapp, you can now make requests to your login endpoint using a websocket. A basic client might make a request like the following.

```typescript
const loginWithChallenge = async (id: Libp2pCryptoIdentity): Promise<UserAuth> => {  
  return new Promise((resolve, reject) => {
    /** 
     * Configured for our development server
     * 
     * Note: this should be upgraded to wss for production environments.
     */
    const socketUrl = `ws://localhost:3000/ws/login`

    /** Initialize our websocket connection */
    const socket = new WebSocket(socketUrl)

    /** Wait for our socket to open successfully */
    socket.onopen = () => {
      /** Get public key string */
      const publicKey = id.public.toString();

      /** Send a new token request */
      socket.send(JSON.stringify({
        pubkey: publicKey,
        type: 'token'
      })); 

      /** Listen for messages from the server */
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
          /** Error never happen :) */
          case 'error': {
            reject(data.value);
            break;
          }
          /** The server issued a new challenge */
          case 'challenge':{
            /** Convert the challenge json to a Buffer */
            const buf = Buffer.from(data.value)
            /** User our identity to sign the challenge */
            const signed = await id.sign(buf)
            /** Send the signed challenge back to the server */
            socket.send(JSON.stringify({
              type: 'challenge',
              sig: signed.toJSON()
            })); 
            break;
          }
          /** New token generated */
          case 'token': {
            resolve(data.value)
            break;
          }
        }
      }
    }
  });
};
```

By passing the user identity to the function above, your app can authenticate and verify the user in one step, granting them access to your Hub resources.

## GitHub Example

If you'd like to explore the example more, we've provided a fully working example on GitHub. The login endpoint is part of a more complete example, you can see it here.

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples/blob/master/hub-browser-auth-app/src/server/wss.ts" class="box">
    <h5>Login API</h5>
    <p>Source code for login and Hub credentials endpoint.</p>
  </a>
</div>

<br />