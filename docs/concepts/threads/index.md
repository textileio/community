_Threads_ are distributed datasets of encrypted messages and files, often shared between peers, and governed by [schemas](/concepts/threads/files#schemas). Threads allow group members to keep a record of who shared what data, and when. This simple concept is actually quite powerful — and on the surface, you can think of a thread like a decentralized database, shared between specific participants. The structure of a thread's [files](/concepts/threads/files) (data) are defined by [schemas](/concepts/threads/files#schemas) and contain [blocks](#blocks) of information (or updates). They are specifically designed to work well in mobile, offline-first scenarios, where peers are constantly making updates, coming online, and going offline. Avoiding state conflicts is a central focus of their operation. This issue comes up frequently when working collaboratively on documents, updating shared databases, etc.

## Security



## Conflict Avoidance/Resolution

A thread is essentially a tree of updates, where each update represents some specific action or event (see [blocks](#blocks) for details).

For the purposes of updating a shared thread of photos or similar data, it turns out that an [operation-based CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) that supports append-only operations is pretty much all that is needed. You can think of thread's CRDT (which shares some ideas with `ipfs-log`) as an immutable, append-only tree that can be used to model a mutable, shared state between peers. Every entry in the tree is saved on IPFS, and each points to a hash of previous entry(ies) forming a graph. These trees can be [3-way and fast-forward merged](https://www.atlassian.com/git/tutorials/using-branches/git-merge).

## Sharing and Recovery

The same properties that make hash trees or blockchains useful for developing a shared, consistent (consensus-driven) state, also makes it possible to recover the full state of a thread from the network as a whole. Because each thread update references its parent(s), given a single point on the thread tree, the entire thread history can be recovered. In terms of sharing a thread, instead of sharing the entire dataset, a peer only has to share a single (tiny) update with another peer. This is similar to git, in which a single commit can be used to trace back the entire history of a code project. However, a thread uses IPFS to pull each update from the _network as a whole_, not a single git repo.

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

Check out the comprehensive [threads overview](/concepts/threads) for more about how threads work.

!!! info
    Access control will be moving to a more familiar, _roll-based_ design in a future release. See [this GitHub issue](https://github.com/textileio/go-textile/issues/694) for more.

## Blocks

<br>
