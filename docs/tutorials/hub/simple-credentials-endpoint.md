# Create a simple credentials endpoint

The simple credentials endpoint requires no user-identity to be sent to the server. It simply receives a request for new API credentials, uses the key and secret, and then returns the credentials to the client. This type of flow is useful for developers or apps with an existing user-validation flow, or who are able to utilize domain whitelisting and/or are hosting their own app.

## Setup

There are a few resources you'll need before you start writing code.

- [An account](../../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
- [A new Typescript project](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript). We recommend using Typescript, as Textile libraries are in a stage rapid of development and type detection is valuable during upgrades.
- A server framework. The example below uses [KoaJS](https://koajs.com/) but could just as easily be written for [Express](https://expressjs.com/) or the basic Node server.

**Install dependencies**

```bash
# Textile libraries
npm install --save @textile/textile @textile/threads-core

# Other utilities use in example
npm install --save dotenv isomorphic-ws

# Libraries specific to our server framework, koajs
npm install --save koa koa-router koa-logger koa-json koa-bodyparser
```

### Environment variables

We'll use a `.env` file in the root of our project repo where you'll add your Hub API key and secret. The `.env` file should be added to your `.gitignore` so that your key and secret are never shared.

Contents of `.env`.

```txt
USER_API_KEY=alk3rlkjvl323r09fqpoweruw34
USER_API_SECRET=balkweop3jflk9f43lkjs9df2jlght94nzlkv93s
```

_Replace the example key and secret values with values you create usint the CLI_

## Create the server

In our project setup, our main server is defined in `src/index.ts`.

```typescript
/** Provides nodejs access to a global Websocket value, required by Hub API */
;(global as any).WebSocket = require('isomorphic-ws')

/** Import our server libraries */
import koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

/** For using values in our .env */
import dotenv from "dotenv";

/** Textile libraries */
import {Client} from '@textile/threads-client';
import {Libp2pCryptoIdentity} from '@textile/threads-core';

/** Read the values of .env into the environment */
dotenv.config();

/** Port our server will run */
const PORT: number = 3000;

/** Init Koa */
const app = new koa()

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
 * Add credentials API here
 */

/** Tell Koa to use the API routes we generate */
app.use( api.routes() ).use( api.allowedMethods() );

/** Start the server! */
app.listen( PORT, () => console.log( "Server started." ) );
```

We now have our basic server setup, we can run it and visit [`http://localhost/api/foo`](http://localhost:3000/api/foo).

```bash
ts-node src/index.ts
```

!!!info
    Follow your Typescript setup guide for specific ways of launching the server.

## Add the credentials endpoint

Next, we'll add an endpoint so the client can get new or refreshed credentials. Note the `Add credentials API here` location in the server code above.

```typescript
/**
 * Add credentials API here
 */
api.get( '/credentials', async (ctx: koa.Context, next: () => Promise<any>) => {
  // Custom validation could be done here...
  
  /** Get API authorization for the user */
  const auth = await getAPISig()

  /** Include the API KEY in the auth payload */
  const credentials = {
    ...auth,
    key: process.env.USER_API_KEY,
  };
  
  /** Return the credentials in a JSON object */
  ctx.body = credentials
  
  await next();
});
```

Now when you refresh your locally running server you should be able to visit the following and receive valid credentials.

`http://localhost:3000/api/credentials`


Response:

```json
{
  key: "<your user group api key>",
  msg: "<your credentials expiration>",
  sig: "<the api signature>"
}
```

## Create a client

Back in the browser, you can now make requests to your credentials endpoint.

```typescript
const createCredentials = async (): Promise<UserAuth> => {
  const response = await fetch(`/api/credentials`, {
    method: 'GET',
  })
  const userAuth = await response.json()
  return userAuth;
}
```

## GitHub Example

If you'd like to explore the examples explained above more, we've provided a fully working example on GitHub. The simple credentials endpoint is part of a more complete example, you can see it here.

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples/blob/master/hub-browser-auth-app/src/server/api.ts" class="box">
    <h5>Simple Credentials API</h5>
    <p>Source code for simple Hub credentials endpoint.</p>
  </a>
</div>

<br />
