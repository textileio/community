# Threads

> A scalable, secure, multi-user, database for developers

!!! warning

    This section is still a work in progress. Libraries are under active development, and this material may not reflect the latest changes. Please view the primary code-repositories and look out for our release announcements soon. 

Want simple Filebase or MongoDB type functionality in your app? Textile provides Threads - A decentralized database built on IPFS. Threads give your app a way to store private data for one user or synchronize data across many peers. For a deep dive over breakfast, read the [Threads Whitepaper](https://blog.textile.io/introducing-textiles-threads-protocol/). For now, here's a quick tour. 

The Threads Whitepaper outlines a number of new innovations, some highlights include:

* Standardized key management for securing data created in your apps
* An easy interface to create and update models (think MongoDB)
* A simple way for data owners to invite new members to their database

Technically,

* Each thread contains a store (where data is kept) and models (the data structures you store and update).
* Threads are collaborative, for one to many users. By default, each thread your app creates for a user is private (fully encrypted) but can then be shared with other users who can then have access to just read or read & write to the same Thread.
* Data is transferred over IPFS, but it is encrypted by keys only available to people invited to the thread.

If you would like to start testing Threads v2 you can use any of the following libraries.

| Name | Status | Platforms | Description |
| ---------|---------|---------|--------- |
| **Implementations** |
| [`go-threads`](//github.com/textileio/go-threads) | [![](https://img.shields.io/github/v/release/textileio/go-threads?color=3529ff&sort=semver&style=popout-square)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/go-threads/Tests/master.svg?style=popout-square)](https://github.com/textileio/go-threads/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/golang-blueviolet.svg?style=popout-square)](https://github.com/textileio/go-threads) | Threads reference implementation. |
| [`js-threads`](//github.com/textileio/js-threads) | [![](https://img.shields.io/github/v/release/textileio/js-threads?color=3529ff&sort=semver&style=popout-square)](https://github.com/textileio/js-threads) [![](https://img.shields.io/github/workflow/status/textileio/go-threads/Tests/master.svg?style=popout-square)](https://github.com/textileio/js-threads/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/javascript-blueviolet.svg?style=popout-square)](https://github.com/textileio/go-threads) | _Work in Progress._ JavaScript implementation. |
| **Clients** |
| [`js-threads-client`](//github.com/textileio/js-threads-client) | [![](https://img.shields.io/badge/dynamic/json.svg?style=popout-square&color=3527ff&label=go-threads&prefix=v&query=%24.dependencies%5B%27%40textile%2Fthreads-client-grpc%27%5D.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftextileio%2Fjs-threads-client%2Fmaster%2Fpackage-lock.json)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/js-threads-client/lint_test/master.svg?style=popout-square)](https://github.com/textileio/js-threads-client/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/nodejs-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-threads-client) [![](https://img.shields.io/badge/web-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-threads-client) [![](https://img.shields.io/badge/react%20native-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-threads-client) | A JavaScript client for the threads daemon. |
| [`dart-threads-client`](//github.com/textileio/dart-threads-client) | [![](https://img.shields.io/badge/dynamic/yaml?style=popout-square&color=3527ff&label=go-threads&prefix=v&query=packages.threads_client_grpc.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftextileio%2Fdart-threads-client%2Fmaster%2Fpubspec.lock)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/dart-threads-client/test/master.svg?style=popout-square)](https://github.com/textileio/dart-threads-client/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/dart-blueviolet.svg?style=popout-square)](https://github.com/textileio/dart-threads-client) [![](https://img.shields.io/badge/flutter-blueviolet.svg?style=popout-square)](https://github.com/textileio/dart-threads-client) | A Dart client for the threads daemon. |
| **Examples** |
| [`go-foldersync`](//github.com/textileio/go-foldersync) | [![](https://img.shields.io/github/v/release/textileio/go-threads?color=3529ff&label=go-threads&style=popout-square)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/go-foldersync/Tests/master.svg?style=popout-square)](https://github.com/textileio/js-threads-client/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/golang-blueviolet.svg?style=popout-square)](https://github.com/textileio/go-foldersync) | An e2e demo to sync data between two golang clients. |
| [`js-foldersync`](//github.com/textileio/js-foldersync) | [![](https://img.shields.io/badge/dynamic/json.svg?style=popout-square&color=3527ff&label=go-threads&prefix=v&query=%24.dependencies%5B%27%40textile%2Fthreads-client-grpc%27%5D.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftextileio%2Fjs-foldersync%2Fmaster%2Fpackage-lock.json)](https://github.com/textileio/go-threads) [![](https://img.shields.io/github/workflow/status/textileio/js-foldersync/Test/master.svg?style=popout-square)](https://github.com/textileio/js-foldersync/actions?query=branch%3Amaster) | [![](https://img.shields.io/badge/web-blueviolet.svg?style=popout-square)](https://github.com/textileio/js-foldersync) | A demo of writing and reading models with the js-threads-client. |
| **Planned** |
| [`andoroid-threads-client`](//github.com/textileio/android-threads-client) | [![](https://img.shields.io/github/v/release/textileio/android-threads-client?color=3529ff&sort=semver&style=popout-square)](https://github.com/textileio/android-threads-client) | [![](https://img.shields.io/badge/android-blueviolet.svg?style=popout-square)](https://github.com/textileio/android-threads-client) | An Android client for the threads daemon. |
| [`ios-threads-client`](//github.com/textileio/ios-threads-client) | [![](https://img.shields.io/github/v/release/textileio/ios-threads-client?color=3529ff&sort=semver&style=popout-square)](https://github.com/textileio/ios-threads-client) | [![](https://img.shields.io/badge/ios-blueviolet.svg?style=popout-square)](https://github.com/textileio/android-threads-client) | An iOS client for the threads daemon. |

### Hosted Threads

The easiest way to get started with Threads is through Textile's hosted service. In this case, Threads can leverage your team's Textile resources (buckets, pinning, and networking). First, you'll need to create a Textile app token using the `textile` CLI.

#### Create an app token

App tokens allow you to access Textile resources from within apps you build. You can create new app tokens in your project in just a few seconds.

```sh
textile project tokens add
> Selected ethden
> Success! Added new token <your new token>
```

#### Use the token in your app

To use your token with your app, simply follow the instructions available in either of the Textile client libraries here (support for other languages and platfirms coming soon!):

* [js-textile](https://github.com/textileio/js-textile): a library to authenticate your textile app token and use
* [dart-textile](https://github.com/textileio/dart-textile): a library to authenticate your textile app token and use dart-threads-client in your app.


Voila, now you have an app running a Threads database over IPFS with Textile ensuring that database content is pinned to the network no matter when or if your users remain online.

#### App example

The best way to learn how to use Threads is by checkout out our [todo list](https://github.com/textileio/js-todo-demo) and [folder sync](https://github.com/textileio/js-foldersync) example apps.

### Local debugging

The preceding instructions have you set up to use Textile's hosted Threads server. Sometimes when developing with Threads, it can be helpful to use a local Threads server called `threadsd` instead. You can connect an app using any of the Threads client libraries to the local `threadsd`, and then use the `threads` shell to view models, data, and watch events as they change data in real-time. 

#### Install the daemon and shell

1. Visit the threads releases page. https://github.com/textileio/go-threads/releases
2. Download the latest release for your platform, Linux, Windows, or Mac (darwin).
3. Install`threadsd` and `threads` (or the `.exe`s on Windows) application.
4. Run the `threadsd` application without any parameters.

```sh
tar -xzvf go-threads_v0.1.9_darwin-amd64.tar.gz
x install-threads/
x install-threads/install
x install-threads/threadsd
x install-threads/LICENSE
x install-threads/README.md
x install-threads/threads

cd install-threads/

./install 
Moved ./threads to /usr/local/bin
Moved ./threadsd to /usr/local/bin

threadsd 
Welcome to Threads!
Your peer ID is 12D3KooWFFCiJt6B8Dog9ECpt7KGfqxjUxNktzpTK4e4mzQ51WPG
```

**Note for MacOS:** By default, MacOS will prevent `threadsd` from running. After trying and failing once, you'll have to visit System Preferences > Security & Privacy > General, choose to allow `threadsd` to run, and then run `threadsd` again.

##### Update your project to use local daemon


Updating your project to use the locally running `threadsd` is as simple as setting the `dev` flag in the `Textile.API` constructor. Here's an example in Javascript:

```js
import {API} from '@textile/textile'
import {Client} from '@textile/threads-client'

const api = new API({
  token: "<textile project token>",
  deviceId: "<user id>",
  dev: true // causes the below client to use the local threadsd
})
await api.start()
const threadsClient = new Client(api.threadsConfig)
```

#### Use `threads` shell to monitor data updates

Start up the `threads` shell which will connect to your local `threadsd`:

```sh
threads
Successfully connected.
>>>
```

You first need to specify a store id to operate on using the `use` command:

```sh
>>> use <store id>
Switched to <store id>
>>>
```
**Note:** You can find your store id by logging it or setting a breakpoint in your app when you create a Theads store. 

**Another note:** In reality, you'll want to keep track of store ids you app creates so you can access those stores at a later time.

View all updates to the data in the current store using the `listen` command:

```sh
>>> listen
<enter> to cancel
{
  "ID": "5389d030-22b4-4327-aed5-10ae1f1f14d8",
  "files": [],
  "owner": "myFolder"
}
{
  "ID": "5389d030-22b4-4327-aed5-10ae1f1f14d8",
  "files": [
    {
      "ID": "25ea5bc5-cbef-4619-9380-9725388f873b",
      "cid": "",
      "files": [],
      "isDirectory": false,
      "name": "filecoin.pdf"
    }
  ],
  "owner": "myFolder"
}
```

Explore data using the `modelFind` and `modelFindById` commands.
