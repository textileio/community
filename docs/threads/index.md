---
hero_img: ../images/threads-hero.png
---

# Getting Started

ThreadDB is a multi-party database built on [IPFS](https://ipfs.io) and [Libp2p](https://libp2p.io). Threads provide an alternative architecture for data on the web. ThreadDB aims to help power a new generation of web technologies by combining a novel use of event sourcing, Interplanetary Linked Data ([IPLD](https://ipld.io)), and access control to provide a distributed, scalable, and flexible database solution for decentralized applications.

### Thread Implementations

There are two implementations of ThreadDB.

#### Golang

The first is written in Go and can be found at [https://github.com/textileio/go-threads/](https://github.com/textileio/go-threads/). This is the reference implementation, it contains all the latest components to use as a library, write trustless services, [build a client](https://godoc.org/github.com/textileio/go-threads/api/client) connected to a a threads daemon. More documentation for the Go implementation will be coming in the future.

#### JavaScript

The second implementation is written in JavaScript (Typescript, really). This implementation has some optimizations to make it more ideal when writing web applications. The JavaScript implementation is currently a Client of the Go implementation. You can run it against your own go-threads instance or connect it to the Textile Hub to use one of ours. Read more about the [Client here](https://textileio.github.io/js-hub/docs/hub.client).

In general, when you are building apps that use threads in remote context (e.g. the browser) it's best to push the networking later to remote services whenever possible (while using/allowing p2p when it works). You can also build your own remote relays and services using the [go-threads](https://github.com/textileio/go-threads/) library.

For the rest of the explanation below, we'll focus on examples using the JavaScript library.

### Developer API

ThreadDB is designed to be simple enough for any developer to start using. The API will feel familiar to developers who have worked with technologies like MongoDB.

#### Data organization

The first three concepts a developer will encounter with ThreadDB are [Threads](#threads), [Collections](#collections), and [Instances](#instances). Instances are the individual records you create, update, or delete. Instances are stored in a Collection. Collections have one or many Schemas and can only store Instances that match one of those Schemas. Databases can store many Collections. Collections are similar to Tables in other databases. A Thread-based Database is tied to a single Thread (with associated Thread ID).

#### Creating a new thread

To start a new, empty Thread, with remote networking using the Hub APIs you simply initialize your Thread with the `UserAuth` object. You can read more about creating `UserAuth` objects in [the creating web apps tutorial](../tutorials/hub/web-app.md).

**Create a new Thread API client**

```typescript
import {Client, PrivateKey, UserAuth} from '@textile/hub'

async function setup (auth: UserAuth) {
  const user = await PrivateKey.fromRandom()

  const client = await Client.withUserAuth(auth)

  return client
}
```

**Authorize a new user to use your Hub API**

You must generate a new API token for each user you want on your API.

```typescript
import {Client, PrivateKey} from '@textile/hub'

async function newToken (client: Client, user: PrivateKey) {
  const token = await client.getToken(user)
  return token
}
```

**List a user's existing Threads**

```typescript
import { Client } from '@textile/hub'

async function list (client: Client) {
  const threads = await client.listThreads()
  return threads
}
```

**create a new database**

```typescript
import {Client, Identity, ThreadID, UserAuth} from '@textile/hub'

async function createDB (client: Client) {
  const thread: ThreadID = await client.newDB()
  return thread
}
```

Congrats! You now have a new ThreadDB! Each ThreadDB has a unique [ThreadID](https://textileio.github.io/js-hub/docs/hub.threadid). You can create your own ThreadIDs, or easily generate a random ThreadID as we do in the above example.

### Collections

To handle different data structures in the same Database, a Database contains Collections. Each Collection is defined by a [json-schema.org schema](https://json-schema.org/). These schemas define the *shape* of Collection Instances (the individual entries). Collections are similar to tables in other databases. Ultimately, a Collection is a single document store with a set of APIs to make it feel like a *local database table*.

Collections can be created from an existing Schema or from an Object.

**Create from schema**

```typescript
import { Client, ThreadID } from '@textile/hub'
import { JSONSchema } from '@textile/threads'

// Define a simple person schema
const schema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Person',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    missions: {
      type: 'number',
      minimum: 0,
      exclusiveMaximum: 100,
    },
  },
}

// Requires the started database we created above
async function collectionFromSchema (client: Client, threadID: ThreadID) {
  await client.newCollection(threadID, 'Astronauts', schema)
}
```

### Instances

Instances are the objects you store in your Collection. Instances are JSON documents with schemas that match those defined in your Collection.

**get all instances**

```typescript
import {Client, ThreadID} from '@textile/hub'
async function findEntity (client: Client, threadId: ThreadID, collection: string) {
  const found = await client.find(threadId, collection, {})
  console.debug('found:', found.instancesList.length)
}
```

**add an instance**

```typescript
import {Client, ThreadID} from '@textile/hub'
// matches YourModel and schema
async function create (client: Client, threadId: ThreadID, collection: string) {
  const created = await client.create(threadId, collection, [{
    some: 'data',
    numbers: [1, 2, 3]
  }])
}
```

### Query

Each Threads implementation supports query and look-up capabilities such as `insert`, `findOne`, `has`, and more. ThreadDB also supports the [MongoDB query language](https://github.com/kofrasa/mingo). In the JavaScript library, you might write queries like the following. 


```typescript
import { Client, ThreadID } from '@textile/hub'
import { QueryJSON } from '@textile/threads'

// Requires the started database we generated above containing the Player collection
async function createQuery (client: Client, threadID: ThreadID, query: QueryJSON) {
  // Get results
  const all = await client.find(threadID, 'astronauts', query)
  return all
}
```

### Listen

You can also subscribe to changes in a database.


```typescript
import { Client, ThreadID, PrivateKey } from '@textile/hub'
import { Update } from '@textile/threads'

const userID = PrivateKey.fromRandom()

interface Astronaut {
  _id: string
  name: string
  missions: number
}
const callback = async (reply?: Update<Astronaut>, err?: Error) => {
  console.log(reply.instance)
}

// Requires userID already be authenticated to the Users API
async function startListener(client: Client, threadID: ThreadID) {
  const filters = [{actionTypes: ['CREATE']}]
  const closer = client.listen<Astronaut>(threadID, filters, callback)
  return closer
}
```

### Access-control

ThreadDB uses a modular role-based access control system that will allow access control lists (ACLs) to be declared in a wide-variety of ways. ACLs are in active development and you can [follow the development here](https://github.com/textileio/go-threads/issues/295).

### Identity

ThreadDB allows you to handle user identities (for access control and security/encryption) in the best way for your app and your users. In order to handle *multiple* peers collaborating on a single database, as well as the ability to handle storage *on behalf* of a user, ThreadDB expects a simple Identity interface for singing and validating database updates. See the Hub documentation on [user identities](../hub/app-apis.md#user-identities) for details.

## Replication with the Hub

ThreadDB has been designed to support trustless peers on the network to provide services that improve or enhance performance and experience for end-users. [The Hub](../hub/index.md) offers Thread Services for relay, replication, and backup that you can add for your users in a couple of minutes. You can learn more about Identity, Access Control, and other advanced topics, in the Hub documentation.

### Connect to the Hub

1. [Create an Account](../hub/accounts.md#account-setup)
2. [Create an App Token](../hub/app-apis.md#api-access)
3. <a href="https://textileio.github.io/js-hub" target="_blank">Add the Textile Hub Library to your App</a>

### Pinning, Relay, and Replication

Thread Services (e.g. pinning encrypted data on IPFS and helping multiple peers relay updates across the network) can be built and deployed to the network using [go-threads](https://github.com/textileio/go-threads). Textile offers a number of these functions through the Hub. Attaching the Hub to your databases will allow you to deliver a high-quality user-experience.

## Installation

ThreadDB can be used from many different languages and has libraries written in Javascript and Go. Find documentation on each of those Libraries below. 

<div class="txtl-options">
  <a href="https://textileio.github.io/js-threads/" class="box">
    <h5>JavaScript</h5>
    <p>Add Threads to NodeJS, React Native or browser apps.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://godoc.org/github.com/textileio/go-threads/api/client" class="box">
    <h5>Golang</h5>
    <p>Use Threads in Go or compile to many other platforms.</p>
  </a>
  <span class="box-space"> </span>
  <span class="box-fill">
  </span>
</div>

## Advanced Details

The protocols and design of ThreadDB can be explored in detail in the whitepaper: [A protocol & event-sourced database for decentralized user-siloed data](https://docsend.com/view/gu3ywqi). For further technical details. the reference implementation of Threads is written in Go and the full implementation details can be found [on godocs](https://godoc.org/github.com/textileio/go-threads) (jump to [go-threads client](https://godoc.org/github.com/textileio/go-threads/api/client)).
