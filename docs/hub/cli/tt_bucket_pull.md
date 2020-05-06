# bucket pull

Pull files and directories from a **bucket path** `[path]` to a **local destination** `[destination]`. Existing paths will be overwritten. Non-existing paths will be created.

```
tt bucket pull [path] [destination] [flags]
```

Bucket structure is mirrored locally. For example, given the **bucket**:
```
foo
│   one.txt
│
└───bar
    │   two.txt
    │
    └───baz
        │   three.txt
```

These `pull` commands result in the following **local structures**, given we are in the parent directory of 'mydir/':

`tt bucket pull foo mydir`:
```
mydir
│   one.txt
│
└───bar
    │   two.txt
    │
    └───baz
        │   three.txt
```

`tt bucket pull foo/bar mydir`:
```
mydir
│
└───bar
    │   two.txt
    │
    └───baz
        │   three.txt
```

`tt bucket pull foo/bar/baz mydir`:
```
mydir
│
└───baz
    │   three.txt
```

`tt bucket pull foo/bar/baz/three.txt mydir`:
```
mydir
│   three.txt
```

`tt bucket pull foo .` will pull directly into the working directory:
```
one.txt
bar
│   two.txt
│
└───baz
    │   three.txt
```

`tt bucket pull . .` will pull the whole bucket directly into the working directory:
```
foo
│   one.txt
│
└───bar
    │   two.txt
    │
    └───baz
        │   three.txt
```


### Options

```
  -h, --help   help for pull
```

### SEE ALSO

* [tt bucket](tt_bucket.md)	 - Manage a bucket
