_Threads_ are distributed datasets of encrypted messages and files, often shared between peers, and governed by [schemas](/concepts/threads/files#schemas). Threads allow group members to keep a record of who shared what data, and when. This simple concept is quite powerful — and on the surface, you can think of a thread like a decentralized database, shared between specific participants. The structure of a thread's [files](/concepts/threads/files) (content) are defined by [schemas](/concepts/threads/files#schemas) and contain [blocks](#blocks) of information (or updates). They are specifically designed to work well in mobile, offline-first scenarios, where peers are constantly making updates, coming online, and going offline. Avoiding state conflicts is a central focus of their operation. This issue comes up frequently when working collaboratively on documents, updating shared databases, etc.

Combination of libp2p and pubsub.

## Requirements

- 

## Security


Agent based...

dots files


## Conflict Avoidance/Resolution

For the purposes of updating a shared thread of photos or similar data, an [operation-based CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) that supports append-only operations is all that is needed. You can think of thread's CRDT (which shares some ideas with `ipfs-log`) as an immutable, append-only tree that can be used to model a mutable, shared state between peers. Every entry in the tree is saved on IPFS, and each points to a hash of previous entry(ies) forming a graph. These trees can be [3-way and fast-forward merged](https://www.atlassian.com/git/tutorials/using-branches/git-merge).

## Recoverability

The same properties that make hash trees or blockchains useful for developing a shared, consistent (consensus-driven) state, also makes it possible to recover the full state of a thread from the network as a whole. Because each thread update references its parent(s), given a single point on the thread tree, the entire thread history can be recovered.

## Access Control

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

!!! info
    Access control will be moving to a more familiar, _roll-based_ design in a future release. See [this GitHub issue](https://github.com/textileio/go-textile/issues/694) for more.

## Blocks

Blocks are the raw components of a thread. Think of them as an append-only log of thread updates where each one is hash-linked to its parent(s), forming a tree. New / recovering peers can sync history by simply traversing the hash tree.

In practice, blocks are small (encrypted) [Protobuf messages](https://developers.google.com/protocol-buffers/), linked together by their IPFS CID (content id or hash). You can explore the proto definitions [here](https://github.com/textileio/textile-go/tree/master/pb/protos).

There are several block types:

```
-  MERGE:    3-way merge added.
-  IGNORE:   A block was ignored.
-  FLAG:     A block was flagged.
-  JOIN:     Peer joined.
-  ANNOUNCE: Peer set username / avatar / inbox addresses
-  LEAVE:    Peer left.
-  TEXT:     Text message added.
-  FILES:    File(s) added.
-  COMMENT:  Comment added to another block.
-  LIKE:     Like added to another block.
```

## Files

The `FILES` block type points to off-thread data in the form of an IPFS DAG. These DAGs are described by and validated against the thread's schema.

!!! hint
    Any data added to a thread ends up as a [_file_](/concepts/threads/files), regardless of whether or not the source data was an actual file. For example, echoing a string into a thread results in a "file" containing that string.
    
Read more about files in [the next section](/concepts/threads/files).

<br>
