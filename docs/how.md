# How does it work?

## Data Wallet

At the core of Textile is the user account [[wallet|Wallet]], which is backed by a mnemonic phrase for recovery. Each wallet can create any number of [[Accounts|Wallet#Accounts]], which are used to enter the network and sync your data between devices/apps.

At a high level, a user account is a collection of operation-based [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) called [[threads|Threads]]. Threads are updated with messages called [[blocks|Blocks]]. These blocks are hash-linked together, forming a traversable tree. Practically speaking, a thread represents a set of [[files|Files]] and/or [[messages|Messages]], potentially shared between users. You can create threads that only accept certain types of files (photos, videos, etc.). This is achieved by building or using a built-in file [[schema|Schemas]]. Schemas provide a powerful way to structure, encode, and encrypt your files/data. Read more about files and schemas here.

## Textile node (application framework)
* Leverage IPFS (content-addressed data and networking)
* Wallets & Accounts (key management)
* Threads (cross-account data+encryption)
* Client SDKs
  * Mobile: iOS, Android, React Native
  * Desktop & Web: Javascript HTTP

## Textile cafes (anonymous services for apps)
* A server-flavored Textile node
* Runs over the IPFS network
* Easy to deploy & manage (single executables, Docker)
* Current service: Backup & recovery, search, message inboxing
* Extendable
