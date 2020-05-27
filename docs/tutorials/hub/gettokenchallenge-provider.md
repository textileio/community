# Create a token provider using getTokenChallenge

The `getTokenChallenge` provides a helper for generating API tokens for your app users based on their private-key identity. The `getTokenChallenge` method only requires your user's public key and is therefore a more secure and friendly way to manage token generation than `getToken`. However, it does require that the user sign a challenge to prove they are the owner of the identity private key and so requires multistep communication between the token provider and the identity holder (an app).

## Setup

There are a few resources you'll need before you start writing code.

- [An account](../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
- [A new Typescript project](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript). We recommend using Typescript, as Textile libraries are in a stage rapid of development and type detection is valuable during upgrades.
- A server framework. The example below uses [KoaJS](https://koajs.com/) but could just as easily be written for [Express](https://expressjs.com/) or the basic Node server.

**Install dependencies**


```bash
# Textile libraries
npm install --save @textile/threads-client @textile/context

# Other utilities use in example
npm install --save dotenv emittery isomorphic-ws

# Libraries specific to our server framework, koajs
npm install --save koa koa-router koa-logger koa-json koa-bodyparser koa-route koa-websocket
```

### Environment variables

We'll use a `.env` file in the root of our project repo where you'll add your Hub API key and secret. The `.env` file should be added to your `.gitignore` so that your key and secret are never shared.

Contents of `.env`.

```txt
USER_API_KEY=<insert user group key>
USER_API_SECRET=<insert user group secret>
```

## Create the server

In our project setup, our main server is defined in `src/index.ts`. Unlike the `getToken` example, our server needs to handle two-way communication with the client during token generation. First, the client will make a request, next the server will initiate the request with the Hub and receive an identity challenge. Next, the server will pass the challenge to the client to prove they the owner of the private-key. The client will provide a challenge signature back to the server which passes it on to the Hub. If successful, a token is generated for the user.

In the example below, we use `websockets` to enable this multi-step communication between the server and the client.

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

import {Client} from '@textile/threads-client';
import {Provider} from '@textile/context';

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
 * Start API Routes
 * 
 * All prefixed with `/api/`
 */
const api = new Router({
    prefix: '/api'
});


/**
 * Basic foo-bar endpoint
 * 
 * https://localhost:3000/api/foo
 */
api.get( '/foo', async (ctx: koa.Context, next: () => Promise<any>) => {
  ctx.body = { foo: 'bar' }
  await next();
})


/**
 * Add token websocket endpoint
 */


/** Tell Koa to use the REST API routes we generated */
app.use( api.routes() ).use( api.allowedMethods() );

/** Start the server! */
app.listen( PORT, () => console.log( "Server started." ) );
```

## Add a token websocket handler

Next, we'll add a token websocket endpoint to our server. Note the `Add token websocket endpoint` location in the server code above.

```typescript
/**
 * Add token websocket endpoint
 */
app.ws.use(route.all('/ws/token', (ctx) => {
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
          if (!data.pub) { throw new Error('missing public key (pub)') }

          /** Hub API access metadata */
          const context = new Provider();
          /** Add your key and secret from .env to the metadata */
          await context.withUserKey({
            key: process.env.USER_API_KEY,
            secret: process.env.USER_API_SECRET,
            type: 1, // User Group Key
          })
          /** Init new Hub API Client */
          const db = new Client(context);

          /** Request a token from the Hub based on the user public key */
          const token = await db.getTokenChallenge(
            data.pub, 
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
           * The challenge was successfully completed by the client .
           * Send the token back to the client.
           */
          ctx.websocket.send(JSON.stringify({
            type: 'token',
            value: token,
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

## Create a client

Back in the browser, you can now make requests to your token provider through websockets. A basic client might make a request like the following.

```typescript
const generateToken = (identity: Libp2pCryptoIdentity): Promise<string> => {
  return new Promise((resolve, reject) => {
    /** Configured for our development server */
    const socketUrl = `ws://localhost:3000/ws/token`

    /** Initialize our websocket connection */
    const socket = new WebSocket(socketUrl)

    /** Wait for our socket to open successfully */
    socket.onopen = () => {

      /** Send a new token request */
      socket.send(JSON.stringify({
        pub: publicKey,
        type: 'token'
      }));

      /** Listen for messages from the server */
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
          /** Error never happen :) */
          case 'error': {
            console.log(data.value)
            reject()
          }
          /** The server issued a new challenge */
          case 'challenge':{
            /** Convert the challenge json to a Buffer */
            const buf = Buffer.from(data.value)
            /** User our identity to sign the challenge */
            const signed = await identity.sign(buf)
            /** Send the signed challenge back to the server */
            socket.send(JSON.stringify({
              type: 'challenge',
              sig: signed.toJSON(),
              pub: publicKey
            })); 
          }
          /** New token generated */
          case 'token': {
            resolve(data.value)
          }
        }
      }
    }
  }
}
```

<br />