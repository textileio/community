# Pull a Bucket

Pull a bucket path

### Synopsis

Pull files and directories from a bucket path. Existing paths will be overwritten. Non-existing paths will be created.

Bucket structure is mirrored locally. For example, given the bucket:
    foo/one.txt
    foo/bar/two.txt
    foo/bar/baz/three.txt

These 'pull' commands result in the following local structures.

'textile buckets pull foo mydir':
    mydir/foo/one.txt
    mydir/foo/bar/two.txt
    mydir/foo/bar/baz/three.txt

'textile buckets pull foo/bar mydir':
    mydir/bar/two.txt
    mydir/bar/baz/three.txt

'textile buckets pull foo/bar/baz mydir':
    mydir/baz/three.txt

'textile buckets pull foo/bar/baz/three.txt mydir':
    mydir/three.txt

'textile buckets pull foo .':
    foo/one.txt
    foo/bar/two.txt
    foo/bar/baz/three.txt


```
tt buckets pull [path] [destination] [flags]
```

### Options

```
  -h, --help   help for pull
```

### SEE ALSO

* [tt buckets](tt_buckets.md)	 - Manage buckets
