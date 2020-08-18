# Production mode

You've not had time to build and test your app using the insecure keys described in the [development mode](development-mode.md) section. Now, you want to convert your app to running in production mode. To do so, you'll need to:

1. Generate a new API key and secret that has mandatory signing enabled. 
2. Set up an authorization endpoint that will hold your API secret and any optional user model for your app.
3. Add a login step to your app that will use the new endpoint to authorization users in your app.

## Differences from development mode

There are a few differences once you switch to production mode. A primary one is that your user's will need a signature to accompany their API requests. Those signatures can only be created with your API secret, and will expire. You will need to have a way to re-verify them occasionally. For this, we'll move from using the `withKeyInfo` APIs to a new one called, `withUserAuth` that can request updated signatures in your app. This new API is also designed to work without access to your `secret`, so your app can `authorize` users on your own backend and provide API key signatures on demand. Other than that, all the APIs will work in the exact same way.

## User identity

If you've followed the tutorials up until now, you are already using _PKI_, so your users will only ever share their _public key_ with your API (or any API). Therefore, you'll now just need a way to verify that they hold the private key linked with the public key, otherwise users could spoof your system very easily. From there, you can provide Hub API access to your users based on that verification.

## Authentication server

Now, we will setup a simple server that will accept a user's public key, verify that they control the private key (via a challenge), and then grant the user access to the Hub APIs. The user can pass the result (a `UserAuth` object) to the API and start creating Threads and Buckets.

### Setup

There are a few resources you'll need before you start writing code.

- [An account](../../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../../hub/apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
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

**Environment variables**

We use a `.env` file in the root of our project repo. The values in the file will be pulled into the app each time it's run. This is where you'll add your Hub API key and secret. 

!!!danger
    The `.env` file should be added to your `.gitignore` so that your key and secret are never shared.

Contents of `.env`.

```txt
USER_API_KEY=<insert user group key>
USER_API_SECRET=<insert user group secret>
```

### Create the server

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

```javascript
/** Provides nodejs access to a global Websocket value, required by Hub API */
;(global as any).WebSocket = require('isomorphic-ws')
import koa from "koa"
import Router from "koa-router"
import logger from "koa-logger"
import json from "koa-json"
import bodyParser from "koa-bodyparser"
import route from "koa-route"
import websockify from "koa-websocket"

import Emittery from "emittery"
import dotenv from "dotenv"

import { Client, UserAuth } from "@textile/hub"

/** Read the values of .env into the environment */
dotenv.config();

/** Port our server will run */
const PORT: number = 3000

/** Init Koa with Websocket support */
const app = websockify(new koa())

/** Middlewares */
app.use( json() )
app.use( logger() )
app.use( bodyParser() )

/**
 * Add websocket login endpoint
 */

/** Start the server! */
app.listen( PORT, () => console.log( "Server started." ) )
```

### Add a websocket login handler

Next, we'll add a websocket endpoint to our server. Note the `Add websocket login endpoint` location in the server code above. The primary step that the server needs to do is accept a pubkey and issue a new challenge back to the client. When successful, new API credentials can be handed to the client.

[View the full code example in the repo](https://github.com/textileio/js-examples/tree/master/hub-browser-auth-app/src/server).

```typescript
import {Client} from '@textile/hub'

async function example (pubkey: string) {
  /**
   * Init new Hub API Client with the user group API keys
   */
  const client = await Client.withKeyInfo({
    key: 'USER_API_KEY',
    secret: 'USER_API_SECRET',
  })

  /** 
   * Request a token from the Hub based on the user public key */
  const token = await client.getTokenChallenge(
    pubkey,
    /** The callback passes the challenge back to the client */
    (challenge: Buffer) => {
    return new Promise((resolve, reject) => {
      // Send the challenge back to the client and 
      // resolve(Buffer.from(sig))
      resolve()
    })
  })
}
```

Now when you refresh your locally running server you should have a websocket endpoint for client token creation.

### Wrap-up

- Now that the user is verified in your system, you can keep their public key without any security issues.
- However, you should never trust an API call only by the public key, the challenge step is critical.
- The token provided in the response should be considered a secret that only should be shared with a single user. It does not expire.

#### Example on GitHub

We've provided an abstracted view of the main parts of server-side authentication and authorization. If you'd like to learn more, we've provided a fully working example on GitHub, you can see it here.

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples/blob/master/hub-browser-auth-app/src/server/wss.ts" class="box">
    <h5>Login API</h5>
    <p>Source code for login and Hub credentials endpoint.</p>
  </a>
</div>

## Client (app) authentication

Now that our credentials endpoint is set up, we simply need to generate new credentials for each user's identity. A basic client needs to submit a login and handle a challenge request from the server, where the challenge will be signed and returned over websocket. We'll create a `login` function that handles the back and forth of the websocket and can combine with the `withUserAuth` function.

### Login function

```typescript
import { Buckets, Client, Identity, PrivateKey, UserAuth } from '@textile/hub'

/**
 * loginWithChallenge uses websocket to initiate and respond to
 * a challenge for the user based on their keypair.
 * 
 * Read more about setting up user verification here:
 * https://docs.textile.io/tutorials/hub/web-app/
 */
const loginWithChallenge = (id: Identity) => {
  return (): Promise<UserAuth> => {
    return new Promise((resolve, reject) => {
      /** 
       * Configured for our development server
       * 
       * Note: this should be upgraded to wss for production environments.
       */
      const socketUrl = `ws://localhost:3001/ws/userauth`
      
      /** Initialize our websocket connection */
      const socket = new WebSocket(socketUrl)
  
      /** Wait for our socket to open successfully */
      socket.onopen = () => {
        /** Get public key string */
        const publicKey = id.public.toString();
  
        /** Send a new token request */
        socket.send(JSON.stringify({
          pubkey: publicKey,
          type: 'token',
        }))
  
        /** Listen for messages from the server */
        socket.onmessage = async (event) => {
          const data = JSON.parse(event.data)
          switch (data.type) {
            /** Error never happen :) */
            case 'error': {
              reject(data.value)
              break
            }
            /** The server issued a new challenge */
            case 'challenge': {
              /** Convert the challenge json to a Buffer */
              const buf = Buffer.from(data.value)
              /** User our identity to sign the challenge */
              const signed = await id.sign(buf)
              /** Send the signed challenge back to the server */
              socket.send(JSON.stringify({
                type: 'challenge',
                sig: Buffer.from(signed).toJSON(),
              }))
              break
            }
            /** New token generated */
            case 'token': {
              resolve(data.value)
              break
            }
          }
        }
      }
    })
  }
}

const setupThreads = async (identity: Identity) => {
  /**
   * By passing a callback, the Threads library can refresh 
   * the api signature whenever expiring.
   */
  const callback = loginWithChallenge(identity)
  const client = Client.withUserAuth(callback)
  client.getToken(identity)
  return client
}

```

### Setup buckets

Similarly, if you are looking for how to convert your Buckets from using the insecure API to the secure one, the conversion will look like the following.

**Insecure keys example**

When using your insecure API key, you typically initialized Buckets like the following.

```typescript
import { Buckets, Identity, KeyInfo } from '@textile/hub'

const init = async (key: KeyInfo, identity: Identity) => {
    const buckets = await Buckets.withKeyInfo(key)
    await buckets.getToken(identity)
    return buckets
}
```

**Secure keys example**

You will now replace `withKeyInfo` and `getToken` with the single, `withUserAuth` method that requires the callback method.

```
import { Buckets, UserAuth } from '@textile/hub'

const init = (getUserAuth: (() => Promise<UserAuth>)) => {
  const buckets = Buckets.withUserAuth(getUserAuth)
  return buckets
}
```

### Wrap-up

Now you've had a chance to see how identities work with API keys to provide Hub resources to your users.

If you'd like to explore the examples explained above more, we've provided the fully working example on GitHub.

#### Example on GitHub

```bash
git clone git@github.com:textileio/js-examples.git
cd js-examples/hub-browser-auth-app
```

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples" class="box">
    <h5>Explore the repo</h5>
    <p>Clone the source code for a server and client using the Hub.</p>
  </a>
</div>

<br />