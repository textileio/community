# Offline deals

The Filecoin network allows clients to create offline deals. Offline deals are the same as online deals, but they skip the data-transfer stage of the data between clients and miners. Once an offline deal is active on-chain, it would be indistinguishable from online deals regarding its data, security, or another dimension.

The purpose of offline deals is to have a way between clients and miners to coordinate other data transfer mediums apart from sending the data while negotiating the deal. If you have petabytes of storage that you want to onboard in Filecoin, it might become too slow or expensive to send it through the Internet to the miners. Similarly, you might prefer to send it still using an Internet connection but coordinating in some other way or days before making the deals on-chain.

If you're interested in some more in-depth explanation of offline-deals, you can read this [blog post](https://filecoin.io/blog/offline-data-transfer-for-large-scale-data/).

## Preparing data

If you want to make a deal with a miner, it's necessary to prepare your data. The source of data can be:

- A file path to a file.
- A file path to a folder.
- A Cid which data is stored in a `go-ipfs` node (use `--ipfs-api` flag).

Despite your data source, the data preparation result consist of:

- A CAR file: This file is the one that should be sent to miners.
- Piece-Size and PieceCID: these two fields are needed to propose the deal to the miner.

You can use `pow` to do the data preparation. The relevant commands are sub-commands under `pow offline`:

- `pow offline prepare`
- `pow offline car`
- `pow offline commp`

In most cases, only `pow offline prepare` will be relevant for preparing data since it does all that's needed to prepare a file/folder/Cid. The `pow offline car` and `pow offline commp` might help power-users that might want to produce only the CAR file, or calculate piece-size and piece-cid from an existing CAR file. Using `pow offline prepare` does the job more efficiently than `pow offline car + pow offline commp`. It already starts calculating piece-size and piece-cid concurrently with the CAR file generation.

All commands under `pow offline` are 100% local and don't require talking to a Powergate daemon (`powd`), or run an `go-ipfs` node.

Enough talking, how this works? Let's try with an example:

```bash
$ pow offline prepare foo.bin foo.car
> Creating data DAG...
1.00 GiB / 1.00 GiB [---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------] 100.00% 423.84 MiB p/s
> DAG created in 2.62s.
> Creating CAR and calculating piece-size and PieceCID...
> Created CAR file, and piece digest in 9.82s.
> Piece size: 2147483648 (2.0 GiB)
> Piece CID: baga6ea4seaqgfjuol7jhui7q6onijcese57vk4slqbgqck7vleifoxdoyqrl4fy

> Lotus offline-deal command:
> lotus client deal --manual-piece-cid=baga6ea4seaqgfjuol7jhui7q6onijcese57vk4slqbgqck7vleifoxdoyqrl4fy --manual-piece-size=2147483648 QmTEsmWrxvzEhhPoiMkU2tMAfhwAsVpKQ8otCuHsFtTpmM <miner> <price> <duration>
$ ls -lh foo.car 
-rwxr-xr-x 1 ignacio ignacio 1,1G abr  7 10:41 foo.car
```

In this single command run the following happened:

- The file was transformed to a UnixFS DAG.
- This DAG gets serialized to a CAR format, and saved in `out.car`.
- We calculate the final piece-size and piece-cid for this CAR file, which is data that's needed to make the offline deal.

If you would like to use this tool for scripting, the `--json` flag is very convenient:

```bash
➜  code pow offline prepare --json foo.bin foo.car
{"piece_size":2147483648,"piece_cid":"baga6ea4seaqgfjuol7jhui7q6onijcese57vk4slqbgqck7vleifoxdoyqrl4fy"}
```

If you want to prepare a Cid which data is already in a running `go-ipfs` node:

```bash
➜  pow offline prepare --ipfs-api /ip4/127.0.0.1/tcp/5001 QmdTUqgQwDgEfQee7Qwi49iXp3McDUMwh7de3wQ4Kna84t foo.car
> Creating CAR and calculating piece-size and PieceCID...
> Created CAR file, and piece digest in 0.03s.
> Piece size: 1048576 (1.0 MiB)
> Piece CID: baga6ea4seaqj622e4qcigzdwyog3w6oqeeptjeaih5nsv55v4w72wzvh24nkefy

> Lotus offline-deal command:
> lotus client deal --manual-piece-cid=baga6ea4seaqj622e4qcigzdwyog3w6oqeeptjeaih5nsv55v4w72wzvh24nkefy --manual-piece-size=1048576 QmdTUqgQwDgEfQee7Qwi49iXp3McDUMwh7de3wQ4Kna84t <miner> <price> <duration>
```

Note that in the `pow offline prepare` output we already have a template for running the offline deal using a Lotus node.
We'll soon add support for offline-deals in Powergate, and also add a command using the Powergate CLI.

The `pow offline car` and `pow offline commp` subcommands work similarly, also having `--json` or `--quiet` flags, and supporting `go-ipfs` as a datasource.

## Filecoin batching

The `pow offline prepare` CLI subcommand also supports a special mode of operation that aggregates files using a [standardized spec](https://hackmd.io/O-zleFXsTdKNIyUZ-3bDDw?view) without any extra dependencies.

The way to use this mode as follows:
```bash
$ pow offline prepare --json --aggregate [folder-with-files] [car-output-path]
```

For example, say you have a folder `foo` that contains a list of files that you want to aggregate in a Filecoin batch:
```bash
$ ls foo
file.01  file.02  file.03  file.04  file.05  file.06  file.07  file.08  file.09  file.10  file.11  file.12  file.13  file.14  file.15
```

Now we run the command:
```bash
$ pow offline prepare --json --aggregate foo myfoo.car 2>&1 | jq .
{
  "payload_cid": "bafybeiehczj2ykdgttv4l3lvwkojxgdatvnze32sf44gg44pi4pnajlle4",
  "piece_size": 1048576,
  "piece_cid": "baga6ea4seaqgio3tohbma6ntoczzxl2qtcicmoio3axacndqoibym4klq5q6qly",
  "files": [
    {
      "name": "foo/file.01",
      "Cid": "QmQ9KtzTJz25YLn7sZTpAZTmbVGRnDPt2FKgT68drdPv3K"
    },
    {
      "name": "foo/file.02",
      "Cid": "QmQGPnRANZRQXonSR4N1YtrgQFHnQ29SfSfjYANGEDetqF"
    },
    {
      "name": "foo/file.03",
      "Cid": "QmcSJovnWD4qJFyBvJwJE9VhMn2MSf9CY2BjwqYsFgc4iM"
    },
    {
      "name": "foo/file.04",
      "Cid": "QmVB98xQUikGF6wjzujFL9ihK7hYHUQ3Uyac36iPJxBqQk"
    },
    {
      "name": "foo/file.05",
      "Cid": "QmR18QQizM8XXvvSVJBgjyj7WFNWkXWrsKF5mjusjmHvA8"
    },
    {
      "name": "foo/file.06",
      "Cid": "QmYJ6pDDcwhHf2a32fQjTHuJ5TiQGMKqbZasmPsB8VeQwx"
    },
    {
      "name": "foo/file.07",
      "Cid": "QmWBttk99EoYuQPL2GfMQ1PZXyc8eHujeggzax766mmQB3"
    },
    {
      "name": "foo/file.08",
      "Cid": "QmVUUNqkcpxcNNyTKSu5bJ9G5FJcEWrxUk9oxHB9usc2LD"
    },
    {
      "name": "foo/file.09",
      "Cid": "QmTcpKyPkCSn8HaLpGF4Xbf7trmRSBrNL9bBra6gx28qcc"
    },
    {
      "name": "foo/file.10",
      "Cid": "QmXj9nsbbSuToJaYMenJrP7ZbspJufxqKWoLneW9YxrZ12"
    },
    {
      "name": "foo/file.11",
      "Cid": "QmPDdrp8ZsiSQ4oXdVnGb1KTVK4FHsnxrHC1QYFAQrSDN7"
    },
    {
      "name": "foo/file.12",
      "Cid": "QmQGoUbriJQkFRQmvaUQSwLSVGzYGZJXq2K4Hkk9DFoZzp"
    },
    {
      "name": "foo/file.13",
      "Cid": "QmNuYjKiXitEVvdPG6Tfe99ZUSiSPi697cQaueGbRR7Dwy"
    },
    {
      "name": "foo/file.14",
      "Cid": "QmeU2EZpBrapKYYuzdEW21JRZMB1Qk7a38RpEzj7D4qPnT"
    },
    {
      "name": "foo/file.15",
      "Cid": "Qmbo7ysDSNonRpx1ZxU7yvEMrbS87dPo9yy3DNBeKrnW8U"
    }
  ]
}
```
The command does some magic for you:
- It DAGifies each file in the `foo` folder as a UnixFS file.
- It creates a Filecoin batch as described by the spec, resulting in a single UnixFS batch.
- It generates a CAR file of this UnixFS batch.
- It calculates the PieceCid and PieceSize of the CAR file.

Let's see some generated files in the current folder:
```bash
$ ls
foo  myfoo.car  myfoo.car.manifest
```

The output of the command is:
- It creates the `foo.car` file.
- It creates the `foo.car.manifest` file, which is the `@AggregateManifest.ndjson` manifest file that's also inside the UnixFS batch.
- It prints to stdout:
    - The PayloadCid of the UnixFS batch.
    - The calculated PieceCid
    - The calculated PieceSize
    - The generated Cid of the processed files.

The JSON output allows you to reference the corresponding entry of each file in `foo` into the manifest of batch. In addition, the manifest contains information that will allow making retrievals of individual files for deals made with the generated batch CAR file.
We'll explain soon how to do retrievals whenever this feature is ready in the Lotus client; stay tuned!