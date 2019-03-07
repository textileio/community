<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>documentation</small></h1>

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

## What can you do with it?

#### Users can:

- Securely store your photos, videos, documents, or any other type of file
- Share and chat with friends and family
- Access your files and messages on multiple devices/apps, without worrying about device storage

#### Advanced users can:

- Choose your level of data replication
- Choose or federate your own backup nodes or cafes

#### Application developers can:

- Skip user management, authentication, data storage, and messaging by integrating one of the Textile SDKs
- Request read and write access to your users’ data
- Design new schemas for your users' data

## How does it work?

At the core of Textile is the user account [[Wallet|Wallet]], which is backed by a mnemonic phrase for recovery. Each wallet can create any number of [[Accounts|Wallet#Accounts]], which are used to enter the network and sync your data between devices/apps.

At a high level, a user account is a collection of operation-based [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) called [[Threads|Threads]]. Threads are updated with messages called [[Blocks|Blocks]]. These Blocks are hash-linked together, forming a traversable tree. Practically speaking, a Thread represents a set of [[Files|Files]] and/or [[Messages|Messages]] potentially shared between users. You can create Threads that only accept certain types of files (photos, videos, etc.) This is achieved by building or using a built-in file [[Schemas|Schemas]]. Schemas provide a really powerful way to structure, encode, and encrypt your data and are fulfilled via Schema [[Mills|Schemas#Mills]].

Account recovery is handled by a network of federated Textile nodes called [[Cafes|Cafes]], which offer backup and offline inboxing services to other peers. Read more about Threads, Blocks, Files and Schemas, as well as Sharing, Cafes, and more via the sidebar links to the right 👉.