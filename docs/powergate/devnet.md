# Filecoin Local Devnet

Having a fully synced [Lotus](https://lotu.sh/) node can take a considerable amount of time and effort to maintain. The required effort is normal on live blockchain networks, but isn't ideal in some scenarios. Scenarios such as application development, testing, and continuous integration can be enhanced by having access to Lotus nodes and APIs that don't require connection to the live network. For those cases, we have built the [**devnet**](https://github.com/textileio/lotus-devnet).

**Speed**

The devnet is tuned for speed. After you have the docker instances installed, starting the devnet should take under a minute and storing a file in a new deal should take about a minute with the default settings and faster with custom settings.

The devnet runs a local devnet with a _mock_ sector-builder. This enables fast deployment of a _development Filecoin network_ containing miners with mocked sealing but the rest of the network logic remaining the same as that of the production Filecoin network. The miners are configured to accept and store all incoming deals.

**Configurable**

Depending on your use case you can change settings such as block generation speed and sector sizes. For CI environments you may set block production speeds to the order of _~100ms_ and disable `--bigsectors`. This devnet setup would be optimized for minimum CPU usage and very fast chain progress, which can confirm deals in seconds.

If you require more realistic scenarios (e.g. during product demos), you can change to block production speed to _~1s_ and enable `--bigsectors`. This would progress deal slow enough that you can observe updates in the status of confirmed deals at the rate of _~1 minute_ and also store larger files if required.

**Production compatible storage**

The devnet is designed so that you can build and test your system quickly but function the exact same way as the production Filecoin network, except faster and entirely local. The devnet supports both 2KiB and 512MiB sectors, and the speed of block production is configurable. For advanced features, refer to the [devnet Readme](https://github.com/textileio/lotus-devnet).

## Devnet Miners

Miners are generated deterministically when you start the devnet. If you run the devnet with a single miner, the miner's address will be `t01000`. If you start the devnet with two miners, the addresses will be `t01000` and `t01001`. And so on.

When running the devnet within the Powergate, you can also fetch miner details from the miner API endpoints and CLI.

## Getting Started

There are a few resources you'll need before you start running any nodes.

- [Docker Desktop](https://www.docker.com/products/docker-desktop). In the examples below, you'll run node instances using local Docker containers. You can do the same with any Docker enabled system, but to get started we recommend Docker Desktop and the default configurations we provide.
- [Powergate](https://github.com/textileio/powergate). If you run the devnet as part of the Powergate, you should get the latest version of the Powergate source code. 
- - [Golang](https://golang.org/). Building the Powergate CLI from code requires that you can run commands with Go. Other sections of the tutorials below don't have any Go requirement.

## Devnet with Powergate

If you're interested in running Powergate to experiment with the CLI or APIs, the fastest way is to replace the Lotus client dependency with a running devnet. This will run the Powergate on a Lotus client connected to an embedded network of miners.

### Installation

Clone the Powergate and `cd` into the project

```bash
git clone git@github.com:textileio/powergate.git
cd powergate
```

### Setup

A default setup is available in a `docker-compose` configuration shipped with the Powergate. With the default setup, you will run Powergate connected to a local devnet with 512Mib sectors and instantly available gRPC API or CLI that don't require any extra config flags 🎊

**Run the docker-compose**

Docker files for the Powergate are all contained in the folder, `/docker`.

```bash
cd docker
make devnet
```

If this is your first time running the Powergate, Docker will download the required instances before any Powergate setup begins. Downloads are dependent on your bandwidth and may take **a few minutes**, but wont be required for subsequent runs of the Powergate.

Once running, you will begin to see log outputs, including those of the embedded miner.

```bash
lotus_1      | 2020-05-29T20:35:08.644Z	WARN	miner	miner/miner.go:177\
mined block in the past	{"block-time": "2009-01-01T04:44:30.000Z",\
"time": "2020-05-29T20:35:08.644Z", "duration": 359999438.64444387}
```

When complete, you will have a fully functional Powergate (`powd`), a Lotus devnet, and an IPFS node wired correctly together to start using.

### Create a deal and store a file

Now that your Powergate is running on devnet, all the CLI and API commands are the same as using it in production mode, just your deals will store faster (and disappear when you delete the devnet).

**Install the CLI**

From the root of the `powergate` repo, you can build the CLI from the latest code. This will install the Powergate CLI, `pow`, on your machine.

```bash
make build
```

Test your installation.

```bash
pow --help
```

**Create an FFS instance**

FFS is the most common API for interacting with the Powergate. To use the API, you must first create an empty FFS instance, which will,

- Create a new wallet address on Lotus. You can configure the Powergate to automatically fund new wallets from a master address.
- Track and manage deals associated with that address in the Powergate FFS.
- Create an API token for using that FFS (and address) over the Powergate API.

```Bash
pow ffs create
```

???+ success

    ```Bash
    Instance created with id 0ac0fb4d-581c-4276-bd90-a9aa30dd4cb4 and token 883f57b1-4e66-47f8-b291-7cf8b10f6370
    ```

**Generate a CID for your file on IPFS**

To store data on the cold layer (Filecoin), you first need to make it available on IPFS. You can do that quickly by using the Powergate to temporarily add it to the embedded IPFS node.

```bash
pow ffs addToHot -t 883f57b1-4e66-47f8-b291-7cf8b10f6370 myfile
```

???+ success

    ```Bash
    Success! Added file to FFS hot storage with cid: QmYaAK8SSsKJsJdtahCbUe7MZzQdkPBybFCcQJJ3dKZpfm
    ```

Note: `addToHot` does not store your data in the Powergate FFS. It simply caches your data in the IPFS node in preparation for being stored in the Powergate FFS in the following steps. This is technically equivalent to `ipfs add`, which is adding data without pinning it.

**Add environmental variable (optional)**

For the rest of the commands, the `--token` is used to scope the requests to the FFS instance we created. You can skip setting the `--token` flag on every command by adding your new token as an environmental variable. We won't do this and our following examples will continue to use the `--token` flag.

```bash
export POW_TOKEN=883f57b1-4e66-47f8-b291-7cf8b10f6370
```

**Push a CidConfig**

How the Powergate manages each file stored in the FFS is defined by a _CidConfig_. To tell the Powergate to start managing a new file by moving it from the cached state we created above to the Hot and/or Cold layers, we must push a new CidConfig for the CID we generated above.

Every FFS instance has a default `CidConfig` that will be used for every new deal unless overridden.

```bash
❯ pow ffs push --watch --token 883f57b1-4e66-47f8-b291-7cf8b10f6370 QmYaAK8SSsKJsJdtahCbUe7MZzQdkPBybFCcQJJ3dKZpfm
```

???+ success

    ```Bash
    Success! Pushed cid config for QmYaAK8SSsKJsJdtahCbUe7MZzQdkPBybFCcQJJ3dKZpfm to FFS with job id: 966dcb44-9ef4-4d2a-9c90-a8103c77c354
               JOB ID                   STATUS
    966dcb44-9ef4-4d2a-9c90-a8103c77c354    Success
    ```

**Retrieve file from network**

Finally, you can verify that the file was stored on the devnet by making a request to get it back out. 

```bash
❯ pow ffs get  -t 883f57b1-4e66-47f8-b291-7cf8b10f6370 QmYaAK8SSsKJsJdtahCbUe7MZzQdkPBybFCcQJJ3dKZpfm myfile2
```

???+ success

    ```Bash
    Success! Data written to myfile2
    ```

## Devnet with Lotus Client

You can run the devnet to make use of the [Lotus Client](https://lotu.sh/)with all the benefits described in the introduction but no Powergate or IPFS components.

### Run from Docker image

You can run devnet with the Docker image we maintain. Running the image is just a single line.

```bash
docker run --name texdevnet -e TEXLOTUSDEVNET_SPEED=1500\
-e TEXLOTUSDEVNET_BIGSECTORS=true -p 1234:7777 \
-v /tmp/import:/tmp/import textile/lotus-devnet
```

After running the container, the Lotus API endpoint is available at the default port which lets you use the Lotus CLI without any extra configuration. Recall that *devnets* should be used as ephemeral networks, so be sure to stop and remove the `texdevnet` container if you re-rerun the above command again.

If you plan to use the `ClientImport` API or `lotus client import` command, your target file to import should be in the `/tmp/import` path on your host machine. This folder is bound to the docker image and the devnet, so the Lotus node can find it under the same path.

Finally, notice that the above command doesn't specify the `textile/lotus-devnet` tag, so it's recommended that you consider updating your cached `latest` tag.

**Configuration parameters** 

In the above we use the environmental variables to set the `speed` and `bigsectors` flags. The complete mapping of options is,

* TEXLOTUSDEVNET_SPEED: time in milliseconds of blocks/tipset generation.
* TEXLOTUSDEVNET_BIGSECTORS: If true, the devnet will run on 512Mib sectors, but 2Kib otherwise.
* TEXLOTUSDEVNET_NUMMINERS: The number of miners in the devnet. This is an experimental feature, which seems stable for <=3.
* TEXLOTUSDEVNET_IPFSADDR: Optional multiaddr of an IPFS node to enable the Lotus node be connected to an IPFS node to avoid importing deals data, and storing retrievals.

### Run from source code

**Requirements**

- [Devnet](https://github.com/textileio/lotus-devnet). If you run the devnet with a stand-alone Lotus node, you should get the latest version of the devnet source code.

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
