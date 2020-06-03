# Storing Data with the FFS

The Filecoin File System API (FFS) manages all the necessary state and capabilities to provide multi-tiered file storage through the Powergate. The FFS is the primary API for storing and retrieving data, tracking long-term deals on Filecoin, and allowing data persisted on Filecoin to be available on IPFS. To start using the FFS APIs you must first create an _FFS Instance_.

## FFS Instance

The FFS API is scoped to one or more Filecoin wallet addresses. So to start accessing the FFS API, you must init a new instance at which time the Powergate will:

1. Create a new default wallet address for the FFS Instance. You can configure the Powergate to automatically fund new wallets from a master address.
2. Create a new API token linked to the FFS Instance.
3. Enable access to the FFS API through the use of the supplied token.

Anytime you use the FFS API (including use through the CLI), you will supply the _token_ to indicate which _FFS Instance_ your requests are targeting. Since each FFS Instance has its own address, it has its own balance and therefor limits on the Filecoin network.

**Create an FFS Instance**

Using the Powergate CLI, you can create new FFS instances easily.

```bash
pow ffs create
```

???+ success

    ```Bash
    Instance created with id 0ac0fb4d-581c-4276-bd90-a9aa30dd4cb4 and token 883f57b1-4e66-47f8-b291-7cf8b10f6370
    ```

## Data storage

Powergate provides you API access to a multi-tiered storage system built on IPFS and Filecoin. In many places, we refer to these two tiers of storage as Hot (IFPS) and Cold (Filecoin). Data stored in the Powergate Hot layer is available to the IPFS network (or private network). Data stored only in the Cold layer can be available to the IPFS network, but will require a retrieval deal to pull it from Cold and _add_ it to Hot. This mirrors multi-tiered storage often deployed with a hot storage layer in _memory_ and a cold storage layer on _disk_.

You have a lot of control over how each file is managed on Hot and Cold storage through the use of the [Storage CidConfig](cidconfig.md).

## Learn more

The FFS does a lot of work out of the box. If you'd like to learn more about the components, design, and capabilities of the FFS, we encourage you to read the [FFS Design document](https://github.com/textileio/powergate/blob/master/ffs/Design.md).