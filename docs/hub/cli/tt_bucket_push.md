# bucket push

Push **local files and directories** `[target]` to a **bucket path** `[path]`. Existing paths will be overwritten. Non-existing paths will be created.

```
tt bucket push [target] [path] [flags]
```

Using the '--org' flag will create a new bucket under the organization's account.

File structure is mirrored in the bucket. For example, given the **local directory**:
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

These 'push' commands result in the following **bucket structures**, given that we are in the parent directory of 'foo/'.

`tt bucket push . .` :
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

`tt bucket push foo/ .` :
```
one.txt
bar
│   two.txt
│
└───baz
    │   three.txt
```


`tt bucket push foo mybuck`:
```
mybuck
│   one.txt
│
└───bar
    │   two.txt
    │
    └───baz
        │   three.txt
``` 


`tt bucket push foo/bar mybuck`:
```
mybuck
│
└───bar
    │   two.txt
    │
    └───baz
        │   three.txt
``` 

`tt bucket push foo/bar/baz mybuck`:
```
mybuck
│
└───baz
    │   three.txt
``` 

'tt bucket push foo/bar/baz/three.txt mybuck':
```
mybuck
│   three.txt
``` 

To inspect your pushed files, exlore on the gateway:
`tt bucket links`
then open the first result 'Thread links' in your browser.


### Options

```
  -h, --help   help for push
```

### SEE ALSO

* [tt bucket](tt_bucket.md)	 - Manage a bucket
