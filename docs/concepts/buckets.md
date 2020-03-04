# Buckets

!!! warning

    This section is still a work in progress. Libraries are under active development, and this material may not reflect the latest changes. Please view the primary code-repositories and look out for our release announcements soon. 

Textile accounts can use Buckets, a tool that makes it simple for you to pin files to IFPS. The files you pin can be used as part or all of the interface to your dApp. You can think of `buckets` much like you might already think of buckets on S3 (or if you aren't familiar, just think of them as folders). As an extra bonus, if any bucket you create contains an `index.html` file, Textile will host the bucket as a web site at `https://<bucket-name>.textile.cafe`. Read on to see an example.

#### Push files

To start pinning files in your Textile project, use the `push` sub command. You can `push` a single file to a bucket or an entire directory, in which case all contained files and directories are pushed recursively. All paths will be created if they don't exist and you can use `push` repeatedly to keep adding more files to a bucket.

Here, we push files for a static web site to a bucket called `aaron`:

```shell
textile buckets push public/* aaron
Add 44 files? Press ENTER to confirm: █
> Pushing mySite/public/404/index.html to aaron/404/index.html
9.87 kB / 9.87 kB [--------------------------------] 100.00% 78.69 kB p/s 0s
> Pushing mySite/public/404.html to aaron/404.html
9.88 kB / 9.88 kB [--------------------------------] 100.00% 260.14 kB p/s 1s
> Pushing mySite/public/app-b1262bbd5ce4afcb17ea.js to aaron/app-b1262bbd5ce4afcb17ea.js
98.14 kB / 98.14 kB [--------------------------------] 100.00% 307.59 kB p/s 0s
> Pushing mySite/public/app-b1262bbd5ce4afcb17ea.js.map to aaron/app-b1262bbd5ce4afcb17ea.js.map
390.09 kB / 390.09 kB [--------------------------------] 100.00% 376.47 kB p/s 1s
> Pushing mySite/public/chunk-map.json to aaron/chunk-map.json

...

> Success! Pushed 44 files to aaron
```

#### Inspecting a bucket

You can list the files in a bucket or at any depth in the bucket, similar to listing files locally on your computer:

```shell
textile buckets ls aaron/icons
NAME             	SIZE  	DIR   	ITEMS 	PATH                                                                         
icon-144x144.png	9130 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-144x144.png	
icon-192x192.png	12422	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-192x192.png	
icon-256x256.png	16837	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-256x256.png	
icon-384x384.png	29004	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-384x384.png	
icon-48x48.png  	2813 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-48x48.png  	
icon-512x512.png	22446	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-512x512.png	
icon-72x72.png  	4425 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-72x72.png  	
icon-96x96.png  	5926 	false	n/a  	/ipfs/QmSe8nSJsAW7eJXvMP5gYM6TCkuyJKeU8MusHs2kVBdFMZ/icons/icon-96x96.png  	

> Found 8 items
```

#### Pulling files

Use the `buckets pull` command to download files from a bucket to your computer. You can pull an entire bucket, a sub tree of a bucket, or a single file.

```sh
textile buckets pull aaron/icons/icon-512x512.png ./
> Pulling aaron/icons/icon-512x512.png to icon-512x512.png
22.45 kB / 22.45 kB [--------------------------------] 100.00% 818.35 kB p/s 0s
> Success! Pulled 1 files to ./
```

#### Removing files

The `buckets rm` command is used to remove files or directories from a bucket. Once a bucket is empty, the root bucket directory is deleted and will no longer appear in the list of buckets output from `textile buckets ls`.

```sh
textile buckets rm aaron/aaron.txt
> Success! Removed aaron/aaron.txt
```

#### Accessing on cloud.textile.io

You can access the latest version of the files in your bucket (without needing to know any CID!) at `https://cloud.textile.io/dashboard/<project name>/<bucket name>`. Of course since the data is all stored in IPFS, it's also available over `https://gateway.ipfs.io/ipfs/<CID>`. The CID for any Textile bucket or bucket sub directory is listed at the top of the corresponding `cloud.textile.io/dahsboard` page and in the output from `textile buckets ls`.

#### Hosting web sites in Buckets

Any bucket that contains an `index.html` file will be hosted as a web site at `https://<bucket-name>.textile.cafe`. In the `textile buckets push` example above, we pushed files that make up a static web site to a bucket named `aaron`. That web site is automatically available (with TLS!) at [https://aaron.textile.cafe](https://aaron.textile.cafe).

[Read more about hosting websites in Buckets here](https://blog.textile.io/first-look-at-textile-buckets-dynamic-ipfs-folders/).

#### Updating Buckets with CI

Buckets can be managed as part of your CI workflows. [Read more about updating your Buckets in CI here](https://blog.textile.io/first-look-at-textile-buckets-dynamic-ipfs-folders/).