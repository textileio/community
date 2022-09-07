# hub buck archive

Creates a Filecoin archive from the remote bucket root. Pass in a custom archive storage config via the --file flag or stdin to override the default archive storage configuration.

```
hub buck archive [flags]
```

### Options

```
  -f, --file string   Optional path to a file containing archive config json that will override the default
  -h, --help          help for archive
  -y, --yes           Skips the confirmation prompt if true
```

### SEE ALSO

-   [hub buck](hub_buck.md) - Manage an object storage bucket
-   [hub buck archive default-config](hub_buck_archive_default-config.md) - Print the default archive storage configuration for the specified Bucket.
-   [hub buck archive list](hub_buck_archive_list.md) - Shows information about current and historical archives.
-   [hub buck archive set-default-config](hub_buck_archive_set-default-config.md) - Set the default archive storage configuration for the specified Bucket.
-   [hub buck archive watch](hub_buck_archive_watch.md) - Watch the status of the most recent bucket archive.
