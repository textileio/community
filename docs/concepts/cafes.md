_Cafe peers_ (or just cafes) are _anonymous_ and _disposable_ infrastructure. They provide services on behalf of users and applications.

Access to cafe services is granted via JWT-based sessions, and initial registration with a cafe requires an access token. Any peer can operate as a cafe, though they work best for always-on peers. Cafes run an 'extra' network API that handles client and host requests over libp2p or HTTP.

!!! tip
    An account peer may be registered with more than one cafe, and account peers do not need to be registered to the same cafe(s). Additionally, peers can easily migrate from one cafe to another, simply be deregistering from one and registering with another.

## Services

### Backup

One of the primary functions of a cafe is to provide a recovery and new device sign-in mechanism to its _clients_. Once registered with a cafe, clients' data (which is, by default, encrypted) is automatically synced. This involves a combination of authenticated IPFS pinning and [thread](/concepts/threads) snapshots. A thread snapshot contains only the metadata and latest known update hash (HEAD) needed to reconstruct the entire thread from scratch, and is encrypted with the client's [account](/concepts/the-wallet#accounts) key. This means that cafes only issue encrypted backups and are _not_ able to read their clients' threads. This also means that the snapshots are useless if a client loses their account key.

### Message inbox-ing

Very often, a peer is not online or is otherwise unreachable and therefore unable to receive a message (usually a [thread](/concepts/threads) update message, or [block](/concepts/threads#blocks)). In this failed state, the sender can send the message to the recipient's always-online cafe(s), ensuring the message is delivered when the recipient returns online. In practice, this means that, when available, cafe "inbox" addresses are attached to [contacts](/concepts/contacts), which get published to the network. This is sort of like your phone's voicemail service, but here you're in control of where the message is actually delivered. Most importantly, because the update messages are encrypted, you _do not_ need to trust the cafe hosting the inbox.

### User account indexing

Textile provides tooling for certain types of network-wide queries, like user account search. Changes to a peer's public-facing [contact](/concepts/contacts) is indexed and made query-able by its cafes. So, while you do not need to be registered with a cafe in order to leverage these queries, doing so may increase your chances of being discovered by others, assuming you local peer is periodically offline.

### Web endpoints

Every cafe also hosts an IPFS gateway. This is useful for building light-clients where they want to be able to request client generated content through the cafe where it is pinned. Here, we can embed the Textile logo via one of Textile's cafes.


```https://gateway.textile.cafe/ipfs/<cid>```

- cid: you can find a CID from any `ipfs add` command using the IPFS daemon. Alternatively, you can pull the `hash` parameter out of any block you create using a Textile thread. Blocks are encrypted by default, but you can read more about [/concepts/threads](threads) to learn how to use `plaintext` for creating unencrypted thread files. 

Here is an example of an unencrypted thread file being shared over the Textile gateway.

[![](https://gateway.textile.cafe/ipfs/QmarZwQEri4g2s8aw9CWKhxAzmg6rnLawGuSGYLSASEow6/0/d)](https://gateway.textile.cafe/ipfs/QmarZwQEri4g2s8aw9CWKhxAzmg6rnLawGuSGYLSASEow6/0/d)

#### Request thread blocks

Gateways can also be used to request raw metadata or file content from a thread's blocks. You'll need to know a little bit about the [block ID and schema](/concepts/threads). Specifically, you'll need to pull the `target` out of a block, as the target refers to directory on IPFS created by the block. 

Here is how you request a block's contents over the gateway.

```https://gateway.textile.cafe/ipfs/<target_id>```

- target_id: comes from any block in a Textile thread. 

Here is a real example over the gateway. 

[https://gateway.textile.cafe/ipfs/QmarZwQEri4g2s8aw9CWKhxAzmg6rnLawGuSGYLSASEow6]

You can see that the contents are in a directory, the directory sturcture is decided by the thread schema. If your thread is encrypted (the default), the content of any file inside the directory will be unviewable over the normal IPFS gateway. See next.

#### Decryption service

Gateways are primarily useful for sharing decrypted data or in cases where the client can efficiently decrypt data locally. However, in many cases the work of decrypting a file on IPFS can passed up to the cafe vie the decrypting endpoint. 

Here, we request an image that is fully encrypted on IPFS but we are comfortable passing the key to a trusted cafe for remote decryption and file-deliver. A request to the decrypting enpoint looks like,

```https://gateway.textile.cafe/ipfs/<cid>?key=<key>```

- cid: same as above, either the IPFS hash or the block target including the path to the file you wish to decrypt.
- key: the key to decrypt the file at path. A client can get access to a file's key at the time of block creation or by looking up an old block on any device with permission via a thread containing the block.

Here's a real example of an encrypted image being embedded via a the decrypting endpoint.

![Photo secrets revealed](https://cafe.us-east-1.textile.io/ipfs/QmY7ezUccNt3i7qnyhJWN8xKL6cDe7RkEQEViPd33TFfxj/photo?key=17q9mTWHjSOIjWiAoZxYy3cYTN917q9mUBhOu0mxr6YM)

#### Latest thread share

_Status Pending. We plan to support the ability to publish threads over Textile that can be tracked and exposed over cafes without needing full Textile clients. [Follow on GitHub](https://github.com/textileio/go-textile/issues/697)._

### Cafe functions

_Status Exploring. We are looking into the concept of offering serverless function support directly inside a cafe. Examples of serverless function uses include: publishing a webhook, updating an RSS feed, or triggering a push notification._

## Deploying

Cafes are easy to deploy & manage (single executable, Docker). Start [here](/install/the-daemon/#run-a-cafe-peer) to run your own.

<br>
