# Threads Services

Want simple Firebase or MongoDB type functionality in your app? Textile provides ThreadsDB - A decentralized database built on IPFS. Threads simplify the management of multi-party private key encryption, tracking of mutable data over content addresses, and more. Developers use ThreadsDB to create silo-busting, interoperable data that can move cleanly across the decentralized web. 

## Threads on the Hub

Threads change the relationship between a user, their data, and the services they connect with that data. The nested, or multi-layered, encryption combined with powerful ACL capabilities create new opportunities to build distributed services, or Bots, in the network of IPFS Peers. The Hub is designed to provide important services to applications and users building on Threads.

### Thread Replication & Relay

Thread replication is a protocol-supported system to help applications transmit data through IPFS more efficiently. When a ThreadDB is running in a mobile or browser based application, it can be useful to have a remote node that will securely store updates on the IPFS network. Using the Thread Service Key, these remote services don't need access to the data contained in a Thread. Textile provides easy to use Thread replication to all developers.

### Setting up Thread Replication

#### Replication API Access

To use replication, developers need to first create an [App Token](./accounts#app-tokens) or [Whitelist a Domain](/accounts#whitelisting) that will make use of the replication services.

<div class="txtl-options center">
  <a href="/hub/accounts#app-tokens" class="box">
    <h5>Hub App Tokens</h5>
    <p>Learn more about managing App Tokens on the Hub.</p>
  </a>
</div>


#### Textile Javascript Library

Next, the developer can use that App Token with the Textile [Javascript Library](https://textileio.github.io/js-textile) directly in their application. The Javascript Library is compatible with [js-threads](https://textileio.github.io/js-threads) and will immediately start using the remote peer to replicate Thread content.

<div class="txtl-options center">
  <a href="/threads/introduction" class="box">
    <h5>ThreadsDB</h5>
    <p>Learn more about designing and building databases with ThreadsDB.</p>
  </a>
</div>

#### End-user data ownership & recovery

You can offer end-user data ownership and recovery through the use of a 3rd party identity tool.

TODO: Add example here.
