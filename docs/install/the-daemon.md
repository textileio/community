All desktop and server peers run as a daemon, which contains an embedded IPFS node. Much like the IPFS daemon, the program (`textile`) ships with a command-line client.

The daemon can be used to run an [account peer](/concepts/#account-peers) or a [cafe peer](/concepts/#cafe-peers).

![Daemon](/images/daemon.png)

!!! info
    A _daemon_ is a program that operates as a long-running 'background' process (without a terminal or user interface). In most cases, the daemon exposes a network API (usually HTTP / TCP) that allows other programs to interact with it while it's running. Most daemons ship with a command-line client for this API.

## Install

Download and extract the [latest release](https://github.com/textileio/go-textile/releases/latest) for your OS and architecture or jump to [Docker](https://github.com/textileio/go-textile#docker). 

### macOS and Linux:

```
tar xvfz go-textile_$VERSION_$OS-$ARCH.tar.gz
```

Move `textile` anyplace in your `PATH` or run the install script, which puts it in `/usr/local/bin`:

```
./install.sh

```

### Windows

Extract the zip file and move `textile.exe` anyplace in your `PATH`.

### Docker

See available tags [here](https://hub.docker.com/r/textile/go-textile/tags).

## Run

Once you have `textile` available on your system, you can run your own peer.

### Create a new wallet

The first step is to create a new [wallet](/concepts/the-wallet).

Textile uses a hierarchical deterministic (HD) wallet to derive account keys from a set of unique words, called a [mnemonic phrase](https://en.bitcoin.it/wiki/Seed_phrase).

    textile wallet init

This will output something like,

    --------------------------------------------------------------------------------
    | field speak key various picture captain laugh produce word cage estate space |
    --------------------------------------------------------------------------------
    WARNING! Store these words above in a safe place!
    WARNING! If you lose your words, you will lose access to data in all derived accounts!
    WARNING! Anyone who has access to these words can access your wallet accounts!

    Use: `wallet accounts` command to inspect more accounts.

    --- ACCOUNT 0 ---
    P8sRrQuvwTCisEg3jndAWtNTbkqnrisHbxEutSm1AvC5qJA1
    SSkyezjKSb979BYYkwhgbq8GyB5HRry3gtf8CJBaNRKpFdt6

You may optionally specify a word count and password that will be required along with your mnemonic phrase when accessing the wallet's account keys (run with `--help` for usage).

!!! info
    Every key "inside" an HD wallet can be derived from this mnemonic phrase. Effectively, the wallet _is_ the mnemonic phrase.

The output contains information about the wallet's first account, or the keys at _index 0_. _Account seeds_ (private keys) always starts with an "S" for "secret" and _account addresses_ (public keys) always start with a "P" for "public".

### Access wallet accounts

Most users will only be interested in the first account keys, but you can access deeper indexes with the `accounts` sub-command:

    textile wallet accounts "field speak key various picture captain laugh produce word cage estate space" --depth 3
    --- ACCOUNT 0 ---
    P8sRrQuvwTCisEg3jndAWtNTbkqnrisHbxEutSm1AvC5qJA1
    SSkyezjKSb979BYYkwhgbq8GyB5HRry3gtf8CJBaNRKpFdt6
    --- ACCOUNT 1 ---
    P5rVWTKLKQFq42Ht7mdab9P3fSmyZyh2zWGHzLE8aipgoyRU
    SXw4tZNxnajX2PuurVBde8wCzfX9DfskC47QQB4hJgBKGAPq
    --- ACCOUNT 2 ---
    P7d43jRarv7k5e5WHmpDWuLevambQVu1YhrJ5CoRRfExLEwc
    SYEv4DMBd9RHHKzUZxC5fpieWJAiSCMNnMCKWSYUFaVHKQkt

See `textile wallet accounts --help` for more.

### Initialize an account peer

Next, use an account seed from your wallet to initialize a new account peer. Here, we just grab the account seed from the first account above:

    textile init -s SSkyezjKSb979BYYkwhgbq8GyB5HRry3gtf8CJBaNRKpFdt6

!!! danger
    Use your own seed. Never share it or your wallet mnemonic phrase with anyone!

There are a dozen or so additional options that are available when initializing. `textile init --help`:

    Usage:
      textile [OPTIONS] init [init-OPTIONS]

    Initialize the node repository and exit.

    Help Options:
      -h, --help                   Show this help message

    [init command options]
          -s, --seed=              Account seed (run 'wallet' command to generate new seeds).
          -p, --pin-code=          Specify a pin code for datastore encryption.
          -r, --repo-dir=          Specify a custom repository path.

        Address Options:
          -a, --api-bind-addr=     Set the local API address. (default: 127.0.0.1:40600)
          -c, --cafe-bind-addr=    Set the cafe REST API address. (default: 127.0.0.1:40601)
          -g, --gateway-bind-addr= Set the IPFS gateway address. (default: 127.0.0.1:5050)

        Cafe Options:
              --cafe-open          Open the p2p Cafe Service for other peers.
              --cafe-public-ip=    Required with --cafe-open on a server with a public IP address.
              --cafe-url=          Specify the URL of this cafe, e.g., https://mycafe.com
              --cafe-neighbor-url= Specify the URL of a secondary cafe. Must return cafe info, e.g., via a Gateway: https://my-gateway.yolo.com/cafe, or a Cafe API: https://my-cafe.yolo.com

        IPFS Options:
              --server             Apply IPFS server profile.
              --swarm-ports=       Set the swarm ports (TCP,WS). Random ports are chosen by default.

        Log Options:
          -n, --no-log-files       Write logs to stdout instead of rolling files.
          -d, --debug              Set the logging level to debug.
    
Anyone familiar with IPFS will recognize the similarities with these step. Much like `ipfs init`, `textile init` creates an IPFS node repository on disk.

### Initialize a cafe peer

Anyone can run a cafe peer and offer services to the network. You do not need to rely on Textile's cafe network, or anyone else's network for that matter!

[Cafe peers](/concepts/cafes) are initialized by adding some additional flags to `textile init`:

**`--cafe-open`:** This flag "opens" the cafe, meaning that it will expose an additional "service" API over libp2p and HTTP.
    
**`--cafe-url`:** This is the full public URL of the cafe service HTTP API.

By default, `--cafe-url` is `http://<SWARM_PUBLIC_IP>:40601`. If your peer is behind a DNS-based load balancer and/or requires HTTPS, you may want to override this value. For example, [Textile's federated cafes](https://github.com/textileio/textile-opts#network) run behind EC2 load balancers with HTTPS listeners, which route traffic to the cafe API port (`--cafe-bind-addr`).

!!! info
    Cafe service clients are issued JWT sessions used for authentication. These sessions contain the public URL of the cafe peer's service API so that it can be leveraged over HTTP.

Later, when the peer is started, it's service info will be visible at the cafe URL, e.g., [https://us-west-1c.textile.cafe](https://us-west-1c.textile.cafe).

    {
        "peer": "12D3KooWQue2dSRqnZTVvikoxorZQ5Qyyug3hV65rYnWYpYsNMRE",
        "address": "P6th8SM6V3uSVQWgQz8AkFos3rwYzky2K7Bt6vx4h1jZGZne",
        "api": "v0",
        "protocol": "/textile/cafe/1.0.0",
        "node": "0.1.11",
        "url": "https://us-west-1c.textile.cafe",
        "swarm": [
            "/ip4/13.57.23.210/tcp/4001",
            "/ip6/2600:1f1c:522:b00:2725:b0b3:f39d:c401/tcp/4001"
        ]
    }

You can modify the `init` settings anytime but editing the config file and restarting the peer. Read more about the cafe host config settings [here](/the-config-file#cafe).

### Run the daemon

Now that you have initialized as either an account peer or a cafe peer, you can finally start the daemon:

    textile daemon

See `textile daemon --help` for more options.

### Run the daemon with Docker

The docker images have internal logic that will fist initialize a peer if needed before starting the daemon, enabling a single run command:

#### Run an account peer with docker

    $ docker run -it --name textile-node \
      -p 4001:4001 -p 8081:8081 -p 5050:5050 -p 127.0.0.1:40600:40600 \
      textile/go-textile:latest

#### Run a cafe peer with docker

    $ docker run -it --name textile-cafe-node \
      -p 4001:4001 -p 8081:8081 -p 5050:5050 -p 127.0.0.1:40600:40600 -p 40601:40601 \
      -e CAFE_HOST_URL=<public_URL> -e CAFE_HOST_PUBLIC_IP=<public_IP> \
      textile/go-textile:latest-cafe

!!! success
    At last, your Textile peer is online. Now you're ready to start the [tour](/a-tour-of-textile)!

<br>
