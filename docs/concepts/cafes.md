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

Textile provides tooling for certain types of [network-wide queries](/concepts/search), like user account search. Changes to a peer's public-facing [contact](/concepts/contacts) are indexed and made query-able by its cafes. So, while you do not need to be registered with a cafe in order to leverage these queries, doing so may increase your chances of being discovered by others, assuming you local peer is periodically offline.

### Web endpoints

#### IPFS gateway

All desktop and server peers host an IPFS gateway. However, the gateway is most useful on a cafe peer where clients' content is stored. See the [IPFS Gateway](/develop/ipfs-gateway) section for more, including details about a [decryption service](http://127.0.0.1:8000/develop/ipfs-gateway/#decryption-service) unique to Textile gateways.

#### Latest thread share

_Status Pending. We plan to support the ability to publish threads over Textile that can be tracked and exposed over cafes without needing full Textile clients. [Follow on GitHub](https://github.com/textileio/go-textile/issues/697)._

### Cafe functions

_Status Exploring. We are looking into the concept of offering server-less function support directly inside a cafe. Examples of server-less function uses include: Publishing a web-hook, updating an RSS feed, or triggering a push notification._

## Deploying

Cafes are easy to deploy and manage (single executable, Docker). Start [here](/install/the-daemon/#run-a-cafe-peer) to run your own.

## Try one

Textile hosts a [development cafe](https://us-west-dev.textile.cafe/) that you are free to use for non-production purposes.

!!! danger

    Use the dev cafe at your own risk. Your data may be deleted without notice.

Connection details:

| Peer ID                                                | API                                                                      | Gateway                                                                           | Token                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `12D3KooWGN8VAsPHsHeJtoTbbzsGjs2LTmQZ6wFKvuPich1TYmYY` | [`https://us-west-dev.textile.cafe/`](https://us-west-dev.textile.cafe/) | [`https://us-west-dev.textile.cafe/ipfs`](https://us-west-dev.textile.cafe/ipfs/) | `uggU4NcVGFSPchULpa2zG2NRjw2bFzaiJo3BYAgaFyzCUPRLuAgToE3HXPyo` |

### Community Hosted Cafes

[RTrade](https://www.rtradetechnologies.com/) hosts several cafes for companies and individuals to use as part of their developer platform, [Temporal](https://temporal.cloud). You can try one of RTrade's [development cafes](https://us-west-dev.textile.cafe/) freely for non-production purposes.

!!! danger

    Use the RTrade cafe at your own risk. Your data may be deleted without notice.

Connection details:

| Peer ID                                                | API                                                                      | Gateway                                                                           | Token                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `12D3KooWGN8VAsPHsHeJtoTbbzsGjs2LTmQZ6wFKvuPich1TYmYY` | [`https://cafe1.temporal.cloud/`](https://cafe1.temporal.cloud/) [`https://cafe2.temporal.cloud/`](https://cafe2.temporal.cloud/) | [`https://textile.gateway.temporal.cloud/ipfs/`](https://textile.gateway.temporal.cloud/ipfs/) | `2MHxDxNaJot3aP7Q1V2emJA5D5iKwEnSKRdh3gM1wPBz1jwhDearLCRJfhopR` |

<br>
