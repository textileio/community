TODO: Replace diagrams with xmind to match files diagrams, add top-level design constraints, roadmap

Threads are built into the fabric of Textile as a way to allow group members to keep a record of who shared what data, and when. This simple concept is actually quite powerful — and on the surface, you can think of a Thread like a decentralized database, shared between specific participants. Threads are defined by schemas and contain blocks of information (or updates). They are specifically designed to work well in mobile, offline-first scenarios, where peers are constantly making updates, coming online, and going offline. This means avoiding state conflicts is a central focus of their operation. This issue comes up frequently when working collaboratively on documents, updating shared databases, etc.

## Conflict Avoidance/Resolution

For the purposes of updating a shared Thread of photos or similar data, it turns out that an [operation-based CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) that supports append-only operations is pretty much all you need to get going. You can think of Textile's Threads CRDT (which shares some ideas with `ipfs-log`) setup as an immutable, append-only tree that can be used to model a mutable, shared state between peers. Every entry in the tree is saved on IPFS, and each points to a hash of previous entry(ies) forming a graph. These trees can be [3-way and fast-forward merged](https://www.atlassian.com/git/tutorials/using-branches/git-merge).

For those familiar with git and other similar system, you might be thinking this sounds a lot like a [git hash tree](https://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html#meet-the-tree-object), [Merkle DAG](https://twitter.com/Textile01/status/1004436869734543360), or even a [blockchain](https://en.wikipedia.org/wiki/Blockchain). And you’d be right! The concepts are very similar, and this buys us some really nice properties for building and maintaining a shared state. By modeling our shared Thread state in this way, we benefit from tried and tested methods for allowing a peer to incorporate other peers' updates into their state while maintaining history (via fast-forwards and three-way merging for example).

Each Thread is essentially a chain of updates, where each update represents some specific action or event (see [[Blocks|Blocks]] for details). For instance, when you create a new Thread, under-the-hood you are actually creating a `JOIN` update on a new Thread chain. Similarly, when you update the Thread via a new photo (`FILES` update), or message (`MESSAGE` update), you're actually updating that Thread chain. After each modification, the `HEAD` of the Thread will point to the latest update.

## Example

To give you a better idea of what exactly we're talking about, consider the following set of operations: User A creates a new Thread, and adds a Photo. They then externally invite User B (sent via some other secure communication channel), who eventually joins the Thread. But before User B is able to join the Thread, User A adds another Photo, moving the Thread’s HEAD forward. By the time User B joins the Thread, they'd end up with a Thread sequence that looks something like this:

![Thread join example. Solid arrows point towards the ‘parent’ of a given update, over-the-wire communications are indicated with a 📶-style arrow, and messages that are rebroadcast (e.g., via the welcome message) are indicated with a dashed arrow. Similarly, merges point to both their parent updates.](https://cdn-images-1.medium.com/max/2400/1*h9eNwOauuT7mMeS4o-yGbw.png)

> Thread join example. Solid arrows point towards the 'parent' of a given update, over-the-wire communications are indicated with a 📶-style arrow, and messages that are rebroadcast (e.g., via the welcome message) are indicated with a dashed arrow. Similarly, merges point to both their parent updates.

Here, we see the merge happening at the end of the sequence because the bottom peer is joining via an external invite that is no longer HEAD , forcing them to merge the most recent DATA update with their own JOIN update. But since merge results are deterministic (given the same parents), both peers create the MERGE update locally, and do not broadcast them to avoid trading merges back and forth.

A more complete sequence is given in the following figure. Suppose User A goes 'offline' (e.g., their phone goes to sleep, they shut down the app, they lose their data connection, etc), and in the mean time, both Users A and B update the Thread, with User A adding an `ANNOTATION` update, and User B adding a new Photo (`FILES` update). Now, when User A comes back online, there is a conflict, and both Users create a MERGE update to remedy this. A `MERGE` update has two parents, in this case, the `FILES` and `ANNOTATION` update from the different users. As always, the HEAD continues to point to the latest update (which in the example below eventually becomes an `ANNOTATION` from User B). Once both peers are online again, the more straightforward update and transmit mode of operation can continue.

![More complex Thread interaction where one or more peers are temporarily offline. Note that an external invite is the same as a normal invite, but the invite details are encrypted with a single use key, which is sharable with the invite update location.](https://cdn-images-1.medium.com/max/1600/1*3EuEtFHqUtALTczIeZ8_eg.png)

> More complex Thread interaction where one or more peers are temporarily offline. Note that an external invite is the same as a normal invite, but the invite details are encrypted with a single use key, which is sharable with the invite update location.

The same properties that make hash trees or blockchains useful for developing a shared, consistent (consensus-driven) state, also makes it possible to recover the full state of a Thread from the network as a whole. Because each Thread update references its parent(s), given a single point on the Thread chain, we can trace back all the way to the beginning of the Thread. For example, at any point along the sequence in the above figures, a peer can trace back the history of the Thread, as indicated by the solid arrows. This works particularly nicely when a peer `JOIN`s a thread, even at a point prior to the current `HEAD`. They can simply `JOIN`, and any existing Thread member can send them the latest `HEAD` (even via offline messages if needed). From here, they can explore the entire history of the Thread with ease. This is all really similar to git commit speak, in which one only needs to know about a single commit to be able to trace back the entire history of a code project; it’s also essentially how blockchains work.

# Thread Types

Currently, Textile supports four types of Threads, 'private', 'read_only', 'public', or 'open' to support different levels of _Access Control_. As you might have guessed, private Threads are only accessible via the account that created them, and may be used for *internal* or app-based applications such as tracking different account devices, or *user*-specific applications such as a private camera-roll. Similarly, read_only Threads are accessible to any peer that has been invited to the Thread, but only the *initiator* can actually modify the Thread in any way, whereas public Threads support annotations by *non-initiators*. These types of Threads are useful for public, one-way consumable feeds. Conversely, an open Thread is one in which any peer that has been invited to join the Thread can modify it, invite others, etc. These are the most common type of Thread. They can support things like multi-way chat, community-curated feeds, and are currently used in Textile Photos for private groups to share photos.

In addition to Thread Types for Access Control, Textile supports _Thread Sharing_ for Sharing Control. When configuring a Thread, a `Type` field specifies the Thread type as specified above ('private', 'read_only', 'public', or 'open'.), and a `Sharing` field specifies if sharing is allowed and by whom. Options include 'not-shared', 'invite-only', and 'shared'. For 'not-shared', the Thread is pinned to a given set of "members", whereas 'invite-only' means only the initiator can invite additional peers. The least restrictive option ('shared') means that any existing member of the Thread may share/invite the Thread with others. Finally, an additional `Members` field, can be used to control which peers are able to join a given Thread. If this field is left empty, then all peers are potential members, and invites are governed entirely by the `Sharing` field. If this field contains one or more peers, then only those peers are permitted to interact with the given Thread. It is important to note that an invite-only Thread with a fixed members list means that invites can only be sent to the member list by the initiator, whereas an invite-only Thread with an empty member list means that invites can be sent to anyone by the initiator. This is important because _all_ members of a Thread should expect that the member list is _either_ fixed or not. For example, imagine a 1-1 conversation where the other peer invites a stranger in. If you had joined with the notion that the initiator _could_ invite others (not fixed member list) then you might expect that could happen and behave slightly differently? To help illustrate the restrictions these fields provide, here is a table to give a rough idea of the available options:

### Access Control & Sharing Control

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

# From the Command-line

From the command-line, Threads can be added, listed, accessed, removed, and their members can be queried. See `textile theads --help` for details. The most basic operation, adding a new Thread, takes multiple (mostly optional) inputs, and produces a new, empty Thread. Inputs can include a `key`, which is a locally unique key used by an app to identify this thread on recovery, a `type`, which sets the thread type as discussed above, a `sharing` option, which controls the sharing control as discussed above, and a `member` option to control Thread membership. This one can be used multiple times to include multiple peers, or left blank to include any/all peers. The additional options, `schema`, `media`, and `camera-roll` are used to control the [[Schema|Schemas]] used for the Thread, and are discussed elsewhere.

```
$ textile threads add --type 'open' --sharing 'shared' --media "My Open+Shared+Media Thread"
{
    "id": "blahblahblahblahblahblahblahblah",
    "key": "somelongalphanumerickey",
    "name": "My Open+Shared+Media Thread",
    "schema": {
        "name": "media",
        "pin": true,
        "plaintext": false,
        "links": {
            "large": {
                "use": ":file",
                "pin": false,
                "plaintext": false,
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "800"
                }
            },
            "small": {
                "use": ":file",
                "pin": false,
                "plaintext": false,
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "320"
                }
            },
            "thumb": {
                "use": "large",
                "pin": true,
                "plaintext": false,
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "100"
                }
            }
        }
    },
    "schema_id": "Qmblahblablablahbnlajbnlajlk",
    "initiator": "P4blahblahblahblahbla",
    "type": "OPEN",
    "sharing": "SHARED",
    "state": "LOADED",
    "peer_cnt": 1,
    "block_cnt": 1,
    "file_cnt": 0
}
```
