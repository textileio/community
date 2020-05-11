# Getting Started

Use the Hub to help scale your applications on IFPS. The Hub APIs are available for your apps and your app users. You can use the Hub APIs with a privileged [Account API Key](#account-key) or with a [User Key](#user-key). Both have the ability to push new data to Buckets, persist ThreadsDB data, and relay ThreadsDB updates.

## API Access

![](/images/tt-cli/tt_account_create_select.png)

### Account Key

Account keys provide direct access to developer and org account Buckets and Threads. Account keys make it possible to build apps that have full access to developer or organization Buckets. You can use account keys to integrate your Buckets into CI, dashboards, team messaging integration, etc. To create a new Account Key using `tt key create` and selecting the `account` option.

_[See CLI options](/hub/cli/tt_keys)_

### User Key

User keys provide existing external identities (users) access to their own buckets and threads, under the custodianship of the parent account. Apps can create Buckets for users or persist and replicate ThreadsDB for users. A single _user key_ can be added to your app to authenticate many users to your Hub resources. To create a new User Key using `tt key create` and selecting the `user` option. Also see Identity section and how to use identity providers such as 3Box with user keys.

_[See CLI commands](/hub/cli/tt_keys)_

### Domain whitelisting

If you are building a web application, you can use domain whitelisting to access the same resources without embedding keys in your application. You can track the release of [domain whitelisting here](https://github.com/textileio/textile/issues/109).

## App APIs

### Buckets

[Buckets](/hub/buckets) provide S3-like data storage on IPFS. Just as you can create Buckets with the [Hub CLI](/hub/cli/tt), you can create Buckets using JavaScript with [js-textile](#libraries). 

The [js-textile](#libraries) library allows you to create and edit Buckets owned by you or your organization using an [account key](#account-key). Alternatively, you can use Buckets to store your user's data using a [user key](#user-key).

### ThreadsDB

[ThreadsDB](/threads/introduction) is a mongo-like database that runs on IPFS. You can use it in combination with [js-textile](#libraries) to add replication and relay to your user's databases. When combined, `js-threads` and `js-textile` allow you to embed private, p2p databases in your app that use remote IFPS peers for pinning and remote ThreadDB peers to relay updates to all parties. This configuration will help you scale your app and offer the highest quality experience to your users.

## Identity & data ownership

The databases and Buckets you create over the API are owned in one of three ways.

1. Developer owned. If you use an `account key` with the Buckets or ThreadsDB APIs, the data will be linked directly to your account.
2. Org owned. If you create an `account key` using the `--org` flag, the Buckets and Threads will be linked to the organization.
3. User owned. If you create a `user key`, Textile allows your app to provision new Buckets and Threads on behalf of your users. This data will be signed and owned by your end-users and only accessible to them. Read more on [Threads Identity](/threads/introduction#identity)

### User identities

User identities are flexible and can be defined in a way most suitable for your application. In the [examples](#examples) below we use private-key based identities exactly how Libp2p does. You can also use external identity providers or custom user identities. 

## Libraries

You can find all remote Thread and Bucket APIs in the `textile` libraries below. These libraries are meant to work in combination with the `threads` libraries when you want to create and manage Threads database in your app. 

Here are the libraries you will find useful to start building today.

|                         | ThreadsDB           | Threads APIs & Buckets      |
|-------------------------|:---------------------:|:-------------------:|
| Browser, React Native, & NodeJS | [js-threads](https://textileio.github.io/js-threads) | [js-textile](https://textileio.github.io/js-textile) |
| Dart & Flutter Apps ([pending release](https://github.com/textileio/dart-textile/issues/5))    | [dart-threads-client](https://github.com/textileio/dart-textile/issues/5) | [dart-textile](https://github.com/textileio/dart-textile/issues/5) |
| Golang Libraries        | [go-threads](https://godoc.org/github.com/textileio/go-threads)          | |
| Command-line | _thread-shell (coming)_       | [Hub CLI](/hub/cli/tt)         |

## Examples

### Create a user owned ThreadsDB

##### Create a new user session

```typescript
import { Context } from '@textile/textile'
import { Client } from '@textile/threads-client'

let ctx: Context = new Context()

// `USER_KEY` comes from `tt key create`
ctx = ctx.withAPIKey(USER_KEY)
```

##### Create a db with the user identity

Your users can be defined by any available identity provider or use any private-key based identity, such as Libp2p's identities.

```typescript
const identity = await Libp2pCryptoIdentity.fromRandom()

const db = new Client(ctx)
const tok = await db.getToken(identity)
ctx = ctx.withToken(tok)
```

##### Create a user owned thread for their buckets

Buckets run on Threads, so your user will need a ThreadDB setup for thier own Buckets.

```typescript
ctx = ctx.withThreadName('private-chat-0')
const id = ThreadID.fromRandom()
const db = new Client(ctx)
await db.newDB(id.toBytes())
```

See the [js-threads](https://textileio.github.io/js-threads) documentation to learn more about using threads in your app.

### Create a user owned Bucket

##### Create a new user session

```typescript
import { Context } from '@textile/textile'
import { Client } from '@textile/threads-client'

let ctx: Context = new Context()

// `USER_KEY` comes from `tt key create`
ctx = ctx.withAPIKey(USER_KEY)
```

##### Create a db with the user identity

Your users can be defined by any available identity provider or use any private-key based identity, such as Libp2p's identities.

```typescript
const identity = await Libp2pCryptoIdentity.fromRandom()

const db = new Client(ctx)
const tok = await db.getToken(identity)
ctx = ctx.withToken(tok)
```

##### Create a user owned thread for their buckets

Buckets run on Threads, so your user will need a ThreadDB setup for thier own Buckets.

```typescript
ctx = ctx.withThreadName('my-buckets')
const id = ThreadID.fromRandom()
const db = new Client(ctx)
await db.newDB(id.toBytes())
ctx = ctx.withThread(id)
```

##### Initialize a new bucket in the db

```typescript
const buckets = new Buckets(ctx)
const buck = await buckets.init('images', ctx)
```

##### Push files to the bucket

```typescript
const pth = path.join(__dirname, '..', 'testdata')
const stream = fs.createReadStream(path.join(pth, 'file1.jpg'))
const rootKey = buck.root?.key || ''
const { root } = await buckets.pushPath(rootKey, 'dir1/file1.jpg', stream, ctx)
```
