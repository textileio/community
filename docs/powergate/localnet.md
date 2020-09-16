# Filecoin Localnet

Having a fully synced [Lotus](https://lotu.sh/) node can take a considerable amount of time and effort to maintain. The required effort is normal on live blockchain networks, but isn't ideal in some scenarios. Scenarios such as application development, testing, and continuous integration can be enhanced by having access to Lotus nodes and APIs that don't require connection to the live network. For those cases, we have built the `localnet`.

**Speed**

The localnet is tuned for speed. After you have the docker instances installed, starting the localnet should take under a minute and storing a file in a new deal should take about a minute with the default settings and faster with custom settings.

The localnet runs a local localnet with a _mock_ sector-builder. This enables fast deployment of a _development Filecoin network_ containing miners with mocked sealing but the rest of the network logic remaining the same as that of the production Filecoin network. The miners are configured to accept and store all incoming deals.

**Configurable**

Depending on your use case you can change settings such as block generation speed and sector sizes. For CI environments you may set block production speeds to the order of _~100ms_ and disable `--bigsectors`. This localnet setup would be optimized for minimum CPU usage and very fast chain progress, which can confirm deals in seconds.

If you require more realistic scenarios (e.g. during product demos), you can change to block production speed to _~1s_ and enable `--bigsectors`. This would progress deal slow enough that you can observe updates in the status of confirmed deals at the rate of _~1 minute_ and also store larger files if required.

!!!Warning
    Not using `--bigsectors` will limit you to storing files of around 700 bytes and deals will complete in 30-60 seconds. Using `--bigsectors` will allow you to store files anywhere from 1Mb to 400Mb, but deals will complete in 3-4 minutes. Be sure to choose the value that makes sense for your development scenario.

**Production compatible storage**

The localnet is designed so that you can build and test your system quickly but function the exact same way as the production Filecoin network, except faster and entirely local. The localnet supports both 2KiB and 512MiB sectors, and the speed of block production is configurable. For advanced features, refer to the [localnet Readme](https://github.com/textileio/lotus-devnet).

## Localnet Miners

Miners are generated deterministically when you start the localnet. If you run the localnet with a single miner, the miner's address will be `t01000`. If you start the localnet with two miners, the addresses will be `t01000` and `t01001`. And so on.

When running the localnet within the Powergate, you can also fetch miner details from the miner API endpoints and CLI.

## Getting Started

There are a few resources you'll need before you start running any nodes.

- [Docker Desktop](https://www.docker.com/products/docker-desktop). In the examples below, you'll run node instances using local Docker containers. You can do the same with any Docker enabled system, but to get started we recommend Docker Desktop and the default configurations we provide.
- [Powergate](https://github.com/textileio/powergate). If you run the localnet as part of the Powergate, you should get the latest version of the Powergate source code. 
- [Golang](https://golang.org/). Building the Powergate CLI from code requires that you can run commands with Go. Other sections of the tutorials below don't have any Go requirement.

## Localnet with Powergate

If you're interested in running Powergate to experiment with the CLI or APIs, the fastest way is to replace the Lotus client dependency with a running localnet. This will run the Powergate on a Lotus client connected to an embedded network of miners.

### Installation

You can run a localnet setup by using a Powergate release or by using Powergate source code.

#### Download a release

Visit the [latest Powergate release page](https://github.com/textileio/powergate/releases/latest) and download the `powergate-docker-<version>.zip
` release artifact. Unzip it and `cd` into the resulting directory:

```
unzip powergate-docker-<version>.zip
cd powergate-docker-<version>
```

#### Use Powergate source code

Clone the Powergate and `cd` into the project's `docker` directory:

```bash
git clone git@github.com:textileio/powergate.git
cd powergate/docker
```

### Setup

With whichever method you chose in the Installation section above, you can now use the provided `docker-compose` configuration. With the default setup, you will run Powergate connected to a local localnet with 512Mib sectors and instantly available gRPC API or CLI that don't require any extra config flags 🎊

**Run the docker-compose**

Docker files for the Powergate are all contained in the folder, `/docker`.

```bash
make localnet
```

!!!info
    You can set `BIGSECTORS` according to your needs. See the description [above](#filecoin-localnet) for more information. If you don't specify a `BIGSECTORS` environment variable, the default is `true`.

If this is your first time running the Powergate, Docker will download the required instances before any Powergate setup begins. Downloads are dependent on your bandwidth and may take **a few minutes**, but wont be required for subsequent runs of the Powergate.

Once running, you will begin to see log outputs, including those of the embedded miner.

```bash
lotus_1      | 2020-05-29T20:35:08.644Z	WARN	miner	miner/miner.go:177\
mined block in the past	{"block-time": "2009-01-01T04:44:30.000Z",\
"time": "2020-05-29T20:35:08.644Z", "duration": 359999438.64444387}
```

When complete, you will have a fully functional Powergate (`powd`), a Lotus localnet, and an IPFS node wired correctly together to start using.

### Create a deal and store a file

Now that your Powergate is running on localnet, all the CLI and API commands are the same as using it in production mode, just your deals will store faster (and disappear when you delete the localnet).

#### Install the CLI

You can install the CLI from a Powergate release or from source.

#### Download a release

Visit the [latest Powergate release page](https://github.com/textileio/powergate/releases/latest) and download the `pow_<version>_<platform>.tar.gz` file appropriate for your system. Unzip and install `pow` (following example is for unix-like systems):

```
tar -xzvf pow_v0.1.0_darwin-amd64.tar.gz
./install
Moved ./pow to /usr/local/bin
```

!!!info
    If you're installing on macOS, there are some system permissions issues you'll have to deal with. Please follow the [`hub` installation instructions](https://docs.textile.io/hub/accounts/#mac-installation) to work around the issue.

#### Build from source

From the root of the `powergate` repo, you can build the CLI from the latest code. This will install the Powergate CLI, `pow`, on your machine.

```bash
make build-pow
```

Test your installation.

```bash
pow --help
```

#### Start storing data

You are now ready to start storing and retrieving data using the Powergate. Read more on [Storing Data with the FFS](ffs.md).

## Localnet with Lotus Client

You can run the localnet to make use of the [Lotus Client](https://lotu.sh/) with all the benefits described in the introduction but no Powergate or IPFS components.

### Run from Docker image

You can run localnet with the Docker image we maintain. Running the image is just a single line.

```bash
docker run --name texlocalnet -e TEXLOTUSDEVNET_SPEED=1500 \
-e TEXLOTUSDEVNET_BIGSECTORS=true -p 1234:7777 \
-v /tmp/import:/tmp/import textile/lotus-devnet
```

After running the container, the Lotus API endpoint is available at the default port which lets you use the Lotus CLI without any extra configuration. Recall that *localnets* should be used as ephemeral networks, so be sure to stop and remove the `texlocalnet` container if you re-rerun the above command again.

If you plan to use the `ClientImport` API or `lotus client import` command, your target file to import should be in the `/tmp/import` path on your host machine. This folder is bound to the docker image and the localnet, so the Lotus node can find it under the same path.

Finally, notice that the above command doesn't specify the `textile/lotus-devnet` tag, so it's recommended that you consider updating your cached `latest` tag.

**Configuration parameters** 

In the above we use the environmental variables to set the `speed` and `bigsectors` flags. The complete mapping of options is,

* TEXLOTUSDEVNET_SPEED: time in milliseconds of blocks/tipset generation.
* TEXLOTUSDEVNET_BIGSECTORS: If true, the localnet will run on 512Mib sectors, but 2Kib otherwise.
* TEXLOTUSDEVNET_NUMMINERS: The number of miners in the localnet. This is an experimental feature, which seems stable for <=3.
* TEXLOTUSDEVNET_IPFSADDR: Optional multiaddr of an IPFS node to enable the Lotus node be connected to an IPFS node to avoid importing deals data, and storing retrievals.

### Run from source code

**Requirements**

- [Devnet](https://github.com/textileio/lotus-devnet). If you run the localnet with a stand-alone Lotus node, you should get the latest version of the localnet source code.

#### Installation

Clone the `lotus-devnet` repo and `cd` into the project

```bash
git clone git@github.com:textileio/lotus-devnet.git
cd lotus-devnet
```

#### Setup

Install the dependencies:

```bash
make build
```

Run the devnet with:

```bash
go run main.go
```

If you've previously compiled a prior version of `lotus-devnet`, running `make clean` is recommended before building again.

For full configuration options, [see the project Readme](https://github.com/textileio/lotus-devnet#run)

<br/>
