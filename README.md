# Textile Docs _(docs)_

[![Made by Textile](https://img.shields.io/badge/made%20by-Textile-informational.svg?style=popout-square)](https://textile.io)
[![Chat on Slack](https://img.shields.io/badge/slack-slack.textile.io-informational.svg?style=popout-square)](https://slack.textile.io)

> Documentation repository for all Textile projects 📚

Join us on our [public Slack channel](https://slack.textile.io/) for news, discussions, and status updates. [Check out our blog](https://medium.com/textileio) for the latest posts and announcements.

## Table of Contents

- [Getting Started](#getting-started)
- [Maintainer](#maintainer)
- [Contribute](#contribute)
- [License](#license)

## Getting Started

### Requirements

- python >= 3.6.0
- pip >= 19.0
- wget >= 1.0

### Commands

#### Install dependencies:

    $ make setup

#### Build docs

    $ make build

#### Serve locally

    $ make serve

#### Pull latest downstream docs

    $ make sync

#### Deploy to docs.textile.io

    $ make deploy

### Note for Windows Users

Windows doesn't come with `make`. In order to access the tool and contribute to these docs, we recommend installing a windows port of the tool. If you're using Git Bash, we recommend following [Evan Will's guide to adding more tools to Git Bash](https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058).

## Maintainer

[Carson Farmer](https://github.com/carsonfarmer)

## Contributing

**Contribute to the [Textile Docs](https://github.com/textileio/docs)** with any additions or questions you have about Textile and its various projects. A good example would be asking, "What is a thread?". If you don't know a term, odds are someone else doesn't either. Eventually, we should have a good understanding of where we need to improve communications and teaching together to make Textile even better.

Before you get started, be sure to read our [contributors guide](CONTRIBUTING.md) and our [contributor covenant code of conduct](CODE_OF_CONDUCT.md).

### Contributors

* Carson Farmer <carson@textile.io>
* Sander Pick <sander@textile.io>
* Andrew Hill <andrew@textile.io>
* Aaron Sutula <aaron@textile.io>

## License

[MIT](LICENSE)
