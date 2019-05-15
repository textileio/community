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

### Create a thread

```JavaScript
{{threads.add.js_http_client.code}}
```

### Add a file

```JavaScript
{{files.add.js_http_client.code}}
```

## API Documentation

You can read the full API documentation for Textile's JavaScript HTTP Client (js-http-client) can be found at https://textileio.github.io/js-http-client.

Feel free to join the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas. 
