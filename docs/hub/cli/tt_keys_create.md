# keys create

Create a new API key and secret. Keys are used by apps and services that leverage buckets or threads.

Using the '--org' flag will create a new key under the Organization's account.

There are two types of API keys:
1. 'Account' keys provide direct access to developer/org account buckets and threads.
2. 'User' keys provide existing external identities (users) access to their own buckets and threads, under the custodianship of the parent account.  

API secrets should be kept safely on a backend server, not in publicly readable client code.


```
tt keys create [flags]
```

### Options

```
  -h, --help   help for create
```

### SEE ALSO

* [tt keys](tt_keys.md)	 - Key management
