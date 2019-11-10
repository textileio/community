The JS HTTP Client was designed to work in the browser, using Node.js, or in Electron.

To use the JS HTTP Client, you'll need either a locally running [Daemon](/install/the-daemon) or a locally running [Desktop Tray](/install/desktop) instance containing a Textile account and available on `localhost` with default ports for both the `API` and `Gateway`.

## Installation

The JS HTTP Client is published as an [NPM Package](https://www.npmjs.com/package/@textile/js-http-client). You are free to use the [source code](https://github.com/textileio/js-http-client) directly or use a package manager to install the official release.

#### NPM

```JavaScript
npm install @textile/js-http-client
```

#### Yarn

```JavaScript
yarn add @textile/js-http-client
```

## TypeScript

We strongly recommend using [TypeScript](https://www.typescriptlang.org/) if you plan to use the JS Client in your project. The JS Client's endpoints are all typed and those types are available to projects that support them. Because Textile libraries are rapidly developing, this will make your upgrade process much easier and faster.

If you don't normally use TypeScript in your projects, never fear, it will be very familiar and only takes a few steps to setup.

!!! tip

    We recommend [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) as a good place to start if you are totally new to TypeScript.

## Getting Started

### Initialize the JS Client

The JS HTTP Client does not maintain any state for your app, it simply provides easy to use APIs so your app can interact with your user's Textile account. You import the library in any library simply.

```JavaScript
{{core.setup.js_http_client.code}}
```

Below are some basic examples to get you started. If you are interested in a more thorough walk-through, check out the [Tour of Textile's](/a-tour-of-textile) examples using the JS HTTP Client.

### Get the account display name

```JavaScript
{{profile.name.js_http_client.code}}
```

### Subscribe to file updates

```JavaScript
{{subscribe.files.js_http_client.code}}
```

### Subscribe to raw ipfs pubsub topic

```JavaScript
{{ipfs.pubsub_sub.js_http_client.code}}
```

### Fetch chronological thread updates

```JavaScript
{{examples.my_runs.feed.js_http_client.code}}
```

### Create a thread

```JavaScript
{{threads.add.js_http_client.code}}
```

### Add a file

```JavaScript
{{examples.my_runs.add_location_data.js_http_client.code}}
```

#### Files stored as blobs

For threads you create that use the `/blob` schema, you need to add your files slightly differently if your code is running in Node.js or running in the browser.

```JavaScript tab="browser"
{{files.add.js_http_client.browser.code}}
```

```JavaScript tab="node.js"
{{files.add.js_http_client.node.code}}
```

### Get a file

In this example, we get a file stored with a `/json` based schema.

```JavaScript
{{files.json_get.js_http_client.code}}
```

#### Files stored as blobs

The same as when writing blob data to threads, you need to be aware of differences when reading blob data if you are in the browser versus if you are in Node.js.

```JavaScript tab="browser"
{{files.get_.js_http_client.browser.code}}
```

```JavaScript tab="node.js"
{{files.get_.js_http_client.node.code}}
```

## Use with redux-saga

Many clients are using libraries such as [redux-sagas](https://redux-saga.js.org/) to manage app state combined with Textile. If you use the above examples, you might hit an issue where you need to declare the context of a function your are calling ([detailed in this ticket](https://github.com/redux-saga/redux-saga/issues/1389)). Here are a couple examples using Textile to get you started.

#### Create a thread

```JavaScript
{{special.sagas.add_thread.js_http_client.code}}
```

#### Get file content

```JavaScript
{{special.sagas.get_file.js_http_client.code}}
```

## Live playground

You can start playing with some of the core functionality in our [developer playground](https://github.com/textileio/js-http-playground). The playground provides a number of examples that you can run directly against a local Textile node (deamon or desktop installation).

## API Documentation

The full API documentation for Textile's JavaScript HTTP Client (js-http-client) can be found at https://textileio.github.io/js-http-client.

Feel free to join the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas.

<br>
