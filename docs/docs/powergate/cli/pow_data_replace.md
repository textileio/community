## pow data replace

Applies a StorageConfig for c2 equal to that of c1, and removes c1

### Synopsis

Applies a StorageConfig for c2 equal to that of c1, and removes c1. This operation is more efficient than manually removing and adding in two separate operations

```
pow data replace [cid1] [cid2] [flags]
```

### Options

```
  -h, --help    help for replace
  -w, --watch   Watch the progress of the resulting job
```

### Options inherited from parent commands

```
      --serverAddress string   address of the powergate service api (default "127.0.0.1:5002")
  -t, --token string           user auth token
```

### SEE ALSO

* [pow data](pow_data.md)	 - Provides commands to interact with general data APIs

