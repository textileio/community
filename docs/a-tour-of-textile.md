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

First off, take a look at your peer profile:

```tab="cmd"
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

- `id`: Your embedded IPFS node's peer ID, which is unique on the network
- `address`: Your wallet account's address (public key), which can be shared with other account peers

Addresses always start with a "P" for "public". Account _seeds_ (private keys) always start with an "S" for "secret", which should help you remember which one to keep secret.

!!! info
    Textile uses an [ed25519](https://ed25519.cr.yp.to/) [HD wallet](https://en.bitcoinwiki.org/wiki/Deterministic_wallet) and IPFS peer IDs because they provide fast key generation, signing, and verification. These properties become important on less powerful devices like phones.

#### Set a display name

You can set a display name for your peer. Interacting with other users is a lot easier with display names. However, they are _not_ unique on the network.

```tab="cmd"
textile profile set name "Clyde"
```

    ok

#### Set an avatar image

Similarly, you can assign your peer a publicly visible avatar image.

```tab="cmd"
textile profile set avatar "path/to/an/image"
```

    ok

Now, your avatar will be tracked internally by the special private _account thread_, keyed with your account seed. This means that when your avatar (or display name) is updated, your other account peers (if you have any) will also pick up the change.

Take another look at your peer profile and see what happened.

```tab="cmd"
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

Huzzah! If we had any threads, these updates would have been announced to them so that other members could pick up the changes.

### Account

Generally speaking, peers can be thought of as ephemeral. You may lose your device and/or need to access your account on a new one.

As mentioned above, all peers have a special private _account_ thread. In addition to avatars, this thread keeps track of your account peers.

#### View account

Take a look at your account.

```tab="cmd"
textile account get
```

```JSON
{
    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "name": "Clyde",
    "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
    "peers": [
        {
            "id": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
            "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
            "name": "Clyde",
            "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
            "created": "2019-04-19T21:44:46.310082Z",
            "updated": "2019-04-20T00:31:34.699845Z"
        }
    ]
}
```

Yep, just one peer so far. This object is actually a [contact](/concepts/contacts). We'll come back to contacts later.

#### View account seed

Of course, your account seed (private key) is not included in the public-facing contact object, but we can access it with the `seed` command.

```tab="cmd"
textile account seed
```

    SXdGtLsF3ULiBDpVZ1MAmNBVdsMSNQGhqtDEuxbn732Wi3XJ

#### Account sync

Periodically, your peer will search the network for other peers backed by the same account (account peers). Technically, it will search for thread _snapshots_ created with your account address. If it finds any, they are decrypted and traversed like normal thread updates, keeping your peers in sync.

!!! hint
    A thread _snapshot_ is an encrypted object containing metadata and a reference to the latest update block, from which all others can be found. A snapshot may be stored at rest on a cafe peer or constructed dynamically for an account peer.

```tab="cmd"
textile account sync
```

    No snapshots were found

Well, that's what we'd expect at this point. You don't have any threads yet. We'll come back to this later in the tour.

### Contacts

As we saw above in the accounts section, your peer has a [contact](/concepts/contacts) for _itself_, much like iOS or other contact systems. A contact displays the name and avatar from its most recently updated peer. A contact is essentially a collection of peers that share the same account.

#### Search for contacts

In addition to your "self" contact, you can search for and add contacts to your local "address book".

!!! info
    Search is handled by a publish-subscribe mechanism, where participants across the entire network stream results directly to the requester. In many cases, the search responders are cafe peers, serving indexes for their clients, but normal account peers can also participate in search.

Try searching for "Andrew".

```tab="cmd"
textile contacts search --name="Andrew"
```

```JSON
{
    "id": "P8FxdgZ1rWxaQ4DrmMBADuYTz4XGpQeThJYxfL2X4WN89hP8",
    "date": "2019-04-12T21:41:28.071460350Z",
    "value": {
        "@type": "/Contact",
        "address": "P8FxdgZ1rWxaQ4DrmMBADuYTz4XGpQeThJYxfL2X4WN89hP8",
        "name": "devandrewwww",
        "avatar": "QmQwmPninpCRdkAhbPwKaf7hAUwkTb2wiwupcgnsMp5yW5",
        "peers": [
            ...
        ]
    }
}
{
    "id": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
    "date": "2019-02-08T02:59:35.082729740Z",
    "value": {
        "@type": "/Contact",
        "address": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
        "name": "andrew knees and toes, knees and toes",
        "avatar": "QmRLnTHdvg4rAh1AKJaHydAZ42sgygLNdvvA7aMwaRY5SK",
        "peers": [
            ...
        ]
    }
}
...
```

With any luck, you should see a bunch of results. You can also search for a single account by its address.

```tab="cmd"
textile contacts search --address="P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG"
```

```JSON
{
    "id": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
    "date": "2019-02-08T02:59:35.082729740Z",
    "value": {
        "@type": "/Contact",
        "address": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
        "name": "andrew knees and toes, knees and toes",
        "avatar": "QmRLnTHdvg4rAh1AKJaHydAZ42sgygLNdvvA7aMwaRY5SK",
        "peers": [
            ...
        ]
    }
}
```

#### Add a contact

We can add contacts by name or address. This will actually perform a search as above, and then present you with a prompt to confirm the addition. When you search by name, there may be more than one result.

Try adding one of the contacts from above by address.

```tab="cmd"
textile contacts add --address="P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG"
```

    Add 1 contact? [y/n]: y
    added P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG

#### View contacts

We can now see the added contact contact in our "address book".

```tab="cmd"
textile contacts ls
```

```JSON
{
    "items": [
        {
            "address": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
            "avatar": "QmRLnTHdvg4rAh1AKJaHydAZ42sgygLNdvvA7aMwaRY5SK",
            "name": "andrew knees and toes, knees and toes",
            "peers": [
                ...
            ]
        }
    ]
}
```

#### Delete a contact

Removing contacts is done by address.

```tab="cmd"
textile contacts rm "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG"
```

    ok

### Ping another peer

Pinging another peer is a useful way to check connectivity. If you want to ping a mobile or desktop peer (a peer without a public IP address), you may need to connect to it first with `textile ipfs connect /p2p-circuit/ipfs/<peerID>`. See [this section](/a-tour-of-textile/#ipfs) for more info about the IPFS sub-commands.

Let's ping one of Textile's federated cafes.

```tab="cmd"
textile ping 12D3KooWLh9Gd4C3knv4XqCyCuaNddfEoSLXgekVJzRyC5vsjv5d
```

    online

Looking good.

### Threads

[Threads](/concepts/threads) are distributed datasets of encrypted messages and files, often shared between peers, and governed by schemas.

Control over thread access and sharing is handled by a combination of the _type_ and _sharing_ settings. An immutable member address "whitelist" gives the initiator fine-grained control. The table below outlines access patterns for the thread initiator and the whitelist members. An empty whitelist is taken to be "everyone", which is the default.

Thread _type_ controls read (R), annotate (A), and write (W) access:

```
private   --> initiator: RAW, whitelist:
read_only --> initiator: RAW, whitelist: R
public    --> initiator: RAW, whitelist: RA
open      --> initiator: RAW, whitelist: RAW
```

Thread _sharing_ style controls if (Y/N) a thread can be shared:

```
not_shared  --> initiator: N, whitelist: N
invite_only --> initiator: Y, whitelist: N
shared      --> initiator: Y, whitelist: Y`
```

Check out the comprehensive [threads overview](/concepts/threads) for more about how threads work.

!!! info
    Access control will be moving to a more familiar, _roll-based_ design in a future release. See [this GitHub issue](https://github.com/textileio/go-textile/issues/694) for more.

#### Create a basic thread

Create a thread and give it the name, "Basic". Note that thread names are _not_ unique.

```tab="cmd"
textile threads add "Basic"
```

```JSON
{
    "block_count": 1,
    "head": "QmV4SQgYk2KcnjxAQwWrgizzyoLFSB1147RkP8xTRAc1LC",
    "head_block": {
        "author": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
        "date": "2019-04-20T20:52:05.955566Z",
        "id": "QmV4SQgYk2KcnjxAQwWrgizzyoLFSB1147RkP8xTRAc1LC",
        "parents": [],
        "thread": "12D3KooWMSvp3cisDyu88Smgub8vMcMYnwsk1KdmtwVbLip9fkGk",
        "type": "JOIN",
        "user": {
            "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
            "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
            "name": "Clyde"
        }
    },
    "id": "12D3KooWMSvp3cisDyu88Smgub8vMcMYnwsk1KdmtwVbLip9fkGk",
    "initiator": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "key": "1K9AdMotTN98hd6LZgOZAzpPBFr",
    "name": "Basic",
    "peer_count": 1,
    "sk": "CAESQL7Vb/FsCblSl9H6HNNG074KtFHLbQnFLDsZGS2N5K/brM5gAU6su7lxIGEN414b9kIa1LOCMubgtCGE8RgRbS0=",
    "state": "LOADED",
    "whitelist": []
}
```

The output shows metadata about the thread you just created, with a reference to the "HEAD" (latest) update block. At this point, this is also the only block, which indicates that your peer joined.

#### Add a text message

Any thread can take a plain old text message. Later, we'll use these with an interactive chat session.

```tab="cmd"
textile messages add "hello?" --thread="12D3KooWMSvp3cisDyu88Smgub8vMcMYnwsk1KdmtwVbLip9fkGk"
```

```JSON
{
    "block": "QmZPWbydtcuZLtbd6cqrLuGSEzSs2C9P1f5nH3Ycu41UfS",
    "body": "hello?",
    "comments": [],
    "date": "2019-04-20T20:55:05.278995Z",
    "likes": [],
    "user": {
        "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
        "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
        "name": "Clyde"
    }
}
```

#### Add some data

A thread can track data if it was created with a schema. The most basic schema is the built-in passthrough, or _blob_ schema:

```JSON
{
  "name": "blob",
  "pin": true,
  "mill": "/blob"
}
```

If you read the [overview doc](/concepts/threads), you'll remember that thread schemas are _DAG_ schemas that contain steps to create each node. "blob" defines a single top-level DAG node without any links. We'll get to more complex schemas later. `pin` instructs the peer to locally pin the entire DAG node when it's created from the input. `mill` defines the function used to process (or "mill") the data on arrival. `/blob` is literally a passthrough, meaning that the data comes out untouched.

We can create a thread with this schema using the `--blob` flag.

```tab="cmd"
textile threads add "Any old data" --blob
```

```JSON
{
    "block_count": 1,
    "head": "QmWC6KDyVm8YFPKBGqKmc14MadCanCtrSbbm8b9r9TUbBe",
    "head_block": {
        "author": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
        "date": "2019-04-20T22:43:59.992726Z",
        "id": "QmWC6KDyVm8YFPKBGqKmc14MadCanCtrSbbm8b9r9TUbBe",
        "parents": [],
        "thread": "12D3KooWSYT6SUL9fx15pwjHSVUsuymnbixmRtPGySmFYtWE51Sc",
        "type": "JOIN",
        "user": {
            "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
            "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
            "name": "Clyde"
        }
    },
    "id": "12D3KooWSYT6SUL9fx15pwjHSVUsuymnbixmRtPGySmFYtWE51Sc",
    "initiator": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "key": "1K9OF0iWtUB6PMDyeqA6QwzZSkD",
    "name": "Any old data",
    "peer_count": 1,
    "schema": "QmQn4hHm42sou9YFWSCAsmHJ7kCAf2cXU9TXQTxS5CLdvL",
    "schema_node": {
        "mill": "/blob",
        "name": "blob",
        "pin": true
    },
    "sk": "CAESQIq0gRpucHb8qUQg/1csjgKydDgDIuLL8FoLl0yJomQ/+IL0U+xOmaTrSnHodPDhNAKYSnU6ZKz52+o0Jqp8CZ0=",
    "state": "LOADED",
    "whitelist": []
}
```

Check out the other built-in schemas [here](/concepts/threads/files#built-in-schemas).

!!! hint
    Any data added to a thread ends up as a [_file_](/concepts/threads/files), regardless of whether or not the source data was an actual file. For example, echoing a string into a thread results in a "file" containing that string.

Let's add some data. Be sure to use your own thread ID.

```tab="cmd"
echo "mmm, bytes..." | textile files add --thread="12D3KooWSYT6SUL9fx15pwjHSVUsuymnbixmRtPGySmFYtWE51Sc"
```

    File target: QmaLsi4cDq449qBfgsNereVezVppAYk8V53b9YvRUUyaY5
    Added 1 file in 613.175326ms

What just happened? The peer created a new DAG node for the input as defined by the schema. Every schema step adds a child node with two links:

- `meta`: A JSON object containing metadata about the input and how it was processed. Some of the values are used for de-duplicating encrypted data. Here's the value of `meta` in the node we just created:

```JSON
{
    "mill": "/blob",
    "checksum": "EPBRa7eDzgoXyvDXqRYuXLkRoZqMizZ4R8QkZyF8n9DP",
    "source": "EPBRa7eDzgoXyvDXqRYuXLkRoZqMizZ4R8QkZyF8n9DP",
    "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
    "hash": "QmTwQWfkR343HHxhdhTX7er6eHnYkgej7GNNsmbS6eZCyQ",
    "key": "QQ3QUdkJ2LCH4ycDjEMHQVHkhnMRiZhkncMCN1i4pbYSXD1heeq2DuNrdm3F",
    "media": "text/plain; charset=utf-8",
    "name": "stdin",
    "size": "14",
    "added": "2019-04-20T22:46:19.976891Z",
    "meta": {}
}
```

- `data`: The output data of the schema step. Again, for our current example, this is just a passthrough (output is input).

![The `target` shown in the output is the root hash of the DAG.](/images/blob.png)

The [_files_](/concepts/threads/files) guide covers these concepts in more detail.

Unless a schema step specifies `"plaintext": true`, the value of `meta` and `data` are both encrypted with the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (AES) using their very own symmetric key. We can view the keys for each node in the DAG using the `keys` command.

```tab="cmd"
textile files keys "QmaLsi4cDq449qBfgsNereVezVppAYk8V53b9YvRUUyaY5"
```

```JSON
{
    "files": {
        "/0/": "QQ3QUdkJ2LCH4ycDjEMHQVHkhnMRiZhkncMCN1i4pbYSXD1heeq2DuNrdm3F"
    }
}
```

The output gives us the key for the node at index `0`. There's only one key because this target node only contains one file.

To add an actual file or directory, just specify a path, e.g, `textile files add "path/to/something" --thread="..."`.

Let's try adding the _same_ data again.

```tab="cmd"
echo "mmm, bytes..." | textile files add --thread="12D3KooWSYT6SUL9fx15pwjHSVUsuymnbixmRtPGySmFYtWE51Sc"
```

    File target: QmaLsi4cDq449qBfgsNereVezVppAYk8V53b9YvRUUyaY5
    Added 1 file in 138.218899ms

Notice that the file target **did not change**. The peer was able to reuse the node from the prior add because it detected the same data being added via the same schema. This means that the input was _not_ duplicated on the peer, even though it was encrypted non-deterministically.

!!! info
    Good encryption is always non-deterministic, which means that re-encrypting the same input will always result in a _different_ output.

#### Make a photo album

Now that you've got the hang of threads, let's make something a little more interesting. [Textile Photos](https://textile.photos) uses threads to track your camera roll and shared photo albums using the built-in _camera roll_ and _media_ schemas.

Let's create an _open_ and _shared_ thread for dog photos with the _media_ schema.

```tab="cmd"
textile threads add "Dogs" --type="open" --sharing="shared" --media
```

```JSON
{
    "block_count": 1,
    "head": "QmR3nzxS5sSv3aasqZZFmAip1okF2YSmwSuzjNcvR7Erus",
    "head_block": {
        "author": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
        "date": "2019-04-22T21:24:27.133890Z",
        "id": "QmR3nzxS5sSv3aasqZZFmAip1okF2YSmwSuzjNcvR7Erus",
        "parents": [],
        "thread": "12D3KooWNihfHDLsiJ36qQRQQ2vMcBZRHd2VBs3wTFtyGEk7zGeq",
        "type": "JOIN",
        "user": {
            "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
            "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
            "name": "Clyde"
        }
    },
    "id": "12D3KooWNihfHDLsiJ36qQRQQ2vMcBZRHd2VBs3wTFtyGEk7zGeq",
    "initiator": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "key": "1KEsojQy4DW9t2rqqhP6len4fA0",
    "name": "Dogs",
    "peer_count": 1,
    "schema": "QmeVa8vUbyjHaYaeki8RZRshsn3JeYGi8QCnLCWXh6euEh",
    "schema_node": {
        "links": {
            "large": {
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "800"
                },
                "use": ":file"
            },
            "small": {
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "320"
                },
                "use": ":file"
            },
            "thumb": {
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "100"
                },
                "pin": true,
                "use": "large"
            }
        },
        "name": "media",
        "pin": true
    },
    "sharing": "SHARED",
    "sk": "CAESQBF0SBWyu8oj6cb+AdmZHE4Bw0W9R3J6XZnjn1241MVLv7R8H9aGb4c8pyn3+p1VwHxJyVxHlp5gMTV105wHLZY=",
    "state": "LOADED",
    "type": "OPEN",
    "whitelist": []
}
```

Notice that the media schema has links for a _large_, _small_, and _thumb_ sized image. This schema does not actually store the raw input data. Take a look at the built-in [camera roll](/threads/files#schemas) schema for an example of how you might do that, as well as extract exif data from an image.

![Photo by William Milliot on Unsplash.](/images/william-milliot-510766-unsplash.jpg)

Try adding the image above to your dogs thread.

```tab="cmd"
textile files add "~/Downloads/william-milliot-510766-unsplash.jpg" --caption="Dog at work." --thread="12D3KooWNihfHDLsiJ36qQRQQ2vMcBZRHd2VBs3wTFtyGEk7zGeq"
```

```
File target: QmT9Rj1wHosh1hL2kjVxm6RWtK3ZTSjb6b69qwdztVTkLR
Added 1 file in 5.978401883s
```

!!! tip
    The `/image/resize` mill can take JPEG, PNG, and GIF images.

Let's a look at the DAG node you just created. There will be three links, as defined by the schema.

![A DAG node created by the media schema.](/images/media.png)

!!! info
    Notice that the media schema shown above only has `"pin": true` for the thumb node. In practice, this actually means that _if_ you were registered with a cafe peer and were auto-syncing your threads, the other nodes (small and large) would be "released" and only the thumb node would remain stored locally. This functionality is similar to other cloud providers that only store low-res versions of your photos on device, but here you can define the behavior with a schema!

By default, when you specify a directory path with the `files add` command, an update block will be added for each file. However, using the `--group` flag, we can create a single DAG "folder" and add it to the thread with a single update block.

![A DAG node created by the media schema using the --group flag.](/images/media_group.png)

#### Track some GeoJSON coordinates

```tab="cmd"
textile threads add "My Run" --schema=""
```

#### Add a comment

```tab="cmd"
textile comments add "Looking good!" --block ""
```

#### Add a "like"

```tab="cmd"
textile likes add --block
```

#### Share a thread

```tab="cmd"
textile invites create 
```

#### Start a chat

```tab="cmd"
textile chat --thread ""
```

#### Leave a thread

```tab="cmd"
textile 
```

#### List blocks

```tab="cmd"
textile 
```

#### List files

```tab="cmd"
textile 
```

#### The Feed API

```tab="cmd"
textile 
```

#### Subscribe to updates

```tab="cmd"
textile 
```

### Notifications

#### List notifications

```tab="cmd"
textile 
```

#### "Read" notifications

```tab="cmd"
textile 
```

### Cafe Hosts

#### Create a client token

```tab="cmd"
textile 
```

#### View client tokens

```tab="cmd"
textile 
```

### Cafe Clients

#### Register with a cafe

```tab="cmd"
textile 
```

#### List cafe sessions

```tab="cmd"
textile 
```

#### Unregister with a cafe

```tab="cmd"
textile 
```

### Summary

```tab="cmd"
textile summary
```

### Logs

#### View current log levels

```tab="cmd"
textile 
```

#### Change log levels

```tab="cmd"
textile 
```

### Config

#### View a config value

```tab="cmd"
textile 
```

#### Set a config value

```tab="cmd"
textile 
```

### IPFS

```tab="cmd"
textile 
```

#### View peer ID

```tab="cmd"
textile 
```

#### View the peer swarm

```tab="cmd"
textile 
```

#### Cat any data on the network

```tab="cmd"
textile 
```

### The Gateway

#### Traverse files
#### Decrypt files

<br>
