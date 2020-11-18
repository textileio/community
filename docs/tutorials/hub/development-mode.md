# Development mode

This section will cover how to get started in development mode by using insecure API keys.

To start running your app, you'll need API keys. The Hub generates API keys that grant your app access to your APIs. There are two flavors of API keys:

* `Account keys` that are not ideal for apps since they grant admin access to your developer account.
* `User group keys` which are designed for apps where you want one set of keys to grant API access for many users.

## API Access

### User group keys

[User group keys](../../hub/apis.md) come with a `key` and a `secret`. 

You never want to share your secret or save it in a place where it may be exposed. 

However, when you are in development mode, you can create keys that have signing **disabled**, meaning no secret is required. This is ideal during development or working with your internal team because it will make your first steps of app development a bit faster.

### Create insecure keys

You can create your insecure keys during the key generation step, simply select `N` for requiring signature authentication.

```bash
▶ hub keys create
✔ user group
? Require Signature Authentication (recommended)? [y/N] N █
```

### Use insecure keys

Now you can use the insecure keys for building your app without having to first setup a user login flow. 

However, when you are ready to deploy your app, be sure to use a new set of keys. You can read more about production setup in the [next part of this tutorial](production-auth.md).

## Start building

With your insecure API key, you have everything you need to start building with the Hub APIs, Threads, and Buckets. 

### Using the API

Now your users have identities and they've verified themselves. Next, you'll want to start creating Buckets and ThreadDBs for your user. Let's start using the Hub from inside the web app.

**Install dependencies**

```bash
# Textile libraries
npm install --save @textile/hub
```

**Connect to the API**

Now, you just need to create a `KeyInfo` object above to connect to the API.

```typescript
import {Client, Identity, KeyInfo} from '@textile/hub';

async function authorize (key: KeyInfo, identity: Identity) {
  const client = await Client.withKeyInfo(key)
  await client.getToken(identity)
  return client
}
```

The `KeyInfo` you supply to the API will look like:

```typescript
import {KeyInfo} from '@textile/hub';

const keyinfo: KeyInfo = {
  key: 'INSECURE API KEY',
}
```

Your user is now setup to start creating Threads and Buckets that replicate on the Hub API! Read more tutorials or jump over to the [js-threads docs](https://textileio.github.io/js-threads) to keep building.

<br />
