_Cafe peers_ (or just cafes) are _anonymous_ and _disposable_ infrastructure. They provide services on behalf of users and applications.

Access to cafe services is granted via JWT-based sessions, and initial registration with a cafe requires an access token. Any peer can operate as a cafe, though they work best for always-on peers. Cafes run an 'extra' network API that handles client and host requests over libp2p or HTTP.

!!! tip
    An account peer may be registered with more than one cafe, and account peers do not need to be registered to the same cafe(s). Additionally, peers can easily migrate from one cafe to another, simply be deregistering from one and registering with another.

## Services

### Backup

One of the primary functions of a cafe is to provide a recovery and new device sign-in mechanism to its _clients_. Once registered with a cafe, clients' data (which is, by default, encrypted) is automatically synced. This involves a combination of authenticated IPFS pinning and [thread](/learn/threads) snapshots. A thread snapshot contains only the metadata and latest known update hash (HEAD) needed to reconstruct the entire thread from scratch, and is encrypted with the client's [account](/learn/wallet#accounts) key. This means that cafes only issue encrypted backups and are _not_ able to read their clients' threads. This also means that the snapshots are useless if a client loses their account key.

### Message inbox-ing

Very often, a peer is not online or is otherwise unreachable and therefore unable to receive a message (usually a [thread](/learn/threads) update message, or [block](/learn/threads/blocks)). In this failed state, the sender can send the message to the recipient's always-online cafe(s), ensuring the message is delivered when the recipient returns online. In practice, this means that, when available, cafe "inbox" addresses are attached to [contacts](/learn/contacts), which get published to the network. This is sort of like your phone's voicemail service, but here you're in control of where the message is actually delivered. Most importantly, because the update messages are encrypted, you _do not_ need to trust the cafe hosting the inbox.

### User account indexing

Textile provides tooling for certain types of network-wide queries, like user account search. Changes to a peer's public-facing [contact](/learn/contacts) is indexed and made query-able by its cafes. So, while you do not need to be registered with a cafe in order to leverage these queries, doing so may increase your chances of being discovered by others, assuming you local peer is periodically offline.

## Deploying

Cafes are easy to deploy & manage (single executable, Docker). Start [here](/run/daemon/#run-a-cafe-peer) to run your own.

<br>
