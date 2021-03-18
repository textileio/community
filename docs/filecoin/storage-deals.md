You will be adding data to the Filecoin through your use of the [buckets](../../buckets/) and [bucket archives](../../buckets/archiving). However, it can also be helpful to monitor all deals you have created with your Hub wallet. For that, we have the following tools.

## Get all storage records

This command will list all the storage records requests you've made across all of your buckets.

```Bash
hub fil storage
```

???+ success

    ```Bash
    > Success!
    {
      "records":  [
        {
          "rootCid":  "bafybeifimdtphhaqrh5zxyfixr52sjnopyae7oqjsvnqspsfvd2prmlb6a",
          "address":  "t3wtnwtjwzwcdbfl24rzepbo3ytqzw2dif3ofwqituzo5v4k5fmguvp56mtq444ozukbbuvhe7zxcb6vhb2e4q",
          "time":  "1600802782",
          "pending":  false,
          "dealInfo":  {
            "proposalCid":  "bafyreib55eifkle5l5rtnhw3cuecd5kzcmlius4vvimaxm7gdiim4wwkjm",
            "stateId":  "7",
            "stateName":  "StorageDealActive",
            "miner":  "t016309",
            "pieceCid":  "baga6ea4seaqokoj6iw4ln7ybrbmsedkxttplz7cb3xaun2aqqhx7sfil6if62ka",
            "size":  "508",
            "pricePerEpoch":  "0",
            "startEpoch":  "83794",
            "duration":  "1039744",
            "dealId":  "153141",
            "activationEpoch":  "83205",
            "message":  ""
          },
          "transferSize":  "0",
          "dataTransferStart":  "1970-01-01T00:00:00Z",
          "dataTransferEnd":  "1970-01-01T00:00:00Z",
          "sealingStart":  "1970-01-01T00:00:00Z",
          "sealingEnd":  "1970-01-01T00:00:00Z",
          "errMsg":  "",
          "updatedAt":  "2020-09-22T19:26:22.000000090Z"
        }
      ]
    }
    ```

You can filter your array of storage requests by source CID (`--cids`) and filter the results by only finalized deals (`--include-final`) or pending deals (`--include-pending`).
