# How it works

Textile is a collection of technologies that allow nodes to run on mobile devices, laptops & desktops, and servers. The network is broken up into users with data wallets, apps permissioned to create or access a user's data, and services that do off-device work on the behalf of a user or the network.

Textile can be run in client mode (i.e. in a mobile app or desktop app) or in [cafe](/learn/cafe) mode. While running in client mode, Textile nodes serve all the necessarly APIs to connect apps to the network. When running as cafes, Textile can provide services to the network. A good example of a cafe service service is the contact registry and search endpoint, where cafes can coordinate to help new users find each other on the network.

### Textile node (application framework)
* Run in Textile [clients](/clients)
* Use IPFS protocols (content-addressed data and networking)
* Example capabilities
    * Generate new [wallets](/learn/wallet)
    * Generate new [accounts](/learn/wallet#accounts)
    * Create and join [threads](/learn/threads)
    * Data encryption
    * store and retrieve data

### Textile cafes (anonymous services for apps)
* Deployed and managed as servers (single executable, Docker)
* Use IPFS protocols (content-addressed data and networking)
* Example capabilities
    * Contact search
    * Backup & recovery
    * Message inboxing
