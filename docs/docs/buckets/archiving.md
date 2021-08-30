# Bucket Archiving

Bucket archiving is the process of taking the existing snapshot of your bucket content and storing it on [Filecoin](https://filecoin.io/). This allows you to leverage the decentralized nature of Filecoin for the storage of your buckets. 

<!--
While the Hub is ready to be tested and built on by the right app developers, use it with caution.

^ - This warning is vague and unhelpful. It needs to be changed or removed.
- Albert Kim
-->

Check out this [video](https://www.youtube.com/watch?v=jiBUxIi1zko) from a [blog post](https://blog.textile.io/buckets-diffing-syncing-archiving/) demonstrating Filecoin bucket recovery using the Lotus client.

!!!Warning

    Archives are **only** encrypted if your bucket was configured to be encrypted.

    The Textile Hub is currently connected to Mainnet and account balances are in FIL.

    When you create a new archive, you store your data on the decentralized Filecoin network and _outside_ of the Textile platform. We provide this connection for users but do not offer any guarantees about the Filecoin network, data privacy or security, or access and availability once you create deals on that network.
    
    Read our full [terms](../policies/terms.md) and use these features with caution. 

<!--
"The Textile Hub is currently connected to Mainnet and account balances are in FIL."
^ FIL should be written out and not an acryonym, people might not know what it stands for.

- Albert Kim
-->

## Create your first archive

Archiving is available in all Textile client libraries and can be requested on a developer, user, or organization buckets. 

To start testing archiving, let's use a bucket created in the `hub` CLI. 

Let's try archiving the bucket.

```sh
hub buck archive
> Warning! Archives are Filecoin Mainnet. Use with caution.
? Proceed? [y/N]
```

Any Bucket archive you create will be stored on the Filecoin Mainnet.

You should see a success message if you proceed.

???+ success

    ```Bash
    > Success! Archive queued successfully
    ```

This means that archiving has been initiated. It may take some time to complete...

You can get the current status of your archive as well as any previous archives. Notice that the `dealInfo` property of the returned data includes information about the Filecoin deal(s) created for your archive:

```sh
hub buck archives list
> Success! 
{
  "current": {
    "cid": "bafybeiaxkbr6fudtgbayg5yndy6vpmz7c4ucjevdl5d5j2r77rkri4fftm",
    "jobId": "e45bfc6d-79f1-4952-b483-7a644f20d976",
    "archiveStatus": "ARCHIVE_STATUS_EXECUTING",
    "aborted": false,
    "abortedMsg": "",
    "failureMsg": "",
    "createdAt": "1606772858",
    "dealInfo": [
      {
        "proposalCid": "bafyreie2uj42qvk7hqqhfrusj2k7ghbgqqtfydkxdabf6ucmbpzvpx2gni",
        "stateId": "13",
        "stateName": "StorageDealCheckForAcceptance",
        "miner": "f01000",
        "pieceCid": "baga6ea4seaqmd257xep2aqskphm5bew6goqiehdqypy37qicfrbnodfy6yodooi",
        "size": "508",
        "pricePerEpoch": "238",
        "startEpoch": "508",
        "duration": "521189",
        "dealId": "0",
        "activationEpoch": "0",
        "message": ""
      }
    ]
  },
  "history": []
}
```

Use the archive watch command to watch your archive progress through the Filecoin market deal stages.

```sh
hub buck archive watch
>        Pushing new configuration...
>        Configuration saved successfully
>        Executing job e45bfc6d-79f1-4952-b483-7a644f20d976...
>        Ensuring Hot-Storage satisfies the configuration...
>        No actions needed in Hot Storage.
>        Hot-Storage execution ran successfully.
>        Ensuring Cold-Storage satisfies the configuration...
>        Current replication factor is lower than desired, making 1 new deals...
>        Entering deal preprocessing queue...
>        Calculating piece size...
>        Calculated piece size is 0 MiB.
>        Proposing deal to miner f01000 with 500000000 attoFIL per epoch...
>        Watching deals unfold...
>        Deal with miner f01000 changed state to StorageDealReserveClientFunds
>        Deal with miner f01000 changed state to StorageDealClientFunding
>        Deal with miner f01000 changed state to StorageDealCheckForAcceptance
>        Deal 2 with miner f01000 changed state to StorageDealSealing
>        Deal 2 with miner f01000 is active on-chain
>        Cold-Storage execution ran successfully.
>        Job e45bfc6d-79f1-4952-b483-7a644f20d976 execution finished with status Success.
```

The output will look something like the above. With a little luck, you'll start seeing some successful storage deals.

## Limits

Archiving is limited by the limits of buckets, so the maximum size is {{limits.max_bucket_size}}. Archives stored on Filecoin **do not** count toward your account storage limits. Only files that remain in your live bucket are counted.