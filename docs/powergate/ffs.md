# Storing Data

The Filecoin File System API (FFS) manages all the necessary state and capabilities to provide multi-tiered file storage through the Powergate. The FFS is the primary API for storing and retrieving data, tracking long-term deals on Filecoin, and allowing data persisted on Filecoin to be available on IPFS. 

## Intro to the FFS

The FFS API is scoped to one or more Filecoin wallet addresses. So to start accessing the FFS API, you must init a new instance at which time the Powergate will:

1. Create a new default wallet address for the FFS Instance. You can configure the Powergate to automatically fund new wallets from a master address.
2. Create a new API token linked to the FFS Instance.
3. Enable access to the FFS API through the use of the supplied token.

Anytime you use the FFS API (including use through the CLI), you will supply the _token_ to indicate which _FFS Instance_ your requests are targeting. Since each FFS Instance has its own address, it has its own balance and therefor limits on the Filecoin network.

!!!Warning
    If you're providing a `--lotusmasteraddr` and `--walletinitialfund`, be sure that address exists in the Lotus node and it has enough funds, since `walletinitialfund` attoFILs will be sent from there to fund from newly created FFS instances. Recall that both flags are optional, and if not present there won't be any auto-funding transaction, so you're responsible to fund wallet addresses of new FFS instances. You can fund any testnet wallet address using the official Lotus Faucet.

## Multi-tiered design

The FFS provides you API access to multi-tiered storage system built on IPFS and Filecoin. In many places, we refer to these two tiers of storage as Hot (IFPS) and Cold (Filecoin). This mirrors multi-tiered storage often deployed with a hot storage layer in _memory_ and a cold storage layer on _disk_.

### Hot storage layer

Data stored in the Powergate Hot layer is available to the IPFS network (or private network). Hot storage is designed to be fast and available on the IPFS network (private or public DHT). When you enable hot storage for data, the data is pinned to the Powergate's IPFS node. If Hot is enabled for data you store, you will be able to retrieve it at anytime. If Hot is disabled, you will need to first enable it before you retrieve it. Read more about [updating the CidConfig here](cidconfig.md).

### Cold storage layer

Data stored in the Powergate Cold layer is stored by miners on the Filecoin network (devnet or testnet). You can use the [CidConfig](cidconfig.md) to configure many properties of the Cold storage layer per file you store, such as where, how many copies, and how long to store the file. Data stored in the Cold layer will be available to the IPFS network even if it isn't presently in the Hot layer, but will require a retrieval deal to pull it from Cold and _add_ it to Hot.

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

### Store new data

The FFS requires data you aim to store to be available over IPFS. If you are using the CLI, you can ensure that it is available by staging it on IPFS using `addToHot`. Note that `addToHot` does not store your data in the Powergate FFS. It simply caches your data in the IPFS node in preparation for being stored in the Powergate FFS in the following steps. This is technically equivalent to `ipfs add`, which is adding data without pinning it.

```bash
pow ffs addToHot <path/filename>
```

???+ success

    ```Bash
    Success! Added file to FFS hot storage with cid: <cid>
    ```

### Push a CidConfig

How the Powergate manages each file stored in the FFS is defined by a _CidConfig_. To tell the Powergate to start managing a new file by moving it from the cached state we created above to the Hot and/or Cold layers, we must push a new CidConfig for the CID we generated above. Learn more about the [CidConfig here](cidconfig.md).

Every FFS instance has a default `CidConfig` that will be used for every new deal unless overridden.

```bash
pow ffs push --watch <cid>
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
    The FFS Scheduler is configured by default to run up to 50 pushes in parallel, though you can update this setting as needed. [Read more about the FFS design here](https://github.com/textileio/powergate/blob/master/ffs/Design.md).

**FFS Log**

The status will update as the deal progresses. If you push a file without the `--watch` flag, you can check the logs using `log`.

```bash
pow ffs log
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

## Learn more

The FFS does a lot of work out of the box. If you'd like to learn more about the components, design, and capabilities of the FFS, we encourage you to read the [FFS Design document](https://github.com/textileio/powergate/blob/master/ffs/Design.md).