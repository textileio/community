# hub buck init

Initializes a new or existing bucket.

A .textile config directory and a seed file will be created in the current working directory.
Existing configs will not be overwritten.

Use the '--existing' flag to initialize from an existing remote bucket.
Use the '--cid' flag to initialize from an existing UnixFS DAG.


```
hub buck init [flags]
```

### Options

```
      --cid string      Bootstrap the bucket with a UnixFS Cid from the IPFS network
  -e, --existing        Initializes from an existing remote bucket if true
  -h, --help            help for init
  -n, --name string     Bucket name
  -p, --private         Obfuscates files and folders with encryption
  -q, --quiet           Write minimal output
      --thread string   Thread ID
```

### SEE ALSO

* [hub buck](hub_buck.md)	 - Manage an object storage bucket
