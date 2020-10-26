# Filecoin Mainnet

If you are ready to run on Mainnet, the Powergate should make it as easy as possible. Note that running a fully synced [Lotus](https://lotu.sh/) node can take a considerable amount of time and resources. The required effort is normal on live blockchain networks. It may take more than a day to properly sync the current chain the first time your run the Powergate.

## Getting Started

There are a few resources you'll need before you start running any nodes.

- [Docker Desktop](https://www.docker.com/products/docker-desktop). In the examples below, you'll run node instances using local Docker containers. You can do the same with any Docker enabled system, but to get started we recommend Docker Desktop and the default configurations we provide.
- [Powergate](https://github.com/textileio/powergate).
- - [Golang](https://golang.org/). Building the Powergate CLI from code requires that you can run commands with Go. Other sections of the tutorials below don't have any Go requirement.

## Mainnet with Powergate

### Installation

Clone the Powergate and `cd` into the project

```bash
git clone git@github.com:textileio/powergate.git
cd powergate
```

### Setup

A default setup is available in a `docker-compose` configuration shipped with the Powergate. With the default setup, you will run Powergate connected to live Filecoin Mainnet.

**Run the docker-compose**

Docker files for the Powergate are all contained in the folder, `/docker`.

```bash
cd docker
make up
```

If this is your first time running the Powergate, Docker will download the required instances before any Powergate setup begins. Downloads are dependent on your bandwidth and may take **a few minutes**, but won't be required for subsequent runs of the Powergate.

If this is the first time you are running the Powergate on the mainnet, or if you have been offline for any amount of time, you will need to wait for the chain to properly sync. This will likely take more than a day.

Once running, you will begin to see log outputs.

```bash
lotus_1      | 2020-05-29T20:35:08.644Z	WARN	miner	miner/miner.go:177\
mined block in the past	{"block-time": "2009-01-01T04:44:30.000Z",\
"time": "2020-05-29T20:35:08.644Z", "duration": 359999438.64444387}
```

When complete, you will have a fully functional Powergate (`powd`), a Lotus node, and an IPFS node wired correctly together to start using the Mainnet!

### Bootstrap from a snapshot

Syncing a new Lotus node from genesis can take a considerable time. The current `mainnet` network is providing snapshots of the VM state every 6hrs, which means, in the worst case, syncing 6hs of new blocks.
Bootstraping the Lotus node from a snapshot implies complete trust in the party who generated the snapshot, so this is a pragmatic solution for getting up to speed fast. Depending on your use case you should consider the security risks of accepting snapshots from trusted parties.

In order to boostrap from a snapshot in `mainnet`, download the [snapshot CAR file](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car). This file is maintained up to date by Protocol Labs.
We're going to assume this CAR file was downloaded to your local path: `/home/myuser/snapshots/minimal_finality_stateroots_latest.car`.

You should edit the `docker/docker-compose.yaml` file adding two lines:
![image](https://user-images.githubusercontent.com/6136245/97188297-1dea1700-1782-11eb-83d0-1d5063d1bebe.png)

Then run `make up`. If you inspect the Lotus node with `docker logs mainnet_lotus_1`, you will see a message that is importing chain information, and many Badger compaction messages. After the importing is done, the Lotus node will continue to sync as usual showing the typical logs. At this point you should `make down` (you don't need to wait to full syncing), revert `docker/docker-compose.yaml` to the original content, and `make up` again.

Congratulations! You're now syncing from a trusted checkpoint.


### Create a deal and store a file

Now that your Powergate is running on mainnet, all the CLI and API commands are the same as if you had run it on localnet before.

#### Install the CLI

From the root of the `powergate` repo, you can build the CLI from the latest code. This will install the Powergate CLI, `pow`, on your machine.

```bash
make build
```

Test your installation.

```bash
pow --help
```

#### Start storing data

You are now ready to start storing and retrieving data using the Powergate. Read more on [Storing Data with the FFS](ffs.md).
