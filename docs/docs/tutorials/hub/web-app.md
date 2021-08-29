# Build a Web App using the Hub

In this section, you'll find guides on building JavaScript apps that use the Hub to push Threads and Buckets to the IPFS network (and beyond). We'll walk through basic setup options and how to build different types of apps. 

These tutorials will show you how to add interoperable, content addressed datasets to your app, how to get started with basic cryptographic identities, how to integrate your existing identity solution, and more.

## Getting Started

There are a few resources you'll need before you start writing code.

- [An account](../../hub/accounts.md). This is your developer account on the Hub.
- [A new Typescript web app](https://webpack.js.org/guides/typescript/). We recommend using Typescript, as Textile libraries are in a period rapid of development and type detection is valuable during upgrades.

Once you have those two things, you can continue to read the overview or jump ahead to [User identity](pki-identities.md) to create simple user identities for the rest of the tutorial.

Or, if you plan to provide your own identity setup, you can skip to the [development mode](development-mode.md) setup instructions.

### Typescript setup

Our examples will primarily be built using Typescript. For instructions on how to setup a Typescript app, visit [here](https://levelup.gitconnected.com/setting-up-a-full-stack-typescript-application-featuring-express-and-react-ccfe07f2ea47).

!!!info
    With your basic Typescript web app setup, you should have a primary `.ts` (or `.js` if you decided to stick with Javascript) file where your web app exists. We'll work within this single file to start, but the instructions below should be adaptable to any application architecture.

### Browser, Node, or React Native?

You can use the JavaScript libraries for all three, though there are some differences to be aware of.

#### Browser

Go go go! Green lights ahead. Just read the rest of the docs and get building.

#### Node

Some of our libraries rely on WebSockets for moving data around. WebSockets is packed in every major browser out of the box but doesn't exist in Node the same way. 

This can be solved by adding WebSockets to the environment. We've solved this in past examples by using [isomorphic-ws](https://www.npmjs.com/package/isomorphic-ws).

1. Install [isomorphic-ws](https://www.npmjs.com/package/isomorphic-ws):

    ```bash
    npm install --save isomorphic-ws ws
    ```

2. Add websockets to the global namespace at the start of your app: 

    ```js
    ;(global as any).WebSocket = require('isomorphic-ws')
    ```

See an example of that [here](https://github.com/textileio/js-examples/blob/master/hub-browser-auth-app/src/server/index.ts).

#### React Native

The React Native environment is missing a whole number of required packages including `crypto`. Read the React Native tutorial's [installation steps](../react-native-buckets.md#install-libraries) to learn how to add the necessary packages.

## Tutorial overview

### User identities

Setup simple key-pair based identities for your app users. [View tutorial](pki-identities.md).

### To secure or not to secure

Learn how to use non-signing API keys for faster app development. [View tutorial](development-mode.md).

### Start building apps

Build a photo gallery sharing app for users with Buckets.  [View tutorial](user-buckets.md).

### Add API authorization

Add secure API keys and a login flow to your app. [View tutorial](production-auth.md).

<br />
