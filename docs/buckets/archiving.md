# Bucket Archiving

Bucket archiving is one of the latest features to arrive at Textile. Archiving is the process of taking the existing snapshot of your bucket content and storing it on [Filecoin](https://filecoin.io/). Filecoin is still considered experimental, but it is ready to be tested and built on by the right app developers. So, what is bucket archiving?

Bucket archiving allows you to leverage the purely decentralized nature of Filecoin for the storage of your buckets. Check out this [video](https://www.youtube.com/watch?v=jiBUxIi1zko&feature=emb_title&ab_channel=IgnacioHagopian) from a [blog post](https://blog.textile.io/buckets-diffing-syncing-archiving/) demonstrating Filecoin bucket recovery using the Lotus client.

When you create a new archive, you store your data on the decentralized Filecoin network and _outside_ of the Textile platform. We provide this connection for users but do not offer any guarantees about the Filecoin Testnet network, data privacy or security, or access and availability once you create deals on that network.

Archives are **only** encrypted if your bucket was configured to be encrypted. 

## Create your first archive

Archiving is available in all of the Textile client libraries and can be requested on a developer, user, or organization buckets. To start testing archiving, let's use a bucket created in the `hub` CLI. 

Let's try archiving the bucket.

```sh
hub buck archive
> Warning! Archives are currently saved on an experimental test network. They may be lost at any time.
? Proceed? [y/N]
```

The Hub is connected to the Filecoin testnet, so any archiving deal you create will be created on [that experimental version](../powergate/testnet.md) of the network.

You should see a success message if you proceed.

???+ success

    ```Bash
    > Success! Archive queued successfully
    ```

This means that archiving has been initiated. It may take some time to complete...

```sh
hub buck archive status
> Archive is currently executing, grab a coffee, and be patient...
```

Use the archive status command with -w to watch your archive's progress as it moves through the Filecoin market deal stages.

```sh
buck archive status -w
> Archive is currently executing, grab a coffee, and be patient...
>    Pushing new configuration...
>    Configuration saved successfully
>    Executing job 1006707f-efa8-48c2-98af-a1b320a59780...
>    Ensuring Hot-Storage satisfies the configuration...
>    No actions needed in Hot Storage.
>    Hot-Storage execution ran successfully.
>    Ensuring Cold-Storage satisfies the configuration...
>    Current replication factor is lower than desired, making 10 new deals...
>    Calculating piece size...
>    Estimated piece size is 256 bytes.
>    Proposing deal to miner t01459 with 0 fil per epoch...
>    Proposing deal to miner t0117734 with 500000000 fil per epoch...
>    Proposing deal to miner t0120993 with 500000000 fil per epoch...
>    Proposing deal to miner t0120642 with 500000000 fil per epoch...
>    Proposing deal to miner t0121477 with 500000000 fil per epoch...
>    Proposing deal to miner t0119390 with 500000000 fil per epoch...
>    Proposing deal to miner t0101180 with 10000000 fil per epoch...
>    Proposing deal to miner t0117803 with 500000000 fil per epoch...
>    Proposing deal to miner t0121852 with 500000000 fil per epoch...
>    Proposing deal to miner t0119822 with 500000000 fil per epoch...
>    Watching deals unfold...
>    Deal with miner t0117803 changed state to StorageDealClientFunding
>    Deal with miner t0121852 changed state to StorageDealClientFunding
>    Deal with miner t0121477 changed state to StorageDealClientFunding
>    Deal with miner t0101180 changed state to StorageDealClientFunding
>    Deal with miner t0119822 changed state to StorageDealClientFunding
>    Deal with miner t0119390 changed state to StorageDealClientFunding
>    Deal with miner t0120642 changed state to StorageDealClientFunding
>    Deal with miner t0117734 changed state to StorageDealClientFunding
>    Deal with miner t01459 changed state to StorageDealClientFunding
>    Deal with miner t0120993 changed state to StorageDealClientFunding
>    Deal with miner t0121477 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0119822 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0117734 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0121852 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t01459 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0120642 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0120993 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0117803 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0101180 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t0119390 changed state to StorageDealWaitingForDataRequest
>    Deal with miner t01459 changed state to StorageDealProposalAccepted
>    Deal with miner t01459 changed state to StorageDealSealing
```

The output will look something like the above. With a little luck, you will start seeing some successful storage deals.

## Limits

Archiving is limited by the limits of buckets, so the maximum size is {{limits.max_bucket_size}}. Archives stored on Filecoin **do not** count toward your account storage limits only files that remain in your live bucket are counted.