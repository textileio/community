<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>learn</small></h1>

Below are some of the core technology concepts that make Textile work and will help you use our developer libraries, desktop install, and command-line tool. 

# Wallets

Every user in the Textile system has a Wallet. It is a secure tool for them to track every piece of data they create, permission new apps & services, and recover data if they loose their device. Wallets are represented by a private mnemonic phrase that should only ever be known by the user.

### Technical 

A mnemonic phrase is the master key to a [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Hierarchical [Deterministic Wallet](https://en.bitcoin.it/wiki/Deterministic_wallet) based on Stellar's implementation of [SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md).

# Accounts

Inside a Wallet a user can generate [Accounts](#Accounts)). Accounts care defined by keys that are generated specific to a given application or use-case. Any given wallet may create an arbitrary number of accounts. For example, you may use a wallet to provision multiple Textile Photos 'accounts', each with a completely different persona if you so choose. This provides a powerful framework for 'partitioning' use cases. 

### Technical

Accounts are generated via the wallet pass-phrase (as above) and are an [Ed25519](https://ed25519.cr.yp.to/) public/private keypair used to sign backups, provision libp2p identities, etc. Textile uses Ed25519 here because it's fast, compact, secure, and widely used. See the [EdDSA Wikipedia page](https://en.wikipedia.org/wiki/EdDSA) for more details.

# Storage & Sharing

## Threads

Every Textile Account can be used to create or join any number of provate or shared data feeds called, Threads. On the surface, you can think of a Thread like a decentralized database exposed as a simple API for your app to write and consume from. Threads can be either private to the app and user, open to the world, or shared between specific participants. Therefore, Threads become a useful way to both store private data or share public or restricted access data.

### Technical

Threads are defined by schemas and contain blocks of information (or updates). They are specifically designed to work well in mobile, offline-first scenarios, where peers are constantly making updates, coming online, and going offline. This means avoiding state conflicts is a central focus of their operation. This issue comes up frequently when working collaboratively on documents, updating shared databases, etc.

#### Conflict Resolution

For the purposes of updating a shared Thread of photos or similar data, it turns out that an [operation-based CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) that supports append-only operations is pretty much all you need to get going. You can think of Textile's Threads CRDT (which shares some ideas with `ipfs-log`) setup as an immutable, append-only tree that can be used to model a mutable, shared state between peers. Every entry in the tree is saved on IPFS, and each points to a hash of previous entry(ies) forming a graph. These trees can be [3-way and fast-forward merged](https://www.atlassian.com/git/tutorials/using-branches/git-merge).

For those familiar with git and other similar system, you might be thinking this sounds a lot like a [git hash tree](https://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html#meet-the-tree-object), [Merkle DAG](https://twitter.com/Textile01/status/1004436869734543360), or even a [blockchain](https://en.wikipedia.org/wiki/Blockchain). And you’d be right! The concepts are very similar, and this buys us some really nice properties for building and maintaining a shared state. By modeling our shared Thread state in this way, we benefit from tried and tested methods for allowing a peer to incorporate other peers' updates into their state while maintaining history (via fast-forwards and three-way merging for example).

Each Thread is essentially a chain of updates, where each update represents some specific action or event (see [Blocks](/learn#blocks) for details). For instance, when you create a new Thread, under-the-hood you are actually creating a `JOIN` update on a new Thread chain. Similarly, when you update the Thread via a new photo (`FILES` update), or message (`MESSAGE` update), you're actually updating that Thread chain. After each modification, the `HEAD` of the Thread will point to the latest update.

#### Example

To give you a better idea of what exactly we're talking about, consider the following set of operations: User A creates a new Thread, and adds a Photo. They then externally invite User B (sent via some other secure communication channel), who eventually joins the Thread. But before User B is able to join the Thread, User A adds another Photo, moving the Thread’s HEAD forward. By the time User B joins the Thread, they'd end up with a Thread sequence that looks something like this:

![Thread join example. Solid arrows point towards the ‘parent’ of a given update, over-the-wire communications are indicated with a 📶-style arrow, and messages that are rebroadcast (e.g., via the welcome message) are indicated with a dashed arrow. Similarly, merges point to both their parent updates.](https://cdn-images-1.medium.com/max/2400/1*h9eNwOauuT7mMeS4o-yGbw.png)

> Thread join example. Solid arrows point towards the 'parent' of a given update, over-the-wire communications are indicated with a 📶-style arrow, and messages that are rebroadcast (e.g., via the welcome message) are indicated with a dashed arrow. Similarly, merges point to both their parent updates.

Here, we see the merge happening at the end of the sequence because the bottom peer is joining via an external invite that is no longer HEAD , forcing them to merge the most recent DATA update with their own JOIN update. But since merge results are deterministic (given the same parents), both peers create the MERGE update locally, and do not broadcast them to avoid trading merges back and forth.

A more complete sequence is given in the following figure. Suppose User A goes 'offline' (e.g., their phone goes to sleep, they shut down the app, they lose their data connection, etc), and in the mean time, both Users A and B update the Thread, with User A adding an `ANNOTATION` update, and User B adding a new Photo (`FILES` update). Now, when User A comes back online, there is a conflict, and both Users create a MERGE update to remedy this. A `MERGE` update has two parents, in this case, the `FILES` and `ANNOTATION` update from the different users. As always, the HEAD continues to point to the latest update (which in the example below eventually becomes an `ANNOTATION` from User B). Once both peers are online again, the more straightforward update and transmit mode of operation can continue.

![More complex Thread interaction where one or more peers are temporarily offline. Note that an external invite is the same as a normal invite, but the invite details are encrypted with a single use key, which is sharable with the invite update location.](https://cdn-images-1.medium.com/max/1600/1*3EuEtFHqUtALTczIeZ8_eg.png)

> More complex Thread interaction where one or more peers are temporarily offline. Note that an external invite is the same as a normal invite, but the invite details are encrypted with a single use key, which is sharable with the invite update location.

The same properties that make hash trees or blockchains useful for developing a shared, consistent (consensus-driven) state, also makes it possible to recover the full state of a Thread from the network as a whole. Because each Thread update references its parent(s), given a single point on the Thread chain, we can trace back all the way to the beginning of the Thread. For example, at any point along the sequence in the above figures, a peer can trace back the history of the Thread, as indicated by the solid arrows. This works particularly nicely when a peer `JOIN`s a thread, even at a point prior to the current `HEAD`. They can simply `JOIN`, and any existing Thread member can send them the latest `HEAD` (even via offline messages if needed). From here, they can explore the entire history of the Thread with ease. This is all really similar to git commit speak, in which one only needs to know about a single commit to be able to trace back the entire history of a code project; it’s also essentially how blockchains work.

### Permissions

- Private
- Read Only
- Open
- Public

#### Private

Private Threads are only accessible via the account that created them, and may be used for *internal* or app-based applications such as tracking different account devices, or *user*-specific applications such as a private camera-roll. 

#### Read Only

Read Only Threads are accessible to any peer that has been invited to the Thread, but only the *initiator* can actually modify the Thread in any way, whereas public Threads support annotations by *non-initiators*. These types of Threads are useful for public, one-way consumable feeds. 

#### Open

An open Thread is one in which any peer that has been invited to join the Thread can modify it, invite others, etc. These are the most common type of Thread. They can support things like multi-way chat, community-curated feeds, and are currently used in Textile Photos for private groups to share photos.


### Sharing Control

- Not Shared
- Invite Only
- Shared

In addition to Thread Types for Access Control, Textile supports _Thread Sharing_ for Sharing Control. 

#### Not Shared

For 'not-shared', the Thread is limited to a given predetermined set of "members".

#### Invite Only

Invite Only means only the initiator can invite additional peers. 


#### Shared

The least restrictive option ('shared') means that any existing member of the Thread may share/invite the Thread with others. 

#### Fixed Members

Threads also contain an additional field for `members`. This is a requirement of `Not Shared` (unless the Thread is remaining private). It can also be used in `Invite Only` to ensure that all participants know if future members could be invited. For example, imagine a 1-1 conversation where the other peer invites a stranger in. If you had joined with the notion that the initiator _could_ invite others (not fixed member list) then you might expect that could happen and behave slightly differently? 

#### Access Control & Sharing Control

To help illustrate the restrictions these fields provide, here is a table to give a rough idea of the available options:

```
Thread Type controls read (R), annotate (A), and write (W) access:

private   --> initiator: RAW, members:
read-only --> initiator: RAW, members: R
public    --> initiator: RAW, members: RA
open      --> initiator: RAW, members: RAW

Thread Sharing style controls if (Y/N) a thread can be shared:

not-shared  --> initiator: N, members: N
invite-only --> initiator: Y, members: N
shared      --> initiator: Y, members: Y
```

For example, a personal camera roll backup might be private and not-shared, whereas an open group (default in Textile Photos app) would be open _and_ shared. Alternatively, you could support a 'closed' group by using an open, but invite-only Thread. With three 'knobs' to adjust, the combination of Thread types is quite extensive, and may facilitate new and interesting types of interactions. We do not pretend to have uses for all combinations, and some combinations may be redundant, or even contradicting in some cases (for example, an 'open', 'shared' Thread with a 'members' list of 1 is essentially just a private Thread, because membership trumps the other options).

## Schemas 

Schemas are used to define how data is processed and its storage structure in a Thread. You can think of Textile Schemas as something akin to database schemas. Essentially, Textile uses these well-defined Schemas to describe what the Textile Peer should do with incoming Files (i.e are they images or JSON files?). When developing with Textile, developers can define or reuse any number of custom schemas.

Schemas include more than just file format, they can also contain information about how a file was processed or broken up for storage or transfer. In a simple use-case of image sharing, a Schema could contain information about a full-resolution photo and _also_ a thumbnail available for other peers to preview before fetching the full file.

Schemas also control the behavior of peers granted access to the Thread, letting them know which files they should Pin or leave ephemeral after adding to the thread. 

#### Example 

Below are the components of a Schema.

```
type Node struct {
    Name       string
    Pin        bool
    Plaintext  bool
    Mill       string
    Opts       map[string]string
    JsonSchema map[string]interface{}
    Links      map[string]*Link
}
```
```
type Link struct {
    Use        string
    Pin        bool
    Plaintext  bool
    Mill       string
    Opts       map[string]string
    JsonSchema map[string]interface{}
}
```

#### Default Schemas

Textile includes several Schemas by default. These are used in the Textile Photos app, but also provide useful examples of real-world Schema use. These Schemas are listed below, along with some examples of JSON-type Schemas for reference/demo purposes.

## Mills

A Textile Mill is simply an interface that can process raw file objects into Schema entries to post to a Thread. Mills can handle important steps like encryption in a standard and reliable way. They also can handle common preprocessing steps depending on the file type (e.g. size resampling for images). 

Depending on how the Schema is structured, Mills may be combined, run in series (i.e., one run on the output of a another) or parallel, etc. It is generally up to the client to satisfy the Schema via the requested Mills. For developers, adding new Mills is relatively straightforward. This makes Schemas and Mills extremely powerful and flexible. For instance, Textile supports a generic JSON Mill that provides a useful example for extending Textile with new Mills.

#### Examples

##### Mill Interface

```
type Mill interface {
    ID() string
    Encrypt() bool
    Pin() bool
    AcceptMedia(media string) error
    Options(add map[string]interface{}) (string, error)
    Mill(input []byte, name string) (*Result, error)
}
```

##### Results Object

```
type Result struct {
    File []byte
    Meta map[string]interface{}
}
```

#### Mill Endpoints

Currently, Textile supports five Mill 'endpoints' or methods: 
* `blob`: Takes a binary data blob, and optionally encrypts it, before adding to IPFS,
and returns a file object
* `schema`: Takes a JSON-based Schema, validates it, adds it to IPFS, and returns a file object
* `json`: Takes an input JSON document, validates it according to its schema.org definition,
optionally encrypts the output before adding to IPFS, and returns a file object
* `image/resize`: Takes an input image, and resizes/resamples it (optionally encrypting output),
before adding to IPFS, and returns a file object
* `image/exif`: Takes an input image, and extracts its EXIF data (optionally encrypting output),
before adding to IPFS, and returns a file object

## Files

In addition to [Messages](/learn#messages) and the various [#threads] annotation [Blocks](/learn#blocks), Textile supports adding arbitrary files  and data to Threads. These Files are a specific type of Block update, and are required to conform to a Thread's Schema. For most applications, Thread Files are the primary means of adding content to a Thread. Files can (currently) range from raw data 'Blobs', to Photos, to JSON documents. Adding additional File input types is as 'simple' as adding additional Mills.

Several steps are required to add a File (or directory of Files) to a Textile Thread. Firstly, a Schema must be defined for the given Thread (see [Schemas](/learn#schemas) for details), then the File(s) must be Milled (see [[Mills|Schemas#Mills]]), and the milled output (a `Directory` which is a `map` of [`Files`](https://github.com/textileio/textile-go/blob/master/repo/model.go#L11)) is then added to the Thread. Here the milled Files's top-level CID hash is used as the 'target' argument (see [Blocks](/learn#blocks) for details).

#### Model

| Key  | Type | Desc |
| ---- | ---- | ---- |
| `mill` | string | The _mill_ used to process the file (e.g., `/image/resize`, `/json`, etc |
| `checksum` | string | The pre-milled (md5) checksum of the input file |
| `source`| string | Source file CID |
| `opts` | string | md5 checksum of input mill options | 
| `hash` | string | CID hash of milled file |
| `key` | string | AES encryption key |
| `media` | string | Media type (e.g., `'application/json'`, `'image/jpeg'`) | 
| `name` | string | The name of the input file |
| `size` | int | The size of the milled file in bytes |
| `added` | datetime | The datetime the file was added to the thread |
| `meta` | JSON | Additional metadata |
| `targets` | array | Array of target CIDs |

## Blocks

Blocks  are the basic components for all interactions between Textile peers. From messaging, to sharing photos, to commenting and 'liking' content—each update to a Thread is contained in a block. Each block,

- Is hash-linked to its parent, forming a traversable tree or chain of block updates—a blockchain if you will.
- Is encrypted using private or shared keys depending on the rules of the Thread.
- Is cryptographically signed by its author so all exchanges over Textile are secure and tamper proof.
- 
#### Block Structure

In practice, Textile Blocks are relatively small (encrypted) [Protobuf messages](https://developers.google.com/protocol-buffers/), linked together by their IPFS CID (content id or hash). You can explore their proto definitions in our [GitHub repo](https://github.com/textileio/textile-go/tree/master/pb/protos). Essentially, a `ThreadBlock` (or `Block` for short) is made up of a `BlockHeader`, a `Type`, and an optional `Payload`. The `BlockHeader` contains information such as the event timestamp (`Date`), an array of `Parent` Blocks (this is usually an array of length one), the original Block `Author` (Peer Id), and an `Address`, which is the [[Account address|Wallet#Accounts]] of the Block's original author. The `Type` field represents the kind of update the block represents and can be one of the eleven block types outline in the table below.

After the header and type comes the block's `Payload`. For some block types, this can be left null or empty. For example, `Merge` blocks are only ever generated locally, and so do not need to contain a payload (additionally, these can be stored as plaintext, as they carry no identifiable information). Similarly, a `Leave` block requires no payload information, just the header and type. Conversely, mostly other block types require at least a `Target` field (the target block to which that update refers), and often also requires a `Contact` and/or `Body` field. Contacts are used to represent another Peer (say for an Invite block) and Body is generally used for textual information (say the body of a Comment block). The most complex block type is a `Files` block. In this case, the 'target' is actually the top-level CID/hash of a directory (DAG Node) that contains one or more outputs from a [[Schema|Schemas]], and the block update itself includes the keys required to decrypt the ciphertext. See [Files](/learn#files) for details on the structure of the Files objects.

#### Block Types

Textile Threads support eleven different Block `Types`. Each type describes a specific event or update to a Thread. From the most basic events such as a Thread `Join` or `Leave`, to more complex interactions such as a `Comment` or `Like` of a previous block update (such as a `Files` block).

| Type | Description |
|---|---|
| Merge | Used for conflict resolution, and always has _two_ parents. See [Threads](./Threads#Example) for details. |
| Ignore | Used to 'delete' or otherwise request that peers ignore or remove a previous Block from the Thread (currently not used in Textile Photos) |
| Flag | Used to 'highlight' a given previous Block. It is currently not used in Textile Photos, but could be used by an application developer to 'star' an item, flag it as inappropriate, or even mark it for removal or some other 'state'. |
| Join | Used when a peer joins a Thread. |
| Leave | Used when a peer leaves a Thread. Leaves have no payload. |
| Announce | Used to announce information to all members of a Thread, such as when a user updates their avatar, or changes their username. |
| Message | Represents and 'standalone' message or piece of text. This might be a message in a chat application, or a specific text-based update. |
| Files | Used to add data to a Thread. In Textile Photos, this is generally a new Photo. However, and File object can be used. See [Files](./Files) for details. |
| Comment | Used to annotate a previous block with textual information. This is commonly used to allow peers to 'comment' on a given Photo or post. Any other type of Block could be a target for a Comment Block (including another Comment block). |
| Like | Used to annotate a previous block with a 'like' flag. This is commonly used to allow peers to 'like' a given Photo or post. Any other type of Block could be a target for a Like Block (including another Like block). |
| Invite | Used to indicate an invite to the Thread has been created. The type of invite will depend on how it was created, and could be a 'direct' or 'open' invite. |

# Services

## Cafes

A Textile peer running in _Cafe_ mode provides additional services for other peers on the network, such as backup, offline message in-boxing, etc. Access to Cafe services is granted via JWT-based sessions, and initial registration with a Cafe requires an access token. Any peer can operate a Cafe, though they work best for always-on peers. Cafes run an 'extra' network API that handles client and host requests over libp2p or HTTP.

#### [Read about running Cafes](./run/Cafe-Server)

# Networking

Textile [Threads](/learn#threads) maintain shared state through peer-to-peer (p2p) networking. Textile builds on the [`libp2` library](https://libp2p.io/) for its networking needs. `libp2p` is a networking stack and library (you might have heard it called a protocol suite) modularized out of the IPFS project, and bundled separately for other tools to use. Essentially, `libp2p` does all the heavy network lifting so that we can focus on our core task: exchanging updates between communicating peers.

Like many IPFS-based projects, Textile uses [Protocol Buffers](https://developers.google.com/protocol-buffers/) for over-the-wire communication, and advanced cryptographic algorithms to secure those messages (see [[Security|Security]]). Essentially, each update to the shared group state is just an encrypted Profobuf message with two parts: a header with author and date info, and a body with the type-specific data. These pieces are sent in their own inner-'envelope' which contains a link to the encrypted message and the Thread ID. This inner-envelope is then signed by the sender and placed into the wire 'envelope' along with it's signature. You can read more about some of the cryptographic tools Textile uses in this blog post. You can also check out how we structure our Protobuf messages on our [GitHub repo](https://github.com/textileio/textile-go/blob/master/pb/protos/thread.proto).

#### Content Addressable Data

Each update to a Thread is backed by an IPFS CID hash (i.e., they are content addressable chunks of data on IPFS). This means where the data is stored is no longer relevant... IPFS will find it on the network via it’s hash. This helps us address our fifth requirement, that we have a way to link updates via their content, rather than where they are stored. The next paragraph provides a summary of how content addressing on IPFS works, but its worth getting familiar with these concepts by reading our [blog post on this topic](https://medium.com/textileio/enabling-the-distributed-web-abf7ab33b638)).

Rather than referencing a file or chunk of data by its location (think HTTP), we reference it via its [fingerprint](https://en.wikipedia.org/wiki/Fingerprint_%28computing%29). In IPFS and other such systems, this means identifying content by its cryptographic hash, or even better, a [self-describing content-addressed identifier](https://en.wikipedia.org/wiki/Fingerprint_%28computing%29) (or [multihash](https://github.com/multiformats/multihash)). A cryptographic hash is a (relatively) short alphanumeric string that’s calculated by running your content through a [cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) (like [SHA-3](https://en.wikipedia.org/wiki/SHA-3)). For example, when the (unencrypted) Textile logo is added to IPFS, its multihash ends up being QmbgGgWW3vH7v9FDxVCzcouKGChqGEjtf6YLDUgSHnk5J2. This ‘hash’ is actually the CID (Content IDentifier) for that file, computed from the raw data within that PNG. It is guaranteed to be cryptographically unique to the contents of that file, and that file only. If we change that file by even one bit, the hash will become something completely different.

Now, when we want to access a file over IPFS (like the above logo), we can simply ask the IPFS network for the file with that exact CID, the network will find the peers that have the data (using a DHT), retrieve it, and verify (using the CID) that it’s the correct file. What this means is we can technically get the file from multiple places because as long as the file matches the hash, we know we’re getting the right data. Which brings us to the solution to our final requirement… use IPFS! For now, Textile is maintaining a network of large, homogeneous, volunteer nodes (we call them [Cafes](/learn#cafes)) to 'pin' and store content on IPFS. It is important to note here that the other nodes doing the pinning are the same as the nodes on your phone — Textile Nodes that offer a pinning service to other peers.

**[Next: Install Textile](../install)**