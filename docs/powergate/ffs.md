# Storing Data

The Filecoin File System API (FFS) manages all the necessary state and capabilities to provide multi-tiered file storage through the Powergate. The FFS is the primary API for storing and retrieving data, tracking long-term deals on Filecoin, and allowing data persisted on Filecoin to be available on IPFS. 

## Intro to the FFS

The FFS API is scoped to one or more Filecoin wallet addresses. So to start accessing the FFS API, you must init a new instance at which time the Powergate will:

1. Create a new default wallet address for the FFS Instance. You can configure the Powergate to automatically fund new wallets from a master address.
2. Create a new API token linked to the FFS Instance.
3. Enable access to the FFS API through the use of the supplied token.

Anytime you use the FFS API (including use through the CLI), you will supply the _token_ to indicate which _FFS Instance_ your requests are targeting. Since each FFS Instance has its own address, it has its own balance and therefor limits on the Filecoin network.

!!!Warning
    If you're providing a `--lotusmasteraddr` and `--walletinitialfund`, be sure that address exists in the Lotus node and it has enough funds, since `walletinitialfund` attoFILs will be sent from there to fund from newly created FFS instances. Recall that both flags are optional, and if not present there won't be any auto-funding transaction, so you're responsible to fund wallet addresses of new FFS instances. 

## Multi-tiered design

The FFS provides you API access to multi-tiered storage system built on IPFS and Filecoin. In many places, we refer to these two tiers of storage as Hot (IPFS) and Cold (Filecoin). This mirrors multi-tiered storage often deployed with a hot storage layer in _memory_ and a cold storage layer on _disk_.

### Hot storage layer

Data stored in the Powergate hot layer is available to the IPFS network (or private network). Hot storage is designed to be fast and available on the IPFS network (private or public DHT). The default `StorageConfig` enables both hot and cold for all new data stored. Data stored with hot enabled is pinned to the Powergate's IPFS node. 

### Cold storage layer

Data stored in the Powergate Cold layer is stored by miners on the Filecoin network (localnet or mainnet). You can use the [StorageConfig](storageconfig.md) to configure many properties of the Cold storage layer per file you store, such as where, how many copies, and how long to store the file. The default `StorageConfig` enables both hot and cold storage layers, meaning your data will be simultaneously available on IPFS and persisted on Filecoin.

### Moving between tiers

#### Hot to Cold

Data that is stored in the hot layer can be moved to cold storage in a couple different ways. The most common scenario is where data is stored initially with cold *disabled* and later a new `StorageConfig` is pushed that *enables* cold storage. In this scenario, Powergate will resolve the file from the hot layer, and create any newly required Filecoin deals to fulfill.

#### Cold to Hot

Data stored only in the cold layer isn't guaranteed to be available on the IPFS network. In order for it to be, you need to push a new storage config that enables hot storage. You can automate this movement using the `AllowUnfreeze` flag of [the StorageConfig](storageconfig.md). Either way, Powergate will always attempt resolve the data, first by trying to fetch it from the IPFS network. If unable to do that, Powergate will execute a retrieval deal to pull the data from Filecoin. Finally, the data will be pinned in hot layer IPFS storage and available on the IPFS network.

Read more about [updating the StorageConfig here](storageconfig.md).

## Using the FFS

To start using the FFS APIs you must first create an _FFS Instance_.

### Create an FFS Instance

Using the Powergate CLI, you can create new FFS instances easily.

```bash
pow ffs create
```

???+ success

    ```Bash
    Instance created with id 0ac0fb4d-581c-4276-bd90-a9aa30dd4cb4 and token 883f57b1-4e66-47f8-b291-7cf8b10f6370
    ```

**Add environmental variable (optional)**

The `--token` is used to scope the requests to the FFS instance we created. You can skip setting the `--token` flag on every command by adding your new token as an environmental variable. For the rest of the examples, we'll assume you've set this environmental variable.

```bash
export POW_TOKEN=883f57b1-4e66-47f8-b291-7cf8b10f6370
```

### Make data available

The FFS requires data you aim to store to be available over IPFS. If you are using the CLI, you can ensure that it is available by staging it on IPFS using `stage`. Note that `stage` does not store your data in the Powergate FFS. It is an optional step that caches your data to ensure it is available on IPFS before being stored in the Powergate FFS. This is technically equivalent to `ipfs add --pin=false`, which is adding data without pinning it.

```bash
pow ffs stage <path/filename>
```

???+ success

    ```Bash
    Success! Cached file in FFS hot storage with cid: <cid>
    ```

!!!info
    If data exists on the IPFS network, you don't need to run `stage` as the Powergate will automatically fetch that data from remote peers.

### Initiate storage

The Powergate manages each file stored in the FFS based on the setup defined in a _StorageConfig_. To tell the Powergate to start managing a new file by moving it from the cached state we created above to the Hot and/or Cold layers, we must push a new StorageConfig for the CID we generated above. Learn more about the [StorageConfig here](storageconfig.md).

Every FFS instance has a default `StorageConfig` that will be used for every new deal unless overridden.

```bash
pow ffs config push --watch <cid>
```

???+ success

    ```Bash
    > Success! Pushed cid config for <cid> to FFS with job id: 70368cda-d65a-4e11-8a9f-fbf36135f563
               JOB ID                	 STATUS    
    70368cda-d65a-4e11-8a9f-fbf36135f563	Executing
    ```

When complete, you should see,

???+ success

    ```Bash
    > Success! Pushed cid config for <cid> to FFS with job id: 70368cda-d65a-4e11-8a9f-fbf36135f563
               JOB ID                   STATUS
    70368cda-d65a-4e11-8a9f-fbf36135f563    Success
    ```

!!!info
    The FFS is configured by default to run up to 50 pushes in parallel, though you can update this setting as needed. [Read more about the FFS design here](https://github.com/textileio/powergate/blob/master/ffs/Design.md).

**FFS Watch**

The status will update as the deal progresses. If you push a file without the `--watch` flag, you can check the progress later using, `watch`.

```bash
pow ffs watch <jobid>
```

### Retrieve files

Finally, you can verify that the file was stored on the network by making a request to get it back out. 

```bash
❯ pow ffs get <cid> myfile2
```

???+ success

    ```Bash
    Success! Data written to myfile2
    ```

!!!warning
    If you ever interact directly with the IPFS node, do not ever manually modify the pinset. The Powergate requires full control over the pinset, since it is required when users specify `HotStorage.Enabled=true`. Manually interacting with the IPFS node's pinset could lead to unexpected behavior in the Powergate.

## Miner selection

Powergate has many internal components that are used to simplify the process of using Filecoin. One set of components are the Powergate's indexes, where it collects information about miners including, power, sector size, storage ask price, etc. With that information, the Powergate can create a reasonable ranking of miners. Miners that are most promising for making deals will show up at the top. When pushing data to cold storage, the FFS will use this information to automate finding miners and initiating deals. You can use the `StorageConfig` to help direct the Powergate to miners that match your particular requirements.

## Learn more

The FFS does a lot of work out of the box. If you'd like to learn more about the components, design, and capabilities of the FFS, we encourage you to read the [FFS Design document](https://github.com/textileio/powergate/blob/master/ffs/Design.md).
