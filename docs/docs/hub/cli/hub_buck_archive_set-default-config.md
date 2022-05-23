# hub buck archive set-default-config

Set the default archive storage configuration for the specified Bucket from a file, stdin, or flags.

If flags are specified, this command updates the current default storage-config with the _explicitely set_ flags.
Flags that aren't explicitely set won't set the default value, and thus keep the original value in the storage-config.

If a file or stdin is used, the storage-config will be completely overriden by the provided one.

```
hub buck archive set-default-config [(optional)file] [flags]
```

### Examples

```
hub buck archive set-default-config --rep-factor=3 --fast-retrieval --verified-deal --trusted-miners=f08240,f023467,f09848
```

### Options

```
  -c, --country-codes strings     Select miners with specific countries
  -d, --deal-min-duration int     Minimum duration for the deal
  -e, --deal-start-offset int     Epochs in the future impose a deadline for deals to be on-chain
  -x, --excluded-miners strings   Miner addresses that should not be used
  -f, --fast-retrieval            Created deals should enable the fast retrieval feature (default true)
  -h, --help                      help for set-default-config
  -p, --max-price uint            Maximum price that will be spent per RepFactor in AttoFIL/GiB per Epoch
  -r, --rep-factor int            Target number of active deals (default 1)
  -i, --stdin                     Set config from stdin JSON
  -t, --trusted-miners strings    Miner addresses that must be used
  -v, --verified-deal             Deal is originating from a verified client with DataCap
```

### SEE ALSO

-   [hub buck archive](hub_buck_archive.md) - Create a Filecoin archive
