This section assumes you have a daemon running locally. If you don't, head over to [running the daemon](/run/daemon) before diving in here.


```Bash tab=
textile threads add "dafvfdv"
```

```JavaScript tab=

```

```Objective-C tab=

```

```Swift tab=

```

```Java tab=

```


Profile
- View your profile
- Set a display name
- Set an avatar image
- View profile again

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







## Build apps

Mobile applications can use one of the SDKs below, which contain the Textile node _and_ a client. Desktop applications should utilize [Textile Desktop](./install), which provides an HTTP REST API for other applications to interact with on `localhost`.

JavaScript/Typescript developers can use the [JS HTTP Client](./textileio/js-http-client). Let us know if you need or would like to help with a client in another language.

### Mobile

Choose your preferred SDK:

* [React Native SDK](./textileio/react-native-sdk)
* [Android SDK](./textileio/android-textile)
* [iOS SDK](./textileio/ios-textile)

### Electron

* [Textile Desktop](./install) + [JS HTTP Client](./textileio/js-http-client)

### Web

* [Textile Desktop](./install) + [JS HTTP Client](./textileio/js-http-client)

We plan to write a full JavaScript implementation of the Textile node, allowing apps to run without a desktop peer. This library will be started in Q3 2019.

### Go

You can use the [Core Library](./textileio/go-textile) to leverage Textile in any Go project.

