All desktop and server peers run as a daemon, which contains an embedded IPFS node. Much like the IPFS daemon, the program (`textile`) ships with a command-line client.

The daemon can be used to run either an [account peer](/learn/#account-peers) or a [cafe peer](/learn/#cafe-peers).

!!! info
    A _daemon_ is a program that operates as a long-running 'background' process (without a terminal or user interface). In most cases, the daemon exposes a network API (usually HTTP / TCP) that allows other programs to interact with it while it's running. Most daemons ship with a command-line client for this API.

## Install

Download and extract the [latest release](https://github.com/textileio/go-textile/releases/latest) for your OS and architecture or jump to [Docker](https://github.com/textileio/go-textile#docker). For example:

```
tar xvfz go-textile_$VERSION_$OS-$ARCH.tar.gz
```

Move the executable (`textile` or `textile.exe`) anyplace in your `PATH`. On macOS and Linux, you can run the install script, which tries to put it in `/usr/local/bin`:

```
./install.sh

```

## Docker

See available tags [here](https://hub.docker.com/r/textile/go-textile/tags).

#### Run a Textile account peer

    $ docker run -it --name textile-node \
      -p 4001:4001 -p 8081:8081 -p 5050:5050 -p 127.0.0.1:40600:40600 \
      textile/go-textile:latest

#### Run a Textile cafe peer

    $ docker run -it --name textile-cafe-node \
      -p 4001:4001 -p 8081:8081 -p 5050:5050 -p 127.0.0.1:40600:40600 -p 40601:40601 \
      -e CAFE_HOST_URL=<public_URL> -e CAFE_HOST_PUBLIC_IP=<public_IP> \
      textile/go-textile:latest-cafe

<br>

