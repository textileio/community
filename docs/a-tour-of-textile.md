Welcome to Textile! This tour is intended for...

- Developers interested in using Textile's decentralized tooling in their mobile, desktop, or web applications.
- Anyone interested in running a Textile peer, because you'd like...
    - a single, recoverable, sync-able, "account" on the IPFS network.
    - to use this account to add structured and encrypted data to IPFS.
    - to use this account to send encrypted messages and files to your friends.
    - to use this account's data with Textile-based apps or other IPFS tooling.

## Concepts

- [Introduction](/concepts/)
- [The wallet](/concepts/the-wallet) and [accounts](/concepts/the-wallet#accounts)
- [Contacts](/concepts/contacts) and [peers](/concepts/contacts#peers)
- [Threads](/concepts/threads) and [blocks](/concepts/threads#blocks)
- [Files](/concepts/threads/files), [schemas](/concepts/threads/files#schemas), and [mills](/concepts/threads/files#mills)
- [Cafes](/concepts/cafes)

OK! Let's get into it.

## Usage

If you're using the command-line or JavaScript HTTP client, make sure your local [daemon](/install/the-daemon) is running.

!!! Info
    Peer-to-peer (p2p) slang is notoriously confusing. Throughout these docs, we often use the words "peer" and "node". Generally speaking, they are interchangeable. However, a network _node_ refers to the actual connection point that sends and receives data. On a p2p network like IPFS, all nodes are also _peers_. The network is like a "homogeneous solution" of particles (nodes). Mother Nature gets it!

### Peer profile

First off, let's take a look at our peer's _profile_:

```Bash tab="Command-line"
textile profile get
```

```JSON
{
    "id": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "created": "2019-04-19T21:44:46.310082Z",
    "updated": "2019-04-19T21:44:46.310082Z"
}
```

#### Set a display name

```Bash tab="Command-line"
textile profile set name "Clyde"
```

    ok

#### Set an avatar image

```Bash tab="Command-line"
textile profile set avatar {path/to/a/photo}
```

    ok

Now, let's take another look at our peer profile and see what happened.

```Bash tab="Command-line"
textile profile get
```

```JSON
{
    "id": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "name": "Clyde",
    "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
    "created": "2019-04-19T21:44:46.310082Z",
    "updated": "2019-04-20T00:31:34.699845Z"
}
```

Our peer profile was updated. If we had any threads, an _announce_ block would be added to each, informing other members of the change. Remember, our _account's_ contact info contains references to all of its known peers, i.e, a phone, laptop, etc.

### Account

#### View account seed
#### View account address
#### View account contact
#### Account sync

### Contacts

#### View contacts
#### Search for contacts
#### Add a contact
#### Delete a contact

### Ping another peer

### Threads

#### Create a basic thread

##### Add a message
##### Chat
##### Add some data

#### Make a photo album
#### Track some GeoJSON coordinates
#### Add a comment
#### Add a "like"
#### Share a thread
#### Delete a thread
#### List blocks
#### List files
#### The Feed API
#### Subscribe to updates

### Notifications

#### List notifications
#### "Read" notifications

### Cafe Hosts

#### Create a client token
#### View client tokens

### Cafe Clients

#### Register with a cafe
#### List cafe sessions
#### Unregister with a cafe

### Summary

### Logs

#### View current log levels
#### Change log levels

### Config

#### View a config value
#### Set a config value

### IPFS

#### View peer ID
#### View the peer swarm
#### Cat any data on the network

### The Gateway

#### Traverse files
#### Decrypt files

<br>
