Textile is a set of tools and trust-less infrastructure for building _censorship resistant_ and _privacy preserving_ applications.

While interoperable with the whole [IPFS](https://ipfs.io/) peer-to-peer network, Textile-flavored peers represent an additional layer or sub-network of **users, applications, and services**.

With good encryption defaults and anonymous, disposable application services like [cafes](https://docs.textile.io/concepts/cafes/), Textile aims to bring the decentralized internet to real products that people love.

![The network](/images/net.png){: .center}

## How it works

Textile peers use p2p messaging patterns to orchestrate shared datasets, or more specifically your chats, contacts, albums, and more. With iCloud or another major cloud provider, you expect these datasets to be synced across your iOS devices. Additionally, if you've shared a dataset like a playlist or photo album with other users, you would expect changes to be synced with their devices as well. You can expect the same with Textile, but without the centralized control of a single organization or government.

A traditional cloud provider will store your datasets in one, maybe a few, central location(s). This means that you _must_ trust the provider won't decide to drop your access, and in some cases, to _not_ view or expose the contents of your datasets.

In Textile, these types of datasets are called _threads_. At the core of every thread is a secret. Only peers that possess the secret are able to decrypt thread content or follow linkages.

!!! hint

    Unlike a blockchain, threads are not based around the idea of consensus. Instead, they follow an agent-centric approach similar to [holochain](https://holochain.org/). Each peer has authority over thread access-control and storage.

Because threads are simply a hash-chain of update messages, or [blocks](/concepts/threads#blocks), they can represent any type of dataset. Some blocks point to off-chain data stored on IPFS. For example, a set of photos, a PDF, or even an entire website. Application developers are able to add structure to threads and make them interoperable with other applications by using [schemas](/concepts/threads/files#schemas).

Threads are auto-magically synced with other account peers. For example, you may have one peer on your phone, and another on your laptop, both with access to the same account seed (more about accounts [here](/concepts/the-wallet#accounts)). Threads can also be shared with other non-account peers (other users). In any case, each peer maintains a copy of its threads. A p2p messaging protocol keeps all the copies in sync.

The special hash-chain or graph structure of a thread allows them to be easily shared with other peers and backed-up to [cafes](/concepts/cafes). Given one message, you can find all the others.

Let's look a little closer at the different actors on the network.

### Account Peers

User _account peers_ share access to a single account from a [data wallet](/concepts/the-wallet). You can think of the wallet as a collection of thread secrets. Account peers typically run on desktops, laptops, and mobile devices and expose APIs for encrypting, storing, and sharing files/data/messages, among other functions.

Account peers will automatically stay in sync. Read more about account sync [here](/concepts/the-wallet#sync).

### Cafe Peers

_Cafe peers_ (or just cafes) are _anonymous_ and _disposable_ infrastructure. They provide services on behalf of users and applications _without requiring trust_. For example, once an account peer is registered with a cafe,

-   all of its local (default encrypted) data is automatically synced (pinned).
-   encrypted thread snapshots (HEAD) are automatically synced for new device sign-in and recovery.
-   it will have an always-online message inbox for receiving thread updates from other peers when offline.
-   its contact info will be indexed and made available for search on the network.

Unlike account peers, cafes need to be online at all times in order to function properly. For this reason, they typically run in a server environment. They are easy to deploy & manage (single executable, Docker).

!!! tip

    An account peer may be registered with more than one cafe, and account peers do not need to be registered to the same cafe(s). Additionally, peers can easily migrate from one cafe to another, simply be deregistering from one and registering with another.

### Applications

Finally, applications run alongside or include an account peer and can create and/or access their data. Textile maintains a few reference apps like [Textile Photos](https://www.textile.photos) for desktop and mobile. Check out the [client SDKs](/#integrate-into-your-apps) for information on how to leverage an account peer in your application.

## Why IPFS?

IPFS is the perfect file system for Textile for a few reasons:

1. IPFS uses [**content-addressed data**](https://en.wikipedia.org/wiki/Content-addressable_storage), meaning that content can be requested from the network as a whole by an _immutable address_, rather than from a single host with an arbitrary URL. This stands in the way of censorship and opens the door to Textile's decentralized, recoverable, and cross-application data storage.
2. IPFS ships with a [libp2p](https://github.com/libp2p) host, which is the **best-in-class peer-to-peer networking** library.
3. Textile believes that IPFS is the distributed web of the future. Core to our mission is the idea that Textile accounts, applications, and data are **interoperable with the larger IPFS network**.

<br>
