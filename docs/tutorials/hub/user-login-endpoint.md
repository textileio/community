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

```javascript
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
    type: 0,
  })

  /** 
   * Request a token from the Hub based on the user public key */
  const token = await client.getTokenChallenge(
    pubkey,
    /** The callback passes the challenge back to the client */
    (challenge: Buffer) => {
    return new Promise((resolve, reject) => {
      // Send the challenge back to the client and resolve(Buffer.from(sig))
      resolve()
    })
  })
}
```

Now when you refresh your locally running server you should have a websocket endpoint for client token creation.

### Server notes

- Now that the user is verified in your system, you can keep their public key without any security issues.
- However, you should never trust an API call only by the public key, the challenge step is critical.
- The token provided in the response should be considered a secret that only should be shared with a single user. It does not expire.

## Create a client

Back in the browser webapp, you can now make requests to your login endpoint using a websocket. A basic client needs to handle a challenge request from the server, where the challenge will be signed and returned over websocket.

[View the full client example here](https://github.com/textileio/js-examples/tree/master/hub-browser-auth-app/src/client).

```typescript
import { Libp2pCryptoIdentity } from '@textile/threads-core'

async function handleChallenge (identity: Libp2pCryptoIdentity, challenge: string) {
  /** Convert the challenge json to a Buffer */
  const buf = Buffer.from(challenge)
  /** User our identity to sign the challenge */
  const signed = await identity.sign(buf)
  /** Send the signed challenge back to the server */
  const response = JSON.stringify({
    type: 'challenge',
    sig: signed.toJSON()
  })
  return response
}
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