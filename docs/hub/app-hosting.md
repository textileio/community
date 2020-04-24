# Getting Started

Apps you build can leverage resources on the Hub including IPFS data & [Buckets](./buckets), [ThreadsDB](../threads/introduction) and replication services. To use the Hub APIs from your app you need to either generate a secure API Key (private applications) or you can whitelist your domain (public applications). With an API Key you can do many things, including,

* Provide IPFS persistence to your users with Buckets.
* Backup, replicate, and relay Thread updates for your user's Threads.
* Build front-end applications that can persist data on IPFS via domain whitelisting.

## App Keys

You can create and replace keys using the Hub CLI. Read more on the [CLI Keys](./cli/tt_keys) commands. Keys should not be shared with your users. Keys allow you to provide services to users on your app that will allow your app to run fast, scale efficiently, and still allow your users to control their own data.

### Domain Whitelisting

App keys should never be shared with your users as you and your organization will remain responsible for how your users access the Hub's APIs. Therefore, if you are building a web application, you can use domain whitelisting to access the same resources without embedding keys in your application.

TODO

## User Buckets

You can provide Bucket-based storage to your users through your account on the Hub. Users can then store public or private data that is accessible over IPFS and pinned for persistance. Each user Bucket is owned by that specific user and can be updated or removed just like developer Buckets. See the table below to see which libraries support user Buckets.

## User Threads

The primary use-case for ThreadsDB is to create secure, p2p databases in your application. You can offer better network performance, replication and backup, and better mobile support by attaching trustless Thread services. The Hub offers these services out of the box and makes it easy to add them to your app's Threads. See the table below to see which libraries you can use to add Hub-based Thread services to your app.


## Developer Libraries

Here are the libraries you will find useful to start building today. Generally, to build with [ThreadsDB](../threads/introduction) use one of the Threads libraries + the corresponding Textile library. The [Bucket API](./buckets) is accessible through most of the Textile libraries.

|                         | ThreadsDB           | Threads Services    | Buckets      |
|-------------------------|---------------------|---------------------|--------------|
| JavaScript Browser Apps | [js-threads](https://textileio.github.io/js-threads) | [js-textile](https://textileio.github.io/js-textile) | [js-textile](https://textileio.github.io/js-textile) |
| React Native Apps       | [js-threads](https://textileio.github.io/js-threads) | [js-textile](https://textileio.github.io/js-textile) | [js-textile](https://textileio.github.io/js-textile) |
| NodeJS Apps             | [js-threads](https://textileio.github.io/js-threads) | [js-textile](https://textileio.github.io/js-textile) | [js-textile](https://textileio.github.io/js-textile) |
| Dart & Flutter Apps     | [dart-threads-client](https://textileio.github.io/dart-textile) | [dart-textile](https://textileio.github.io/dart-textile) | [dart-textile](https://textileio.github.io/dart-textile) |
| Golang Libraries        | [go-threads](https://godoc.org/github.com/textileio/go-threads)          |                     |              |
| Command-line | thread-shell*       | [Hub CLI](../cli)             | [Hub CLI](../cli) |

_* coming_