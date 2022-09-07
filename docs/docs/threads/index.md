---
hero_img: ../images/threads-hero.png
---

# Getting Started

ThreadDB is a multi-party database built on [IPFS](https://ipfs.io) and [Libp2p](https://libp2p.io) that provides an alternative architecture for data on the web.

ThreadDB aims to help power a new generation of web technologies by combining a novel use of event sourcing, Interplanetary Linked Data ([IPLD](https://ipld.io)), and access control to provide a distributed, scalable, and flexible database solution for decentralized applications.

### Thread Implementations

There are two implementations of ThreadDB.

#### Golang

The first is written in Go and the implementation reference can be found at [https://github.com/textileio/go-threads/](https://github.com/textileio/go-threads/).

In this reference, you'll find:

-   All the latest components to use as a library.
-   How to write trustless services.
-   How to [build a client](https://godoc.org/github.com/textileio/go-threads/api/client) connected to a threads daemon.

More documentation for the Go implementation will be coming in the future.

#### JavaScript

The second implementation is written in JavaScript (Typescript, really). This implementation has some optimizations to make it more ideal when writing web applications. The JavaScript implementation is currently a Client of the Go implementation. You can run it against your own go-threads instance or connect it to the Textile Hub to use one of ours. Read more about the [Client here](https://textileio.github.io/js-textile/docs/hub.client).

In general, when building apps that use threads in a remote context, like the browser, it's best to push the networking layer to remote services whenever possible (while using/allowing p2p when it works). You can also build your own remote relays and services using the [go-threads](https://github.com/textileio/go-threads/) library.

For the rest of the explanation below, we'll focus on examples using the JavaScript library.

### Developer API

ThreadDB is designed to be simple enough for any developer to start using. The API will feel familiar to developers who have worked with technologies like MongoDB.

#### Important concepts

The first three concepts developers will encounter with ThreadDB are [Threads](#threads), [Collections](#collections), and [Instances](#instances).

-   **Instances** are the individual records you _create_, _update_, or _delete_.
-   **Instances** are _stored_ in a **Collection**.
-   **Collections** _have_ one or many **Schemas** and can only _store_ **Instances** that _match_ one of those **Schemas**.
-   **Databases** can _store_ many **Collections**.
-   **Collections** are similar to **Tables** in other databases.
-   A **Thread**-based **Database** is _tied_ to a single **Thread** (with associated **Thread** ID).

#### Creating a new thread

To start a new, empty Thread, with remote networking using the Hub APIs, initialize your Thread with the UserAuth object. You can read more about creating `UserAuth` objects in the [creating web apps tutorial](../tutorials/hub/web-app.md).

**Create a new Thread API client**

```typescript
import { Client, PrivateKey, UserAuth } from "@textile/hub";

async function setup(auth: UserAuth) {
    const user = await PrivateKey.fromRandom();

    const client = await Client.withUserAuth(auth);

    return client;
}
```

**Authorize a new user to use your Hub API**

You must generate a new API token for each user you want on your API.

```typescript
import { Client, PrivateKey } from "@textile/hub";

async function newToken(client: Client, user: PrivateKey) {
    const token = await client.getToken(user);
    return token;
}
```

**List a user's existing Threads**

```typescript
import { Client } from "@textile/hub";

async function list(client: Client) {
    const threads = await client.listThreads();
    return threads;
}
```

**Create a new database**

```typescript
import { Client, Identity, ThreadID, UserAuth } from "@textile/hub";

async function createDB(client: Client) {
    const thread: ThreadID = await client.newDB();
    return thread;
}
```

Congrats! You now have a new ThreadDB! Each ThreadDB has a unique [ThreadID](https://textileio.github.io/js-textile/docs/hub.threadid). You can create your own ThreadIDs, or easily generate a random ThreadID as we do in the above example.

### Invite

You can invite multiple users to the same thread. Use this to build chat apps, collaborative documents, and more.

```typescript
import { Client, DBInfo, ThreadID } from "@textile/hub";

async function getInfo(client: Client, threadID: ThreadID): Promise<DBInfo> {
    return await client.getDBInfo(threadID);
}

async function joinFromInfo(client: Client, info: DBInfo) {
    return await client.joinFromInfo(info);
}
```

Once you get the DB info, you need to send that to the other users you want to join. To do that, we recommend the [User Mailbox API](../users/index.md).

### Collections

**Collections** are used to handle different data structures in the same Database.

Each **Collection** is defined by a [json-schema.org schema](https://json-schema.org/). These schemas define the _shape_ of **Collection** Instances (the individual entries).

**Collections** are similar to tables in other databases. Ultimately, a **Collection** is a single document store with a set of APIs to make it feel like a _local database table_.

Collections can be _created_ from an existing Schema or Object.

**Create from schema**

```typescript
import { Client, ThreadID } from "@textile/hub";

// Define a simple person schema
const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Person",
    type: "object",
    properties: {
        _id: { type: "string" },
        name: { type: "string" },
        missions: {
            type: "number",
            minimum: 0,
            exclusiveMaximum: 100,
        },
    },
};

// Requires the started database we created above
async function collectionFromSchema(client: Client, threadID: ThreadID) {
    await client.newCollection(threadID, {
        name: "Astronauts",
        schema: schema,
    });
}
```

### Instances

Instances are the objects you store in your Collection. Instances are JSON documents with schemas that match those defined in your Collection.

**Get all Instances**

```typescript
import { Client, ThreadID } from "@textile/hub";
async function findEntity(
    client: Client,
    threadId: ThreadID,
    collection: string
) {
    const found = await client.find(threadId, collection, {});
    console.debug("found:", found.length);
}
```

**Add an Instance**

```typescript
import { Client, ThreadID } from "@textile/hub";
// matches YourModel and schema
async function create(client: Client, threadId: ThreadID, collection: string) {
    const created = await client.create(threadId, collection, [
        {
            some: "data",
            numbers: [1, 2, 3],
        },
    ]);
}
```

### Query

Each Threads implementation supports query and look-up capabilities such as `insert`, `findOne`, `has`, and more. ThreadDB also supports the [MongoDB query language](https://github.com/kofrasa/mingo). In the JavaScript library, you might write queries like the following.

```typescript
import { Client, ThreadID, QueryJSON } from "@textile/hub";

// Requires the started database we generated above containing the Player collection
async function createQuery(
    client: Client,
    threadID: ThreadID,
    query: QueryJSON
) {
    // Get results
    const all = await client.find(threadID, "astronauts", query);
    return all;
}
```

### Listen

You can also subscribe to changes in a database.

```typescript
import { Client, PrivateKey, ThreadID, Update } from "@textile/hub";

const userID = PrivateKey.fromRandom();

interface Astronaut {
    _id: string;
    name: string;
    missions: number;
}
const callback = async (reply?: Update<Astronaut>, err?: Error) => {
    console.log(reply.instance);
};

// Requires userID already be authenticated to the Users API
async function startListener(client: Client, threadID: ThreadID) {
    const filters = [{ actionTypes: ["CREATE"] }];
    const closer = client.listen<Astronaut>(threadID, filters, callback);
    return closer;
}
```

### Access-control

ThreadDB uses a modular role-based access control system that allows access control lists (ACLs) to be declared in a wide variety of ways. ACLs are in active development and you can [follow the development here](https://github.com/textileio/go-threads/issues/295).

### Identity

ThreadDB allows you to handle user identities (for access control and security/encryption) in the best way for your app and users.

To handle _multiple_ peers collaborating on a single database, as well as the ability to handle storage _on behalf_ of a user, ThreadDB expects a simple Identity interface for signing and validating database updates. See the Hub documentation on [user identities](../hub/apis.md#user-identities) for details.

### Connect to the Hub

1. [Create an Account](../hub/accounts.md#account-setup)
2. [Create an App Token](../hub/apis.md#api-access)
3. <a href="https://textileio.github.io/js-textile" target="_blank">Add the Textile Hub Library to your App</a>

### Pinning, Relay, and Replication

Thread Services (e.g. pinning encrypted data on IPFS and helping multiple peers relay updates across the network) can be built and deployed to the network using [go-threads](https://github.com/textileio/go-threads). Textile offers a number of these functions through the Hub. Attaching the Hub to your databases will allow you to deliver a high-quality user experience.

## Installation

ThreadDB can be used with many languages and has libraries written in JavaScript and Go. Find documentation on each of those libraries below.

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

The protocols and design of ThreadDB can be explored in detail in the whitepaper: [A protocol & event-sourced database for decentralized user-siloed data](https://docsend.com/view/gu3ywqi).

For further technical details, the reference implementation of Threads is written in Go and the full implementation details can be found [on godocs](https://godoc.org/github.com/textileio/go-threads) (jump to [go-threads client](https://godoc.org/github.com/textileio/go-threads/api/client)).
