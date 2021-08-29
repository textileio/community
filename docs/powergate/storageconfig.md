# Managing Storage with the StorageConfig

Every [user](storage.md#intro-to-users) can manage how data is stored on IPFS and Filecoin using the **StorageConfig** ([details below](#storageconfig-details)). 

The StorageConfig is a powerful tool for:

* Customizing the details about storing data on Filecoin.
* Making it available over IPFS.
* Enforcing replication.
* Managing expiring deals.
* And more.

## Setting the StorageConfig

In every Powergate deployment, there are three ways to manage StorageConfigs throughout the system.

1. The user default StorageConfig. This is initially set by the system default StorageConfig. It can be modified by the user after creation.
2. The storage request StorageConfig. This will use the user default, but a custom StorageConfig can also be supplied during the request.
3. A storage update StorageConfig. Any StorageConfigs attached to existing stored data can be updated with a new StorageConfig. Powergate will then work to modify the way data is stored to match the new configuration.

### Get the default StorageConfig of a user

View the current default StorageConfig of a user. 

```bash
pow config default -t <token>
```

### Set the default StorageConfig of a user

To set the default `StorageConfig` to one stored in `new-config.json`.

```bash
pow config set-default new-config.json -t <token>
```

### Set a custom StorageConfig at storage time

You can provide a flag (`-c`) to include a custom StorageConfig for a new storage request. Storage requests without a custom StorageConfig will use the instance default storage config.

```bash
pow config apply <cid> -t <token> -c custom-config.json
```

### Get information about a previously stored cid

To pull the StorageConfig and information about the associated storage jobs, use the _<cid>_ of the stored data.

```bash
pow data info <cid> -t <token>
```

### Update the StorageConfig of existing data

To update the StorageConfig of data already stored and managed by the Powergate user, use a new config stored in `updated-config.json`. This command requires the _override_ flag (`-o`) to confirm that you understand that the command will replace an existing config.

```bash
pow config apply <cid> -t <token> -o -c updated-config.json
```

## StorageConfig Details

Here is an example of the _default StorageConfig_.

```JSON
{
  // hot has this desired storing configuration in Hot Storage.
  "hot": {
    // enabled indicates if Cid data is stored. If true, it will
    // consider further configurations to execute actions.
    "enabled": true,
    // allowUnfreeze indicates that if data isn't available in the
    // Hot Storage, it's allowed to be feeded by Cold Storage if
    // available.
    "allowUnfreeze": false,
    // ipfs configured ipfs behavior for hot storage
    "ipfs": {
      // addTimeout is an upper bound on adding data to IPFS node from
      // the network before failing.
      "addTimeout": 30
    }
  },
  // cold has desired storing configuration in the Cold Storage.
  "cold": {
    // enabled indicates that data will be saved in Cold storage.
    // If is switched from false->true, it will consider the other
    // attributes as the desired state of the data in this Storage.
    "enabled": true,
    // filecoin describes the desired Filecoin configuration for a
    // Cid in the Filecoin network.
    "filecoin": {
      // repFactor indicates the desired amount of active deals
      // with different miners to store the data. While making deals
      // the other attributes of FilConfig are considered for miner
      // selection.
      "repFactor": 1,
      // dealMinDuration indicates the minimum duration to be used when making
      // new deals.
      "dealMinDuration": 1000,
      // excludedMiners is a set of miner addresses won't be ever be
      // selected when making new deals, even if they comply to other
      // filters.
      "excludedMiners": [],
      // trustedMiners is a set of miner addresses which will be
      // forcibly used when making new deals. An empty/nil list
      // disables this feature.
      "trustedMiners": [],
      // countryCodes indicates that new deals should select miners
      // on specific countries.
      "countryCodes": [],
      // renew indicates deal-renewal configuration.
      "renew": {
        // enabled indicates that deal-renewal is enabled for this
        // Cid.
        "enabled": false,
        // threshold indicates how many epochs before expiring should
        // trigger deal renewal. e.g: 100 epoch before expiring.
        "threshold": 0
      },
      // addr is the wallet address used to store the data in filecoin
      "addr": "<unique>",
      // maxPrice is the maximum price that will be spent per RepFactor 
      // to store the data in units of attoFIL per GiB per epoch
      "maxPrice": 0,
      // fastRetrieval indicates that created deals should enable the
      // fast retrieval feature.
      "fastRetrieval": true,
      // dealStartOffset indicates how many epochs in the future impose a
      // deadline to new deals being active on-chain. This value might influence
      // if miners accept deals, since they should seal fast enough to satisfy
      // this constraint.
      "dealStartOffset": 8640, // Equivalent to 72 hours
      // verifiedDeal indicates that new deals will be verified-deals, using
      // available data-cap from the wallet address.
      "verifiedDeal": false
    }
  },
  // If true, Powergate will detect if the data is no longer
  // stored according to the StorageConfig requirements and
  // make new storage arrangements that match the StorageConfig
  "repairable": false
}
```

<br/>
