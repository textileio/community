# Build a Web App using the Hub

In this tutorial, you'll learn how to generate API credentials that can be shared with with web apps so that app users can leverage the Hub. With credentials, your users will be able to access Thread Services, create and edit Buckets, and use IPFS persistence right from the browser. You'll build it using a [_user group key_](../hub/app-apis.md) so that every user can use your API while maintaining their own ownership over the data they create.

## Getting Started

There are a few resources you'll need before you start writing code.

- [An account](../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later.
- [A new Typescript web app](https://webpack.js.org/guides/typescript/). We recommend using Typescript, as Textile libraries are in a stage rapid of development and type detection is valuable during upgrades.

### API Access

A [_user group key_](../hub/app-apis.md) consists of a _key_ and a _secret_. You can expose your _key_ but you *never want to expose your _secret_* to users or outside of secure environments. So to use the Hub APIs in your web app, you have two options:

* Build a light-weight login endpoint accessible only by your app that will generate Hub credentials for users. ([See below](#creating-a-login-endpoint)).
* Use the domain whitelisting to skip token generation. ([In development](https://github.com/textileio/textile/issues/109))

In this tutorial, we'll show you how to build a simple web app and basic login endpoint.

## Building a simple web app

With your basic Typescript web app setup, you should have a primary `.ts` (or `.js` if you decided to stick with Javascript) file where your app is written. We'll work within this single file to start, but the instructions below should be adaptable to any application architecture.

### Generating an Identity

For identity in our app, we'll use a private-key based identity generated randomly for each new app user. To create a function for creating and restoring identities, we can use the _cached identity example_ from the identities tutorial.

[Read the basic libp2p identities tutorial now](libp2p-identities.md).

```typescript
const identity = getIdentity();
```

!!!info
    Textile is relatively agnostic to identity providers. In the future, we will also support email-based identities, allowing you to more easily use the Hub APIs with common email-based user models. [Follow progress here](https://github.com/textileio/textile/issues/216).

### Creating a credentials & login endpoint

API credentials need to be generated for every new user. Additionally, credentials expire quickly, so new credentials need to be generated for a user each often. Below, we'll show you two ways to you can setup an endpoint to provide Hub credentials to your app.

Both examples keep the _user group secret_ private on the server.

**Option 1. Creating a simple credentials endpoint**

In this example, we'll show a simple endpoint that will provide credentials to any user that requests it. This is a pretty wide open API, but could be used with your own domain whitelisting or other security models.

[Read the section on creating a simple credentials endpoint.](simple-credentials-endpoint.md)

**Option 2. Build a credentials and login endpoint**

In this example, we'll show you how to use the user's public key to let the _login_ to your app. This endpoint will use the Hub to issue the user a challenge (where they prove they also own the corresponding private key). After the user passes the challenge, the endpoint will give them Hub credentials.

[Read the section on building a login system.](user-login-endpoint.md)

### Generate API credentials

Now that our credentials endpoint is setup, we simply need to generate a new credentials for our identity.

*Based on login endpoint*

```typescript
const auth = await loginWithChallenge(identity);
```

*Based on basic credentials endpoint*

```typescript
const auth = await createCredentials()
```

### Using the API

To start creating Buckets or Threads for your user, you need setup your app to use the credentials for API requests.

**Install dependencies**

```bash
# Textile libraries
npm install --save @textile/textile
```

**Connect to the API**

Now, you just need to use the new token to connect to the API.

```typescript
import {Client} from '@textile/textile';

const client = Client.withUserAuth(auth)

/** Query for all the user's existing threads (none to start) */
const threads = await client.listThreads()
```

Your user is now setup to start creating Threads and Buckets that replicate o the Hub API! Read more tutorials or jump over to the [js-threads docs](https://textileio.github.io/js-threads) to keep building.

## Putting it all together

Now you've had a chance to see how identities work with API keys to provide Hub resources to your users. 

If you'd like to explore the examples explained above more, we've provided a fully working example on GitHub.

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples/tree/master/hub-browser-auth-app" class="box">
    <h5>Build an app on the Hub</h5>
    <p>Clone the source code for a server and client using the Hub.</p>
  </a>
</div>

<br />
