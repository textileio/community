# User Buckets from React Native

[The Hub](../hub/index.md) gets really powerful when you allow users to leverage IPFS, IPNS, and ThreadDB from inside your applications.

This tutorial will show you how you can let users create, own, and manage buckets in React Native.

Click [here](https://github.com/textileio/js-examples/tree/master/react-native-hub-app) to see an example app built with this tutorial.

## Preview video

<iframe width="480" height="270" src="https://www.youtube.com/embed/9x73t9tFdms?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Install libraries

**Textile Libraries**

```bash
npm install --save @textile/hub @textile/threads-id
```

We'll use the above combination of Textile libraries in our app below.

**rn-nodeify**

```bash
npm install -D rn-nodeify
```

We're going to use `rn-nodeify` and a few other libraries it'll install to manage `Buffer`, `crypto`, and other tools to our JavaScript environment in React Native.

Read about [rn-nodeify here](https://github.com/tradle/rn-nodeify).

Next, you need to run:

```bash
./node_modules/.bin/rn-nodeify --install
```

This will install a `shim.js` into the root of your file. You need to import `shim.js` at the top of your app's root file (typically `index.js`),

```js
import './shim';
```

This may need to be updated in the future. 

You can make this easier by adding a `postinstall` step to your `package.json`, as follows:
<!--
Maybe should state what about this postinstall script makes 'this' easier. Also could be more specific about what 'this' refers to
- Albert Kim
-->

```json
"scripts": {
  ...
  "postinstall": "./node_modules/.bin/rn-nodeify --install fs,path,process,buffer,crypto,stream,vm --hack"
}
```

**Environment variables**

If you plan to store your source-code anywhere public, you **should not** store those keys publicly. 
 
To securely add API keys to your app, you can use `react-native-dotenv`. 

```bash
npm install --save react-native-dotenv
```

Next, create a `.env` file in the root of your project. You can find an example `.env` in our example project [here](https://github.com/textileio/js-examples/blob/master/react-native-hub-app/example.env). 

!!!warning
    Be **certain** that the `.env` is added to your `.gitignore` and not checked in with your code. 

The contents of `.env` will look like: 

```bash
USER_API_KEY=textile-hub-user-group-key
```

You can follow the instructions to generate a **User Group Key** [here](../../hub/apis). 

If you already generated keys, you can list them by executing `hub keys ls`. Add the values to your `.env` file on the right side of the equality sign.

**Typescript**

The rest of the JavaScript portions in this tutorial will be in TypeScript. You don't need to use TypeScript but if you don't, be sure to strip the typings from any code you copy below.

## Build your app

!!!hint
    In the example app, we put all the ThreadDB and Bucket logic into a single component called [checklist.ts](https://github.com/textileio/js-examples/blob/master/react-native-hub-app/src/checklist.tsx). You can view that file for reference. 

**Import Textile**

```typescript
// Buckets client and an API Context helper
import {Buckets, Client, ThreadID, PrivateKey, Where} from '@textile/hub';
```

### Register with remote API

Next, we'll connect to the remote API using our key from an insecure (non-signing) API key. Read more about keys for [development mode](hub/development-mode.md). 

We do this so the user can later push their bucket for remote persistence on IPFS and publishing on IPNS.

```typescript
import { Client } from '@textile/hub'

const client = Client.withKeyInfo({
  key: 'USER_API_KEY',
})
```

!!!Hint
    Read more about the Context tool in the [Threads Introduction](../threads/index.md).

### Generate an Identity

Read the basic identities tutorial [here](hub/pki-identities.md).

```typescript
import { PrivateKey } from '@textile/hub'

async function example () {
  const id = await PrivateKey.fromRandom();
  return id
}
```

Here, we're just using a helper to generate a private-key identity for the user.

### Generate User Token

```typescript
import { Client, PrivateKey } from '@textile/hub'

async function example (client: Client, identity: PrivateKey) {
  await client.getToken(identity);
}
```

This will register the user with your remote Hub account, granting them the ability to push data to IPFS through Threads and Buckets.

### Connect Buckets

Now that your user is setup and connected to your API on the Hub, you can start creating Buckets. First, setup a Bucket instance. 

```typescript
import { Buckets } from '@textile/hub'

const buckets = Buckets.withKeyInfo({
  key: 'USER_API_KEY',
})
```

In the code above, we reuse the Context we already created in our ThreadDB Client because it contains the token, API keys, etc.

!!!info
    If you already created a connection using the Threads `client`, you can directly transfer that connection to Buckets with `Buckets.copyAuth(client)`.

**List all Buckets**

```typescript
import { Buckets } from '@textile/hub'

async function find (buckets: Buckets) {
  const roots = await buckets.list();
  const exists = roots.find((bucket) => bucket.name === 'buckets')
  return exists
}
```

**Open a Bucket**

The easiest way to start pushing/pulling bucket files is to use the `open` method with just the bucket name you intend to use.

```typescript
import { Buckets } from '@textile/hub'

async function find (buckets: Buckets, name: string) {
  const root = await buckets.open(name)
  return root // root.key is the bucket key
}
```

### Push files to User Bucket

Finally, let's push a simple file to the user's Bucket. 

In this example, we'll just create a simple `HTML` file that says, `Hello world`.

```typescript
import { Buckets } from '@textile/hub'

async function example (buckets: Buckets, bucketKey: string, content: string) {
  const file = { path: '/index.html', content: Buffer.from(content) }

  const raw = await buckets.pushPath(bucketKey, 'index.html', file)
}
```

### Updating User Bucket

When you update your Bucket:

* The **Thread** containing the **Bucket** will be *updated*.
* The Bucket's **HTTP URL** and **IPNS address** updates to reflects those updates.
* The **Bucket** will *get* a **new IPFS address** (CID) any time you change it.

This gives you a lot of options for building apps, delivering content, and doing cool things for your users with their data.

To get each of the protocol addresses, read below.

### List the Bucket links

Finally, you can list the links to the file on IPFS, IPNS, ThreadDB, and HTTP. 

#### HTTP Address

Textile gives you and your users a public address for each Bucket created. They are created using the Bucket key and you can generate those as follows:

```
https://${bucket-key}.textile.space
```

#### IPFS Address

The IPFS address is contained in the result of `pushPath`.

```typescript
import { Buckets } from '@textile/hub'

async function example (buckets: Buckets, bucketKey: string, file: Buffer) {
  const raw = await buckets.pushPath(bucketKey!, 'index.html', file)
  console.log(raw.root)
}
```

#### IPNS Address

The IPNS Address is always the same and is the Bucket key! If you want to see the Bucket over IPNS from a gateway, you can use the Textile gateway as follows:

```
https://${bucket-key}.ipns.hub.textile.io/
```

#### ThreadDB Address

You can generate a link to the Bucket with the user thread as follows:

```
https://${thread-id}.thread.hub.textile.io/buckets/${this.state.bucket-key}
```

!!!warning
    Remember, at this point, Buckets are entirely open, data is available to be viewed or downloaded by anyone your app or user shares the link with.

## Code

Check out a complete [React Native project on GitHub](https://github.com/textileio/js-examples/tree/master/react-native-hub-app) that generates a User Identity, Thread, and Bucket.

### Android setup

Simply `npm install` and then `npm run android` from the root of the `react-native-hub-app` folder.

### iOS setup

If `npm run ios` doesn't work for you immediately after `npm install`, follow these steps.

1. Be sure you ran `npm install`.
2. Be sure you have updated your `.env` file.
3. Start the react native server, `npm run start`.
4. Open Xcode
5. Open the iOS project, `./ios/threadsdb_app.xcworkspace`.
6. Click run in Xcode.

Your app should now be running. Subsequent should work with just `npm run ios`.