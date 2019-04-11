Textile is a set of tools and decentralized infrastructure for applications that run on the IPFS network. While data is interoperable with the whole network, Textile-flavored peers represent a higher order layer of users, applications, and services.

![The Network](https://s3.amazonaws.com/textile.public/net4.png)

- User _Account peers_ share access to a single data wallet
- _Cafe peers_ provide off-device services on behalf of users and applications
- Applications run alongside _account peers_ and can create and/or access users' data

Account peers typically run on desktops, laptops, and mobile devices. Cafe peers typically run in a server environment.

#### Textile node (application framework)
* Accessible via numerous [clients](/clients)
* Leverages IPFS (content-addressed data and networking protocols)
* Capabilities
    * Generate new [wallets](/learn/wallet)
    * Generate new [accounts](/learn/wallet#accounts)
    * Create and join [threads](/learn/threads)
    * Encrypt, store, and share files/data/messages

#### Textile cafes (anonymous, disposable services for apps)
* A server-flavored Textile node with extra service APIs
* Easy to deploy & manage (single executable, Docker)
* Leverages IPFS (content-addressed data and networking protocols)
* Services
    * Contact search
    * Encrypted account backup for account sync across devices
    * Message inboxing
