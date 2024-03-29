# Filecoin Frequently Ased Questions

### What is a minimal test of localnet using the Powergate CLI?

```
$ <generate or use a ~10MB “new” file>
$ pow -t 9d9f2fb8-c559-4394-98c9-12b2144124fc data stage new
{
  "cid":  "QmSKfdYojdncCkq7FCnhATvzPrtS4HSdQno7TxTKTgegFt"
}
$ pow -t 9d9f2fb8-c559-4394-98c9-12b2144124fc config apply QmSKfdYojdncCkq7FCnhATvzPrtS4HSdQno7TxTKTg
{
  "jobId":  "e27f1366-f3d0-484d-a0b3-b3abe71c150c"
}
$ pow -t 9d9f2fb8-c559-4394-98c9-12b2144124fc data log QmSKfdYojdncCkq7FCnhATvzPrtS4HSdQno7TxTKTgegFt
> 2020-09-28T09:12:15 - Pushing new configuration...
> 2020-09-28T09:12:15 - Configuration saved successfully
> 2020-09-28T09:12:15 - Executing job e27f1366-f3d0-484d-a0b3-b3abe71c150c...
> 2020-09-28T09:12:15 - Ensuring Hot-Storage satisfies the configuration...
> 2020-09-28T09:12:15 - Hot-Storage execution ran successfully.
> 2020-09-28T09:12:15 - Ensuring Cold-Storage satisfies the configuration...
> 2020-09-28T09:12:15 - Current replication factor is lower than desired, making 1 new deals...
> 2020-09-28T09:12:15 - Calculating piece size...
> 2020-09-28T09:12:16 - Estimated piece size is 16777216 bytes.
> 2020-09-28T09:12:16 - Proposing deal to miner t01000 with 500000000 attoFIL per epoch...
> 2020-09-28T09:12:17 - Watching deals unfold...
> 2020-09-28T09:12:47 - Deal with miner t01000 changed state to StorageDealSealing
> 2020-09-28T09:14:47 - Deal 2 with miner t01000 is active on-chain
> 2020-09-28T09:14:47 - Cold-Storage execution ran successfully.
> 2020-09-28T09:14:47 - Job e27f1366-f3d0-484d-a0b3-b3abe71c150c execution finished with status Success.
```

### Why is my custom StorageConfig being ignored?

In SR2, we're using a custom miner-selector strategy by default: SR2-MinerSelector.

Every time Powergate needs to create a deal, it fetches [this](https://github.com/filecoin-project/slingshot/blob/master/miners.json) JSON file and takes `amount` miners at random from each region and make deals with them.

The list from the JSON file includes miners who should be reasonably reliable to increase the odds of a successful deal. The list is maintained by the Slingshot team.

Powergate fetches this file every time it needs to do a deal so it will always select the most recent miners.

If you set `TrustedMiners` or `RepFactor` in your storage config, those will be ignored by Powergate. If you want full control using your _StorageConfig_, you can run `powd` with `--ffsminerselector="reputation"` (or env `POWD_FFSMINERSELECTOR)` which switches to the previous unopinionated miner selector strategy used before SR2.

### I see a log error `miner XXX not in ask-cache and query-ask errored:`, what does this mean?

This usually means two possible problems:

1. The targeted miners don't exist in the network, or your Lotus node is not completely synced.
2. Your Lotus node doesn't have connectivity with them to query ask their storage price.

In most cases, if the miner or your Lotus node are in China, there might be reachability challenges related to the second bullet point.

If you're not using any custom config and just the SR2 miner selector using the remote JSON file, and experiencing problems reaching some of those miners, please report this in a support channel since we should understand why that particular miner might have problems for your Lotus node.

### When I start Powergate, I see a fatal error: `verifying sr2 url content: getting miners list from url: Get https://xxxxx`, what does this mean?

Since Powergate uses SR2 miner selection by default, it checks if the [miners JSON file](https://github.com/filecoin-project/slingshot/blob/master/miners.json) is reachable.

This file is located in Github so it should be readily available.

Some Powergate community members running Powergate from China had experienced these exact problems since there might be constraints in fetching this file from Github.

You can override this URL by specifying the flag/env `--ffsminerselectorparams`/`POWD_FFSMINERSELECTORPARAMS` with any URL that might be reachable from your location.

### I see a log error `computing commP failed: generating CommP: blockstore: block not found`, what does this mean?

This is a sign that your Lotus node is not properly configured to use `go-ipfs` from Powergate as the underlying blockstore to find and store data.
You should configure the following in your Lotus `config.toml` file:

```
[Client]
UseIpfs = true
IpfsMAddr = "/ip4/127.0.0.1/tcp/5001"
IpfsUseForRetrieval = true
```

Note that if you are running the Powergate stack with `make up`, [this is already wired automatically](https://github.com/textileio/powergate/blob/d373c74922dfca5b56d7994a51bb59e496ef5730/docker/docker-compose.yaml#L35).

### The `pow data log` commands mention an error `... adding markets funds failed:`, how can I fix this?

You should check that your user wallet address used for making deals has enough funds.

### What does the following log error mean: `rpc go-jsonrpc: xxxx`?

Usually, this is related to a [reported](https://github.com/filecoin-project/lotus/issues/3581) issue.

As a solution, Powergate switched to another style of connecting to Lotus which is more reliable and avoids that problem.

You could ignore those errors since Powergate is not relying on the Lotus client to have stable connections. If the errors don't impact other logs related to Powergate, you should be fine. If that isn't the case please report the issue in a support channel.

We decided to not hide errors from this external package just in case we discover new problems.

### I've made a deal in Mainnet/Testnet/SR2, how can I know everything is working okay?

We recommend using the `pow -t <token> data log <pushed-cid>` which provides a human-friendy output.

Creating deals on any Filecoin network can take over 10hrs and many things can go wrong since Powergate is relatively open to miners that provide storage in the network. They might go offline at any time, be unreliable, or have network problems.

### I see a log error `already tracking identifier: <cid>`, what should I do?

Please refer to [this](https://filecoinproject.slack.com/archives/C01ARR6BD2M/p1601297368175000) Slack thread.
