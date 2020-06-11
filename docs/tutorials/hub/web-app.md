# Build a Web App using the Hub

In this tutorial, you'll learn how to generate API credentials that can be shared with with web apps so that your app users can leverage the Hub. With credentials, your users will be able to access Thread Services, create and edit Buckets, and use IPFS persistence right from the browser. You'll build it using a [_user group key_](../../hub/app-apis.md) so that every user can use your API while maintaining their own ownership over the data they create.

## Getting Started

There are a few resources you'll need before you start writing code.

- [An account](../../hub/accounts.md). This is your developer account on the Hub.
- [A user group key](../../hub/app-apis.md). This is how your users will be able to access your Hub APIs. Consider creating the key in an organization not your personal account so that you can invite collaborators later. You only need to create one _user group key_ for all the users of your app.
- [A new Typescript web app](https://webpack.js.org/guides/typescript/). We recommend using Typescript, as Textile libraries are in a period rapid of development and type detection is valuable during upgrades.

### API Access

A [_user group key_](../../hub/app-apis.md) consists of a _key_ and a _secret_. You can expose your _key_ but you *never want to expose your _secret_* to users or outside of secure environments.

You must use your key and secret to create and renew API access credentials for your users on a regular basis. To do this, we'll build a simple auth endpoint accessible only to your app that will generate Hub credentials for users. ([See below](#creating-a-login-endpoint)).

## Building a simple web app

We wont cover the details of setting up a webapp with Typescript because [it's well documented elsewhere](https://levelup.gitconnected.com/setting-up-a-full-stack-typescript-application-featuring-express-and-react-ccfe07f2ea47). 

You can skip to the end and [explore our complete example](#completed-example).

!!!info
    With your basic Typescript web app setup, you should have a primary `.ts` (or `.js` if you decided to stick with Javascript) file where your webapp exists. We'll work within this single file to start, but the instructions below should be adaptable to any application architecture.

### Generating an Identity

In our webapp, we will use a custom private-key identity. If you are exploring our libraries or prototyping a new application, this is a great place to start, as you wont need to wrestle with multiple libraries or APIs at the same time. However, as you get close to launch, we recommend using a more common DID provider. 

We've provided a simple tutorial for creating new identies and caching those identities in the browser.

[Read the basic libp2p identities tutorial now](libp2p-identities.md).

Below, we'll use the [_cached identity example_](libp2p-identities.md#caching-user-identity) and `getIdentity` function from the tutorial above.



```typescript
const identity = getIdentity();
```

!!!info
    The Hub is flexible about what identity or authentication system you use for your users. In the future, the Hub will support email-based identities, allowing you to more easily use the APIs with popular email-based user models. [Follow progress here](https://github.com/textileio/textile/issues/216).

### Creating an authentication endpoint

Now that your app is using PKI, your users will only ever share their _public key_ with your API (or any API). Therefore, you'll need a way to verify that they hold the private key linked with the public key, otherwise users could spoof your system very easily. Additionally, you'll want to provide Hub API access to your users based on that verification. 

You should design your system for credentials that expire quickly. This ensures that if credentials are ever leaked the impact will be minimal.

**Build an authentication endpoint**

This example will use the Hub to issue the user a challenge (where they prove they own their private key). After the user passes the challenge, the endpoint will give them Hub credentials. This multi-step flow is useful for developers who don't want to design their own user-verification system.

[Click here to read the credentials setup steps](user-login-endpoint.md).

In the above example, you should have setup a _server_ and API endpoint that your webapp can connect to. 

### Generate API credentials

Now that our credentials endpoint is setup, we simply need to generate new credentials for each user's identity. We'll use the `createCredentials` function provided in the setup above in our _client_ webapp.

```typescript
const auth = await createCredentials()
```

This `auth` object will allow your app to start creating and editing Buckets and Threads owned by your user.

### Using the API

Now, your users have identities and they've verified themselves. Next, you'll want to start created Buckets and ThreadDBs for your user. Let's start using hte Hub from inside the webapp.

**Install dependencies**

```bash
# Textile libraries
npm install --save @textile/hub
```

**Connect to the API**

Now, you just need to use `auth` object above to connect to the API.

```typescript
import {Client} from '@textile/hub';

const client = Client.withUserAuth(auth)

/** Query for all the user's existing threads (none to start) */
const threads = await client.listThreads()
```

Your user is now setup to start creating Threads and Buckets that replicate on the Hub API! Read more tutorials or jump over to the [js-threads docs](https://textileio.github.io/js-threads) to keep building.

## Putting it all together

Now you've had a chance to see how identities work with API keys to provide Hub resources to your users.

If you'd like to explore the examples explained above more, we've provided a fully working example on GitHub.

### Completed example

```bash
git clone git@github.com:textileio/js-examples.git
cd js-examples/hub-browser-auth-app
```

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples/tree/master/hub-browser-auth-app" class="box">
    <h5>Explore the repo</h5>
    <p>Clone the source code for a server and client using the Hub.</p>
  </a>
</div>

<br />
