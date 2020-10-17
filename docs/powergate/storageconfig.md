# Managing Storage with the StorageConfig

Every [FFS instance](ffs.md) can manage how data is stored on IPFS and Filecoin using the **StorageConfig** ([details below](#storageconfig-details)). The StorageConfig is a powerful tool to customize all the details of how you store data on Filecoin, make it available over IPFS, enforce replication, manage expiring deals, and more.

## Setting the StorageConfig

In every Powergate deployment there are three ways to manage StorageConfigs throughout the system.

1. The FFS instance default StorageConfig. This is initially set by the system default StorageConfig. It can be modified by the FFS instance owner after creation.
2. The storage request StorageConfig. This will use the FFS instance default, but a custom StorageConfig can also be supplied at request time.
3. A storage update StorageConfig. Any StorageConfigs attached to existing stored data can be updated with a new StorageConfig. The FFS instance will then work to modify the way data is stored to match the new configuration

### Get the default StorageConfig of an FFS instance

View the current default StorageConfig of an FFS instance. 

```bash
pow ffs config default -t <token>
```

### Set the default StorageConfig of an FFS instance

To set the default `StorageConfig` to one stored in `new-config.json`.

```bash
pow ffs config set-default new-config.json -t <token>
```

### Set a custom StorageConfig at storage time

You can provide a flag (`-c`) to include a custom StorageConfig for a new storage request. Storage requests without a custom StorageConfig will use the instance default storage config.

```bash
pow ffs config push <cid> -t <token> -c custom-config.json
```

### Get the StorageConfig of previously stored data

To pull the StorageConfig associated with data already managed by the FFS instance, use the _<cid>_ of the stored data.

```bash
pow ffs config get <cid> -t <token>
```

### Update the StorageConfig of existing data

To update the StorageConfig of data already stored and managed by the Powergate with a new config stored in `updated-config.json`. This command requires the _override_ flag (`-o`) to confirm that you understand that the command will replace an existing config.

```bash
pow ffs config push <cid> -t <token> -o -c updated-config.json
```

## StorageConfig Details

Here is an example of the _default StorageConfig_.

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
      // MaxPrice is the maximum price that will be spent per RepFactor 
      // to store the data in units of attoFIL per GiB per epoch
      "MaxPrice": 0,
      // FastRetrieval indicates that created deals should enable the
      // fast retrieval feature.
      "FastRetrieval": true,
      // DealStartOffset indicates how many epochs in the future impose a
      // deadline to new deals being active on-chain. This value might influence
      // if miners accept deals, since they should seal fast enough to satisfy
      // this constraint.
      "DealStartOffset": 8640 // Equivalent to 72 hours
    }
  },
  // If true, Powergate will detect if the data is no longer
  // stored according to the StorageConfig requirements and
  // make new storage arrangements that match the StorageConfig
  "Repairable": false
}
```

<br/>
