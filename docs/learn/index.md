# How it works

Textile is a set of tools and decentralized infrastructure for applications that run on the IPFS peer-to-peer network. While data is interoperable with the whole network, Textile-flavored peers represent an additional layer or sub-network of users, applications, and services.

![The Network](https://s3.amazonaws.com/textile.public/net4.png)

## Account Peers

User _account peers_ share access to a single account from a [_data wallet_](/learn/wallet). You can think of the data wallet as a collection of keys to shared datasets called [_threads_](/learn/threads). Account peers typically run on desktops, laptops, and mobile devices and expose APIs for encrypting, storing, and sharing files/data/messages, among other functions.

## Cafe Peers

_Cafe peers_ (or just cafes) are _anonymous_ and _disposable_ infrastructure. They provide services on behalf of users and applications. For example, once an account peer is registered with a cafe,

- All of its local data is automatically synced (pinned).
- Encrypted thread snapshots (HEAD) are automatically synced for new device sign-in and recovery.
- It will have an always-online message inbox for receiving thread updates from other peers when it's offline.
- Its contact info will be indexed and made available for search on the network.

Unlike account peers, cafes need to be always online in order to properly function. For this reason, they typically run in a server environment. They are easy to deploy & manage (single executable, Docker).

An account peer may be registered with more than one cafe, and each peer for a given account need to be registered to the same cafe.
