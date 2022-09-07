# hub buck pull

Pulls paths that have been added to and paths that have been removed or differ from the remote bucket root.

Use the '--hard' flag to discard all local changes.
Use the '--force' flag to pull all remote objects, even if they already exist locally.

```
hub buck pull [flags]
```

### Options

```
  -f, --force   Force pull all remote files if true
      --hard    Discards local changes if true
  -h, --help    help for pull
  -q, --quiet   Write minimal output
  -y, --yes     Skips the confirmation prompt if true
```

### SEE ALSO

-   [hub buck](hub_buck.md) - Manage an object storage bucket
