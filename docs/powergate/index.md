---
hero_img: ../images/powergate-hero.png
---

# Introduction to the Powergate

The Powergate is an API-driven solution for deploying multi-tiered storage across [Filecoin](https://filecoin.io/) and [IPFS](https://ipfs.io/). 

By using the Powergate to persist your data on Filecoin, you gain access to rich storage configuration options such as:

* Replication factor
* Miner selection
* Deal renewal
* Repair

Configurable storage is provided through a connected IPFS peer or pinning network.

!!!Warning
    Do not run the Powergate in production systems and please join the powergate-users channel in the[ Filecoin community Slack](https://filecoin.io/slack) for announcements and support. The Powergate will remain in rapid development until a formal release. During this time, you're likely to encounter bugs and unannounced API changes.

## Overview

The Powergate is a collection of libraries, modules, and configuration options, that can be used independently or together, to integrate Filecoin in your application or storage system. 

The Powergate is designed to manage one or many Filecoin wallet addresses. Each address in Powergate can be independently managed through the [FFS API](#api) or grouped in a single _FFS instance_.

Some benefits of using the Powergate include:

- Ensure storing data on Filecoin is easily available on the IPFS network.
- Handle long-term storage deal management, including automated renewal and repair.
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
make build
```

!!!info
    Go 1.14 or newer is required to compile from source. All `make` commands install binaries in `$GOPATH/bin`, which usually is in `$PATH`, so you can run them right away from any folder in your terminal.

**Using the CLI**

Powergate CLI commands are just `pow`.

![](images/powergate/../../../images/powergate/help.png)

### Multi-tiered storage

The workhorse of the Powergate APIs is called the [FFS](ffs.md) (Filecoin File System). 

This module provides a multi-tiered file storage API built on Filecoin and IPFS. Storing data on IPFS and Filecoin is as easy as expressing your desired configuration for storing a Cid.

The FFS is where the Powergate handles:

* Filecoin wallet addresses.
* Long-term deal management.
* Connecting Filecoin to IPFS. 

Access to the FFS is enabled through a basic token, allowing you to create many FFS Instances and map Powergate API access to the user(s) in your system.

[Read about the FFS here](ffs.md).

### Network Indices

**Indices**

A running Powergate deployment collects useful indices about the network: 

- **Miners index**. Provides processed data regarding registered miners (on-chain and off-chain), such as total miner power, relative power, online status, geolocation, and more!
- **Ask index**. Provides a fast-retrieval, up to date snapshot of miners' asking prices for data storage.
- **Slashing index**. Provides history data about miners' faults while proving their storage on-chain.
<!--- 
^
on-chain storage or storage on-chain?
- Albert Kim
 -->

Some of the data collected in these indices are used by the FFS to streamline miner selection when creating new deals. 

You can use the indices directly to build other features.


**Reputation Module**

A Reputation module builds on top of the previous indices and constructs a weighted-scoring system.

This system allows you to sort miners by on-chain and off-chain data considerations such as:

* Comparing the price to the median of the market.
* Low storage-fault history.
* Power on the network.
* And external sources (soon!).

![](../images/powergate/reputation.png)

### Powergate APIs

The Powergate APIs are available as gRPC endpoints. 

There are four ways to familiarize yourself with the APIs:

* **Explore the CLI**. The CLI runs on the Powergate API so, in general, anything you can do in the CLI you can also do over the API.
* **Use the JS Client**. We have provided an easy-to-use [JavaScript client](https://textileio.github.io/js-powergate-client/) for the Powergate APIs.
* **Use the Go Client**. You can use the Powergate APIs from your Go app by building on the Powergate [Go Client](https://godoc.org/github.com/textileio/powergate/api/client).
* **Browse the Protocols**. The API is typed with Protocol Buffers and you can view the capabilities by looking at the `.proto` files in the [Powergate repo](https://github.com/textileio/powergate). 
<!--- 
The best place to start is the [FFS API](https://github.com/textileio/powergate/blob/master/ffs/rpc/rpc.proto#L310).
^ This link is broken
- Albert Kim
-->

### Additional Tools

The Powergate comes packed with several additional tools:

- [Lotus](https://lotu.sh/). A Lotus node running on the Filecoin network.
- [IPFS](https://ipfs.io/). A full IPFS node running to back Powergate FFS.
- [Prometheus](https://prometheus.io/). The backend for metrics processing.
- [Grafana](https://grafana.com/). Provides metrics dashboard.
- [cAdvisor](https://github.com/google/cadvisor). Provides container metrics.

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
