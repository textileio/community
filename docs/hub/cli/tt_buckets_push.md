# Push a Bucket

Push to a bucket path (interactive)

### Synopsis

Push files and directories to a bucket path. Existing paths will be overwritten. Non-existing paths will be created.

Buckets are written to a thread. When pushing to an empty bucket, you may either select an existing thread or create a new one.
Using the '--org' flag will instead create new buckets under the Organization's account.

File structure is mirrored in the bucket. For example, given the directory:
    foo/one.txt
    foo/bar/two.txt
    foo/bar/baz/three.txt

These 'push' commands result in the following bucket structures.

'textile buckets push foo mybuck':
    mybuck/foo/one.txt
    mybuck/foo/bar/two.txt
    mybuck/foo/bar/baz/three.txt

'textile buckets push foo/bar mybuck':
    mybuck/bar/two.txt
    mybuck/bar/baz/three.txt

'textile buckets push foo/bar/baz mybuck':
    mybuck/baz/three.txt

'textile buckets push foo/bar/baz/three.txt mybuck':
    mybuck/three.txt

'textile buckets push foo/* foo':
    foo/one.txt
    foo/bar/two.txt
    foo/bar/baz/three.txt


```
tt buckets push [target] [path] [flags]
```

### Options

```
  -h, --help   help for push
```

### SEE ALSO

* [tt buckets](tt_buckets.md)	 - Manage buckets
