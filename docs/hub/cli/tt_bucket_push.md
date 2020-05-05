# bucket push

Push files and directories to a bucket path. Existing paths will be overwritten. Non-existing paths will be created.

Using the '--org' flag will create a new bucket under the organization's account.

File structure is mirrored in the bucket. For example, given the directory:
    foo/one.txt
    foo/bar/two.txt
    foo/bar/baz/three.txt

These 'push' commands result in the following bucket structures.

'tt bucket push foo/ .':
    one.txt
    bar/two.txt
    bar/baz/three.txt
		
'tt bucket push foo mybuck':
    mybuck/foo/one.txt
    mybuck/foo/bar/two.txt
    mybuck/foo/bar/baz/three.txt

'tt bucket push foo/bar mybuck':
    mybuck/bar/two.txt
    mybuck/bar/baz/three.txt

'tt bucket push foo/bar/baz mybuck':
    mybuck/baz/three.txt

'tt bucket push foo/bar/baz/three.txt mybuck':
    mybuck/three.txt


```
tt bucket push [target] [path] [flags]
```

### Options

```
  -h, --help   help for push
```

### SEE ALSO

* [tt bucket](tt_bucket.md)	 - Manage a bucket
