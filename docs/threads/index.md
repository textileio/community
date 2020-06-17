---
hero_img: ../images/threads-hero.png
---

# Getting Started

ThreadDB is a p2p database built on [IPFS](https://ipfs.io) and [Libp2p](https://libp2p.io). Together, the Threads Protocol and Database provide an alternative architecture for data on the web. ThreadDB aims to help power a new generation of web technologies by combining a novel use of event sourcing, Interplanetary Linked Data ([IPLD](https://ipld.io)), and access control to provide a distributed, scalable, and flexible database solution for decentralized applications.

### How to use ThreadDB

There are two implementations of ThreadDB. 

#### Golang

The first is written in Go and can be found at [https://github.com/textileio/go-threads/](https://github.com/textileio/go-threads/). This is the reference implementation, it contains all the latest components to use as a library, write trustless services, [build a client](https://godoc.org/github.com/textileio/go-threads/api/client) connected to a a threads daemon. More documentation for the Go implementation will be coming in the future.

#### JavaScript

The second implementation is written in JavaScript (Typescript, really). This implementation has some optimizations to make it more ideal when writing web applications. The JavaScript implementation is best understood through the [Client](https://textileio.github.io/js-hub/docs/hub.client) and [Database](https://textileio.github.io/js-threads/modules/_textile_threads_database.html) documentation.

In general, when you are building apps that use threads in remote context (e.g. the browser) it's best to push the networking later to remote services whenever possible (while using allowing p2p when it works). For this, we recommend using `js-threads` using the Hub's APIs. Using the [Database](https://textileio.github.io/js-threads/modules/_textile_threads_database.html) for example, you can perform all signing and encryption locally, keeping thread ownership with your users, but push persistence and networking to the remote Hub. You can also build your own remote relays and services using the [go-threads](https://github.com/textileio/go-threads/) library.

For the rest of the explanation below, we'll focus on examples using the JavaScript library.

### Developer API

ThreadDB is designed to be simple enough for any developer to start using. The API will feel familiar to developers who have worked with technologies like MongoDB.

#### Data organization

The first three concepts a developer will encounter with ThreadDB are [Databases](#databases), [Collections](#collections), and [Instances](#instances). The organization is simple. Instances are the individual records you create, update, or delete. Instances are stored in a Collection. Collections have one or many Schemas and can only store Instances that match one of those Schemas. Databases can store many Collections. Collections are similar to Tables in other databases. A Thread-based Database is tied to a single Thread (with associated Thread ID).

#### Creating a new database

To start a new, empty database is simple. You can run the Database with remote networking using the Hub APIs. To do so, you initialize your database with the `UserAuth` object. You can read more about creating `UserAuth` objects in [the creating web apps tutorial](../tutorials/hub/web-app.md).

Running the DB in this way will greatly improve performance, by pushing signed and encrypted updates to the always on service on the Hub for other trusted peers to find and pull.

!!!info
    A new [Level Datastore](https://github.com/ipfs/js-datastore-level) is used as the backing store by default if no datastore is explicitly supplied.

```typescript
import { Identity } from '@textile/threads-core'
import { Database, UserAuth } from '@textile/threads'

async function create (auth: UserAuth, name: string) {
  const db = Database.withUserAuth(auth, name)
  return db
}
```



<!--
Depends on: https://github.com/textileio/js-threads/issues/293

The above assumes you are running the database in insecure environments such as the browser, but if you are running the database in a secure environment you can skip the tutorial and provide you [API keys](../hub/app-apis.md) directly.

```typescript
import { Database, KeyInfo } from '@textile/threads'

async function create (keys: KeyInfo, name: string) {
  // const db = Database.withKeyInfo(keys, name)
  // return db
}
```
-->

With your database created, you now need to *start* it. Starting a database requires the data owner's identity. In these examples, we'll use a [random public-key infrastructure (PKI) based identity](../tutorials/hub/libp2p-identities.md), however, see [Identity](#identity) for further details and links.

```typescript
import { Identity } from '@textile/threads-core'
import { Database, UserAuth, ThreadID } from '@textile/threads'

async function start (db: Database, identity: Identity) {
  const randomID = ThreadID.fromRandom()
  await db.start(identity, {threadID: randomID})
}
```

Congrats! You now have a new ThreadDB! Each ThreadDB has a unique [ThreadID](https://textileio.github.io/js-hub/docs/hub.threadid). You can create your own ThreadIDs, or easily generate a random ThreadID as we do in the above example.

### Collections

To handle different data structures in the same Database, a Database contains Collections. Each Collection is defined by a [json-schema.org schema](https://json-schema.org/). These schemas define the *shape* of Collection Instances (the individual entries). Collections are similar to tables in other databases. Ultimately, a Collection is a single document store with a set of APIs to make it feel like a *local database table*.

Collections can be created from an existing Schema.

```typescript
import { Database, JSONSchema } from '@textile/threads'

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

// Requires the started database we created above
async function collectionFromSchema (db: Database) {
  const Person = await db.newCollection('Person', schema)
  return Person
}
```

Or from an existing object/instance.

```typescript
import { Database } from '@textile/threads'

const obj = {
  _id: '', // All collections have an _id field
  team: '',
  name: '',
  points: 0,
}

// Requires the started database we created above
async function collectionFromObject (db: Database) {
  const Player = await db.newCollectionFromObject('Player', obj)
}
```

Since you don't need to create a Collection if it already exists in your database, a more complete Collection creation step can use the name of the collection to check if it exists first.

```typescript
import { Database } from '@textile/threads'

const obj = {
  _id: '',
  team: '',
  name: '',
  points: 0,
}

// Requires the started database we generated above
async function getOrCreatePlayers (db: Database) {
    const {collections} = db
    const existing = collections.get('Player')
    if (existing) {
      return existing
    } else {
      return await db.newCollectionFromObject('Player', obj)
    }
}
```

### Instances

Instances are the objects you store in your Collection. Instances are JSON documents with schemas that match those defined in your Collection. Updates to an Instance are driven by [JSON Patch](https://github.com/Starcounter-Jack/JSON-Patch) semantics by default, but will be made to support other types (CRDT-driven documents for instance) in the future (some of which are already under active development). Creating and manipulating them is simple.


```typescript
import { Database } from '@textile/threads'

// Requires the started database we generated above containing the Player collection
async function example (db: Database) {
  const Player = db.collections.get('Player')
  if (!Player) throw new Error('Collection does not exist')
  
  // Create an instance for the Collection and then save it
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
}
```

### Query

Each Threads implementation supports query and look-up capabilities such as `insert`, `findOne`, `has`, and more. ThreadDB also supports the [MongoDB query language](https://github.com/kofrasa/mingo). In the JavaScript library, you might write queries like the following. Queries return `AsyncIterableIterators`, so you can loop over them and take appropriate action.


```typescript
import { Database } from '@textile/threads'
import { collect } from 'streaming-iterables'

// Requires the started database we generated above containing the Player collection
async function createQuery (db: Database) {
  const Player = db.collections.get('Player')
  if (!Player) throw new Error('Collection does not exist')

  await Player.insert(
    { _id: '', points: 11, team: 'Astronauts', name: 'beth'},
    { _id: '', points: 1, team: 'Astronauts', name: 'jim'},
    { _id: '', points: 18, team: 'Astronauts', name: 'issac'},
    { _id: '', points: 7, team: 'Astronauts', name: 'beth'},
  )
  // Setup a query
  const query = {
    $or: [
      { points: { $gt: 10 } },
      { name: 'jim' },
    ]
  }
  // Get results
  const all = Player.find(query)
  // Loop over AsyncIterableIterator result and log the names
  for (const { key, value } of await collect(all)) {
    console.log(`${key.toString()}: ${value.name}`)
  }
}
```

### Listen

A Database also has an event emitter, and listeners can subscribe to events. For example, event _names_ are structured as `<collection>.<id>.<type>`, and they support 'wildcard' matching, so `db.emitter.many(['foo', '*', 2], callback)` will match all delete operations (`{ create: 0; save: 1, delete: 2 }`) on the 'foo' collection. Similarly, `db.emitter.on('foo.**', callback)` will match all event types on the 'foo' collection. To observe a given instance, try `db.emitter.on('foo.${instance._id}', callback)`. See [EventEmitter2](https://github.com/EventEmitter2/EventEmitter2) docs for further details. To illustrate, the following database manipulations could be observed via the following simple listener.


```typescript
import { Database } from '@textile/threads-database'

// Requires the started database we generated above containing the Player collection
async function emitter (db: Database) {

  db.emitter.on('**', (update: any) => {
    console.log(update) // Logs the following updates...
  })

  const Player = db.collections.get('Player')
  if (!Player) throw new Error('Collection does not exist')

  const beth = new Player({ _id: '', name: 'beth' })
  await beth.save()
  beth.points = 1
  await beth.save()
  beth.team = 'Astronauts'
  beth.points = 2
  await Player.save(beth)
  await Player.delete(beth._id)
}
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
