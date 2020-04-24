---
hero_img: /images/threads-hero.png
---

# Getting Started

ThreadsDB is a serverless p2p database built on [IPFS](https://ipfs.io) and [Libp2p](https://libp2p.io). Together, the Threads Protocol and Database provide an alternative architecture for data on the web. ThreadsDB aims to help power a new generation of web technologies by combining a novel use of event sourcing, Interplanetary Linked Data ([IPLD](https://ipld.io)), and access control to provide a distributed, scalable, and flexible database solution for decentralized applications.

### Developer API

ThreadsDB is designed to be simple enough for any developer to start using. The API will feel familiar to developers who have worked with technologies like MongoDB or Mongoose.

The first three concepts a developer will encounter with ThreadsDB are [Databases](#databases), [Collections](#collections), and [Instances](#instances). The organization is simple. Instances are the individual records you create, update, or delete. Instances are stored in a Collection. Collections have one or many Schemas and can only store Instances that match one of those Schemas. Databases can store many Collections.

ThreadsDB supports Mongodb/Mongoose style search. In the JavaScript library, you might write queries like the following.

```js
Players.find(
  { 
    $and: [
      { points: { $gt: 10 } },
      { points: { $lt: 20 } },
      { team: 'Astronauts' }
    ]
  }, 
  { sort: { points: -1 }}
)
```

### Multi-user Databases

Everything above just looks like a Database, so what's a Thread? ThreadsDB combines the storage and management of data (the Database) with networking, access control, and replication over IPFS using the Threads Protocol. The Threads protocol has been extensively documented in the [whitepaper], but in short, Threads use private-key encryption to manage both security and identity among multiple parties that can access or edit the same Database.

Jump to [Thread Networking](#networking) to read more.

## Replication with the Hub

ThreadsDB has been designed to support trustless peers on the network to provide services that improve or enhance performance and experience for end-users. [The Hub](../hub/introduction.md) offers Thread Services for relay, replication, and backup that you can add for your users in a couple of minutes. 

### Connect to the Hub

1. [Create an Account]()
2. [Create an App Token]()
3. [Add the Textile Library to your App]()

## ThreadsDB

### Basic Usage

#### Databases

A Thread-based Database is tied to a single Thread (with associated Thread ID). A Database is an Event Emitter (in the Nodejs sense), and Listeners can subscribe to Events using 'wildcard' syntax via the [EventEmitter2](https://github.com/EventEmitter2/EventEmitter2) library.

To start an empty database is simple.

```typescript
import { Database } from '@textile/threads-database'
const db = new Database(...)
```

#### Collections

To handle different data structures, a Database contains Collections, each of which are defined by a [json-schema.org](https://json-schema.org) schema. These schemas define the 'shape' of Collection Instances. Collections implement a Store with [JSON Patch](https://github.com/Starcounter-Jack/JSON-Patch) semantics by default, but will be made to support other types (CRDT-driven documents for instance) in the future (some of which are already under active development). Ultimately, a Collection is a Store with a set of APIs to make it feel like a *local database table*.

```typescript
import { Database } from '@textile/threads-database'
const db = new Database(...)
const Collection = await db.newCollectionFromObject('Players', {
  ID: '',
  team: '',
  name: '',
  points: 0,
})

// This will listen to any and all event types on Players
db.on('Players.**', update => {
  console.log(update)
})
```

#### Instances

Instances are the objects you store in your Collection. Instances are JSON documents with schemas that match those defined in your Collection. Creating and manipulating them is simple.

```typescript
const beth = new Collection({ ID: 'id-i1', name: 'Beth' }) // This is not yet persisted
await beth.save() // Save changes

// Modify the `beth` instance
beth.points = 1
await beth.save() // Save changes

// Modify it again
beth.team = 'Astronauts'
beth.points = 2

// Save it from the Collection
await Collection.save(i1)

// Delete it from the Collection
await Collection.delete(i1.ID)
```

#### Query

Each Threads implementation supports query and look-up capabilities such as `insert`, `findOne`, `has`, and more. Threads also supports Mongodb/Mongoose style search, `find`.

```typescript
const Players = new Collection<Player>('players', {}) // Anything goes schema
await Players.insert(
  { ID: '', points: 11, team: 'Astronauts': name: 'beth'},
  { ID: '', points: 1, team: 'Astronauts': name: 'jim'},
  { ID: '', points: 18, team: 'Astronauts': name: 'issac'},
  { ID: '', points: 7, team: 'Astronauts': name: 'beth'},
)

const all = Players.find({ $or: [{ points: { $gt: 10 } }, { name: 'jim' }] }, { sort: { points: -1 } })
for await (const { key, value } of all) {
    console.log(value)
}
```

#### Transactions

Collections support (basic) read and write Transactions. These are lockable, key-based 'states' that you can put the Collection into, so that anything else that wants to write to the Collection must _await_ for the Transaction to complete. Transactions do not yet provide isolation, though they do provide atomic update semantics.

#### Subscriptions

Subscriptions can be created on the different forms of updates on a Collection (CREATE, SAVE, DELETE, ALL). These events will trigger for both local changes and changes that occur from network based peers with access to the Database.

### Networking

#### Multiuser Threads

The following end-to-end example of exchanging data between two peers provides a good idea of the APIs that developers can use to connect multiple users to the same database. Behind the scenes, ThreadsDB uses a combination of protocols to help connect and syncronize users on the network under most conditions.

```typescript
import { Multiaddr, ThreadID, Variant } from '@textile/threads-core'
import { Database } from '@textile/threads-database'
import { DomainDatastore } from '@textile/threads-store'
import { MemoryDatastore, Key } from 'interface-datastore'
import LevelDatastore from 'datastore-level'

interface DummyEntity {
  ID: string
  name: string
  counter: number
}

// Peer 1: Create db1, register a collection, create and update an instance.
const d1 = new Database(...)
await d1.open()
const id1 = d1.threadID
if (id1 === undefined) {
throw new Error('should not be invalid thread id')
}
// Create a new collection
const Dummy1 = await d1.newCollectionFromObject<DummyEntity>('dummy', {
  ID: '',
  name: '',
  counter: 0,
})

// Get peer1 database information (addr, id, keys, etc)
const dbInfo = await d1.dbInfo()

// Peer 2: Create a completely parallel db2, which will sync with the previous one and should
// have the same state of dummy. This one will be manually 'built' from sub-components,
// just to show how it can be done!
const info = await d1.service.getThread(id1)
const datastore = new MemoryDatastore()
const client = new Client({ host: 'http://127.0.0.1:6207' })
const service = new Network(new DomainDatastore(datastore, new Key('service')), client)
const test = await service.getHostID()
const d2 = await Database.fromAddress(dbInfo.addr, info.key, datastore, {
  service,
})
// Create parallel collection
const Dummy2 = await d2.newCollectionFromObject<DummyEntity>('dummy', {
    ID: '',
    name: '',
    counter: 0,
})

const dummy1 = new Dummy1({ name: 'Textile', counter: 0 })
dummy1.counter += 42
await dummy1.save()

// wait about 5 seconds?

const dummy2 = await Dummy2.findById(dummy1.ID)
console.log(dummy2.name === dummy1.name)
console.log(dummy2.counter === dummy1.counter)
await d1.close()
await d2.close()
```

That's it! Two completely separate database instances, syncing encrypted and signed data across the network!

#### Access-control

Add an update note here

#### Identity

Add 3box etc here.

#### Pinning, Relay, and Replication

Thread Services (e.g. pinning encrypted data on IPFS and helping multiple peers relay updates across the network) can be built and deployed to the network using [go-threads](https://github.com/textileio/go-threads). Textile offers a number of these functions through the Hub. Attaching the Hub to your databases will allow you to deliver a high-quality user-experience. [See more](#replication-with-the-hub)

#### Local Daemon

The Threads Daemon may be helpful to developers that aim to build their own Thread services, host replication services, or test advanced Thread usage. The Threads Daemon (`threadsd`) is provided as an installable binary with every [release of Threads](https://github.com/textileio/go-threads/releases).

## Installation

ThreadsDB can be used from many different languages and has libraries written in Javascript, Go, and Dart. Find documentatin on each of those Libraries below. 

<div class="txtl-options">
  <a href="./hub/cli" class="box">
    <h5>JavaScript</h5>
    <p>Add Threads to NodeJS, React Native or browser apps.</p>
  </a>
  <span class="box-space"> </span>
  <a href="./hub/app-hosting" class="box">
    <h5>Golang</h5>
    <p>Use Threads in Go or compile to many other platforms.</p>
  </a>
  <span class="box-space"> </span>
  <a href="./hub/app-hosting" class="box">
    <h5>Dart</h5>
    <p>Use a lightweight client library in Dart and Flutter.</p>
  </a>
</div>

## Advanced Details

The protocols and design of ThreadsDB can be explored in detail in the whitepaper: [A protocol & event-sourced database for decentralized user-siloed data](https://docsend.com/view/gu3ywqi). For futher technical details. the reference implementation of Threads is written in Go and the full implementation details can be found [on godocs](https://godoc.org/github.com/textileio/go-threads).
