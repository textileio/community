
The JS HTTP Client was designed to work in the browserm in Node.js, or in Electron. 

To use the JS HTTP Client, you'll need either a locally running [Daemon](/install/the-daemon) or a locally running [Desktop Tray](/install/desktop) instance containing a Textile account and available on `localhost` with default ports for both the `API` and `Gateway`.

## Installation

The JS HTTP Client is published as an [NPM Package](https://www.npmjs.com/package/@textile/js-http-client)

#### NPM

```JavaScript tab="JS HTTP"
npm add @textile/js-http-client
```

#### Yarn

```JavaScript tab="JS HTTP"
yarn add @textile/js-http-client
```

## API Documentation

Documentation for Textile's JavaScript HTTP Client (js-http-client) can be found at https://textileio.github.io/js-http-client.

## TypeScript

We strongly recommend using [TypeScript](https://www.typescriptlang.org/) if you plan to use the JS Client in your project. The JS Client's endpoints are all typed and those types are available to projects that support them. Because Textile libraries are rapidly developing, this will make your upgrade process much easier and faster. 

If you don't normally use TypeScript in your projects, never fear, it will be very familiar and only takes a few steps to setup. 

!!! tip
    We recommend [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) as a good place to start if you are totally new to TypeScript.

## Getting Started

### Initialize the JS Client

The JS HTTP Client does not maintain any state for your app, it simply provides easy to use APIs so your app can interact with your user's Textile account. You import the library in any library simply.

```JavaScript tab="JS HTTP"
{{core.setup.js_http_client.code}}
```

Below are some basic examples to get you started. If you are interested in a more thorough walk-through, check out the [Tour of Textile's](/a-tour-of-textile) examples using the JS HTTP Client.

### Get the account display name

```JavaScript tab="JS HTTP"
{{profile.name.js_http_client.code}}
```

### Subscribe to file updates


```JavaScript tab="JS HTTP"
{{subscribe.files.js_http_client.code}}
```

### Create a thread

```JavaScript tab="JS HTTP"
{{threads.add.js_http_client.code}}
```

### Add a file

```JavaScript tab="JS HTTP"
{{files.add.js_http_client.code}}
```

### Next steps

Head on over to the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas. 
