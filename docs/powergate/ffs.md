# FFS

The FFS the manages all the necessary state and capabilities to provide multi-tiered file storage through the Powergate. The FFS is the primary API for storing and retrieving data, tracking long-term deals on Filecoin, and allowing data persisted on Filecoin to be available on IPFS. To start using the FFS APIs you must first create an _FFS Instance_.

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

You have a lot of control over how each file is managed on Hot and Cold storage through the use of the [Storage CidConfig](#storage-cidconfig).

### Storage CidConfig

Every FFS instance ([detailed below](#ffs)) can manage how data is stored on IPFS and Filecoin using the CidConfig (see below). Each FFS instance has a default config and every new storage request can use or override the default. Additionally, FFS owners can update the storage configuration (CidConfig) by pushing a new config file. When that happens, Powergate does all the work to comply with the new configuration.

The CidConfig defines how data will be stored in Hot and Cold storage. A lot of the _power_ of the Powergate can be harnessed in how you setup and use these configurations.

Here is an example of the _default CidConfig_.

```JSON
{
  // Hot has this desired storing configuration in Hot Storage.
  "Hot": {
    // Enable indicates if Cid data is stored. If true, it will
    // consider further configurations to execute actions.
    "Enabled": true,
    // AllowUnfreeze indicates that if data isn't available in the
    // Hot Storage, it's allowed to be feeded by Cold Storage if
    // available.
    "AllowUnfreeze": false,
    "Ipfs": {
      // AddTimeout is an upper bound on adding data to IPFS node from
      // the network before failing.
      "AddTimeout": 30
    }
  },
  // Cold has desired storing configuration in the Cold Storage.
  "Cold": {
    // Enabled indicates that data will be saved in Cold storage.
    // If is switched from false->true, it will consider the other
    // attributes as the desired state of the data in this Storage.
    "Enabled": true,
    // Filecoin describes the desired Filecoin configuration for a
    // Cid in the Filecoin network.
    "Filecoin": {
    	// RepFactor indicates the desired amount of active deals
    	// with different miners to store the data. While making deals
    	// the other attributes of FilConfig are considered for miner
      // selection.
      "RepFactor": 1,
    	// DealDuration indicates the duration to be used when making
      // new deals.
      "DealDuration": 1000,
    	// ExcludedMiners is a set of miner addresses won't be ever be
      // selected when making new deals, even if they comply to other
      // filters.
      "ExcludedMiners": null,
    	// TrustedMiners is a set of miner addresses which will be
      // forcibly used when making new deals. An empty/nil list
      // disables this feature.
      "TrustedMiners": null,
    	// CountryCodes indicates that new deals should select miners
      // on specific countries.
      "CountryCodes": null,
    	// Renew indicates deal-renewal configuration.
      "Renew": {
        // Enabled indicates that deal-renewal is enabled for this
        // Cid.
        "Enabled": false,
        // Threshold indicates how many epochs before expiring should
        // trigger deal renewal. e.g: 100 epoch before expiring.
        "Threshold": 0
      },
    	// Addr is the wallet address used to store the data in filecoin
      "Addr": "<unique>",
      "MaxPrice": 0
    }
  },
  "Repairable": false
}
```

## Learn more

The FFS does a lot of work out of the box. If you'd like to learn more about the components, design, and capabilities of the FFS, we encourage you to read the [FFS Design document](https://github.com/textileio/powergate/blob/master/ffs/Design.md).