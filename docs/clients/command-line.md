The command-line client ships alongside the daemon. If you have not yet installed `textile`, 


## Initialize a new wallet

    textile wallet init

This will generate a mnemonic phrase for accessing/recovering derived accounts. You may specify a word count and password as well (run with `--help` for usage).

## Initialize a peer with an account

Next, use a private account seed from your wallet to initialize a new peer. First time users should just use the first account’s (Account 0) private seed, which is printed out by the `wallet init` sub-command. The private seed begins with “S”. The public address begins with “P”. Use the `accounts` sub-command to access deeper derived wallet accounts.

    textile init -s <account_seed>

## Start the daemon

    textile daemon

You can now use the command-line client to interact with your running peer.

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
