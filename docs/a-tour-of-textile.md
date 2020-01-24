![Photo by Andrew Neel on Unsplash](/images/andrew-neel-133200-unsplash.jpg)

Welcome to Textile! This is a great place to start if you're a developer interested in using Textile's decentralized tooling in your mobile, desktop, or web applications. However, anyone interested in learning how to run and interact with a Textile peer will also find this tour useful.

## Threads v2

> A scalable, secure, multi-user, database for developers
 
In December 2019 we published, [A protocol & event-sourced database for decentralized user-siloed data](https://blog.textile.io/introducing-textiles-threads-protocol/). The new protocol, called Threads, builds off of many things we learned about how to exchange and build on decentralized data. We believe Threads can offer a solution to developers who want to build secure, performant, decentralized applications on any platform. If you would like to start testing Threads v2, explore the projects below.

| Name | Status | Platforms | Description |
| ---------|---------|---------|--------- |
| **Implementations** |
| [`go-threads`](//github.com/textileio/go-threads) | [![](https://img.shields.io/github/v/release/textileio/go-threads?color=3529ff&sort=semver&style=popout-square)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/go-threads/Tests/master.svg?style=popout-square)](https://github.com/textileio/go-threads/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/golang-blueviolet.svg?style=popout-square)](https://github.com/textileio/go-threads) | Threads reference implementation. |
| [`js-threads`](//github.com/textileio/js-threads) | [![](https://img.shields.io/github/v/release/textileio/js-threads?color=3529ff&sort=semver&style=popout-square)](https://github.com/textileio/js-threads) [![](https://img.shields.io/github/workflow/status/textileio/go-threads/Tests/master.svg?style=popout-square)](https://github.com/textileio/js-threads/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/javascript-blueviolet.svg?style=popout-square)](https://github.com/textileio/go-threads) | _Work in Progress._ JavaScript implementation. |
| **Clients** |
| [`js-threads-client`](//github.com/textileio/js-threads-client) | [![](https://img.shields.io/badge/dynamic/json.svg?style=popout-square&color=3527ff&label=go-threads&prefix=v&query=%24.dependencies%5B%27%40textile%2Fthreads-client-grpc%27%5D.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftextileio%2Fjs-threads-client%2Fmaster%2Fpackage-lock.json)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/js-threads-client/lint_test/master.svg?style=popout-square)](https://github.com/textileio/js-threads-client/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/nodejs-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-threads-client) [![](https://img.shields.io/badge/web-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-threads-client) [![](https://img.shields.io/badge/react%20native-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-threads-client) | A JavaScript client for the threads daemon. |
| [`dart-threads-client`](//github.com/textileio/dart-threads-client) | [![](https://img.shields.io/badge/dynamic/yaml?style=popout-square&color=3527ff&label=go-threads&prefix=v&query=packages.threads_client_grpc.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftextileio%2Fdart-threads-client%2Fmaster%2Fpubspec.lock)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/dart-threads-client/test/master.svg?style=popout-square)](https://github.com/textileio/dart-threads-client/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/dart-blueviolet.svg?style=popout-square)](https://github.com/textileio/dart-threads-client) [![](https://img.shields.io/badge/flutter-blueviolet.svg?style=popout-square)](https://github.com/textileio/dart-threads-client) | A Dart client for threads daemon. |
| **Examples** |
| [`go-foldersync`](//github.com/textileio/go-foldersync) | [![](https://img.shields.io/github/v/release/textileio/go-threads?color=3529ff&label=go-threads&style=popout-square)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/go-foldersync/Tests/master.svg?style=popout-square)](https://github.com/textileio/js-threads-client/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/golang-blueviolet.svg?style=popout-square)](https://github.com/textileio/go-foldersync) | An e2e demo to sync data between two golang clients. |
| [`js-foldersync`](//github.com/textileio/js-foldersync) | [![](https://img.shields.io/badge/dynamic/json.svg?style=popout-square&color=3527ff&label=go-threads&prefix=v&query=%24.dependencies%5B%27%40textile%2Fthreads-client-grpc%27%5D.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftextileio%2Fjs-foldersync%2Fmaster%2Fpackage-lock.json)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/js-foldersync/Test/master.svg?style=popout-square)](https://github.com/textileio/js-foldersync/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/web-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-foldersync) | A demo of writing and reading models with the js-threads-client. |

## Textile CLI

We are close to releasing a developer toolkit to make launching, updating, and scaling your apps on IPFS & Filecoin simple. If you would like to receive updates about this work, please join our [Slack channel](https://slack.texitle.io).  

## Filecoin

We [recently announced](https://blog.textile.io/developer-tools-for-filecoin-ipfs-web/) our initiative to build developer tools for Filecoin. Those tools will leverage and link into Threads v2 and the Textile CLI to give developers simple ways to leverage Filecoin.

<br>
