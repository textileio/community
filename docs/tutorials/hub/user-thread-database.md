# Thread Database

In this tutorial, we'll walk through using the local Thread Database in JavaScript. The `Database` can be used to store and work with data entirely locally in your app and it can be linked to other nodes that can help sync, relay, or store data when the user goes offline. We'll use those features to create a Database, connect it to the Hub, and connect two peers.

## Getting Started

There are a few resources you'll need before you start writing code.

- [A new Typescript web app](https://webpack.js.org/guides/typescript/). We recommend using Typescript, as Textile libraries are in a period rapid of development and type detection is valuable during upgrades.
- You should already be familiar with how to create user identities and how to generate API keys.

## Create a new Database

To create a new `Database` you need to, 

1. Import the `Database` class.
2. Create a new database object with local storage enabled.
3. Attach that database to your Hub account for networking.

To attach you Hub account, you'll use the non-signing key described in the [development mode](development-mode.md) section. You can pass it in using the `withKeyInfo` method you've already used on the `Buckets` class.

Let's take a look at those steps all together.

```typescript
import { KeyInfo, ThreadID } from '@textile/hub'
import { Database } from "@textile/threads-database"

const init = (keyInfo: KeyInfo, threadID: ThreadID) => {
    const db = Database.withKeyInfo(keyInfo, threadID.toString())
    return db
}
```

## Create a thread for the chat room

Next, let's create a chat room. You simply need to start a new thread using the same `ThreadID` as above. We'll just create one from random.

```typescript
import { Identity, ThreadID } from '@textile/hub'
import { Database } from "@textile/threads-database"

const startThread = async (db: Database, threadID: ThreadID, identity: Identity) => {
  await db.start(identity, {threadID: threadID})
  return threadID
}
```

## Create a chat room in a collection

You can add multiple chat rooms to the same thread by adding multiple collections. Here, we'll create our first collection. Using Typescript, we can keep our collection schema in json but also type the objects coming in and out of the API. We will,

1. Create a type that matches our schema.
2. Create a new collection, declaring both the type and the `json` schema.

```typescript
import { Database, Collection, JSONSchema } from "@textile/threads-database"

interface Message {
  _id: string
  author: string
  text: string
}

const messageSchema: JSONSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    ChatBasic: {
      title: 'ChatBasic',
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        author: {
          type: 'string',
        },
      },
      required: ['text', 'author', '_id'],
    },
  },
}

const newCollection = async (db: Database, roomName: string): Promise<Collection<Message>> => {
  const chat = await db.newCollection<Message>(roomName, messageSchema)
  return chat
}
```

## Listen to new events

You can use your database as an event emitter. This is helpful if you are building with react and want to use the database to drive user interface updates, or if you are familiar with using `socketio`, you may have used a socket interface in many of the same ways. Let's listen to events from our database.

Here, we'll filter to only updates on our collection of type, `0`, meaning newly created events.

```typescript
import { Identity, ThreadID } from '@textile/hub'
import { Database } from "@textile/threads-database"

interface Message {
  _id: string
  author: string
  text: string
}

const addListener = async (db: Database, name: string) => {
    const filter = `${name}.*.0` // filter to our chat room collection
    db.emitter.on(filter, (values: any, type: any) => {
      //console.log(values)
      const message: Message = values.event.patch;
      console.log(message.text)
    })
}
```

### Using the database as an Observable

Like the previous filter, we'll filter to only updates on our collection of type, `0`, meaning newly created events.

```typescript
import { Database } from "@textile/threads-database"
import { fromEvent, Observable } from 'rxjs';

interface Message {
  _id: string
  author: string
  text: string
}

const getObservable = (db: Database, name: string): Observable<Message> => {
  const filter = `${name}.*.0` // filter to our chat room collection
  return fromEvent(this.db.emitter, filter)
}
```

## Create a new message

Here, we'll use the `chat` collection created above to add a new message. 

```typescript
import { Database, Collection } from "@textile/threads-database"

interface Message {
  _id: string
  author: string
  text: string
}

const send = async (collection: Collection<Message>, text: string, author: string) => {
  const message: Message = {
    _id: '',
    author: author,
    text: text,
  }
  await collection.insert(message)
}
```

## Create invite

When you want new individuals (with new identities) to join the thread, you'll need to create a payload like and _invite_. You can do that with `getDBInfo()`.

```typescript
import { Database } from "@textile/threads-database"

const createInvite = async (db: Database) => {
  const info = await db.getDBInfo()
  return info
}
```

## Accept invite

Now, when a user wants to join this database, they need to start the database with the info payload. This is just like starting the database like you did before, but now you'll start it from some remote information.

```typescript
import { DBInfo, Identity } from '@textile/hub'
import { Database } from "@textile/threads-database"

const startFromInvite = async (db: Database, identity: Identity, invite: DBInfo) => {
  // Replaces startThread method above
  await db.startFromInfo(identity, invite)
  return db.threadID
}
```

## Wrap-up

Those are all the major pieces you need to string together various types of chat interfaces. We've found that chat examples built on `socketio` work really well with the Threads Database, replacing sockets for threads.

We'll include a working example here soon.

<br />
