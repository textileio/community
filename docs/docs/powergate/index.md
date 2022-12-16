---
hero_img: ../images/powergate-hero.png
---

# UPDATE

Since the release of Powergate v2 many of the features and benefits of Powergate have been improved upon by three other technologies.

-   [Estuary](https://docs.filecoin.io/store/estuary/) - seamlessly bridge data between IPFS and Filecoin.
-   [Glif](https://lotus.filecoin.io/docs/developers/hosted-lotus/) - easily host and manage Filecoin nodes.
-   [Deal Auctions](https://blog.textile.io/introducing-storage-auctions-filecoin/) - migrate large datasets to Filecoin.

We are working now on an updated roadmap for Powergate v3 that will change the project significantly in order to supplement those three projects above. [Follow us on Twitter](https://twitter.com/textileio) for updates.

# Legacy Powergate Info

The Powergate is an API-driven solution for deploying multi-tiered storage across [Filecoin](https://filecoin.io/) and [IPFS](https://ipfs.io/).

By using the Powergate to persist your data on Filecoin, you gain access to rich storage configuration options such as:

-   Replication factor
-   Miner selection
-   Deal renewal
-   Repair

Configurable storage is provided through a connected IPFS peer or pinning network.

!!!Warning
Do not run the Powergate in production systems and please join the powergate-users channel in the [Filecoin community Slack](https://filecoin.io/slack) for announcements and support. The Powergate will remain in rapid development until a formal release. During this time, you're likely to encounter bugs and unannounced API changes.

## Overview

Powergate is a collection of libraries, modules, and configuration options, that can be used independently or together, to integrate Filecoin in your application or storage system. It is designed to manage one or many Filecoin wallet addresses, and each address and its associated configuration and data storage is scoped by user. Most Powergate APIs function within the context of single user.

Some benefits of using the Powergate include:

-   Ensure storing data on Filecoin is easily available on the IPFS network.
-   Handle long-term storage deal management, including automated renewal and repair.
-   Make use of network indices to improve miner selection and deal creation.
-   Manage Filecoin wallet addresses for one or many users.
-   Easily configure, connect, and deploy Powergate, [Lotus](https://lotu.sh), and [IPFS](https://ipfs.io/) together.
-   Much more!

### Libraries

<div class="txtl-options">
  <a href="https://github.com/textileio/powergate/" class="box" target="_blank">
    <h5>Powergate Repo</h5>
    <p>Open source multi-tiered file storage API built on Filecoin and IPFS.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://textileio.github.io/js-powergate-client/" class="box" target="_blank">
    <h5>POW JS Client</h5>
    <p>Typescript/Javascript client for Textile's Powergate.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://godoc.org/github.com/textileio/powergate/api/client" class="box" target="_blank">
    <h5>POW Golang Client</h5>
    <p>Golang client for the Powergate.</p>
  </a>
</div>

<div class="txtl-options">
  <a href="#command-line-interface" class="box">
    <h5>POW CLI</h5>
    <p>A command-line interface for working directly with a running Powergate.</p>
  </a>
  <span class="box-space"> </span>
  <a href="./localnet" class="box">
    <h5>Filecoin Local Localnet</h5>
    <p>A fast development node for working with Filecoin APIs.</p>
  </a>
  <span class="box-space"> </span>
  <span class="box-fill">
  </span>
</div>

## Getting started

### Command-line Interface

The full set of Powergate features are available through the binary command-line interface.

**Install the CLI**

You can build and install the Powergate CLI from the [Powergate Repo](https://github.com/textileio/powergate).

```bash
git clone git@github.com:textileio/powergate.git
cd powergate
make install-pow
```

!!!info
Go 1.14 or newer is required to compile from source. All `make` commands install binaries in `$GOPATH/bin`, which usually is in `$PATH`, so you can run them right away from any folder in your terminal.

**Using the CLI**

You can view all the commands by running `pow --help`.

```bash
➜ pow --help
A client for storage and retreival of powergate data

Usage:
  pow [flags]
  pow [command]

Available Commands:
  admin        Provides admin commands
  config       Provides commands to interact with cid storage configs
  data         Provides commands to interact with general data APIs
  deals        Provides commands to view Filecoin deal information
  help         Help about any command
  id           Returns the user id
  storage-info Provides commands to get and query cid storage info.
  storage-jobs Provides commands to query for storage jobs in various states
  version      Display version information for pow and the connected server
  wallet       Provides commands about filecoin wallets

Flags:
  -h, --help                   help for pow
      --serverAddress string   address of the powergate service api (default "127.0.0.1:5002")
  -t, --token string           user auth token
  -v, --version                display version information for pow and the connected server

Use "pow [command] --help" for more information about a command.
```

### Multi-tiered storage

Powergate provides a multi-tiered file storage API built on Filecoin and IPFS. Storing data on IPFS and Filecoin is as easy as expressing your desired configuration for storing a Cid.

Powergate handles Filecoin wallet addresses, long-term deal management, and connecting Filecoin to IPFS on a per user basis. Use of a user is enabled through a basic token, allowing you to create many Powergate users, and map Powergate API access to users in your own system.

[Read about data storage here](storage.md).

### Powergate APIs

The Powergate APIs are available as gRPC endpoints.

There are four ways to familiarize yourself with the APIs:

-   **Explore the CLI**. The CLI runs on the Powergate API so, in general, anything you can do in the CLI you can also do over the API.
-   **Use the JS Client**. We have provided an easy-to-use [JavaScript client](https://textileio.github.io/js-powergate-client/) for the Powergate APIs.
-   **Use the Go Client**. You can use the Powergate APIs from your Go app by building on the Powergate [Go Client](https://godoc.org/github.com/textileio/powergate/api/client).
-   **Browse the Proto Files**. The API is typed with Protocol Buffers and you can quickly view all capabilities by looking at the `.proto` files in the [Powergate repo](https://github.com/textileio/powergate). The best place to start is the [Powergate user API](https://github.com/textileio/powergate/blob/master/proto/powergate/user/v1/user.proto).

### Additional Tools

The Powergate comes packed with several additional tools:

-   [Lotus](https://lotu.sh/). A Lotus node running on the Filecoin network.
-   [IPFS](https://ipfs.io/). A full IPFS node running to back Powergate.
-   [Prometheus](https://prometheus.io/). The backend for metrics processing.
-   [Grafana](https://grafana.com/). Provides metrics dashboard.
-   [cAdvisor](https://github.com/google/cadvisor). Provides container metrics.

### Running the Powergate

You can run the Powergate on the Filecoin mainnet or by using an embedded localnet we make available as part of the Powergate stack.

We recommend starting with the localnet as you'll have access to the full set of APIs and capabilities without having to sync to the network right away. When you're ready, you can update your Powergate to connect to the live _mainnet_.

#### Localnet

The localnet provides a fast, fully-functional, embedded Filecoin network that can be used for testing, building, or running continuous integration. [Read more](localnet.md) about running the Powergate on localnet or running the localnet to use the Lotus client directly.

#### Mainnet

Once you're ready to start using the Powergate with the Filecoin Mainnet, it's just a single line.

```bash
git clone git@github.com:textileio/powergate.git
cd powergate/docker
make up
```

[Read the latest setup instructions](https://github.com/textileio/powergate/#production-setup).

## Learn more

#### Walk-through Video

<center>
<iframe width="640" height="355" src="https://www.youtube.com/embed/aiOTSkz_6aY" frameborder="0" allowfullscreen ng-show="showvideo"></iframe>
</center>

In the above presentation, you'll see a high-level overview of how the Powergate fits into the Filecoin and IPFS networks and a detailed walk-through of system components.

#### Running System Video

<center><iframe src="https://player.vimeo.com/video/411596107?quality=2k" width="640" height="355" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></center>

The above video shows the Powergate startup, including IPFS and Lotus nodes, and the admin using the Powergate CLI to create a deal on the Filecoin network.

## Keep up-to-date

Follow the project [on our blog](https://blog.textile.io/tag/filecoin/) and [GitHub repo](https://github.com/textileio/powergate) and give us your feedback.

<br/>
