Welcome to Textile! This tour is intended for...

- Developers interested in using Textile's decentralized tooling in their mobile, desktop, or web applications.
- Anyone interested in running a Textile peer, because you'd like...
    - a single, recoverable, sync-able, "account" on the IPFS network.
    - to use this account to add structured and encrypted data to IPFS.
    - to use this account to send encrypted messages and files to your friends.
    - to use this account's data with Textile-based apps or other IPFS tooling.

!!! Info
    Peer-to-peer (p2p) slang is notoriously confusing! Throughout these docs, we often use the words "peer" and "node". Generally speaking, they are interchangeable. However, a network _node_ refers to the actual connection point that sends and receives data. On a p2p network like IPFS, all nodes are also _peers_. The network is like a "homogeneous solution" of particles (nodes). Mother Nature gets it!

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

### Peer profile

First off, let's take a look at our peer's _profile_:

```Bash tab="Command-line"
textile profile get
```

```JavaScript tab="JS HTTP"
// todo
```

```JavaScript tab="React Native"
// todo
```

```Swift tab="iOS"
// todo
```

```Java tab="Android"
// todo
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

#### Set an avatar image

Now, let's take another look at our peer profile and see what happened.

```

```

Indeed, our profile was updated. If we had had any threads, an _announce_ block would have been added, which informs other participants of the change.



Account
- seed, address
- contact
- sync

Contacts
- Search for contacts
- Add a contact
- Delete a contact

Ping
- see if other peer online (util)

Threads
- Create a thread
    - add a message
    - chat
    - any data
    - photo album
    - JSON docs
    - comment
    - like
- Share a thread
- Delete a thread
- List thread blocks
- Files API
- Feed API
- Subscribe to updates

Notifications
- list
- mark as reads
- accept invite via notification

Cafes
- client
    - register
    - list
    - remove
- host
    - link to run
    - create token

Summary
- local node info

Logs
- update levels

Config
- view value
- set value
- must restart

IPFS
- id
- swarm
- cat


## Adding Files

Files are tracked by threads. So, let’s start there.

### Create a new thread

    textile threads add "hello world" --media

This will create and join a thread backed by the built-in media schema. Use the `--help` flag on any sub-command for more options and info.

### Add a file

    textile files add <image path> --caption "beautiful"

The thread schema encodes the image at various width and extracts exif data. The resulting files are added to the thread under one directory. You also add an entire directory.

    textile files add <dir path> --caption "more beauty"

### Browse a thread feed

The command-line client is not really meant to provide a great UX for browsing thread content. However, you can easily paginate the feed with `ls`.

    textile ls --thread <thread ID>

### Comment on a file

    textile comments add "good eye" --block <block ID>

### Like a file

    textile likes add --block <block ID>

## Sharing files / chatting

In order to start sharing or chatting with someone else, you’ll first need an open and shared thread. An `open` threads allows other to read and write, while `shared` means anyone can join via an invite. See `textile threads --help` for much more about threads, access control types, and share settings.

    textile threads add "dog photos" --media --type=open --sharing=shared

There are two types of invites: direct peer-to-peer and external.

- Account-to-account invites are encrypted with the invitee's account address (public key).
- External invites are encrypted with a single-use key and are useful for on-boarding new users.

### Create a direct peer-to-peer thread invite

    textile invites create --thread <thread ID> --peer <peer ID>

The receiving peer will be notified of the invite. They can list all pending direct invites.

    textile invites ls

The result is something like:

    [
        {
            "id": "QmUv8783yptknBHCSSnscWNLZdz5K8uhpHZYaWnPkMxu4i",
            "name": "dog photos",
            "inviter": "fido",
            "date": "2018-12-07T13:02:57-08:00"
        }
    ]

### Accept a direct peer-to-peer invite

    textile invites accept QmUv8783yptknBHCSSnscWNLZdz5K8uhpHZYaWnPkMxu4i

### Create an “external” thread invite

This is done by simply omitting the `--peer` flag with the `invites create` command.

    textile invites create --thread <thread ID>

The result is something like:

    {
        "invite": "QmcDmpmBr6qB5QGvsUaTZZtwpGpevGgiSEa7C3AJE9EZiU",
        "key": "aKrQmYCMiCQvkyjnm4sFhxdZaFH8g9h7EaLxdBGsZCVjsoyMPzQJQUyPrn7G"
    }

Your friend can use the resulting address and key to accept the invite and join the thread.

    textile invites accept QmcDmpmBr6qB5QGvsUaTZZtwpGpevGgiSEa7C3AJE9EZiU --key aKrQmYCMiCQvkyjnm4sFhxdZaFH8g9h7EaLxdBGsZCVjsoyMPzQJQUyPrn7G

At this point, both of you can add and receive files via this thread. You can also exchange text messages (chat).

### Add a text message to a thread

    textile messages add "nice photos" --thread <thread ID>

### Start a chat in a thread

    textile chat --thread <thread ID>

This will start an interactive chat session with other thread peers.

<br>
