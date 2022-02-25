# Textile Docs _(docs)_

[![Made by Textile](https://img.shields.io/badge/made%20by-Textile-informational.svg?style=popout-square)](https://textile.io)
[![Chat on Slack](https://img.shields.io/badge/slack-slack.textile.io-informational.svg?style=popout-square)](https://slack.textile.io)

> Documentation repository for all Textile projects 📚

Join us on our [public Discord channel](https://discord.gg/hpd5WWn4Ys) for news, discussions, and status updates. View the docs live at [https://docs.textile.io](https://docs.textile.io/).

[Check out our blog](https://blog.textile.io/) for the latest posts and announcements.

## Table of Contents

-   [Getting Started](#getting-started)
-   [Maintainer](#maintainer)
-   [Contribute](#contribute)
-   [License](#license)

## Getting Started

### Requirements

-   python >= 3.6.0
-   pip >= 19.0
-   wget >= 1.0
-   bash >= 3

### Commands

#### Install dependencies:

    ./scripts/setup

#### Build docs

    ./scripts/build

#### Serve locally

    ./scripts/serve

#### Deploy to docs.textile.io

    ./scripts/deploy

#### Update contributors

```
cd scripts/contributors/
./update.py
```

#### Update CLI Docs

```
cd scripts/cli/
./build
```

## Maintainer

[Carson Farmer](https://github.com/carsonfarmer)

## Contributing

**Contribute to the [Textile Community](https://github.com/textileio/community/discussions)** with any additions or questions you have about Textile and its various projects. A good example would be asking, "What is a thread?". If you don't know a term, odds are someone else doesn't either. Eventually, we should have a good understanding of where we need to improve communications and teaching together to make Textile even better.

Before you get started, be sure to read our [contributors guide](../CONTRIBUTING.md) and our [contributor covenant code of conduct](../CODE_OF_CONDUCT.md).

### Contributors

-   Carson Farmer <carson@textile.io>
-   Sander Pick <sander@textile.io>
-   Andrew Hill <andrew@textile.io>
-   Ignacio Hagopian <ignacio@textile.io>
-   Aaron Sutula <aaron@textile.io>

## License

[MIT](../LICENSE)
