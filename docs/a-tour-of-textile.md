![Photo by Andrew Neel on Unsplash](/images/andrew-neel-133200-unsplash.jpg)

Welcome to Textile! This is a great place to start if you're a developer interested in using Textile's decentralized tooling in your mobile, desktop, or web applications. However, anyone interested in learning how to run and interact with a Textile peer will also find this tour useful.

## Concepts

The rest of this document assumes that you are somewhat familiar with the following concepts:

- [Introduction](/concepts/)
- [The wallet](/concepts/the-wallet) and [accounts](/concepts/the-wallet#accounts)
- [Contacts](/concepts/contacts) and [peers](/concepts/contacts#peers)
- [Threads](/concepts/threads) and [blocks](/concepts/threads#blocks)
- [Files](/concepts/threads/files), [schemas](/concepts/threads/files#schemas), and [mills](/concepts/threads/files#mills)
- [Cafes](/concepts/cafes)

## Get started

If you're using the command-line or JavaScript HTTP client, make sure your local [daemon](/install/the-daemon) is running.

!!! Info

    Peer-to-peer (p2p) slang is notoriously confusing. Throughout these docs, we often use the words "peer" and "node". Generally speaking, they are interchangeable. However, a network _node_ refers to the actual connection point that sends and receives data. On a p2p network like IPFS, all nodes are also _peers_. The network is like a "homogeneous solution" of particles (nodes). Mother Nature gets it!

#### Connecting your client

If you are running any of the client libraries (JavaScript, React Native, iOS, or Android), you will need to import and sometimes initialize your Textile session. Initialization is slightly different in each client so be sure to read specific client setup steps for the library you use.

```JavaScript tab="JavaScript"
{{core.setup.js_http_client.code}}
```

```JavaScript tab="React Native"
{{core.setup.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{core.setup.objc.code}}
```

```Swift tab="Swift"
{{core.setup.swift.code}}
```

```Java tab="Android"
{{core.setup.android.code}}
```

### Peer profile

Now, with Textile ready, take a look at your peer profile:

```tab="cmd"
{{profile.get_.cmd.code}}
```

```JavaScript tab="JavaScript"
{{profile.get_.js_http_client.code}}
```

```JavaScript tab="React Native"
{{profile.get_.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{profile.get_.objc.code}}
```

```Swift tab="Swift"
{{profile.get_.swift.code}}
```

```Java tab="Android"
{{profile.get_.android.code}}
```

???+ success

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

!!! hint

    Addresses always start with a "P" for "public". Account _seeds_ (private keys) always start with an "S" for "secret", which should help you remember which one to keep secret.

!!! info

    Textile uses an [ed25519](https://ed25519.cr.yp.to/) [HD wallet](https://en.bitcoinwiki.org/wiki/Deterministic_wallet) and IPFS peer IDs because they provide fast key generation, signing, and verification. These properties become important on less powerful devices like phones.

!!! tip

    If you got a `connection refused` error, be sure that your [textile daemon](/install/the-daemon) is running.

#### Set a display name

You can set a display name for your peer. Interacting with other users is a lot easier with display names. However, they are _not_ unique on the network.

```tab="cmd"
{{profile.set_name.cmd.code}}
```

```JavaScript tab="JavaScript"
{{profile.set_name.js_http_client.code}}
```

```JavaScript tab="React Native"
{{profile.set_name.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{profile.set_name.objc.code}}
```

```Swift tab="Swift"
{{profile.set_name.swift.code}}
```

```Java tab="Android"
{{profile.set_name.android.code}}
```

??? success

    ```
    ok
    ```

#### Set an avatar image

Similarly, you can assign your peer a publicly visible avatar image:

```tab="cmd"
{{profile.set_avatar.cmd.code}}
```

```JavaScript tab="JavaScript"
{{profile.set_avatar.js_http_client.code}}
```

```JavaScript tab="React Native"
{{profile.set_avatar.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{profile.set_avatar.objc.code}}
```

```Swift tab="Swift"
{{profile.set_avatar.swift.code}}
```

```Java tab="Android"
{{profile.set_avatar.android.code}}
```

??? success

    ```
    ok
    ```

Now, your avatar will be tracked internally by the special private [_account thread_](/concepts/threads#account-threads), keyed with your account seed. This means that when your avatar (or display name) is updated, your other account peers (if you have any) will also pick up the change.

Take another look at your peer profile and see what happened:

```tab="cmd"
{{profile.get_.cmd.code}}
```

```JavaScript tab="JavaScript"
{{profile.get_.js_http_client.code}}
```

```JavaScript tab="React Native"
{{profile.get_.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{profile.get_.objc.code}}
```

```Swift tab="Swift"
{{profile.get_.swift.code}}
```

```Java tab="Android"
{{profile.get_.android.code}}
```

???+ success

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

Generally speaking, you can think of peers as ephemeral agents owned by your account. You may lose your device and/or need to access your account on a new one.

As mentioned above, all peers have a special private [_account_ thread](/concepts/threads#account-threads). In addition to avatars, this thread keeps track of your account peers.

#### View account

Take a look at your account:

```tab="cmd"
{{account.get_.cmd.code}}
```

```JavaScript tab="JavaScript"
{{account.get_.js_http_client.code}}
```

```JavaScript tab="React Native"
{{account.get_.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{account.get_.objc.code}}
```

```Swift tab="Swift"
{{account.get_.swift.code}}
```

```Java tab="Android"
{{account.get_.android.code}}
```

???+ success

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

Of course, your account seed (private key) is not included in the public-facing contact object, but we can access it with the `seed` command:

```tab="cmd"
{{account.seed.cmd.code}}
```

```JavaScript tab="JavaScript"
{{account.seed.js_http_client.code}}
```

```JavaScript tab="React Native"
{{account.seed.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{account.seed.objc.code}}
```

```Swift tab="Swift"
{{account.seed.swift.code}}
```

```Java tab="Android"
{{account.seed.android.code}}
```

???+ success

    ```
    SXdGtLsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

#### Account sync

Periodically, your local peer will search the network for other peers that are part of the same account ([account peers](/concepts/#account-peers)). Technically, your local peer will search for thread [_snapshots_](/concepts/threads#snapshots) created by any peer with your account address. If it finds any, the snapshots are decrypted and traversed like normal thread updates, keeping all your peers in sync.

!!! hint

    A thread [_snapshot_](/concepts/threads#snapshots) is an encrypted object containing metadata and a reference to the latest update block, from which all others can be found. A snapshot may be stored at rest on a cafe peer or constructed dynamically for an account peer.

You can also manually run account sync:

```tab="cmd"
{{account.sync.cmd.code}}
```

```JavaScript tab="JavaScript"
{{account.sync.js_http_client.code}}
```

```JavaScript tab="React Native"
{{account.sync.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{account.sync.objc.code}}
```

```Swift tab="Swift"
{{account.sync.swift.code}}
```

```Java tab="Android"
{{account.sync.android.code}}
```

???+ success

    ```
    No snapshots were found
    ```

Well, that's what we'd expect at this point. You don't have any threads yet. We'll come back to this later in the tour.

### Contacts

As we saw above in the accounts section, your peer has a [contact](/concepts/contacts) for _itself_, much like iOS or other contact systems. A contact displays the name and avatar from its most recently updated peer. A contact is essentially a collection of peers that share the same account.

#### Search for contacts

In addition to your "self" contact, you can search for and add contacts to your local "address book".

!!! info

    Search is handled by a publish-subscribe mechanism, where participants across the entire network stream results directly to the requester. In many cases, the search responders are cafe peers, serving indexes for their clients, but normal account peers can also participate in search.

Try searching for "Andrew":

```tab="cmd"
{{contacts.search.cmd.code}}
```

```JavaScript tab="JavaScript"
{{contacts.search.js_http_client.code}}
```

```JavaScript tab="React Native"
{{contacts.search.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{contacts.search.objc.code}}
```

```Swift tab="Swift"
{{contacts.search.swift.code}}
```

```Java tab="Android"
{{contacts.search.android.code}}
```

??? success

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
                /* ... */
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
                /* ... */
            ]
        }
    }
    /* ... */
    ```

With any luck, you should see a bunch of results. You can also search for a single account by its address:

```tab="cmd"
{{contacts.search_address.cmd.code}}
```

```JavaScript tab="JavaScript"
{{contacts.search_address.js_http_client.code}}
```

```JavaScript tab="React Native"
{{contacts.search_address.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{contacts.search_address.objc.code}}
```

```Swift tab="Swift"
{{contacts.search_address.swift.code}}
```

```Java tab="Android"
{{contacts.search_address.android.code}}
```

??? success

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
                /* ... */
            ]
        }
    }
    ```

#### Add a contact

We can add contacts by name or address. This will actually perform a search as above, and then present you with a prompt to confirm the addition. When you search by name, there may be more than one result.

Try adding one of the contacts from above by address:

```tab="cmd"
{{contacts.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{contacts.add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{contacts.add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{contacts.add.objc.code}}
```

```Swift tab="Swift"
{{contacts.add.swift.code}}
```

```Java tab="Android"
{{contacts.add.android.code}}
```

??? success

    ```
    Add 1 contact? [y/n]: y
    added P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG
    ```

#### View contacts

We can now see the added contact contact in our "address book":

```tab="cmd"
{{contacts.ls.cmd.code}}
```

```JavaScript tab="JavaScript"
{{contacts.ls.js_http_client.code}}
```

```JavaScript tab="React Native"
{{contacts.ls.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{contacts.ls.objc.code}}
```

```Swift tab="Swift"
{{contacts.ls.swift.code}}
```

```Java tab="Android"
{{contacts.ls.android.code}}
```

??? success

    ```JSON
    {
        "items": [
            {
                "address": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
                "avatar": "QmRLnTHdvg4rAh1AKJaHydAZ42sgygLNdvvA7aMwaRY5SK",
                "name": "andrew knees and toes, knees and toes",
                "peers": [
                    /* ... */
                ]
            }
        ]
    }
    ```

#### Delete a contact

Removing contacts is done by address:

```tab="cmd"
{{contacts.rm.cmd.code}}
```

```JavaScript tab="JavaScript"
{{contacts.rm.js_http_client.code}}
```

```JavaScript tab="React Native"
{{contacts.rm.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{contacts.rm.objc.code}}
```

```Swift tab="Swift"
{{contacts.rm.swift.code}}
```

```Java tab="Android"
{{contacts.rm.android.code}}
```

??? success

    ```
    ok
    ```

### Ping another peer

Pinging another peer is a useful way to check connectivity. If you want to ping a mobile or desktop peer (a peer without a public IP address), you may need to connect to it first with `textile ipfs connect /p2p-circuit/ipfs/<peerID>`. See [this section](/a-tour-of-textile/#ipfs) for more info about the IPFS sub-commands.

Let's ping one of Textile's federated cafes:

```tab="cmd"
{{core.ping.cmd.code}}
```

```JavaScript tab="JavaScript"
{{core.ping.js_http_client.code}}
```

```JavaScript tab="React Native"
{{core.ping.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{core.ping.objc.code}}
```

```Swift tab="Swift"
{{core.ping.swift.code}}
```

```Java tab="Android"
{{core.ping.android.code}}
```

??? success

    ```
    online
    ```

Looking good.

### Threads

[Threads](/concepts/threads) are distributed datasets of encrypted messages and files, often shared between peers, and governed by schemas.

The rules for thread access and sharing are controlled by a combination of the _type_ and _sharing_ settings. An immutable member address "whitelist" gives the initiator fine-grained control. The table below outlines access patterns for the thread initiator and the whitelist members. An empty whitelist is taken to be "everyone", which is the default.

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

    Access control will be moving to a more familiar, _role-based_ design in a future release. See [this GitHub issue](https://github.com/textileio/go-textile/issues/694) for more.

#### Create a basic thread

Create a thread and give it the name, "Basic". Note that thread names are _not_ unique.

```tab="cmd"
{{threads.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{threads.add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{threads.add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{threads.add.objc.code}}
```

```Swift tab="Swift"
{{threads.add.swift.code}}
```

```Java tab="Android"
{{threads.add.android.code}}
```

??? success

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
        "sk": "CAESQL7...",
        "state": "LOADED",
        "whitelist": []
    }
    ```

The output shows metadata about the thread you just created, with a reference to the "HEAD" (latest) update block. At this point, this is also the only block, which indicates that your peer joined.

#### Add a text message

Any thread can take a plain old text message. Later, we'll use these with an interactive chat session. **Be sure to replace the thread parameter with the ID of the thread you generated in the last step.**

```tab="cmd"
{{messages.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{messages.add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{messages.add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{messages.add.objc.code}}
```

```Swift tab="Swift"
{{messages.add.swift.code}}
```

```Java tab="Android"
{{messages.add.android.code}}
```

??? success

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

If you read the [overview doc](/concepts/threads), you'll remember that thread schemas are _DAG_ schemas that contain steps to create each node. "blob" defines a single top-level DAG node without any links. We'll get to more complex schemas later. `pin` instructs the peer to locally pin the entire DAG node when it's created from the input. `mill` defines the function used to process (or "mill") the data on arrival. `/blob` is a passthrough, meaning that the data comes out untouched.

We can create a thread with this schema using the `--blob` flag:

```tab="cmd"
{{threads.blob_add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{threads.blob_add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{threads.blob_add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{threads.blob_add.objc.code}}
```

```Swift tab="Swift"
{{threads.blob_add.swift.code}}
```

```Java tab="Android"
{{threads.blob_add.android.code}}
```

??? success

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
        "sk": "CAESQIq...",
        "state": "LOADED",
        "whitelist": []
    }
    ```

Check out the other built-in schemas [here](/concepts/threads/files#built-in-schemas).

!!! hint

    Any data added to a thread ends up as a [_file_](/concepts/threads/files), regardless of whether or not the source data was an actual file. For example, echoing a string into a thread results in a "file" containing that string.

Let's add some data. Be sure to use your own thread ID.

```tab="cmd"
{{files.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{files.add.js_http_client.node.code}}
```

```JavaScript tab="React Native"
{{files.add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{files.add.objc.code}}
```

```Swift tab="Swift"
{{files.add.swift.code}}
```

```Java tab="Android"
{{files.add.android.code}}
```

???+ success

    ``` json
    {
        "block": "<block-id>",
        "data": "<data-cid>",
        "date": "2019-06-11T06:44:05.535163Z",
        "user": {
            "address": "<peer-address>",
            "name": "<peer-name>",
            "avatar": "<peer-avatar>"
        },
        "files": [
            {
                "file": {
                    "mill": "/blob",
                    "checksum": "xxx",
                    "source": "<source-ipfs-hash>",
                    "opts": "xxx",
                    "hash": "<result-ipfs-hash>",
                    "key": "<encryption-key-for-result>",
                    "media": "text/plain; charset=utf-8",
                    "name": "stdin",
                    "size": "14",
                    "added": "2019-06-06T02:13:00.620280Z",
                    "meta": {
                        },
                    "targets": [
                        "<block-target>"
                    ]
                }
            }
        ],
        "comments": [
        ],
        "likes": [
        ],
        "threads": [
            "<thread-id>"
        ]
    }
    ```

What just happened? The peer created a new DAG node (a textile block) for the input as defined by the schema. Every schema step adds a child node with two links:

![The `target` shown in the output is the root hash of the DAG.](/images/blob.png){: .center}

- `meta`: A JSON object containing metadata about the input and how it was processed. Which is the success output of the previous command.

- `content`: The content of the file that was added, in the above command output, this is at `.files[0].hash`, and can be fetched via `textile file get <hash> --content`, or via `textile file block get <block-id> --content`.

The [_files_](/concepts/threads/files) guide covers these concepts in more detail.

Unless a schema step specifies `"plaintext": true`, the value of `meta` and `content` are both encrypted with the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (AES) using their very own symmetric key. We can view the keys for each node in the DAG using the `keys` command:

```tab="cmd"
{{files.keys_.cmd.code}}
```

```JavaScript tab="JavaScript"
{{files.keys_.js_http_client.code}}
```

```JavaScript tab="React Native"
{{files.keys_.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{files.keys_.objc.code}}
```

```Swift tab="Swift"
{{files.keys_.swift.code}}
```

```Java tab="Android"
{{files.keys_.android.code}}
```

???+ success

    ```JSON
    {
        "files": {
            "/0/": "QQ3QUdkJ2LCH4ycDjEMHQVHkhnMRiZhkncMCN1i4pbYSXD1heeq2DuNrdm3F"
        }
    }
    ```

The output gives us the key for the node at index `0`. There's only one key because this target node only contains one file.

To add an actual file or directory, just specify a path, e.g, `textile files add <thread> "path/to/something"`.

Let's try adding the _same_ data again:

```tab="cmd"
{{files.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{files.add.js_http_client.node.code}}
```

```JavaScript tab="React Native"
{{files.add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{files.add.objc.code}}
```

```Swift tab="Swift"
{{files.add.swift.code}}
```

```Java tab="Android"
{{files.add.android.code}}
```

??? success

    ``` json
    {
        "block": "<block-id>",
        "target": "<block-target>",
        "date": "2019-06-11T06:44:05.535163Z",
        "user": {
            "address": "<peer-address>",
            "name": "<peer-name>",
            "avatar": "<peer-avatar>"
        },
        "files": [
            {
                "file": {
                    "mill": "/blob",
                    "checksum": "xxx",
                    "source": "<source-ipfs-hash>",
                    "opts": "xxx",
                    "hash": "<result-ipfs-hash>",
                    "key": "<encryption-key-for-result>",
                    "media": "text/plain; charset=utf-8",
                    "name": "stdin",
                    "size": "14",
                    "added": "2019-06-06T02:13:00.620280Z",
                    "meta": {
                        },
                    "targets": [
                        "<block-target>"
                    ]
                }
            }
        ],
        "comments": [
        ],
        "likes": [
        ],
        "threads": [
            "<thread-id>"
        ]
    }
    ```

Notice that the file target **did not change**. The peer was able to reuse the node from the prior addition because it detected that the same data was added via the same schema. This means that the input was _not_ duplicated on the peer, even though it was encrypted non-deterministically.

!!! info

    Good encryption is always non-deterministic, which means that re-encrypting the same input will always result in a _different_ output.

#### Make a photo album

Now that you've got the hang of threads let's make something a little more interesting. [Textile Photos](https://textile.photos) uses threads to track your camera roll and shared photo albums using the built-in _camera roll_ and _media_ schemas.

Let's create an _open_ and _shared_ thread for dog photos with the _media_ schema:

```tab="cmd"
{{threads.add_open_shared.cmd.code}}
```

```JavaScript tab="JavaScript"
{{threads.add_open_shared.js_http_client.code}}
```

```JavaScript tab="React Native"
{{threads.add_open_shared.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{threads.add_open_shared.objc.code}}
```

```Swift tab="Swift"
{{threads.add_open_shared.swift.code}}
```

```Java tab="Android"
{{threads.add_open_shared.android.code}}
```

??? success

    ``` json
    {
        "block_count": 1,
        "id": "<thread-id>",
        "initiator": "<peer-id>",
        "key": "xxx",
        "name": "Dogs",
        "peer_count": 1,
        "schema": "<schema-ipfs-hash>",
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
        "sk": "xxx",
        "state": "LOADED",
        "type": "OPEN",
        "whitelist": []
    }
    ```

Notice that the media schema has links for a _large_, _small_, and _thumb_ sized image. This schema does not store the raw input data. Take a look at the built-in [camera roll](/threads/files#schemas) schema for an example of how you might do that, as well as extract exif data from an image.

![Photo by William Milliot on Unsplash.](/images/william-milliot-510766-unsplash.jpg){: .center}

Try adding the image above to your dogs thread:

```tab="cmd"
{{files.add_media.cmd.code}}
```

```JavaScript tab="JavaScript"
{{files.add_media.js_http_client.code}}
```

```JavaScript tab="React Native"
{{files.add_media.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{files.add_media.objc.code}}
```

```Swift tab="Swift"
{{files.add_media.swift.code}}
```

```Java tab="Android"
{{files.add_media.android.code}}
```

??? success

    ``` json
    {
        "block": "<block-id>",
        "target": "<block-target>",
        "date": "2019-06-12T12:48:50.548068Z",
        "user": {
          "address": "<peer-id>",
          "name": "<peer-name>",
          "avatar": "<peer-avatar>"
        },
        "caption": "Dog at work.",
        "files": [
          {
            "links": {
                "large": {
                  "mill": "/image/resize",
                  "checksum": "xxx",
                  "source": "<source-ipfs-hash>",
                  "opts": "xxx",
                  "hash": "<result-ipfs-hash>",
                  "key": "<encryption-key-for-result>",
                  "media": "image/jpeg",
                  "name": "william-milliot-510766-unsplash.jpg",
                  "size": "106235",
                  "added": "2019-06-12T12:48:49.990597Z",
                  "meta": {
                    "height": 534,
                    "width": 800
                  },
                  "targets": [
                    "<block-target>"
                  ]
                },
                "small": {
                  "mill": "/image/resize",
                  "checksum": "xxx",
                  "source": "<source-ipfs-hash>",
                  "opts": "xxx",
                  "hash": "<result-ipfs-hash>",
                  "key": "<encryption-key-for-result>",
                  "media": "image/jpeg",
                  "name": "william-milliot-510766-unsplash.jpg",
                  "size": "23789",
                  "added": "2019-06-12T12:48:47.950855Z",
                  "meta": {
                    "height": 214,
                    "width": 320
                  },
                  "targets": [
                    "<block-target>"
                  ]
                },
                "thumb": {
                  "mill": "/image/resize",
                  "checksum": "xxx",
                  "source": "<source-ipfs-hash>",
                  "opts": "xxx",
                  "hash": "<result-ipfs-hash>",
                  "key": "<encryption-key-for-result>",
                  "media": "image/jpeg",
                  "size": "3723",
                  "added": "2019-06-12T12:48:50.093557Z",
                  "meta": {
                    "height": 67,
                    "width": 100
                  },
                  "targets": [
                    "<block-target>"
                  ]
                }
            }
          }
        ],
        "comments": [
        ],
        "likes": [
        ],
        "threads": [
            "<thread-id>"
        ]
    }
    ```

The above image is fairly large (~3.5 MB). So, your peer took some time to encode all of the requested sizes.

!!! tip

    The `/image/resize` mill can take JPEG, PNG, and GIF images.

Let's a look at the DAG node you just created. There will be three links, as defined by the schema:

![A DAG node created by the media schema.](/images/media.png){: .center}

!!! info

    Notice that the media schema shown above only has `"pin": true` for the thumb node. In practice, this  means that _if_ you were registered with a cafe peer and were auto-syncing your threads, the other nodes (small and large) would be "released" and only the thumb node would remain stored locally. This functionality is similar to other cloud providers that only store low-res versions of your photos on device, but here you can define the behavior with a schema!

By default, when you specify a directory path with the `files add` command, an update block will be added for each file. However, using the `--group` flag, we can create a single DAG "folder" and add it to the thread with a single update block.

![A DAG node created by the media schema using the --group flag.](/images/media_group.png){: .center}

#### Track some GeoJSON coordinates

Let's go through one more thread use case that demonstrates how to create a custom DAG schema. Additionally, we'll make use of a [JSON schema](https://json-schema.org) for tracking JSON documents.

Make a file named `location.json` with the following JSON document:

```JSON
{
    "name": "location",
    "mill": "/json",
    "json_schema": {
        "$id": "https://example.com/geographical-location.schema.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Longitude and Latitude Values",
        "description": "A geographical coordinate.",
        "required": [ "latitude", "longitude" ],
        "type": "object",
        "properties": {
            "latitude": {
                "type": "number",
                "minimum": -90,
                "maximum": 90
            },
            "longitude": {
                "type": "number",
                "minimum": -180,
                "maximum": 180
            }
        }
    }
}
```

Add a new thread to track your hypothetical runs:

```tab="cmd"
{{examples.my_runs.add_thread.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.add_thread.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.add_thread.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.add_thread.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.add_thread.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.add_thread.android.code}}
```

??? success

    ```JSON
    {
        "block_count": 1,
        "id": "12D3KooWSfWsCbnC44CWfPSVw1VRJFSjJX567Yw269qqdhHq5CoY",
        "initiator": "P9fbrHrPyQdtVJkG8MANiyF6W2ctCnyiB6sxA8tbT8zwPZ63",
        "key": "1MY2NZFWM6kxKzvZGwbSRQPFmpc",
        "name": "My runs",
        "peer_count": 1,
        "schema": "QmeCxmcfiBANhLntPm5ceS6ragTnW4QjXEPednNa7R6o8p",
        "schema_node": {
            "json_schema": {
                "$id": "https://example.com/geographical-location.schema.json",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "description": "A geographical coordinate.",
                "properties": {
                "latitude": {
                    "maximum": 90,
                    "minimum": -90,
                    "type": "number"
                },
                "longitude": {
                    "maximum": 180,
                    "minimum": -180,
                    "type": "number"
                }
                },
                "required": [
                    "latitude",
                    "longitude"
                ],
                "title": "Longitude and Latitude Values",
                "type": "object"
            },
            "mill": "/json",
            "name": "location"
        },
        "sharing": "INVITE_ONLY",
        "sk": "CAESQBRiIC0dQOC3UgCqHlzO39OaxIib1IxP/BL97Dxs1T+w+lJI59SDqYtjLJthNW8Bro+KCwNthNqdqUz/fPBEzLc=",
        "state": "LOADED",
        "type": "PUBLIC",
        "whitelist": []
    }
    ```

Next, add some locations to your thread:

```tab="cmd"
{{examples.my_runs.add_location_data.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.add_location_data.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.add_location_data.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.add_location_data.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.add_location_data.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.add_location_data.android.code}}
```

??? success

    ``` json
    {
        "block": "QmTw4ZRigDgdpVcXHWfCC78Mk8jVUQHpRXcwVEVLUHPYtZ",
        "target": "QmX5KGvJyYDKr9xhuTYRY92LWv4U1xNkrPmSYJVycwk9Dd",
        "date": "2019-06-12T13:48:43.319450Z",
        "user": {
            "address": "P9fbrHrPyQdtVJkG8MANiyF6W2ctCnyiB6sxA8tbT8zwPZ63",
            "name": "Clyde",
            "avatar": "QmRoJsuGN1UyDT5jHWvBXYDHubMszmVwAsFZmkYiQbeKrM"
        },
        "files": [
            {
                "file": {
                "mill": "/json",
                "checksum": "HoRmDDKwsQko2CWnrCoYHCw1rUaaPH3vW4EMcFMwtw3S",
                "source": "8XK5TuJcXmSQRGt1kfSoWXJtNhybpBLQsm4arMH9MpoQ",
                "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
                "hash": "QmWYcjZu28GR8p2gnwwUN5UcKAJgJEs1uvMqfwgM67hiKd",
                "key": "pqrhTw495h5hrvBPrMxBvwDyamJEgEjYK5P99TJj3D3J9STBGCs5h1mM5xZo",
                "media": "application/json",
                "size": "43",
                "added": "2019-06-12T13:48:43.109920Z",
                "meta": {},
                "targets": ["QmX5KGvJyYDKr9xhuTYRY92LWv4U1xNkrPmSYJVycwk9Dd"]
                }
            }
        ],
        "comments": [],
        "likes": [],
        "threads": ["12D3KooWSfWsCbnC44CWfPSVw1VRJFSjJX567Yw269qqdhHq5CoY"]
    }
    ```

!!! info

    On Windows, exclude the wrapping single quotes (`'`) on JSON objects when adding to a thread with the command-line client.

Your peer will validate the input against the thread's schema. The input will _also_ be validated against its embedded JSON schema (schemas within schemas!). Try adding a location with latitude great than 90, which is invalid:

```tab="cmd"
{{examples.my_runs.add_location_data_fail.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.add_location_data_fail.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.add_location_data_fail.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.add_location_data_fail.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.add_location_data_fail.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.add_location_data_fail.android.code}}
```

???+ fail

    ```
    - latitude: Must be less than or equal to 90/1
    ```

#### Share a thread

Let's share this thread with another user. It was created with type, "public", meaning that other members will be able to read your updates, but not add new locations. Threads with an "open" type are writable by all members.

!!! info

    "Writes" refer to messages and files, whereas "annotations" refer to comments and likes.

For this tour, let's start another peer from a different wallet account. Below is a handy way to [initialize an account peer](/install/the-daemon/#initialize-an-account-peer) for testing. If you are using any of the client libraries for the tour, use the CMD example from your terminal to run your second peer.

```tab="cmd"
{{core.init.cmd.code}}
```

??? success

    ```
    Initialized account with address P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs
    ```

!!! hint

    We used non-default ports so that this peer won't collide with the first one.

Start the daemon in a new terminal:

```tab="cmd"
{{core.daemon.cmd.code}}
```

??? success

    ```
    23 Apr 19 14:02 PDT  P7X3gZu added JOIN update to Y6xBsPwB
    go-textile version: v0.1.12
    Repo version: 13
    Repo path: /tmp/buddy
    API address: 127.0.0.1:41600
    Gateway address: 127.0.0.1:5150
    System version: amd64/darwin
    Golang version: go1.12.3
    PeerID:  12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV
    Account: P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs
    ```

Now that you have two peers running, invite the new account to your "My runs" thread:

```tab="cmd"
{{examples.my_runs.invite.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.invite.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.invite.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.invite.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.invite.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.invite.android.code}}
```

???+ success

    ```
    Could not find contact locally, searching network...
    {
        "id": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
        "date": "2019-04-23T20:56:05.858784Z",
        "value": {
            "@type": "/Contact",
            "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
            "peers": [
                {
                    "id": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
                    "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                    "created": "2019-04-23T20:56:05.858784Z",
                    "updated": "2019-04-23T20:56:05.858784Z"
                }
            ]
        }
    }
    Add and invite P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs? [y/n]: y
    added P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs
    ok
    ```

!!! Note

    You may have to make a couple attempts to send the invite because your second peer is probably not yet very well connected to the network.

This new account is not an existing contact. So, your peer will ask the network for its contact info. You can confirm that, yes, you'd like to add this account to your local contacts and send it an invite to your thread.

!!! hint

    You just created an "account-to-account" invite, which is useful between existing account. "External" invites are useful when you want to invite a friend over another channel like SMS. See `textile invites create --help` for more.

Next, we'll pretend that we are the second account and accept the invite. You should see a [notification](/a-tour-of-textile/#notifications) that you were invited to a thread in the daemon output.

```
23 Apr 19 14:08 PDT  Clyde invited you to join QE5m1qw
```

Before you accept, list your pending invites and grab the invite's ID:

```tab="cmd"
{{examples.my_runs.ls_invites.cmd.code}}
```

???+ success

    ```JSON
    {
        "items": [
            {
                "date": "2019-04-23T21:08:29.285920Z",
                "id": "QmXcJmyX2vbeJTcZSkoZCHc74yycjJcXbxCHkLknJhyPaL",
                "inviter": {
                    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                    "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
                    "name": "Clyde"
                },
                "name": "My runs"
            }
        ]
    }
    ```

As expected, it looks like Clyde invited us to "My runs". Notice that we had to supply the `--api` flag to tell the command-line client to list invites from the non-default peer API.

!!! tip

    You can avoid the need to use the `--api` when interacting with non-default peer APIs by exporting an environment variable, e.g., `export API="http://127.0.0.1:41600"`.

You _could_ ignore the invite with `textile invites ignore`. However, we like Clyde and want to support his running efforts!

```tab="cmd"
{{examples.my_runs.accept.cmd.code}}
```

??? success

    ```
    {
        "author": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
        "date": "2019-04-23T21:32:22.486183Z",
        "id": "QmVoKpKsg5MkW11bK3LVmd3xMMaxTutVime32sV6EZWeLk",
        "parents": [
            "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84"
        ],
        "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
        "type": "JOIN",
        "user": {
            "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
            "name": "P7X3gZu"
        }
    }
    ```

The output shows your "join" update in the thread. Take a look at your second peer's daemon output:

```
23 Apr 19 14:32 PDT  P7X3gZu added ANNOUNCE update to Y6xBsPwB
23 Apr 19 13:08 PDT  Clyde added FILES update to QQE5m1qw
23 Apr 19 12:29 PDT  Clyde added JOIN update to QQE5m1qw
23 Apr 19 14:32 PDT  P7X3gZu added JOIN update to QQE5m1qw
```

After accepting the invite, your peer downloaded the older thread updates, picking up the initiator's files (in this case, location coordinates). Clyde's new updates will also be picked up by your second peer.

#### List blocks

Take a closer look at the "My runs" thread using the `blocks ls` command, which lists updates blocks known to your peer:

```tab="cmd"
{{examples.my_runs.blocks_ls.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.blocks_ls.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.blocks_ls.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.blocks_ls.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.blocks_ls.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.blocks_ls.android.code}}
```

??? success

    ```JSON
    {
        "items": [
            {
                "id": "QmVoKpKsg5MkW11bK3LVmd3xMMaxTutVime32sV6EZWeLk",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "author": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
                "type": "JOIN",
                "date": "2019-04-23T21:32:22.486183Z",
                "parents": [
                    "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84"
                ],
                "user": {
                    "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                    "name": "P7X3gZu"
                }
            },
            {
                "id": "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "author": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
                "type": "FILES",
                "date": "2019-04-23T20:08:51.686544Z",
                "parents": [
                    "QmV8HiBrgJvGx4mwVF8G8MDpyaiUcUX9YC52AjAjw3HHuV"
                ],
                "target": "QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk",
                "user": {
                    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                    "name": "Clyde",
                    "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
                }
            },
            {
                "id": "QmV8HiBrgJvGx4mwVF8G8MDpyaiUcUX9YC52AjAjw3HHuV",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "author": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
                "type": "JOIN",
                "date": "2019-04-23T19:29:57.858974Z",
                "parents": [
                ],
                "user": {
                    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                    "name": "Clyde",
                    "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
                }
            }
        ]
    }
    ```

The output should be the exact same on both your peers.

#### Add a comment

Using the output from `blocks ls`, add a comment to the one and only `FILES` update in the "My runs" thread:

```tab="cmd"
{{examples.my_runs.comment_add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.comment_add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.comment_add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.comment_add.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.comment_add.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.comment_add.android.code}}
```

??? success

    ```JSON
    {
        "body": "Is this an outlier?",
        "date": "2019-04-23T22:21:04.253734Z",
        "id": "QmNx9j82vWLF6tEeMYWdFMBDJo89yBbMmScseJR4jVtML3",
        "user": {
            "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
            "name": "P7X3gZu"
        }
    }
    ```

!!! tip

    If you don't set a display name for your peer, it will fallback to the first bit of your account address.

Remember, this is a "public" type thread, meaning that all members can annotate (comment / like).

#### Add a "like"

Likes are added in a similar fashion:

```tab="cmd"
{{examples.my_runs.like_add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.like_add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.like_add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.like_add.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.like_add.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.like_add.android.code}}
```

??? success

    ```JSON
    {
        "date": "2019-04-23T22:25:06.850779Z",
        "id": "QmW5BY11hTLJJpZ6eSPnTpGPLRAcXzmBEPpeU4foq8BcNh",
        "user": {
            "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
            "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
            "name": "Clyde"
        }
    }
    ```

Whoa, Clyde liked that you joined his thread. What a guy!

#### Start a chat

We've already covered how to add plain text messages to a thread. Combined with a schema, you can build a media-rich chat interface. In fact, this is exactly what [Textile Photos](https://textile.photos) does with its "groups".

![A Textile Photos group](/images/photos_chat.png){: .center}

Create a new thread for chatting with your friend `P7X3gZu`:

```tab="cmd"
{{examples.start_a_chat.add_thread.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.start_a_chat.add_thread.js_http_client.code}}
```

```TypeScript tab="React Native"
{{examples.start_a_chat.add_thread.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.start_a_chat.add_thread.objc.code}}
```

```Swift tab="Swift"
{{examples.start_a_chat.add_thread.swift.code}}
```

```Java tab="Android"
{{examples.start_a_chat.add_thread.android.code}}
```

??? success

    ```JSON
    {
        "block_count": 1,
        "head": "QmVPzdEQrcXJKMnCpvuUcTk8sz9LTVFuY4dB9HXX2B5jtg",
        "head_block": {
            "author": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
            "date": "2019-04-23T23:21:52.483721Z",
            "id": "QmVPzdEQrcXJKMnCpvuUcTk8sz9LTVFuY4dB9HXX2B5jtg",
            "parents": [],
            "thread": "12D3KooWExn4ut4RV2qHXFSiWb3AfhL2whB8vJgYpnDcmVCG7UBv",
            "type": "JOIN",
            "user": {
                "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
                "name": "Clyde"
            }
        },
        "id": "12D3KooWExn4ut4RV2qHXFSiWb3AfhL2whB8vJgYpnDcmVCG7UBv",
        "initiator": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
        "key": "1KHwDgdRK6qV9pvIEBwNY8ZFyVf",
        "name": "Chat",
        "peer_count": 1,
        "sharing": "SHARED",
        "sk": "CAESQNK...",
        "state": "LOADED",
        "type": "OPEN",
        "whitelist": [
            "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs"
        ]
    }
    ```

The whitelist ensures the chat remains between the two of us. As before, we need to create an invite and accept it. However, let's try an "external" invite:

```tab="cmd"
{{examples.start_a_chat.invite_create.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.start_a_chat.invite_create.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.start_a_chat.invite_create.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.start_a_chat.invite_create.objc.code}}
```

```Swift tab="Swift"
{{examples.start_a_chat.invite_create.swift.code}}
```

```Java tab="Android"
{{examples.start_a_chat.invite_create.android.code}}
```

???+ success

    ```JSON
    {
        "id": "QmYzhyFhRGX3GBgsLMKoGrQqMWwPFKyPtsGmGbvma63zCf",
        "inviter": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
        "key": "cCBPKRN6723KkroCfMsLVHj3cbVkwpg47s5wdjyEPxXz6rRoo6mjBZqiizd"
    }
    ```

The only difference this time was that we didn't specify `--address`. Instead of getting sent directly to another peer, the invite was encrypted with the key shown in the output and persisted to IPFS. Now, you're free to send it around however you choose. In order to accept, the recipient has to specify the `id` and `key`:

```tab="cmd"
{{examples.start_a_chat.accept_invite.cmd.code}}
```

??? success

    ```JSON
    {
        "author": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
        "date": "2019-04-24T00:03:09.432176Z",
        "id": "QmRBZmo9uxVfy1cfBkpRP5SqMGTdXyPwAYpMtBFUJtXjdD",
        "parents": [
            "QmVPzdEQrcXJKMnCpvuUcTk8sz9LTVFuY4dB9HXX2B5jtg"
        ],
        "thread": "12D3KooWExn4ut4RV2qHXFSiWb3AfhL2whB8vJgYpnDcmVCG7UBv",
        "type": "JOIN",
        "user": {
            "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
            "name": "P7X3gZu"
        }
    }
    ```

Of course, passing all these hashes and keys around is a lot easier with a well designed UI.

The command-line client has a `chat` command that enters an interactive thread session in which participants can add and view messages. Start a chat on your first peer:

```tab="cmd"
{{examples.start_a_chat.join_chat.cmd.code}}
```

Then start the same chat on your second peer:

```tab="cmd"
{{examples.start_a_chat.join_chat_peer.cmd.code}}
```

!!! tip

    Currently, the `chat` command doesn't work with Git Bash on Windows. To open an interactive thread session, run the aforementioned commands in the system shell (`cmd`) or Powershell instead.

![Clyde having a chat with a friend](/images/chat.png){: .center}

Chat away!

#### The files API

Applications will often want to paginate files and associated annotations in a thread. The files API lists update blocks that point to DAG nodes containing files. A JSON representation of the (decrypted) DAG node is attached to the response along with nested comments and likes.

Try listing the files in your "My runs" thread:

```tab="cmd"
{{examples.my_runs.files_ls.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.files_ls.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.files_ls.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.files_ls.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.files_ls.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.files_ls.android.code}}
```

??? success

    ``` json
    {
        "items": [{
            "block": "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84",
            "target": "QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk",
            "date": "2019-04-23T20:08:51.686544Z",
            "user": {
                "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                "name": "Clyde",
                "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
            },
            "files": [{
                "file": {
                    "mill": "/json",
                    "checksum": "HoRmDDKwsQko2CWnrCoYHCw1rUaaPH3vW4EMcFMwtw3S",
                    "source": "8XK5TuJcXmSQRGt1kfSoWXJtNhybpBLQsm4arMH9MpoQ",
                    "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
                    "hash": "QmQHYPJDQAU8ZaGG8e4iW9bj65mr2T1cwygyfWb6AUaNio",
                    "key": "AYCbcQf4YDBHr4NE2SnBgZYPfTD5riZgerujv3xFZgZ4RhDP3yZjcMnHSqXp",
                    "media": "application/json",
                    "size": "43",
                    "added": "2019-04-23T20:08:51.294649Z",
                    "meta": {},
                    "targets": ["QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk"]
                }
            }],
            "comments": [{
                "id": "QmNx9j82vWLF6tEeMYWdFMBDJo89yBbMmScseJR4jVtML3",
                "date": "2019-04-23T22:21:04.253734Z",
                "user": {
                    "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                    "name": "P7X3gZu"
                },
                "body": "Is this an outlier?"
            }],
            "likes": [],
            "threads": ["12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw"]
        }]
    }
    ```

You can also list files across all threads by omitting the `--thread` flag.

#### The feed API

The feed API provides a few different modes to drive feed-based UIs. Take a look at the usage text from the command-line client:

``` bash
textile feed --help
```

Give the default `chrono` (for chronological) mode a try:

```tab="cmd"
{{examples.my_runs.feed.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.feed.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.feed.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.feed.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.feed.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.feed.android.code}}
```

??? success

    ```JSON
    {
        "items": [
            {
                "block": "QmW5BY11hTLJJpZ6eSPnTpGPLRAcXzmBEPpeU4foq8BcNh",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "payload": {
                    "@type": "/Like",
                    "id": "QmW5BY11hTLJJpZ6eSPnTpGPLRAcXzmBEPpeU4foq8BcNh",
                    "date": "2019-04-23T22:25:06.850779Z",
                    "user": {
                        "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                        "name": "Clyde",
                        "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
                    },
                    "target": {
                        "block": "QmVoKpKsg5MkW11bK3LVmd3xMMaxTutVime32sV6EZWeLk",
                        "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                        "payload": {
                            "@type": "/Join",
                            "block": "QmVoKpKsg5MkW11bK3LVmd3xMMaxTutVime32sV6EZWeLk",
                            "date": "2019-04-23T21:32:22.486183Z",
                            "user": {
                                "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                                "name": "P7X3gZu"
                            }
                        }
                    }
                }
            },
            {
                "block": "QmNx9j82vWLF6tEeMYWdFMBDJo89yBbMmScseJR4jVtML3",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "payload": {
                    "@type": "/Comment",
                    "id": "QmNx9j82vWLF6tEeMYWdFMBDJo89yBbMmScseJR4jVtML3",
                    "date": "2019-04-23T22:21:04.253734Z",
                    "user": {
                        "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                        "name": "P7X3gZu"
                    },
                    "body": "Is this an outlier?",
                    "target": {
                        "block": "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84",
                        "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                        "payload": {
                            "@type": "/Files",
                            "block": "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84",
                            "target": "QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk",
                            "date": "2019-04-23T20:08:51.686544Z",
                            "user": {
                                "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                                "name": "Clyde",
                                "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
                            },
                            "files": [
                                {
                                    "file": {
                                        "mill": "/json",
                                        "checksum": "HoRmDDKwsQko2CWnrCoYHCw1rUaaPH3vW4EMcFMwtw3S",
                                        "source": "8XK5TuJcXmSQRGt1kfSoWXJtNhybpBLQsm4arMH9MpoQ",
                                        "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
                                        "hash": "QmQHYPJDQAU8ZaGG8e4iW9bj65mr2T1cwygyfWb6AUaNio",
                                        "key": "AYCbcQf4YDBHr4NE2SnBgZYPfTD5riZgerujv3xFZgZ4RhDP3yZjcMnHSqXp",
                                        "media": "application/json",
                                        "size": "43",
                                        "added": "2019-04-23T20:08:51.294649Z",
                                        "meta": {
                                            },
                                        "targets": [
                                            "QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk"
                                        ]
                                    }
                                }
                            ],
                            "threads": [
                                "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw"
                            ]
                        }
                    }
                }
            },
            {
                "block": "QmVoKpKsg5MkW11bK3LVmd3xMMaxTutVime32sV6EZWeLk",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "payload": {
                    "@type": "/Join",
                    "block": "QmVoKpKsg5MkW11bK3LVmd3xMMaxTutVime32sV6EZWeLk",
                    "date": "2019-04-23T21:32:22.486183Z",
                    "user": {
                        "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                        "name": "P7X3gZu"
                    }
                }
            },
            {
                "block": "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "payload": {
                    "@type": "/Files",
                    "block": "QmUvWjstQzR6y7UctRJgVjcKsKzutZoiBsQw6WBXMnmg84",
                    "target": "QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk",
                    "date": "2019-04-23T20:08:51.686544Z",
                    "user": {
                        "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                        "name": "Clyde",
                        "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
                    },
                    "files": [
                        {
                            "file": {
                                "mill": "/json",
                                "checksum": "HoRmDDKwsQko2CWnrCoYHCw1rUaaPH3vW4EMcFMwtw3S",
                                "source": "8XK5TuJcXmSQRGt1kfSoWXJtNhybpBLQsm4arMH9MpoQ",
                                "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
                                "hash": "QmQHYPJDQAU8ZaGG8e4iW9bj65mr2T1cwygyfWb6AUaNio",
                                "key": "AYCbcQf4YDBHr4NE2SnBgZYPfTD5riZgerujv3xFZgZ4RhDP3yZjcMnHSqXp",
                                "media": "application/json",
                                "size": "43",
                                "added": "2019-04-23T20:08:51.294649Z",
                                "meta": {
                                    },
                                "targets": [
                                    "QmQVstxooDH7yJJzTrQySTCt61s46RjcGACsEmcLGz2dCk"
                                ]
                            }
                        }
                    ],
                    "threads": [
                        "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw"
                    ]
                }
            },
            {
                "block": "QmV8HiBrgJvGx4mwVF8G8MDpyaiUcUX9YC52AjAjw3HHuV",
                "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "payload": {
                    "@type": "/Join",
                    "block": "QmV8HiBrgJvGx4mwVF8G8MDpyaiUcUX9YC52AjAjw3HHuV",
                    "date": "2019-04-23T19:29:57.858974Z",
                    "user": {
                        "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                        "name": "Clyde",
                        "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
                    }
                }
            }
        ],
        "count": 5
    }
    ```

The "annotations" mode functions like the files API but includes join and leave update types. [Textile Photos](https://textile.photos) uses the "stacks" mode.

#### Subscription API

The `chat` command we saw above is actually built in part with a subscription. You can subscribe to any type of thread update [block](/concepts/threads#blocks): `merge`, `ignore`, `flag`, `join`, `announce`, `leave`, `text`, `files`, `comment`, `like`.

Let's subscribe to "files" updates across all threads:

```tab="cmd"
{{subscribe.files.cmd.code}}
```

```JavaScript tab="JavaScript"
{{subscribe.files.js_http_client.code}}
```

```JavaScript tab="React Native"
{{subscribe.files.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{subscribe.files.objc.code}}
```

```Swift tab="Swift"
{{subscribe.files.swift.code}}
```

```Java tab="Android"
{{subscribe.files.android.code}}
```

In another terminal, add a location to the "My runs" thread:

```tab="cmd"
{{examples.my_runs.add_location_data.cmd.code}}
```

```JavaScript tab="JavaScript"
{{examples.my_runs.add_location_data.js_http_client.code}}
```

```JavaScript tab="React Native"
{{examples.my_runs.add_location_data.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{examples.my_runs.add_location_data.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.add_location_data.swift.code}}
```

```Java tab="Android"
{{examples.my_runs.add_location_data.android.code}}
```

??? success

    ``` json
    {
        "block": "QmTw4ZRigDgdpVcXHWfCC78Mk8jVUQHpRXcwVEVLUHPYtZ",
        "target": "QmX5KGvJyYDKr9xhuTYRY92LWv4U1xNkrPmSYJVycwk9Dd",
        "date": "2019-06-12T13:48:43.319450Z",
        "user": {
            "address": "P9fbrHrPyQdtVJkG8MANiyF6W2ctCnyiB6sxA8tbT8zwPZ63",
            "name": "Clyde",
            "avatar": "QmRoJsuGN1UyDT5jHWvBXYDHubMszmVwAsFZmkYiQbeKrM"
        },
        "files": [
            {
                "file": {
                "mill": "/json",
                "checksum": "HoRmDDKwsQko2CWnrCoYHCw1rUaaPH3vW4EMcFMwtw3S",
                "source": "8XK5TuJcXmSQRGt1kfSoWXJtNhybpBLQsm4arMH9MpoQ",
                "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
                "hash": "QmWYcjZu28GR8p2gnwwUN5UcKAJgJEs1uvMqfwgM67hiKd",
                "key": "pqrhTw495h5hrvBPrMxBvwDyamJEgEjYK5P99TJj3D3J9STBGCs5h1mM5xZo",
                "media": "application/json",
                "size": "43",
                "added": "2019-06-12T13:48:43.109920Z",
                "meta": {},
                "targets": ["QmX5KGvJyYDKr9xhuTYRY92LWv4U1xNkrPmSYJVycwk9Dd"]
                }
            }
        ],
        "comments": [],
        "likes": [],
        "threads": ["12D3KooWSfWsCbnC44CWfPSVw1VRJFSjJX567Yw269qqdhHq5CoY"]
    }
    ```

Your first window will display the update:

??? success

    ```JSON
    {
        "block": "QmaTUfyZGkQn6Wzo2FUSviDhEtE6Ezt5V7ot1tdVNR5gMg",
        "thread": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
        "payload": {
            "@type": "/Files",
            "block": "QmaTUfyZGkQn6Wzo2FUSviDhEtE6Ezt5V7ot1tdVNR5gMg",
            "target": "QmbkqtPBLH83opAAzjLdLszry55p8W4FZbc7HR1a1gbHK4",
            "date": "2019-04-24T20:00:24.870515Z",
            "user": {
                "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
                "name": "Clyde",
                "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5"
            },
            "files": [
                {
                    "file": {
                        "mill": "/json",
                        "checksum": "DptTUm5Rh6gSdCvijL7hmcqnHH4MeG2nRTkVgZhv2EcK",
                        "source": "3VhXeTZor66u8NdGhrPcYK2N7j5v6vceGZerpvehHSJh",
                        "opts": "G7x9bf74kcvU7aBVnToCMAeVhcsuxuHag8gKgav6cGcN",
                        "hash": "QmUaecS9uZ3QyDt3ybzDs1rQbvB5LbLQe2YFVojQsHqePq",
                        "key": "8MnFgGEAj55y1sGW256JvE11KN4ZE89Weqzue3ZbkBvGB6jhvQZP2nq3JMZd",
                        "media": "application/json",
                        "size": "43",
                        "added": "2019-04-24T20:00:24.489476Z",
                        "meta": {
                            }
                    }
                }
            ],
            "threads": [
                "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw"
            ]
        }
    }
    ```

You can subscribe to multiple (or all) update types. [Textile Photos](https://textile.photos) uses a subscription to display realtime updates within its groups.

#### Leave a thread

When you leave a thread, all associated data is deleted from your peer. Additionally, all registered cafes will delete their associated snapshots.

From your second peer, leave the "My runs" thread:

```tab="cmd"
{{examples.my_runs.thread_abandon.cmd.code}}
```

??? success

    ```
    ok
    ```

### Notifications

Notifications are generated when you receive a thread invitation or update from another peer. OS-based notification APIs like iOS/Android local notifications or macOS desktop notifications can directly consume these objects.

#### List notifications

Let's see what kind of notifications your first peer (Clyde) has:

```tab="cmd"
{{notifications.ls.cmd.code}}
```

```JavaScript tab="JavaScript"
{{notifications.ls.js_http_client.code}}
```

```JavaScript tab="React Native"
{{notifications.ls.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{notifications.ls.objc.code}}
```

```Swift tab="Swift"
{{notifications.ls.swift.code}}
```

```Java tab="Android"
{{notifications.ls.android.code}}
```

???+ success

    ```JSON
    {
        "items": [
            {
                "actor": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
                "block": "QmPQSwoXQL5Hgmof3fYZQgp5GKwaqY4wbeP4NaoQe2P9vV",
                "body": "left",
                "date": "2019-04-24T20:18:08.442121Z",
                "id": "1KKP01K9SpRASYKkyxSK4EiSYEz",
                "subject": "12D3KooWBfdhD4tNMuTn5MHGof2bMZBKAUjFF3DBL3kuQQE5m1qw",
                "subject_desc": "My runs",
                "type": "PEER_LEFT",
                "user": {
                    "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                    "name": "P7X3gZu"
                }
            }
        ]
    }
    ```

Hmm, only one notification? Remember that your other peer left the "My runs" thread. Besides the leave notification, all others from their actions in that thread (joined, commented, etc.) were deleted.

#### "Read" notifications

Notifications have a `read` boolean status that is useful for some applications. We can mark the above notification as read via its `id`:

```tab="cmd"
{{notifications.read.cmd.code}}
```

```JavaScript tab="JavaScript"
{{notifications.read.js_http_client.code}}
```

```JavaScript tab="React Native"
{{notifications.read.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{notifications.read.objc.code}}
```

```Swift tab="Swift"
{{notifications.read.swift.code}}
```

```Java tab="Android"
{{notifications.read.android.code}}
```

??? success

    ```
    ok
    ```

Notice that the `read` attribute is omitted when its value is `false`.

### Summary

Display a summary of your peer's threads, files, and contacts:

```tab="cmd"
{{core.summary.cmd.code}}
```

```JavaScript tab="JavaScript"
{{core.summary.js_http_client.code}}
```

```JavaScript tab="React Native"
{{core.summary.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{core.summary.objc.code}}
```

```Swift tab="Swift"
{{core.summary.swift.code}}
```

```Java tab="Android"
{{core.summary.android.code}}
```

???+ success

    ```JSON
    {
        "id": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
        "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
        "thread_count": 5,
        "files_count": 5,
        "contact_count": 1
    }
    ```

`"files_count"` reports a total count of `files` update blocks.

### Logs

Your peer's underlying IPFS node comes with a rich system-based logging framework. Textile peers leverage this same framework, adding additional log systems with the prefix "tex-".

#### View current log levels

Take a look at the current log levels:

```tab="cmd"
{{core.logs.cmd.code}}
```

??? success

    ```JSON
    {
        "addrutil": "ERROR",
        "autonat": "ERROR",
        "autonat-svc": "ERROR",
        "autorelay": "ERROR",
        "badger": "ERROR",
        "basichost": "ERROR",
        "bitswap": "ERROR",
        "bitswap_network": "ERROR",
        "blockservice": "ERROR",
        "blockstore": "ERROR",
        "boguskey": "ERROR",
        "bstestnet": "ERROR",
        "chunk": "ERROR",
        "cmds": "ERROR",
        "command": "ERROR",
        "connmgr": "ERROR",
        "core": "ERROR",
        "core/coreapi": "ERROR",
        "coreunix": "ERROR",
        "dht": "ERROR",
        "dht.pb": "ERROR",
        "discovery": "ERROR",
        "engine": "ERROR",
        "eventlog": "ERROR",
        "filestore": "ERROR",
        "flatfs": "ERROR",
        "fsrepo": "ERROR",
        "ipfsaddr": "ERROR",
        "ipns": "ERROR",
        "ipns-repub": "ERROR",
        "keystore": "ERROR",
        "lock": "ERROR",
        "mdns": "ERROR",
        "mfs": "ERROR",
        "mocknet": "ERROR",
        "mockrouter": "ERROR",
        "mount": "ERROR",
        "mplex": "ERROR",
        "namesys": "ERROR",
        "nat": "ERROR",
        "net/identify": "ERROR",
        "p2p-config": "ERROR",
        "p2p-mount": "ERROR",
        "pathresolv": "ERROR",
        "peerqueue": "ERROR",
        "peerstore": "ERROR",
        "pin": "ERROR",
        "ping": "ERROR",
        "plugin/loader": "ERROR",
        "provider": "ERROR",
        "providers": "ERROR",
        "pubsub": "ERROR",
        "pubsub-valuestore": "ERROR",
        "relay": "ERROR",
        "reprovider": "ERROR",
        "reuseport-transport": "ERROR",
        "routedhost": "ERROR",
        "routing/record": "ERROR",
        "secio": "ERROR",
        "stream-upgrader": "ERROR",
        "swarm2": "ERROR",
        "table": "ERROR",
        "tcp-tpt": "ERROR",
        "tex-broadcast": "ERROR",
        "tex-core": "ERROR",
        "tex-datastore": "ERROR",
        "tex-gateway": "ERROR",
        "tex-ipfs": "ERROR",
        "tex-main": "ERROR",
        "tex-mill": "ERROR",
        "tex-repo": "ERROR",
        "tex-repo-config": "ERROR",
        "tex-service": "ERROR",
        "tex-util": "ERROR",
        "transport": "ERROR",
        "ulimit": "ERROR"
    }
    ```

They should all be at their default value of "ERROR". Note that you have access to all of the IPFS log systems as well.

#### Change log levels

You can alter a peer's log levels even when it's running.

!!! tip

    During development, start the daemon with `--debug`. This will set all of the "tex-" log systems to "DEBUG". You can then tail the logs, like: `tail -f "path/to/repo/logs/textile.log"`.

Set all of the "tex-" log systems to "INFO":

```tab="cmd"
{{core.logs_text_only.cmd.code}}
```

???+ success

    ```JSON
    {
        "tex-broadcast": "INFO",
        "tex-core": "INFO",
        "tex-datastore": "INFO",
        "tex-gateway": "INFO",
        "tex-ipfs": "INFO",
        "tex-main": "INFO",
        "tex-mill": "INFO",
        "tex-repo": "INFO",
        "tex-repo-config": "INFO",
        "tex-service": "INFO",
        "tex-util": "INFO"
    }
    ```

Possible log level values are "debug", "info", "warning", "error", and "critical".

See `textile logs --help` for more.

### Config

When your peer starts, it loads a JSON [config file](/develop/peer-config-file) from the repository directory, called "textile". This file lives alongside the IPFS config file (named "config"). You must restart your peer after making changes to either of these files.

#### View a config value

We can view the entire config or a specific value behind any JSON key. Try viewing the "Addresses" config:

```tab="cmd"
{{core.config.cmd.code}}
```

```JavaScript tab="JavaScript"
{{core.config.js_http_client.code}}
```

???+ success

    ```JSON
    {
        "API": "127.0.0.1:40600",
        "CafeAPI": "0.0.0.0:40601",
        "Gateway": "127.0.0.1:5050"
    }
    ```

`textile config` will display the entire file.

#### Set a config value

Changing values follows the same pattern. We can update our second peer's gateway bind address as follows:

```tab="cmd"
{{core.config_set.cmd.code}}
```

```JavaScript tab="JavaScript"
{{core.config_set.js_http_client.code}}
```

???+ success

    ```
    Updated! Restart daemon for changes to take effect.
    ```

Restart the daemon (or your `Textile` instance for users of a mobile SDK):

```tab="cmd"
{{core.daemon.cmd.code}}
```

??? success

    ```
    go-textile version: v0.1.12
    Repo version: 13
    Repo path: /Users/sander/.textile/repo
    API address: 127.0.0.1:40600
    Gateway address: 127.0.0.1:5050
    System version: amd64/darwin
    Golang version: go1.12.3
    PeerID:  12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay
    Account: P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j
    ```

You should now see the new gateway bind address in the config:

```tab="cmd"
textile config
```

```JavaScript tab="JavaScript"
const config = await textile.config.get()
```

??? success

    ``` json
    {
        "API": {
            "HTTPHeaders": {
                "Access-Control-Allow-Headers": [
                    "Content-Type",
                    "Method",
                    "X-Textile-Args",
                    "X-Textile-Opts",
                    "X-Requested-With"
                ],
                "Access-Control-Allow-Methods": [
                    "GET",
                    "POST",
                    "DELETE",
                    "OPTIONS"
                ],
                "Access-Control-Allow-Origin": [
                    "http://localhost:*",
                    "http://127.0.0.1:*"
                ],
                "Server": [
                    "go-textile/0.1.12"
                ]
            },
            "SizeLimit": 0
        },
        "Account": {
            "Address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
            "Thread": "12D3KooWLMV52tB3kP7qeRwrwfHQpaZZFaMnAm2wEwroY6xBsPwB"
        },
        "Addresses": {
            "API": "127.0.0.1:41600",
            "CafeAPI": "127.0.0.1:40601",
            "Gateway": "127.0.0.1:9090"
        },
        "Cafe": {
            "Client": {
                "Mobile": {
                    "P2PWireLimit": 0
                }
            },
            "Host": {
                "NeighborURL": "",
                "Open": false,
                "SizeLimit": 0,
                "URL": ""
            }
        },
        "IsMobile": false,
        "IsServer": false,
        "Logs": {
            "LogToDisk": true
        },
        "Threads": {
            "Defaults": {
                "ID": ""
            }
        }
    }
    ```

### Cafe Hosts

[Cafe](/concepts/cafes) peers (or just cafes) provide services to other peers. Cafes are easy to deploy and manage (single executable, Docker). Checkout the [full guide](/install/the-daemon/#initialize-a-cafe-peer) if you're interested in hosting your own.

For the purposes of this tour, let's transform your second peer into a local cafe. A production cafe should be run on a publicly accessible host, but a local cafe is useful for development and testing.

On your second peer, open the cafe API by setting the config key `"Cafe.Host.Open"` to `true`:

```tab="cmd"
textile config "Cafe.Host.Open" true --api="http://127.0.0.1:41600"
```

??? success

    ```
    Updated! Restart daemon for changes to take effect.
    ```

Now, restart the daemon in debug mode:

```tab="cmd"
textile daemon --repo="/tmp/buddy" --debug
```

??? success

    ```
    go-textile version: v0.1.12
    Repo version: 13
    Repo path: /tmp/buddy
    API address: 127.0.0.1:41600
    Gateway address: 127.0.0.1:9090
    Cafe address: 0.0.0.0:40601
    System version: amd64/darwin
    Golang version: go1.12.3
    PeerID:  12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV
    Account: P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs
    ```

Note that `Cafe address: 0.0.0.0:40601` is now shown after restarting the daemon.

#### Create a client token

In order for clients to register with your cafe, they'll need one of its _client tokens_.

!!! info

    Cafe client tokens are generated from cryptographically secure random bytes, salted, hashed, and stored locally. You can think of them as very strong passwords.

Create a token as follows:

```tab="cmd"
{{cafes.tokens_create.cmd.code}}
```

```JavaScript tab="JavaScript"
{{cafes.tokens_create.js_http_client.code}}
```

???+ success

    ```
    bYJLFjHsRsZjdzEwC2pJwQthmfYb3DPYyBCcU49Dkfqd5xGHk5NR77X8GDKG
    ```

#### View client tokens

View the cafe's client tokens with the `ls` command:

```tab="cmd"
{{cafes.tokens_list.cmd.code}}
```

```JavaScript tab="JavaScript"
{{cafes.tokens_list.js_http_client.code}}
```

???+ success

    ```JSON
    [
        "2ZwjtRaFj6kMxnKm3BLnueqaT3WLXQS3evEZoJ87oZLUMhdNxr4sVKorUWSu3ZHgfBbyU726trkqSnsvLGmiJ8bpv5PEqqSf25f"
    ]
    ```

The value shown in the list is the salted and hashed token. The plaintext version needed by a registering client is **only available at creation time** as they are never stored by the cafe.

### Cafe Clients

Cafes perform work for their _clients_, which are account peers. Account peers don't _need_ to be registered with a cafe, but doing so has advantages, like improving discovery of its content and providing an inbox for messages received offline. See the [cafe service](https://docs.textile.io/concepts/cafes/#services) section for more about how cafes assist other peers on the network.

!!! tip

    Textile hosts a development cafe that you are free to use for non-production purposes. More details can be found [here](/concepts/cafes#try-one).

#### Register with a cafe

Using the token created above, register with your locally running test cafe:

```tab="cmd"
{{cafes.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{cafes.add.js_http_client.code}}
```

???+ success

    ```JSON
    {
        "access": "eyJhbGciOiJFZDI1NTE5IiwidHlwIjoiSldUIn0.eyJzY29wZXMiOiJhY2Nlc3MiLCJhdWQiOiIvdGV4dGlsZS9jYWZlLzEuMC4wIiwiZXhwIjoxNTU4OTk2NDcxLCJqdGkiOiIxS1luQ1doOXRkOU1abjVrdUtIYnJjR0NPRlkiLCJpYXQiOjE1NTY1NzcyNzEsImlzcyI6IjEyRDNLb29XOXlhQUx4eGszMW5uYVBaQjl0emp3eEZ5UFVCcndMdUNYWjNGbkFXZzhWeVYiLCJzdWIiOiIxMkQzS29vV0NNVkxmTVY4dXpZcEZOMzhxbjJlTXM0OHRBdUhkVlpkajNhRjZuZXg2emF5In0.j9N-AGVZhU5-eTSOm6fkZkKVsAeTSrPXjx3BmyZoB4gKG_T2G3g0iSB1n2Bz0ZWEre8gt6xRGA3yL0bMUw-dAw",
        "cafe": {
            "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
            "api": "v0",
            "node": "0.1.12",
            "peer": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
            "protocol": "/textile/cafe/1.0.0",
            "url": "http://127.0.0.1:40601"
        },
        "exp": "2019-05-27T22:34:31.142527Z",
        "id": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
        "refresh": "eyJhbGciOiJFZDI1NTE5IiwidHlwIjoiSldUIn0.eyJzY29wZXMiOiJyZWZyZXNoIiwiYXVkIjoiL3RleHRpbGUvY2FmZS8xLjAuMCIsImV4cCI6MTU2MTQxNTY3MSwianRpIjoicjFLWW5DV2g5dGQ5TVpuNWt1S0hicmNHQ09GWSIsImlhdCI6MTU1NjU3NzI3MSwiaXNzIjoiMTJEM0tvb1c5eWFBTHh4azMxbm5hUFpCOXR6and4RnlQVUJyd0x1Q1haM0ZuQVdnOFZ5ViIsInN1YiI6IjEyRDNLb29XQ01WTGZNVjh1ellwRk4zOHFuMmVNczQ4dEF1SGRWWmRqM2FGNm5leDZ6YXkifQ.erefmNinE3C1xpSa73TU6qJmTDLrjXtBh8-cojZ-D2_t6VrklYfffGGJLCQ7DKRv3UANS03U2KVX6WjH3GZADw",
        "rexp": "2019-06-24T22:34:31.142527Z",
        "subject": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
        "type": "JWT"
    }
    ```

A new client account associated with the provided token was added to your cafe. Your account peer now has an active cafe _session_ which it can use to make authenticated requests. Cafe sessions are stateless [JWT](https://jwt.io) objects that can expire.

!!! tip

    An account peer may be registered with more than one cafe, and account peers do not need to be registered to the same cafe(s). Additionally, peers can easily migrate from one cafe to another, simply be deregistering from one and registering with another.

#### List cafe sessions

You can view your active cafe sessions with the `ls` command:

```tab="cmd"
{{cafes.list.cmd.code}}
```

```JavaScript tab="JavaScript"
{{cafes.list.js_http_client.code}}
```

```ObjectiveC tab="Objective-C"
{{cafes.list.objc.code}}
```

```Swift tab="Swift"
{{cafes.list.swift.code}}
```

```Java tab="Android"
{{cafes.list.android.code}}
```

??? success

    ```JSON
    {
        "items": [
            {
                "access": "eyJhbGciOiJFZDI1NTE5IiwidHlwIjoiSldUIn0.eyJzY29wZXMiOiJhY2Nlc3MiLCJhdWQiOiIvdGV4dGlsZS9jYWZlLzEuMC4wIiwiZXhwIjoxNTU4OTk2NDcxLCJqdGkiOiIxS1luQ1doOXRkOU1abjVrdUtIYnJjR0NPRlkiLCJpYXQiOjE1NTY1NzcyNzEsImlzcyI6IjEyRDNLb29XOXlhQUx4eGszMW5uYVBaQjl0emp3eEZ5UFVCcndMdUNYWjNGbkFXZzhWeVYiLCJzdWIiOiIxMkQzS29vV0NNVkxmTVY4dXpZcEZOMzhxbjJlTXM0OHRBdUhkVlpkajNhRjZuZXg2emF5In0.j9N-AGVZhU5-eTSOm6fkZkKVsAeTSrPXjx3BmyZoB4gKG_T2G3g0iSB1n2Bz0ZWEre8gt6xRGA3yL0bMUw-dAw",
                "cafe": {
                    "address": "P7X3gZus5H15tWCxk4oP6EVsgAM9vwUfCyepAKw49QuRyPYs",
                    "api": "v0",
                    "node": "0.1.12",
                    "peer": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
                    "protocol": "/textile/cafe/1.0.0",
                    "url": "http://127.0.0.1:40601"
                },
                "exp": "2019-05-27T22:34:31.142527Z",
                "id": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV",
                "refresh": "eyJhbGciOiJFZDI1NTE5IiwidHlwIjoiSldUIn0.eyJzY29wZXMiOiJyZWZyZXNoIiwiYXVkIjoiL3RleHRpbGUvY2FmZS8xLjAuMCIsImV4cCI6MTU2MTQxNTY3MSwianRpIjoicjFLWW5DV2g5dGQ5TVpuNWt1S0hicmNHQ09GWSIsImlhdCI6MTU1NjU3NzI3MSwiaXNzIjoiMTJEM0tvb1c5eWFBTHh4azMxbm5hUFpCOXR6and4RnlQVUJyd0x1Q1haM0ZuQVdnOFZ5ViIsInN1YiI6IjEyRDNLb29XQ01WTGZNVjh1ellwRk4zOHFuMmVNczQ4dEF1SGRWWmRqM2FGNm5leDZ6YXkifQ.erefmNinE3C1xpSa73TU6qJmTDLrjXtBh8-cojZ-D2_t6VrklYfffGGJLCQ7DKRv3UANS03U2KVX6WjH3GZADw"
            }
        ]
    }
    ```

#### Check messages

An account peer will periodically check each of its registered cafes for new messages received by the cafe on its behalf. You can also manually check for messages:

```tab="cmd"
{{cafes.messages.cmd.code}}
```

```JavaScript tab="JavaScript"
{{cafes.messages.js_http_client.code}}
```

```ObjectiveC tab="Objective-C"
{{cafes.messages.objc.code}}
```

```Swift tab="Swift"
{{cafes.messages.swift.code}}
```

```Java tab="Android"
{{cafes.messages.android.code}}
```

???+ success

    ```
    ok
    ```

Messages are downloaded in batches and queued for processing. This enables cafes to receive messages on an account peer's behalf when it is offline.

#### Unregister with a cafe

You can leave a cafe at any time. Data associated with your client account will be removed.

```tab="cmd"
{{cafes.remove.cmd.code}}
```

```JavaScript tab="JavaScript"
{{cafes.remove.js_http_client.code}}
```

```ObjectiveC tab="Objective-C"
{{cafes.remove.objc.code}}
```

```Swift tab="Swift"
{{cafes.remove.swift.code}}
```

```Java tab="Android"
{{cafes.remove.android.code}}
```


??? success

    ```
    ok
    ```

!!! info

    Cafes are _anonymous_ and _disposable_ infrastructure, meaning that you can replace one cafe with another and still participate in the network as before.

### IPFS

The Textile API exposes a handful of the more useful IPFS endpoints. For the command-line client, these are `id`, `cat`, `swarm peers`, and `swarm connect`. Please [open an issue](https://github.com/textileio/go-textile/issues) or pull request for other IPFS APIs you would like to use via `textile`.

#### View peer ID

At some point, you will want to view your IPFS peer ID. This is the same ID shown in your contact and profile info and printed by the daemon on startup:

```tab="cmd"
{{ipfs.peer_id.cmd.code}}
```

```JavaScript tab="JavaScript"
{{ipfs.peer_id.js_http_client.code}}
```

???+ success

    ```
    12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay
    ```

See the [IPFS doc](https://docs.ipfs.io/reference/api/cli/#ipfs-id) for more info.

Check out [this post](https://medium.com/textileio/how-ipfs-peer-nodes-identify-each-other-on-the-distributed-web-8b5b6476aa5e) on the Textile blog for more info about how peers identify each other on the distributed web.

#### View the peer swarm

Your peer is always communicating, or "gossiping", with a changing sub-set of other peers on the IPFS network called a "swarm". You can view that swarm at any time. It should be relatively large at this point since your peer has been "online" for awhile.

```tab="cmd"
{{ipfs.swarm_peers.cmd.code}}
```

```JavaScript tab="JavaScript"
{{ipfs.swarm_peers.js_http_client.code}}
```

??? success

    ```JSON
    {
        "Peers": [
            {
                "addr": "/ip4/104.154.192.219/tcp/4001",
                "peer": "QmWAQKhwspxGmLbn23kBTWMSrhJe2HyivJx3Mi12GPdT4z"
            },
            {
                "addr": "/ip4/109.194.47.83/tcp/4001",
                "peer": "QmQCH7nuh5osaTj2BDKThL54fBJiQ8d5YMPcTokEP3dRem"
            },
            {
                "addr": "/ip4/109.194.47.83/tcp/4004",
                "peer": "QmbdY5KnhG6Dk5fEJZQSVDhHN7sdhSzsKMnJU6MnpmRg5h"
            },
            {
                "addr": "/ip4/122.114.171.159/tcp/10001",
                "peer": "QmTyZ4sMYQVEd9DXGEHCxouhKF6HyuzwbacJS9ZKb8Lr8B"
            },
            {
                "addr": "/ip4/13.59.235.81/tcp/4001",
                "peer": "QmYfywze6ADxF45Rmmcbv28MZQQ7QuiD1bV88n3Twyq7Ld"
            },
            {
                "addr": "/ip4/134.209.237.173/tcp/4001",
                "peer": "QmVFXZSJSsmpZoBaq1TfgDe4RGYfGonnxwToJN3jng7meD"
            },
            {
                "addr": "/ip4/137.117.141.25/tcp/4001",
                "peer": "QmVqgjoUAo1EAd7QpFYcMRuxfBQNBPStrLVHBz3FzLinZX"
            },
            {
                "addr": "/ip4/138.201.67.218/tcp/4002/ws",
                "peer": "QmbVWZQhCGrS7DhgLqWbgvdmKN7JueKCREVanfnVpgyq8x"
            },
            {
                "addr": "/ip4/139.178.68.51/tcp/4001",
                "peer": "QmaVhv3V6JpCsSexyZSqPFTSDNZLZvp3hifa78ntTnvn9c"
            },
            {
                "addr": "/ip4/147.75.109.15/tcp/4001",
                "peer": "QmdExkZGosUfEw4FFPrkdkfpFaaQ1HoZY2gBvJjWJoLEMf"
            },
            {
                "addr": "/ip4/147.75.46.187/tcp/4001",
                "peer": "QmXWMXquytgYKrMM3AZ8WCfxYqJdg2e2YK5aqocCT2r8Au"
            },
            {
                "addr": "/ip4/147.75.48.175/tcp/4001",
                "peer": "QmQemDUcDJDjjZBzL3fNMbQ72q8RK1h3rG6iWEN7zwFAgT"
            },
            {
                "addr": "/ip4/147.75.92.69/tcp/4001",
                "peer": "QmVwtm295H8qh3Gj2t3Mo2rfnU69A9EwKkts35uu922RmT"
            },
            {
                "addr": "/ip4/176.99.11.18/tcp/4001",
                "peer": "QmX8aSmP6j6HmXxkTZZBTJNv8yPJ1pU7bTRFyf83SQft2h"
            },
            {
                "addr": "/ip4/178.32.250.99/tcp/4001",
                "peer": "QmY7qra7XxWXz2DYguULqt9qXvczZr326wAGP7CukEctvV"
            },
            {
                "addr": "/ip4/18.185.14.140/tcp/4001",
                "peer": "QmdbxhD8SXxesfRRqwNRFFMgoXfCTKygn3mRj6tru8o5eJ"
            },
            {
                "addr": "/ip4/18.195.119.140/tcp/4001",
                "peer": "QmSfnb7FGivxSDsb7jyQes6JDdts7PLugEppgFfX5J32Bx"
            },
            {
                "addr": "/ip4/18.224.54.97/tcp/4001",
                "peer": "Qmdg1B1YJ3BtZ7VYPQY1uFn7me1kQZzuJquD1rYLGZwkAA"
            },
            {
                "addr": "/ip4/18.237.227.0/tcp/4001",
                "peer": "QmbdnQcvQEYxsHEDTk8TyopqkDoonwJ9QXXEvwJTizaNts"
            },
            {
                "addr": "/ip4/187.151.117.208/tcp/4001",
                "peer": "QmYN3x2AxHf3ksHKfXx9bgJJBFoSFLk7zRM5tZ8kzBiRXW"
            },
            {
                "addr": "/ip4/192.168.0.8/tcp/4001",
                "peer": "QmWjsB6syMRQpAjF9W39vLWn1g9wAW97vXXaBYD2vT3ZJt"
            },
            {
                "addr": "/ip4/192.168.0.8/tcp/4101",
                "peer": "12D3KooW9yaALxxk31nnaPZB9tzjwxFyPUBrwLuCXZ3FnAWg8VyV"
            },
            {
                "addr": "/ip4/192.241.197.9/tcp/4001",
                "peer": "Qmf5FcVyjCehUfqtrRW4uEYEood37jW6u29rSD1Uga6w1W"
            },
            {
                "addr": "/ip4/195.46.227.2/tcp/4001",
                "peer": "QmW88x4CXMzymg7a22jy8J3JH3NJvCr2Rgg493aGTRSUQU"
            },
            {
                "addr": "/ip4/207.154.212.173/tcp/4001",
                "peer": "QmcqQ7GeJHBJyKasZCCgC8NHuh2xZUfR1BVUdsCSfbeYZJ"
            },
            {
                "addr": "/ip4/208.68.36.4/tcp/4001",
                "peer": "QmSvYwU4K4EuZzgmK3TBEVhwxnuM8RjahAEm9Agkbk6kES"
            },
            {
                "addr": "/ip4/217.69.14.5/tcp/4001",
                "peer": "QmdNSMKZEfUcNL8kVJfazFwqMEkva5eAeX4u91xAX6L8X5"
            },
            {
                "addr": "/ip4/218.103.136.66/tcp/4001",
                "peer": "QmWhw7b3nHp9qsJqmtzZysrsY71v5yMmwHCCzL5ojer1Jw"
            },
            {
                "addr": "/ip4/221.149.2.111/tcp/17394",
                "peer": "QmV34F67mUcEpq87ifyHGvmW3yyUjHBTi4NbJ42d3Wwbjc"
            },
            {
                "addr": "/ip4/223.17.211.208/tcp/57897",
                "peer": "QmatkeYLBXcTnQkCkxjTECph2uSpe24r3hLMdkQ4V9nALo"
            },
            {
                "addr": "/ip4/223.17.211.243/tcp/11267",
                "peer": "QmfKPg5euLfDLaVuXe5JfW8g7Xcfe4JgcUhkp34jbmoDha"
            },
            {
                "addr": "/ip4/23.92.31.84/tcp/4001",
                "peer": "QmWPPHiwbm4u9a2QRvWFy49RHNCLzDHsCCUrkHdAnckYUW"
            },
            {
                "addr": "/ip4/3.16.48.115/tcp/4001",
                "peer": "QmSR6CBn7NPkV4MuVHfM3UCEXwzgGD5k53H7KbSqA7b2hX"
            },
            {
                "addr": "/ip4/3.16.67.1/tcp/4001",
                "peer": "QmZeYh9LQSRLdhTMGtuha7BBarUxBVtxY7Jc2zAaMyFXvP"
            },
            {
                "addr": "/ip4/34.217.111.111/tcp/4001",
                "peer": "QmSjkiS837t8hT1Mbm4mAYMnVo5yhCgpvMPgGvSoMJcskn"
            },
            {
                "addr": "/ip4/34.240.225.90/tcp/4001",
                "peer": "Qmd256Ty5U8Ktou3HrGeXj6GirnEuEaecNLVGQhB6et28W"
            },
            {
                "addr": "/ip4/34.244.27.104/tcp/4001",
                "peer": "QmQaTKPoYpxecV4rnHrf4aKdgyRrCkuCKRE83DE6msdZg8"
            },
            {
                "addr": "/ip4/35.180.35.45/tcp/4001",
                "peer": "12D3KooWBCZEDkZ2VxdNYKLLUACWbXMvW9SpVbbvoFR9CtH4qJv9"
            },
            {
                "addr": "/ip4/36.110.109.114/tcp/4001",
                "peer": "QmbCGh5sgJAjjFWDw4JeLkoThBvWFBCgwc9nfB57QLzFmo"
            },
            {
                "addr": "/ip4/37.1.207.72/tcp/4001",
                "peer": "QmV1xHp8CAUTcFx6SyWkaZ7cUvVFAPiLrVeTqLafknAHWx"
            },
            {
                "addr": "/ip4/38.29.203.106/tcp/30711",
                "peer": "QmWVUG5ko1hN8HsWpZpiEQQQnt4khYYnXSFQE7rntzgvZU"
            },
            {
                "addr": "/ip4/40.113.140.104/tcp/4001",
                "peer": "QmUZg4LHARsMQfG5X29JkT9nRssdNxZx3GysojJsYHGPrd"
            },
            {
                "addr": "/ip4/40.117.34.253/tcp/4001",
                "peer": "QmVtPr2zPXDXZ7Ar1KJrLf8feHjPvNLeukhMm1bFzphA4R"
            },
            {
                "addr": "/ip4/41.72.193.142/tcp/4001",
                "peer": "QmWHhFfKp326abWQjgNqYCDZQVReRYguQsQuDho3YsZPqf"
            },
            {
                "addr": "/ip4/5.196.133.152/tcp/4001",
                "peer": "QmS5Z9CnGzq5F5MD4pvmRejEN2TNMtAWDnZxwyebRZqWrK"
            },
            {
                "addr": "/ip4/50.236.201.218/tcp/4001",
                "peer": "QmSfdK2HxLcqQ5VmW7ZtqSHkXbexPSprFN11zWHJa5CKkd"
            },
            {
                "addr": "/ip4/50.3.70.3/tcp/7",
                "peer": "Qmbi4qSVyperK6DEVdba6E2CrchdnVyTUjStbSb1A8DSdD"
            },
            {
                "addr": "/ip4/52.18.254.51/tcp/4001",
                "peer": "QmYnSZTvHhL2e5xT4Hkr9bEoGBic7eFJKqUAYWymSWaB5i"
            },
            {
                "addr": "/ip4/52.90.203.188/tcp/4001",
                "peer": "QmZWRFPXMaYLf2sTegMj7bP1JqP98oCgZteGg3NTUcJBkH"
            },
            {
                "addr": "/ip4/54.212.188.163/tcp/4001",
                "peer": "QmXmA7d4CuUAjfEcCQJXSS5NyowYDBJLbgGjVugjxpnFa8"
            },
            {
                "addr": "/ip4/54.219.142.88/tcp/4001",
                "peer": "12D3KooWLaJnBr1bqWkZCDhaFeGxKiCP91rt2gQ8rn7Lx7kcKAMY"
            },
            {
                "addr": "/ip4/54.77.221.96/tcp/4001",
                "peer": "QmSEwmV67SWoiKsKUiBfCBpTJjxr7ypQS7Md9Nye4EZX8V"
            },
            {
                "addr": "/ip4/54.93.79.15/tcp/4001",
                "peer": "QmQiEWx14TnX6tzgsdqKnXLbR55ZhfdXh2q49aYdheTMRD"
            },
            {
                "addr": "/ip4/66.155.94.103/tcp/4001",
                "peer": "QmQwAzFTKdZGmqvo8w4z4udDcdE6DUhqbt48MYEY2QUito"
            },
            {
                "addr": "/ip4/69.181.194.58/tcp/4001",
                "peer": "QmbQ1jUJquca964trBcL5tGw6ZDhcKeg3x4iaMQHXD8nd8"
            },
            {
                "addr": "/ip4/81.235.46.228/tcp/41099",
                "peer": "12D3KooWK2Ng4LwWKxLAuWH6oTBTpPNNor7Kwk1iL5ndCp6ncPiU"
            },
            {
                "addr": "/ip4/83.49.184.55/tcp/4001",
                "peer": "QmSeD98VAftZ6vUanVQcKbXKAT28UnpVH9zaAkuDRghxiw"
            },
            {
                "addr": "/ip4/87.197.157.72/tcp/4001",
                "peer": "QmTbjP4HmeRNUxkSDpcXxyL2e3NFiTTWF5fVsmcuFbJfoN"
            },
            {
                "addr": "/ip4/94.23.19.73/tcp/4001",
                "peer": "QmVjB18xK7UAR9f6sGEHP8o5qgb1H8Ewpu3kcBo8p2zKjw"
            },
            {
                "addr": "/ip4/95.179.213.74/tcp/4001",
                "peer": "QmcFshtLpo29wHDLJ56eqnRzreZWZYjdxhP2TadTahYQPC"
            },
            {
                "addr": "/ipfs/QmQaTKPoYpxecV4rnHrf4aKdgyRrCkuCKRE83DE6msdZg8/p2p-circuit",
                "peer": "QmfXzPqSzZHuabJpGTQjGgMusgVBXsunKDEt5SQX96eAAc"
            },
            {
                "addr": "/ipfs/QmXmA7d4CuUAjfEcCQJXSS5NyowYDBJLbgGjVugjxpnFa8/p2p-circuit",
                "peer": "QmfTqRRvtPgoorN2aPRvsfAVd8GVyup7YYiFGTn477Q2PH"
            },
            {
                "addr": "/ipfs/QmYnSZTvHhL2e5xT4Hkr9bEoGBic7eFJKqUAYWymSWaB5i/p2p-circuit",
                "peer": "QmbWJwDa9ESDwHnrxT12QDmRBMxeAJkhQjNuia45idL1du"
            },
            {
                "addr": "/ipfs/Qmdg1B1YJ3BtZ7VYPQY1uFn7me1kQZzuJquD1rYLGZwkAA/p2p-circuit",
                "peer": "QmVzQfhD3c2rj6GrYZgBadxsV3msHW69LockGJwsH6nRjK"
            }
        ]
    }
    ```

See the [IPFS doc](https://docs.ipfs.io/reference/api/cli/#ipfs-swarm-peers) for more info.

#### Connect to another peer

You may also want to check or open a connection to another peer. You can do this by supplying a complete [multi-address](https://github.com/multiformats/multiaddr).

Try connecting to one of Textile's federated cafe peers:

```tab="cmd"
{{ipfs.swarm_connect.cmd.code}}
```

```JavaScript tab="JavaScript"
{{ipfs.swarm_connect.js_http_client.code}}
```

???+ success

    ```JSON
    [
        "connect 12D3KooWLh9Gd4C3knv4XqCyCuaNddfEoSLXgekVJzRyC5vsjv5d success"
    ]
    ```

See the [IPFS doc](https://docs.ipfs.io/reference/api/cli/#ipfs-swarm-connect) for more info.

#### Cat any data on the network

Downloading data behind a path is one of the most useful IPFS APIs. For example, we can "cat" an unencrypted Textile logo into a PNG file:

```tab="cmd"
{{ipfs.cat.cmd.code}}
```

```JavaScript tab="JavaScript"
{{ipfs.cat.js_http_client.code}}
```

```ObjectiveC tab="Objective-C"
{{ipfs.cat.objc.code}}
```

```Swift tab="Swift"
{{ipfs.cat.swift.code}}
```

```Java tab="Android"
{{ipfs.cat.android.code}}
```

???+ success

    ![](/images/textile.png)

See the [IPFS doc](https://docs.ipfs.io/reference/api/cli/#ipfs-cat) for more info.

### IPFS Gateway

All desktop and server peers host an IPFS gateway. Read more and see some examples [here](/develop/ipfs-gateway).

!!! tip "A gateway to the gateways"

    Textile hosts a number of federated cafe peers around the globe, each with a public-facing gateway. A latency-based load balancer ties them all together at `https://gateway.textile.cafe`, which you are free to use in your applications.

![This is a dynamically decrypted image. Gateways will attempt to decrypt data with a key passed as a query parameter. Photo by Jan Tinneberg on Unsplash.](https://gateway.textile.cafe/ipfs/QmQ3Q8sSqgUNuvKm6HXM16cnFk4SX3N2C7tcMEoob6L16c/0/large/content.jpg/?key=2Ra1ACYaEgyQMe8qnETm8aU5T32TKhuudNywtG2nz4QEpRhpQNHsEWqHuUycB){: .center}

**Thank you for taking the tour! 👋**. Feel free to join the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas.

<br>
