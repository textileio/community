# Storing Data

Within the Powergate API, Storage Profiles manage all the necessary state and capabilities to provide multi-tiered file storage. The primary API for storing and retrieving data, tracking long-term deals on Filecoin, and allowing data persisted on Filecoin to be available on IPFS is managed through and scoped to a Storage Profile. 

## Intro to Storage Profiles

Storage profiles are scoped to one or more Filecoin wallet addresses. So to start using a Storage Profile, you must use the Powergate admin API to create a new Storage Profile, at which time the Powergate will:

1. Create a new default wallet address for the Storage Profile. You can configure the Powergate to automatically fund new wallets from a master address.
2. Create a new API token linked to the Storage Profile.
3. Enable use of the Storage Profile through the use of the supplied token.

Almost all Powergate APIs rely on the Storage Profile (including use through the CLI), so you will need to supply the _token_ to indicate which _Storage Profile_ your requests are targeting. Since each Storage Profile has its own address, it has its own balance and therefore limits on the Filecoin network.

!!!Warning
    If you're providing a `--lotusmasteraddr` and `--walletinitialfund`, be sure that address exists in the Lotus node and it has enough funds, since `walletinitialfund` attoFILs will be sent from there to fund from newly created Storage Profiles. Recall that both flags are optional, and if not present there won't be any auto-funding transaction, so you're responsible to fund wallet addresses of new Storage Profiles. 

## Multi-tiered design

Powergate provides you API access to multi-tiered storage system built on IPFS and Filecoin. In many places, we refer to these two tiers of storage as Hot (IFPS) and Cold (Filecoin). This mirrors multi-tiered storage often deployed with a hot storage layer in _memory_ and a cold storage layer on _disk_.

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

## Using Powergate to store data

To start using the most Powergate APIs, you must first create a _Storage Profile_.

### Create a Storage Profile

Using the Powergate CLI admin commands, you can create new Storage Profiles easily.

```bash
pow admin create-profile
```

???+ success

    ```Bash
    {
        "authEntry":  {
            "id":  "0ac0fb4d-581c-4276-bd90-a9aa30dd4cb4",
            "token":  "883f57b1-4e66-47f8-b291-7cf8b10f6370"
        }
    }
    ```

**Add environmental variable (optional)**

The `--token` is used to scope the requests to the Storage Profile we created. You can skip setting the `--token` flag on every command by adding your new token as an environmental variable. For the rest of the examples, we'll assume you've set this environmental variable.

```bash
export POW_TOKEN=883f57b1-4e66-47f8-b291-7cf8b10f6370
```

### Make data available

Powergate requires data you aim to store to be available over IPFS. If you are using the CLI, you can ensure that it is available by staging it on IPFS using `stage`. Note that `stage` does not store your data in the Powergate. It is an optional step that caches your data to ensure it is available on IPFS before being stored in Powergate. This is technically equivalent to `ipfs add --pin=false`, which is adding data without pinning it.

```bash
pow data stage <path/filename>
```

???+ success

    ```Bash
    {
        "cid":  "<cid>"
    }
    ```

!!!info
    If data exists on the IPFS network, you don't need to run `stage` as the Powergate will automatically fetch that data from remote peers.

### Initiate storage

The Powergate manages stored files based on the setup defined in a _StorageConfig_. To tell the Powergate to start managing a new file by moving it from the cached state we created above to the Hot and/or Cold layers, we must apply a new StorageConfig for the CID we generated above. Learn more about the [StorageConfig here](storageconfig.md).

Every Storage Profile has a default `StorageConfig` that will be used for every new deal unless overridden.

```bash
pow config apply --watch <cid>
```

???+ success

    ```Bash
    {
        "jobId":  "b4110048-5367-4ae5-8508-709bf7969748"
    }
                     JOB ID                |       STATUS         | MINER  |  PRICE   |    DEAL STATUS     
    ---------------------------------------+----------------------+--------+----------+--------------------
      70368cda-d65a-4e11-8a9f-fbf36135f563 | JOB_STATUS_EXECUTING |        |          |                    
    ```

When complete, you should see,

???+ success

    ```Bash
                     JOB ID                |       STATUS       | MINER  |  PRICE   |    DEAL STATUS     
    ---------------------------------------+--------------------+--------+----------+--------------------
      b4110048-5367-4ae5-8508-709bf7969748 | JOB_STATUS_SUCCESS |        |          |                    
                                           |                    | f01000 | 62500000 | StorageDealActive
    ```

!!!info
    Powergate is configured by default to run up to 50 pushes in parallel, though you can update this setting as needed. [Read more about the design here](https://github.com/textileio/powergate/blob/master/ffs/Design.md).

**Storage Job Watch**

The status will update as the deal progresses. If you apply a storage config without the `--watch` flag, you can check the progress later using, `watch`.

```bash
pow storage-job watch <jobid>
```

### Retrieve files

Finally, you can verify that the file was stored on the network by making a request to get it back out. 

```bash
pow data get <cid> myfile2
```

???+ success

    ```Bash
    Success! Data written to myfile2
    ```

!!!warning
    If you ever interact directly with the IPFS node, do not ever manually modify the pinset. The Powergate requires full control over the pinset, since it is required when users specify `HotStorage.Enabled=true`. Manually interacting with the IPFS node's pinset could lead to unexpected behavior in the Powergate.

## Miner selection

Powergate has many internal components that are used to simplify the process of using Filecoin. One set of components are the Powergate's indexes, where it collects information about miners including, power, sector size, storage ask price, etc. With that information, the Powergate can create a reasonable ranking of miners. Miners that are most promising for making deals will show up at the top. When storing data in cold storage, Powergate will use this information to automate finding miners and initiating deals. You can use the `StorageConfig` to help direct the Powergate to miners that match your particular requirements.

## Learn more

Powergate does a lot of work out of the box. If you'd like to learn more about the components, design, and capabilities of Powergate, we encourage you to read the [FFS Design document](https://github.com/textileio/powergate/blob/master/ffs/Design.md) which gets into more of the technical detail behind Powergate's API.
