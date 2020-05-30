# Filecoin Local Devnet

Having a fully synced [Lotus](https://lotu.sh/) node can take a considerable amount of time and effort to maintain. The required effort is normal on live blockchain networks, but isn't ideal in some scenarios. Scenarios such as application development, testing, and continuous integration can be enhanced by having access to Lotus nodes and APIs that don't require connection to the live network. For those cases, we have built the [**lotus-devnet**](https://github.com/textileio/lotus-devnet).

**Speed**

The lotus-devnet is tuned for speed. After you have the docker instances installed, starting the devnet should take under a minute and storing a file in a new deal should also take under a minute in most cases.

The lotus-devnet runs a local devnet with a _mock_ sector-builder. This enables fast deployment of a _development Filecoin network_ containing a single miner where the sealing process is mocked but the rest of the node logic is the same as on the production Filecoin network. The miner is configured to accept and store all incoming deals.

**Production compatible storage**

The lotus-devnet is designed so that you can build and test your system quickly but function (except faster) the exact same way as the production Filecoin network. The devnet supports both 2KiB and 512MiB sectors, and the speed of block production is configurable. For advanced features, refer to the [lotus-devnet Readme](https://github.com/textileio/lotus-devnet).

## Getting Started

There are a few resources you'll need before you start running any nodes.

- [Docker Desktop](https://www.docker.com/products/docker-desktop). In the examples below, you'll run node instances using local Docker containers. You can do the same with any Docker enabled system, but to get started we recommend Docker Desktop and the default configurations we provide.
- [Powergate](https://github.com/textileio/powergate). If you run the devnet as part of the Powergate, you should get the latest version of the Powergate source code. 
- [Devnet](https://github.com/textileio/lotus-devnet). If you run the devnet with a stand-alone Lotus node, you should get the latest version of the lotus-devnet source code.
- [Golang](https://golang.org/). Building the Powergate CLI from code requires that you can run commands with Go. Other sections of the tutorials below don't have any Go requirement.

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

- Create a new wallet address on Lotus.
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

Note: `addToHot` is not a permanent function, without further action it will only `add` the file to IPFS temporarily.

**Push a storage config**

Every storage deal in your FFS is managed by a storage `config`. To move the file from temporary storage to managed storage on the hot (IPFS) and cold (Filecoin) layers, we can push a new config for our existing CID generated above.

Every FFS has a default `config` that can be used for every new deal, for now, we'll just use the default.

```bash
❯ pow ffs push -w -t 883f57b1-4e66-47f8-b291-7cf8b10f6370 QmYaAK8SSsKJsJdtahCbUe7MZzQdkPBybFCcQJJ3dKZpfm
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

## Devnet with stand-alone Lotus node

You can run the devnet to make use of a stand-alone [Lotus](https://lotu.sh/) with all the benefits described above. 

### Installation

Clone the lotus-devnet and `cd` into the project

```bash
git clone git@github.com:textileio/lotus-devnet.git
cd lotus-devnet
```

### Run

You can run the devnet with:

```bash
go run main.go
```

For full configuration options, [see the project Readme](https://github.com/textileio/lotus-devnet#run)

<br/>