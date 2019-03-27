# Get Started

There are various ways to get started with Textile, from running your own Textile node at home, to building a full-blown application.

## Run a node

Fist things first. You may just want to play on the network, add some files, or send some chat messages.

### Daemon

TODO: Install go-textile release

### Desktop

TODO: Install desktop

TODO: Now that the node is running, use the command-line client to create threads, schemas, files, messages, etc.

## Build apps

Mobile applications can use one of the SDKs below, which contain the Textile node _and_ a client. Desktop applications should utilize [Textile Desktop](./install), which provides an HTTP REST API for other applications to interact with on `localhost`.

JavaScript/Typescript developers can use the [JS HTTP Client](./textileio/js-http-client). Let us know if you need or would like to help with a client in another language.

### Mobile

Choose your preferred SDK:

* [React Native SDK](./textileio/react-native-sdk)
* [Android SDK](./textileio/android-textile)
* [iOS SDK](./textileio/ios-textile)

### Electron

* [Textile Desktop](./install) + [JS HTTP Client](./textileio/js-http-client)

### Web

* [Textile Desktop](./install) + [JS HTTP Client](./textileio/js-http-client)

We plan to write a full JavaScript implementation of the Textile node, allowing apps to run without a desktop peer. This library will be started in Q3 2019.

### Go

You can use the [Core Library](./textileio/go-textile) to leverage Textile in any Go project.
