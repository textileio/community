# Create a token provider using getToken

The `getToken` provides a helper for generating API tokens for your app users based on their private-key identity. The `getToken` method takes the user's private-key and then requests a token and signs a challenge (to prove identity ownership) from the API. The method does not share the private-key with the API.

## Setup

There are a few resources you'll need before you start writing code.

- [An account](../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
- [A new Typescript project](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript). We recommend using Typescript, as Textile libraries are in a stage rapid of development and type detection is valuable during upgrades.
- A server framework. The example below uses [KoaJS](https://koajs.com/) but could just as easily be written for [Express](https://expressjs.com/) or the basic Node server.

**Install dependencies**

```bash
# Textile libraries
npm install --save @textile/threads-core @textile/threads-client @textile/context

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
import {Provider} from '@textile/context';
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
 * Add token API here
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

## Add a token endpoint

Next, we'll add a token endpoint to our server. Note the `Add token API here` location in the server code above.

```typescript
/**
 * Add token API here
 */
api.get( '/token', async (ctx: koa.Context, next: () => Promise<any>) => {
  /** Identity provided as the 'id' parameter in the request */
  const {id} = ctx.query
  /** Generate a Libp2pCryptoIdentity from the string  */
  const identity = await Libp2pCryptoIdentity.fromString(id);

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
  /** Request a token from the API */
  const token = await db.getToken(identity);

  /** Return the token in a JSON object */
  ctx.body = {
      message: "Success: new API token",
      token: token,
  };
  
  await next();
});
```

Now when you refresh your locally running server you should be able to visit the following and receive a valid token.

`http://localhost:3000/api/token?id=<User Identity>`


Response:

```json
{
  message: "Success: new API token",
  token: <valid api token>,
}
```

## Create a client

Back in the browser, you can now make requests to your token provider endpoint.

```typescript
const generateToken = async (identity: Libp2pCryptoIdentity) => {
  /** Get a new API Token from server/index.ts */
  const response = await fetch(`/api/token?ident=${identity.toString()}`, {
    method: 'GET',
  })

  /** Parse token response */
  const data = await response.json()
  
  return data.token;
}
```

<br />