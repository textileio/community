# Cafes

_A cafe is a Textile peer that offers additional services to the peer network_

Access to cafe services is granted via JWT-based sessions, and initial registration with a cafe requires an access token. Any peer can operate as a cafe, though they work best for always-on peers. cafes run an 'extra' network API that handles client and host requests over libp2p or HTTP.

## Services

### Backup

The primary function of a cafe is to provide a recovery mechanism for its _clients_. Once registered with a cafe, clients' data (which is, by default, encrypted) is automatically synced. This involves a combination of authenticated IPFS pinning and [thread](/learn/threads) snapshots. A Thread snapshot contains only the metadata and latest known update hash (HEAD) needed to reconstruct the entire Thread from scratch, and is encrypted with the client's [account](/learn/wallet#accounts) key. This means that cafes only issue encrypted backups and are _not_ able to read their clients' Threads. This also means that the snapshots are useless if a client loses their account key.

### Offline Inbox-ing

Very often, a peer is not online or is otherwise unreachable and therefore unable to receive a message (usually a [thread](/learn/threads) update message). In this failed state, the sender can send the message to the recipient's always-online cafe(s), ensuring the message is delivered when the recipient returns online. In practice, this means that, when available, cafe "inbox" addresses are attached to Textile peer [contacts](/learn/contacts), which get published to the network. This is sort of like your phone's voicemail service, but here you're in control of where the message is actually delivered (ideally a computer you control or trust).

### User Search Indexing

Textile provides tooling for certain types of network-wide queries, like user search. Changes to a peer's public-facing [contact](/learn/contacts) is indexed and made query-able by its cafes. So, while you do not need to be registered with a cafe in order to leverage these queries, doing so may increase your chances of being discovered by others, assuming you local peer is periodically offline.
