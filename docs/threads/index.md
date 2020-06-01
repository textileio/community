---
hero_img: ../images/threads-hero.png
---

# Getting Started

ThreadDB is a p2p database built on [IPFS](https://ipfs.io) and [Libp2p](https://libp2p.io). Together, the Threads Protocol and Database provide an alternative architecture for data on the web. ThreadDB aims to help power a new generation of web technologies by combining a novel use of event sourcing, Interplanetary Linked Data ([IPLD](https://ipld.io)), and access control to provide a distributed, scalable, and flexible database solution for decentralized applications.

### Developer API

ThreadDB is designed to be simple enough for any developer to start using. The API will feel familiar to developers who have worked with technologies like MongoDB.

The first three concepts a developer will encounter with ThreadDB are [Databases](#databases), [Collections](#collections), and [Instances](#instances). The organization is simple. Instances are the individual records you create, update, or delete. Instances are stored in a Collection. Collections have one or many Schemas and can only store Instances that match one of those Schemas. Databases can store many Collections. Collections are similar to Tables in other databases.

A Thread-based Database is tied to a single Thread (with associated Thread ID).


```typescript
import { Database, JSONSchema, FilterQuery } from '@textile/threads-database'
import { ThreadID } from '@textile/threads-id'
```

To start a new, empty database is simple. A new [Level Datastore](https://github.com/ipfs/js-datastore-level) is used as the backing store by default if no datastore is explicitly supplied. See the doc-strings for the `Database.constructor` for further options.

By default, a ThreadDB will connect with a local `go-threads` Threads Daemon. See the [`go-threads`](https://github.com/textileio/go-threads) for details on getting started with local development. The Threads Daemon may be helpful to developers that aim to build their own Thread Services, host replication services, or test advanced Thread usage. The Threads Daemon (`threadsd`) is provided as an installable binary with every [release of Threads](https://github.com/textileio/go-threads/releases).

Alternatively, it is possible to connect with a remote daemon by specifying the networking component of the Database ([See more](#replication-with-the-hub) for details on connecting to hosted remote services).


```typescript
const db = new Database() // Uses a level datastore by default
```

Next, we simply start the database, and we are ready to take action. Here, we are explicitly providing an 'existing' ThreadID. But default, a random ThreadID will be used. See the doc-strings for `Database.open` for further options.


```typescript
const threadID = ThreadID.fromRandom()
await db.open({ threadID })
console.log(db.threadID.toString())
```

### Collections

To handle different data structures, a Database contains Collections, each of which are defined by a [json-schema.org schema](https://json-schema.org/). These schemas define the 'shape' of Collection Instances. Collections are similar to Tables in other databases. Ultimately, a Collection is a single document store with a set of APIs to make it feel like a *local database table*.

Collections can be created from an existing Schema.


```typescript
// Define a simple person schema
const schema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Person',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    age: {
      type: 'number',
      minimum: 0,
      exclusiveMaximum: 100,
    },
  },
}
const Person = await db.newCollection('Person', schema)
```

Or from an existing object/instance.


```typescript
const obj = {
  _id: '', // All collections have an _id field
  team: '',
  name: '',
  points: 0,
}
const Player = await db.newCollectionFromObject('Player', obj)
```

### Instances

Instances are the objects you store in your Collection. Instances are JSON documents with schemas that match those defined in your Collection. Updates to an Instance are driven by [JSON Patch](https://github.com/Starcounter-Jack/JSON-Patch) semantics by default, but will be made to support other types (CRDT-driven documents for instance) in the future (some of which are already under active development). Creating and manipulating them is simple.


```typescript
const beth = new Player({ _id: '', name: 'beth' }) // Not yet persisted
await beth.save() // Persist changes to db

// Modify the `beth` instance
beth.points = 1
await beth.save() // Save changes

// Modify it again
beth.team = 'Astronauts'
beth.points = 2

// Save it from the Collection
await Player.save(beth)

// Delete it from the Collection
await Player.delete(beth._id)

// etc!
```

### Query

Each Threads implementation supports query and look-up capabilities such as `insert`, `findOne`, `has`, and more. ThreadDB also supports the [MongoDB query language](https://github.com/kofrasa/mingo). In the JavaScript library, you might write queries like the following.


```typescript
await Player.insert(
  { _id: '', points: 11, team: 'Astronauts', name: 'beth'},
  { _id: '', points: 1, team: 'Astronauts', name: 'jim'},
  { _id: '', points: 18, team: 'Astronauts', name: 'issac'},
  { _id: '', points: 7, team: 'Astronauts', name: 'beth'},
)
```


```typescript
// Setup a query
const query = {
  $or: [
    { points: { $gt: 10 } },
    { name: 'jim' },
  ]
}

const all = Player.find(query, { sort: { points: -1 } })
```

Queries return `AsyncIterableIterators`, so you can loop over them and take appropriate action.


```typescript
import { collect } from 'streaming-iterables'

for (const { key, value } of await collect(all)) {
  console.log(`${key.toString()}: ${value.name}`)
}
```

### Listen

A Database is also an [Event Emitter](https://github.com/EventEmitter2/EventEmitter2), and listeners can subscribe to events using 'wildcard' syntax. The following database manipulations could be observed via the following simple listener.


```typescript
const _ = db.on('**', (update: any) => {
  console.log(update)
})
```

## Multi-user Databases

Everything above just looks like a database, so what's a Thread? ThreadDB combines the storage and management of data (the *Database*) with networking, access control, and replication over IPFS using the Threads *Protocol*. The Threads protocol has been extensively documented in the [whitepaper](https://docsend.com/view/gu3ywqi), but in short, Threads use private-key encryption to manage both security and identity among multiple parties that can access or edit the same Database.

### Access-control

ThreadDB uses a modular role-based access control system that will allow access control lists (ACLs) to be declared in a wide-variety of ways. ACLs are in active development and you can [follow the development here](https://github.com/textileio/go-threads/issues/295).

### Identity

ThreadDB allows you to handle user identities (for access control and security/encryption) in the best way for your app and your users. In order to handle *multiple* peers collaborating on a single database, as well as the ability to handle storage *on behalf* of a user, ThreadDB expects a simple Identity interface for singing and validating database updates. See the Hub documentation on [user identities](../hub/app-apis.md#user-identities) for details.

## Replication with the Hub

ThreadDB has been designed to support trustless peers on the network to provide services that improve or enhance performance and experience for end-users. [The Hub](../hub/index.md) offers Thread Services for relay, replication, and backup that you can add for your users in a couple of minutes. You can learn more about Identity, Access Control, and other advanced topics, in the Hub documentation.

### Connect to the Hub

1. [Create an Account](../hub/accounts.md#account-setup)
2. [Create an App Token](../hub/app-apis.md#api-access)
3. <a href="https://textileio.github.io/js-textile" target="_blank">Add the Textile Library to your App</a>

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
