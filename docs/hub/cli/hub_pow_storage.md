# hub pow storage

List Powergate storage deal records associated with the current account or org.

```
hub pow storage [flags]
```

### Options

```
      --addrs strings     limit the records to deals initiated from  the specified wallet addresses, treated as and AND operation if --cids is also provided
  -a, --ascending         sort records ascending, default is sort descending
      --cids strings      limit the records to deals for the specified data cids, treated as and AND operation if --addrs is also provided
  -h, --help              help for storage
  -f, --include-final     include final deals (default true)
  -p, --include-pending   include pending deals
```

### SEE ALSO

* [hub pow](hub_pow.md)	 - Interact with Powergate
