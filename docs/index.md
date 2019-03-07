<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>documentation</small></h1>

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

## Why use Textile?

### For Developers

- Give users control of the data they create.
- Enable end-to-end encrypted communication easily.
- Tap into decentralized storage protocols to make your app more resistant to censorship.
- Easily leverage decentralized protocols from mobile, desktop, and web apps.

### For Users

- Tap into Textile apps to securely store photos, videos, documents, and other personal data
- Privately share and chat with friends and family
- User technology that doesn't manipulate your or sell hyour data.
- Access your data, messages, and contacts from any app and across multiple devices... it's yours.

#### Advanced Users

- Add any level of replication to your personal data (photos, music, notes).
- Create your own backup nodes (Cafes) and share them with small groups of people.

## How does it work?

At the core of Textile is the user account [Wallet](learn#wallets), which is backed by a mnemonic phrase for recovery. Each wallet can create any number of [Accounts](learn#accounts), which are used to enter the network and sync your data between devices/apps.

At a high level, a user account is a collection of operation-based [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) called [Threads](learn#threads). Threads are updated with messages called [Blocks](/learn#blocks). These Blocks are hash-linked together, forming a traversable tree. Practically speaking, a Thread represents a set of [Files](/learn#files) and/or [Messages](/learn#messages) potentially shared between users. You can create Threads that only accept certain types of files (photos, videos, etc.) This is achieved by building or using a built-in file [Schemas](/learn#schemas). Schemas provide a really powerful way to structure, encode, and encrypt your data and are fulfilled via Schema [Mills](/learn#mills).

Account recovery is handled by a network of federated Textile nodes called [Cafes](/learn#cafes), which offer backup and offline inboxing services to other peers. Read more about Threads, Blocks, Files and Schemas, as well as Sharing, Cafes, and more via the sidebar links to the right 👉.