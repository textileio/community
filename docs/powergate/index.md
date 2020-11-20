---
hero_img: ../images/powergate-hero.png
---

# Introduction to the Powergate

The Powergate is an API driven solution for deploying multitiered storage across [Filecoin](https://filecoin.io/) and [IPFS](https://ipfs.io/). Persistent storage on Filecoin allows rich storage configuration for data such as replication factor, miner selection, deal renewal, and repair. Network available storage is configurable and provided through a connected IPFS peer or pinning network.

!!!Warning
    The Powergate will remain in rapid development until a formal release. During this time, you will likely encounter bugs and unannounced API changes. Do not run the Powergate in production systems and please join the powergate-users channel in the [Filecoin community Slack](https://filecoin.io/slack) for announcements and support. 

## Overview

Powergate is a collection of libraries, modules, and configurations that can used independently, and composed together to integrate Filecoin into your application or storage system. The Powergate is designed to manage one or many Filecoin wallet addresses. Each address and its associated configuration and data storage is scoped by user, and most Powergate APIs function within a single user.

Some benefits of using the Powergate include:

- Ensure data stored on Filecoin is available on the IPFS network easily.
- Handle long-term storage deal management, including automated renew and repair.
- Make use of network indices to improve miner selection and deal creation.
- Manage Filecoin wallet addresses for one or many users.
- Easily configure, connect, and deploy Powergate, [Lotus](https://lotu.sh), and [IPFS](https://ipfs.io/) together.
- Much more!

### Libraries

<div class="txtl-options">
  <a href="https://github.com/textileio/powergate/" class="box" target="_blank">
    <h5>Powergate Repo</h5>
    <p>Open source multi-tiered file storage API built on Filecoin and IPFS.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://textileio.github.io/js-powergate-client/" class="box" target="_blank">
    <h5>POW JS Client</h5>
    <p>Typescript/Javascript client for Textile's Powergate .</p>
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
    <p>A command-line interface to work directly with a running Powergate.</p>
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

The Powergate includes the full set of features through the binary command-line interface.

**Install the CLI**

You can build and install the Powergate CLI from the [Powergate Repo](https://github.com/textileio/powergate).

```bash
git clone git@github.com:textileio/powergate.git
cd powergate
make install-pow
```

!!!info
    To compile from source, verify you have Go 1.14 or newer installed. All `make` commands install binaries in `$GOPATH/bin`, which usually is in `$PATH`, so you can run them right away from any folder in your terminal.

**Using the CLI**

You can view all the commands by running `pow --help`.

```bash
$ pow --help
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

The Powergate APIs are available as gRPC endpoints. There are three ways to get familiar with the broad set of APIs available to start using on the Powergate.

* **Explore the CLI**. The CLI runs on the Powergate API, so in general, anything you can do in the CLI you can also do over the API.
* **Use the JS Client**. We have provided an easy to use [JavaScript client for the Powergate APIs](https://textileio.github.io/js-powergate-client/).
* **User the Go Client**. You can use the Powergate APIs from your go app by building directly on the [Powergate Go Client](https://godoc.org/github.com/textileio/powergate/api/client).
* **Browse the Proto Files**. The API is typed with Protocol Buffers and you can quickly view all capabilities by looking at the `.proto` files in the [Powergate repo](https://github.com/textileio/powergate). The best place to start is the [main Powergate API](https://github.com/textileio/powergate/blob/master/proto/powegate/v1/powergate.proto).

### Additional Tools

The Powergate comes packed with a number of additional tools that will be useful to you as you integrate it into your system.

- [Lotus](https://lotu.sh/). A Lotus node running on the Filecoin network.
- [IPFS](https://ipfs.io/). A full IPFS node running to back Powergate.
- [Prometheus](https://prometheus.io/). The backend for metrics processing.
- [Grafana](https://grafana.com/). Providing metrics dashboard.
- [cAdvisor](https://github.com/google/cadvisor). Providing container metrics.

### Running the Powergate

You can run the Powergate on the Filecoin mainnet or using an embedded localnet we make available as part of the Powergate stack. We recommend starting out with the localnet as you'll get access to the full set of APIs and capabilities without having to start syncing the network right away. When ready, you can update your Powergate to connect to the live _mainnet_.

#### Localnet

The localnet provides a fast, fully functional, embedded Filecoin network that can be used for testing, building, or running continuous integratin. Read more about [running the Powergate on localnet or running the localnet to use the Lotus client directly](localnet.md).

#### Mainnet

Once you are ready to start using the Powergate with the Filecoin Mainnet, it's just a single line.  

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

In the above presentation, we'll give a high-level overview of how the Powergate fits into the Filecoin and IPFS networks and a detailed walk-through of system components.

#### Running System Video

<center><iframe src="https://player.vimeo.com/video/411596107?quality=2k" width="640" height="355" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></center>

The above video shows the Powergate startup including IPFS and Lotus nodes. Next, the admin uses the Powergate CLI to create a deal on the Filecoin network.

## Keep up-to-date

Follow the project [on our blog](https://blog.textile.io/tag/filecoin/) and on our [GitHub repo](https://github.com/textileio/powergate) and give us your feedback.

<br/>
