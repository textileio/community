# Build a Web App using the Hub

In this tutorial, you'll learn how to generate user tokens so that your app users can leverage your Hub APIs. With this token, your users will be able to leverge Thread Services, create and edit Buckets, and use IPFS persistence right from the browser. You'll build it using a [_user group key_](../hub/app-apis.md) so that every user can use your API while maintaining their own ownership over the data they create.

## Getting Started

There are a few resources you'll need before you start writing code.

- [An account](../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
- [A new Typescript web app](https://webpack.js.org/guides/typescript/). We recommend using Typescript, as Textile libraries are in a stage rapid of development and type detection is valuable during upgrades.

### API Access

A [_user group key_](../hub/app-apis.md) consists of a _key_ and a _secret_, which you'll never want to expose to users. However, for users to access your Hub resources, they'll need a token derived from their own identity and the user group's key and secret. So to use the Hub APIs in your web app, you have two options:

* Build a light-weight token endpoint accessible only by your app ([below](#creating-a-token-endpoint)).
* Use the domain whitelisting to skip token generation ([in development](https://github.com/textileio/textile/issues/109))

We'll come back to option one in the second part of this tutorial.

## Building a simple web app

With your basic Typescript web app setup, you should have a primary `.ts` (or `.js` if you decided to stick with Javascript) file where your app is written. We'll work within this single file to start, but the instructions below should be adaptable to any application architecture.

### Generating an Identity

For identity in our app, we'll use a private-key based identity generated randomly for each new app user. To create a function for creating and restoring identies, we can use the _cached identity example_ from the [basic libp2p identities tutorial](libp2p-identities.md).

```typescript
const identity = getIdentity();
```

!!!info
    In the future we will support email-based identities, allowing you to more easily use the Hub APIs with common email-based user models. [Follow progress here](https://github.com/textileio/textile/issues/216).

### Creating a token endpoint

API tokens need to be generated for every new user. Additionally, well designed tokens expire quickly, so new tokens will need to be generated for user's each time their token expires. There is two ways to handle token generate. The first is using the `getToken` method and the second is using the `getTokenChallenge`, both available in `@textile/threads-client`. Both of those methods require Hub API key and secret, so should be executed by a service only accessible to your app.

##### When to use the getToken method

The `getToken` method should only be used in rare cases where the application has access to the user's private key _outside of the app_. Examples might include cases where private key identities are generated server-side.

[Read the tutorial on creating a token provider using getToken](gettoken-provider.md)

##### When to use the getTokenChallenge method

The `getTokenChallenge` allows your app to generate tokens for your user without requiring them to send a private key to any service or endpoint. This should be used by most applications. If you are integrating with a 3rd party identity provider where your app wont have any access to the private keys of users, as long as the identity provider has a signing method, this API will work.

[Read the tutorial on creating a token provider using getTokenChallenge](gettokenchallenge-provider.md)

### Generate an API Token

Now that our token provider is setup, we simply need to generate a new token for our identity.

```typescript
const token = await generateToken(identity)
```

### Using the API

To start creating Buckets or Threads for your user, you need setup your app to use the new token for API requests.

***Install dependencies***

```bash
# Textile libraries
npm install --save @textile/textile @textile/context
```

**Connect to the API**

Now, you just need to use the new token to connect to the API.

```typescript
import {Provider} from '@textile/context';

const context = new Provider();
context.withToken(token);
```

Your user is now setup to start creating Threads and Buckets that replicate o the Hub API! Read more tutorials or jump over to the [js-threads docs](https://textileio.github.io/js-threads) to keep building.

<br />