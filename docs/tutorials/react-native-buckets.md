# User Buckets from React Native

[The Hub](../hub/index.md) gets really powerful when you allow your app users to leverage IPFS, IPNS, and ThreadDB from inside your applications. In this tutorial, we'll look at how you can let users author, own, and manage buckets right from a mobile app built in React Native.

[Click here to see an example app built with this tutorial](https://github.com/textileio/js-examples/tree/master/react-native-hub-app).

## Preview video

<iframe width="480" height="270" src="https://www.youtube.com/embed/9x73t9tFdms?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Install libraries

**Textile Libraries**

```bash
npm install --save @textile/hub @textile/threads-client @textile/threads-core @textile/threads-id
```

We'll use the above combination of Textile libraries in our app below.

**rn-nodify**

```bash
npm install -D rn-nodeify
```

We are going to use `rn-nodify` and a few other libraries it will install to manage adding `Buffer`, `crypto`, and some other tools to our JavaScript environment in React Native.

Read about [rn-nodify here](https://github.com/tradle/rn-nodeify).

Next, you need to run,

```bash
./node_modules/.bin/rn-nodeify --install
```

This will install a `shim.js` into the root of your file. You need to import `shim.js` at the top of your app's root file (typically `index.js`),

```js
import './shim';
```

This may need to be updated on future package changes, you can make this easier on yourself by adding a `postinstall` step to your `package.json`, as follows,

```json
"scripts": {
  ...
  "postinstall": "./node_modules/.bin/rn-nodeify --install fs,path,process,buffer,crypto,stream,vm --hack"
}
```

**Dot env**

You will need to add API keys to your app. If you plan to store your sourcecode anywhere public, you **should not** store those keys publicly. In our example app, we use `react-native-dotenv` to manage our secrets. 

```bash
npm install --save react-native-dotenv
```

Next, create a `.env` file in the root of your project. You can find an example `.env` in our [example project here](https://github.com/textileio/js-examples/blob/master/react-native-hub-app/example.env). Be **certain** that the `.env` is added to your `.gitignore` and note checked in with your code. 

The contents of `.env` will be, 

```bash
USER_API_SECRET=textile-hub-user-secret
USER_API_KEY=textile-hub-user-group-key
```

You can follow the instructions to generate a **User Group Key** and **Secret** here, [API Access](http://localhost:8000/hub/app-apis/#api-access). If you have already generated keys, you can list them by executing `hub keys ls`. You'll add the values to your `.env` file on the right side of the equality sign.

**Typescript**

The rest of the JavaScript portions of the tutorial will be in TypeScript. You do not need to use TypeScript, but if you don't be sure to strip the typings from any code you copy below.

## Build your app

!!!hint
    In the example app, we put all the ThreadDB and Bucket logic into a single component called [checklist.ts](https://github.com/textileio/js-examples/blob/master/react-native-hub-app/src/checklist.tsx). You can view that file for reference. 

**Import Textile**

```typescript
// Our secrets
import {USER_API_SECRET, USER_API_KEY} from 'react-native-dotenv';
// Database Query method
import {Where} from '@textile/threads-client';
// Buckets client and an API Context helper
import {Buckets, Client, ThreadID} from '@textile/hub';
// A basic Identity provider (PKI from Libp2p)
import {Libp2pCryptoIdentity} from '@textile/threads-core';
```

### Register with remote API

Next, we'll connect to the remote API using our Key and Secret. We do this so that the user can later push their bucket for remote persistence on IPFS and publishing on IPNS.

```typescript
  db = await Client.withUserKey({
    key: USER_API_KEY,
    secret: USER_API_SECRET,
    type: 1,
  })
```

!!!Hint
    Read more about the Context tool in the [Threads Introduction](../threads/index.md).

### Generate an Identity

[Read the basic libp2p identities tutorial now](hub/libp2p-identities.md).

```typescript
const id = await Libp2pCryptoIdentity.fromRandom();
```

Here we are just using a Libp2p helper to generate a private-key identity for the user.

### Generate user Token

```typescript
await db.getToken(id);
```

This will register the user with your remote Hub account, granting them the ability to push data to IPFS through Threads and Buckets.

### Connect Buckets

Now that your user is setup and connected to your API on the Hub, you can start creating Buckets. First, setup a Bucket Client instance.

```typescript
const buckets = Buckets.withUserKey({
    key: USER_API_KEY,
    secret: USER_API_SECRET,
    type: 1,
  })
```

In the above, we reuse the Context we already created in our ThreadDB Client because it contains the token, API keys, etc.

**List all Buckets**

```typescript
const roots = await buckets.list();
const existing = roots.find((bucket) => bucket.name === 'files')
```

Here, we list all the user's Buckets and determine if one exists called `files`. If it exists, we'll use its _key_ if not, we'll create a new Bucket and key.

```typescript
let bucketKey = ''
if (existing) {
  bucketKey = existing.key;
} else {
  const created = await buckets.init('files');
  bucketKey = created.root!.key;
}
```

### Push files to user Bucket

Finally, let's push a simple file to the user's Bucket. In this example, we'll just create a simple `HTML` file that says, `Hello world`.

```typescript
const file = { path: '/index.html', content: Buffer.from(webpage) }

const raw = await buckets.pushPath(bucketKey!, 'index.html', file)
```

### List the Bucket links

Finally, you can list the links to the file on IPFS, IPNS, ThreadDB, and HTTP. Now that the Bucket is created, keep in mind, each time you update the same Bucket for a user:

* replace the HTTP content.
* the Bucket head will get a new IPFS address.
* replace the IPNS content.
* be appended to the ThreadDB history.

This give you a lot of options for how you build apps, deliver content, and do cool things for your users with their data.

You can get each of the protocol addresses as follows.

**HTTP Address**

Textile give you and your users a public address for each Bucket created. They are created using the Bucket key and you can generate those as follows:

`https://${bucket-key}.textile.space`

**IPFS Address**

The IPFS address is contained in the result of `pushPath`.

```typescript
const raw = await buckets.pushPath(bucketKey!, 'index.html', file)
console.log(raw.root)
```

**IPNS Address**

The IPNS Address is always the same and is the Bucket key! If you want to see the Bucket over IPNS from a gateway, you can use the Textile gateway as follows:

`https://${bucket-key}.ipns.hub.textile.io/`

**ThreadDB Address**

You can generate a link to the Bucket with the user thread as follows:

`https://${thread-id}.thread.hub.textile.io/buckets/${this.state.bucket-key}`

!!!warning
    Remember that at this point in time, Buckets are entirely open, data is available to be viewed or downloaded by anyone your app or user share the link with.

## Code

Check out a complete [React Native project on GitHub](https://github.com/textileio/js-examples/tree/master/react-native-hub-app) that generates a user identity, Thread, and Bucket.
