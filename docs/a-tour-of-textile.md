---
hero_img: /images/tour-hero.png
---

Welcome to Textile! This is a great place to start if you're a developer interested in using Textile's decentralized tooling in your mobile, desktop, or web applications.

## Introduction

Textile is a set of tools to help you and your team build decentralized apps, fast. Textile is primarily built on [IPFS](https://ipfs.ip/) and makes it easy for you or your application to store and distribute data over the IPFS network. Some features of Textile you may find useful include:

* Push files, directories, and websites to the IPFS network. Textile's Buckets are an intuitive way for you to host and manage data on IPFS. Buckets run on IPFS and Threads, but you don't have to remember content addresses to use them!
* Collaboratively update and manage Buckets with your team through simple collaborative projects and access control. Your organization can quickly host app assets or entire webpages on IPFS. Integration with CI tools makes this a breeze.
* Add decentralized databases to your web, mobile, or desktop application. Create databases on IPFS that are private for one user or shared with many. The Threads DB is an advanced decentralized database and networking protocol for IPFS.

Other things about Textile and Threads you may like include their open source, MIT licenses, active developer support on our [public Slack group](https://slack.textile.io), and a [deep technical paper](https://blog.textile.io/introducing-textiles-threads-protocol/) to get your neurons firing.

## Getting Started

Textile is a command-line interface that gives you access to everything listed above and more. To get started, here's what you need to do

!!! info

    Download Textile to your computer. 
    
    You can find the latest release for on our [GitHub releases page](https://github.com/textileio/textile/releases). Textile is built for all the common architectures used in Mac (Darwin), Windows, and Linux. If your architecture isn't listed, ping us on Slack and we can give you instructions to build a version ready for your system. 

Run Textile for the first time, the `help` command is a useful place to start.

```sh
textile --help

The Textile client.

Usage:
  textile [command]

Available Commands:
  buckets     Manage project buckets
  help        Help about any command
  init        Init a new project
  login       Login
  logout      Logout
  projects    Manage projects
  switch      Switch teams or personal account
  teams       Team management
  whoami      Show user or team
```

#### Teams and Projects

To start using remote services such as IPFS pinning, Bucket sharing, and Thread APIs, you'll need an account on Textile. Textile provides a simple, password-less account setup. You can create a new account by logging in with your valid email address for the first time.

##### Login

```sh
textile login
Enter your email: you@domain.app█
> We sent an email to you@domain.app. Please follow the steps provided inside it.
```

Go to your inbox and look for the verification email and follow the instructions inside. After complete, your terminal should output a confirmation:


```sh
✔ Email confirmed
> Success! You are now logged in. Initialize a new project directory with `textile init`.
```

That's it, you can now start using Textile, IPFS, and Threads.

##### Create a Team

By default, you'll be on your own in Textile, you'll probably want to create (or join) a team before you start building.

```sh
textile teams add <new team name>
```

##### Switch to Team

To use your new team, you need to use the `switch` command to select your newly created team.

```sh
textile switch
Use the arrow keys to navigate: ↓ ↑ → ← 
? Switch to: 
  ▸ you@domain.app (current)
  <new team name> 
```

##### Invite another member to your team

```sh
textile teams invite
Enter email to invite: other@domain.app█
> Success! We sent other@domain.app an invitation to the new team.
```

##### Join a team

If someone else has already created a team for you to join, you'll receive an invite email. Simply follow the instructions in the email to join and use the new team.

##### List your teams

```sh
textile teams ls
NAME  	        	ID
<new team name> 	f62cdc2b-9404-40ed-8467-ea804fcc35f1

> Found 2 teams

```

##### Create a Project

Teams on Textile may create different Projects. Projects are useful to organize resources or user groups in your app. Creating a new one is simple.

First, navigate to the directory where you'd like to build your project,

```sh
mkdir txtl-project
cd txtl-project/
```

Next, tell Textile to create a project in this directory. Similar to Git, Textile will create a simple config file in this directly under, `.textile/config.yaml`.

```sh
textile projects init my-new-project
> Success! Initialized empty project in /Users/me/txtl-project/.textile
```

Because you are have switched to your team, this project should now be available to other members of your team also.

### Host data in Buckets

Textile includes a `textile buckets` tool that makes it simple for you to pin files to IFPS. The files you pin can be used as part or all of the interface to your dApp. You can think of `buckets` much like you might already think of buckets on S3 (or if you aren't familiar, just think of them as folders). As an extra bonus, if any bucket you create contains an `index.html` file, Textile will host the bucket as a web site at `https://<bucket-name>.textile.cafe`. Read on to see an example.

#### Push files

To start pinning files in your Textile project, use the `push` sub command. You can `push` a single file to a bucket or an entire directory, in which case all contained files and directories are pushed recursively. All paths will be created if they don't exist and you can use `push` repeatedly to keep adding more files to a bucket.

Here, we push files for a static web site to a bucket called `aaron`:

```shell
textile buckets push public/* aaron
Add 44 files? Press ENTER to confirm: █
> Pushing mySite/public/404/index.html to aaron/404/index.html
9.87 kB / 9.87 kB [--------------------------------] 100.00% 78.69 kB p/s 0s
> Pushing mySite/public/404.html to aaron/404.html
9.88 kB / 9.88 kB [--------------------------------] 100.00% 260.14 kB p/s 1s
> Pushing mySite/public/app-b1262bbd5ce4afcb17ea.js to aaron/app-b1262bbd5ce4afcb17ea.js
98.14 kB / 98.14 kB [--------------------------------] 100.00% 307.59 kB p/s 0s
> Pushing mySite/public/app-b1262bbd5ce4afcb17ea.js.map to aaron/app-b1262bbd5ce4afcb17ea.js.map
390.09 kB / 390.09 kB [--------------------------------] 100.00% 376.47 kB p/s 1s
> Pushing mySite/public/chunk-map.json to aaron/chunk-map.json

...

> Success! Pushed 44 files to aaron
```

#### Inspecting a bucket

You can list the files in a bucket or at any depth in the bucket, similar to listing files locally on your computer:

```shell
textile buckets ls aaron/icons
NAME             	SIZE  	DIR   	ITEMS 	PATH                                                                         
icon-144x144.png	9130 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-144x144.png	
icon-192x192.png	12422	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-192x192.png	
icon-256x256.png	16837	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-256x256.png	
icon-384x384.png	29004	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-384x384.png	
icon-48x48.png  	2813 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-48x48.png  	
icon-512x512.png	22446	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-512x512.png	
icon-72x72.png  	4425 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-72x72.png  	
icon-96x96.png  	5926 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-96x96.png  	

> Found 8 items
```

#### Pulling files

Use the `buckets pull` command to download files from a bucket to your computer. You can pull an entire bucket, a sub tree of a bucket, or a single file.

```sh
textile buckets pull aaron/icons/icon-512x512.png ./
> Pulling aaron/icons/icon-512x512.png to icon-512x512.png
22.45 kB / 22.45 kB [--------------------------------] 100.00% 818.35 kB p/s 0s
> Success! Pulled 1 files to ./
```

#### Removing files

The `buckets rm` command is used to remove files or directories from a bucket. Once a bucket is empty, the root bucket directory is deleted and will no longer appear in the list of buckets output from `textile buckets ls`.

```sh
textile buckets rm aaron/aaron.txt
> Success! Removed aaron/aaron.txt
```

#### Accessing on cloud.textile.io

You can access the latest version of the files in your bucket (without needing to know any CID!) at `https://cloud.textile.io/dashboard/<project name>/<bucket name>`. Of course since the data is all stored in IPFS, it's also available over `https://gateway.ipfs.io/ipfs/<CID>`. The CID for any Textile bucket or bucket sub directory is listed at the top of the corresponding `cloud.textile.io/dahsboard` page and in the output from `textile buckets ls`.

#### Hosting web sites in Buckets

Any bucket that contains an `index.html` file will be hosted as a web site at `https://<bucket-name>.textile.cafe`. In the `textile buckets push` example above, we pushed files that make up a static web site to a bucket named `aaron`. That web site is automatically available (with TLS!) at [https://aaron.textile.cafe](https://aaron.textile.cafe).

[Read more about hosting websites in Buckets here](https://blog.textile.io/first-look-at-textile-buckets-dynamic-ipfs-folders/).

#### Updating Buckets with CI

Buckets can be managed as part of your CI workflows. [Read more about updating your Buckets in CI here](https://blog.textile.io/first-look-at-textile-buckets-dynamic-ipfs-folders/).

## A Decentralized Database

> A scalable, secure, multi-user, database for developers
 
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

## Filecoin

We [recently announced](https://blog.textile.io/developer-tools-for-filecoin-ipfs-web/) our initiative to build developer tools for Filecoin. Those tools will leverage and link into Threads v2 and the Textile CLI to give developers simple ways to leverage Filecoin.

You can [follow our Filecoin progress here](https://blog.textile.io/filecoin-developer-tools-concepts/). 

<br>
