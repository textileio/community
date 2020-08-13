# hub keys create

Creates a new API key and secret. Keys are used by apps and services that leverage buckets or threads.

Using the 'HUB_ORG' environmental variable will create a new key under the Organization's account.

There are two types of API keys:
1. 'Account' keys provide direct access to developer/org account buckets and threads.
2. 'User Group' keys provide existing non-admin identities (e.g. app users) access to their own buckets and threads, using the resources of the parent account (i.e. the developer or organization).

API secrets are used for Signature Authentication, which is a security measure that can prevent outsiders from using your API key. API secrets should be kept safely on a backend server, not in publicly readable client code.

However, for development purposes, you may opt-out of Signature Authentication during key creation. 


```
hub keys create [flags]
```

### Options

```
  -h, --help   help for create
```

### SEE ALSO

* [hub keys](hub_keys.md)	 - API key management
