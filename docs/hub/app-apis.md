# Getting Started

Apps you build can leverage resources on the Hub including IPFS data & [Buckets](./buckets), [ThreadsDB](../threads/introduction) and replication services. To use the Hub APIs from your app you need to either generate a secure API Key (private applications) or you can whitelist your domain (public applications). With an API Key you can do many things, including,

* Provide IPFS persistence to your users with Buckets.
* Backup, replicate, and relay ThreadDB data for your users.
* Build front-end applications that can persist data on IPFS via domain whitelisting.

## App Keys

![Read more on the [CLI commands](./cli/tt_keys) for app keys.](/images/tt-cli/tt_keys_create.png)

You can create and replace keys using the Hub CLI. Keys should not be shared with your users. Keys allow you to provide services to users on your app that will allow your app to run fast, scale efficiently, and still allow your users to control their own data.

### Domain Whitelisting

App keys should never be shared with your users as you and your organization will remain responsible for how your users access the Hub's APIs. Therefore, if you are building a web application, you can use domain whitelisting to access the same resources without embedding keys in your application.

## App users

### User Buckets

You can provide Bucket-based storage to your users through your developer account. [Read more](/hub/buckets#app-user-buckets).

### User Threads

The primary use-case for [ThreadsDB](/threads/introduction) is to create secure, p2p databases in your application. You can offer better network performance, replication and backup, and mobile support by attaching trustless Thread services. The Hub offers easy Thread services that you can build right into your app.

### User identity

Something about

- User identities can be: did, uuid, email? dunno
- Your app can create or link users to your app, those users can then use storage resources on your Hub instance
- If using X or Y type identity, users can maintain ownership of the data the create.

Read more on [Threads Identity](/hub/threads/introduction#identity)

## App libraries

You can find all remote Thread and Bucket APIs in the `textile` libraries below. These libraries are meant to work in combination with the `threads` libraries when you want to create and manage Threads database in your app. 

Here are the libraries you will find useful to start building today.

|                         | ThreadsDB           | Threads APIs & User Buckets      |
|-------------------------|:---------------------:|:-------------------:|
| Browser, React Native, & NodeJS | [js-threads](https://textileio.github.io/js-threads) | [js-textile](https://textileio.github.io/js-textile) |
| Dart & Flutter Apps     | [dart-threads-client](https://textileio.github.io/dart-textile) | [dart-textile](https://textileio.github.io/dart-textile) |
| Golang Libraries        | [go-threads](https://godoc.org/github.com/textileio/go-threads)          | |
| Command-line | _thread-shell_       | [Hub CLI](../cli)         |

_* coming_