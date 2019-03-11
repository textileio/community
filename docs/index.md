<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>documentation</small></h1>

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

# Developer

## Why use Textile

Textile was built for developers who believe in a better future for our technology. Textile tools standardize use of decentralized protocols, secure communications, and user data sovereignty.

- Build decentralized applications that run in mobile applications, on the web, or on desktop.
- Give users greater control over their data by making it easily available for their own storage or use in future applications.
- Leverage IPFS on any device.
- Access simple APIs for encryption throughout an application.

## What can you build with Textile

Build apps and service that treat users and their data the same.

- Build decentralized storage and sharing applications. See [Textile Photos](https://github.com/textileio/textile-mobile).
- Build better ways for users to manage their private information. See [AirSecure](https://github.com/airsecure/airsecure).
- Build chat apps, website publishing services, health apps, family tools, and more. Got an idea, [get in touch](https://slack.textile.io/).

## Get Started

You can build an app or service using Textile in one of a few different ways. Pick a section below to get you started in the right direction.

### Build a Mobile App

The only thing you need to build a mobile library with Textile is a mobile app built that supports one of our three libraries, [React Native](./textileio/react-native-sdk), [Android](./textileio/go-android), or [iOS](./textileio/go-ios). 

The mobile libraries will help you leverage Textile & IPFS directly on the mobile devices of your users, allowing them to benefit from data encryption, p2p communication, and censorship resistent content.

### Build a Desktop App

To build a Desktop App we recommend you base your app of the [Textile Desktop App](./install) which creates a local API for applications to build on top of. Any React app or web-app can leverage a that local API, with permission of the user, to leverage the full Textile & IPFS functionality.

If building a React app this way, you can use the [js-http-client library](./textileio/js-http-client) to make it easy.

### Build an Electron App

The above method will work with any Electron app. 

### Build a Web App

Textile's web support is being released in two phases. The first phase is in beta currently and requires that your users run a desktop Textile node. Your web app will then use the [js-http-client library](./textileio/js-http-client) to access a localhost-only API to interact with Textile.

The second phase will bring a fully JavaScript implementation of the Textile Node, allowing apps to run without a desktop peer. This library will be started in Q3 2019.

### Build with Go

You can use the [go-textile library](./textileio/go-textile) to leverage Textile in any Go project. 

### Learn More

If you want to read more about the building blocks within Textile, start in the [learn section](./learn).

# Not a Developer

You can still benefit from Textile right away. Try out one of the existing apps on our network or install our Desktop app to securely plug-in & store your data.

### Mobile Apps

- [Textile Photos](https://textile.photos/)
- [Textile Notes](https://github.com/textileio/notes)
- [AirSecure](https://github.com/airsecure/airsecure)

### Desktop

- [Install App](./install/)
- Connect your [Facebook data]() or [Flickr data]()

# Other Resources

##### [Slack](https://slack.textile.io/)
##### [GitHub](https://github.com/textileio/)
##### [Twitter](https://twitter.com/textile01)
##### [Blog](https://medium.com/textileio)