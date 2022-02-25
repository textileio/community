# hub buck init

Initializes a new or existing bucket.

A .textile config directory and a seed file will be created in the current working directory.
Existing configs will not be overwritten.

Use the '--existing' flag to interactively select an existing remote bucket.
Use the '--cid' flag to initialize from an existing UnixFS DAG.
Use the '--unfreeze' flag to retrieve '--cid' from known or imported deals.

By default, if the remote bucket exists, remote objects are pulled and merged with local changes.
Use the '--soft' flag to accept all local changes, including deletions.
Use the '--hard' flag to discard all local changes.

```
hub buck init [flags]
```

### Options

```
      --cid string    Bootstrap the bucket with a UnixFS Cid from the IPFS network
  -e, --existing      Interactively select an existing remote bucket if true
      --hard          Discards all local changes if true
  -h, --help          help for init
  -n, --name string   Bucket name
  -p, --private       Obfuscates files and folders with encryption
  -q, --quiet         Write minimal output
      --soft          Accepts all local changes, including deletions, if true
  -y, --yes           Skips the confirmation prompt if true
```

### SEE ALSO

-   [hub buck](hub_buck.md) - Manage an object storage bucket
