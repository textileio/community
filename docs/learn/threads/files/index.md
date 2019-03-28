# Files

In addition to [messages](/learn/messages) and the various [thread](/learn/threads) annotation [blocks](/learn/blocks), Textile supports adding arbitrary files/data to threads via the `Files` block. Additionally, input data can be transformed (or [_milled_](/learn/threads/mills) in Textile speak) and validated in order to provide programmable structure to your thread data. Currently, the following input types are available: Raw data blobs, images, exif data, and JSON documents.

Thread data is built into an [IPLD](https://ipld.io/) merkle DAG structure (similar to a [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree)) and stored separately from the block on IPFS. A `Files` block points to it's "data DAG"'s top-level hash.

The structure of the data DAG is determined by, and validated against, a DAG [[schema|Schemas]]. **A thread can have only one schema**. It has two main functions:

1. Define a Thread's data DAG structure
2. Define the order of _mills_ (transforms) needed to produce this structure from the input

To illustrate these functions, take a look at the builtin [_media_](/learn/threads/schemas#media) schema. Each link (`large`, `small`, `thumb`) produces a resized and encrypted image by leveraging the [image/resize](/learn/threads/mills#image/resize) mill. Notice that the `thumb` link uses the `large` as input. This means that `large` will need to milled before `thumb`. Once you understand how schemas and mills work, you can design complex workflows and structures for your applications.

In addition to the transformed bytes, a mill will produce a file _index_ object for every input:

```
message FileIndex {
    string mill                     = 1;  // Mill used to process the file (e.g., `/image/resize`, `/json`)
    string checksum                 = 2;  // Pre-milled (md5) checksum of the input file
    string source                   = 3;  // Source file CID
    string opts                     = 4;  // md5 checksum of input mill options
    string hash                     = 5;  // CID hash of milled file
    string key                      = 6;  // AES encryption key
    string media                    = 7;  // Media type (e.g., `'application/json'`, `'image/jpeg'`)
    string name                     = 8;  // Name of the input file
    int64 size                      = 9;  // Size of the milled file in bytes
    google.protobuf.Timestamp added = 10; // Date the file was added to the thread
    google.protobuf.Struct meta     = 11; // Additional metadata
    repeated string targets         = 12; // DAG targets the file belongs to (kept only by the local peer)
}
```

File indexes are what most applications will interact with. They are the objects listed by the Files and Feed APIs. These objects are also used internally for various functions. For example, because good encryption is not deterministic, an input's checksum is used to de-duplicate encrypted data.

At this point, it should be clear that adding data to a thread results in a DAG defined by a schema. But how exactly is the data stored so as to be programmatically accessible to thread consumers? Let's take a closer look at the DAG produced by the builtin media schema...

![A files DAG](https://s3.amazonaws.com/textile.public/files3.png)

Note that a files target is by default a directory of indexes (`0`, `1`, etc.). This mean that you can add an entire folder of images (or whatever your data is) with a single update.

Also, each link (`large`, `small`, etc.) will _always_ have the special `f` and `d` sub-links, which correspond to the (usually encrypted) file index and raw data.

Below is a JSON representation of file indexes from a single image corresponding to say, file `0` above.

```
{
    "links": {
        "large": {
            "mill": "/image/resize",
            "checksum": "EqkWwbMQoSosYnu85XHpdTsM3NDKTRPk5j4RQjN6c4FZ",
            "source": "D4QdxGCAFnGwCHAQxrros1V6zEf78N4ugK3GwZyT5dTJ",
            "opts": "21uBAuSeQUdw5aDu5CYPxEfeiLVeuvku1T26nWtJC84C",
            "hash": "QmcvoHe333KRf3tfNKrtrM7aMUVnrB4b1JyzhSFybepvqQ",
            "key": "6cCnusZVHwp6udnKv3eYhurHK6ArJyFxCYRWTUFG8ZuMwSDwVbis9FUX3GRs",
            "media": "image/jpeg",
            "name": "clyde.jpg",
            "size": "84222",
            "added": "2019-03-17T01:20:17.061749Z",
            "meta": {
                    "height": 600,
                    "width": 800
                },
            "targets": [
                "QmPngweFQ9VUhjtyy8nfJRZ8us9UFbS6Y2trwmAswfJ2yk"
            ]
        },
        "small": {
            "mill": "/image/resize",
            "checksum": "7Gu5s6sZkwU8UQWwJNnJSrVY75ZkQG4bpQSwQPwkk8aX",
            "source": "D4QdxGCAFnGwCHAQxrros1V6zEf78N4ugK3GwZyT5dTJ",
            "opts": "CassDcqf192MnceweJKGJvhZfrV9kB3GJRbvNPWm6raa",
            "hash": "QmZuD522rQiFE2GdbNXvzcQ3Ci6aLvvJtWz52a97iEDy9G",
            "key": "29ce4pg64Lj78GuTauQDxeqpfdNCF7fNsJauS552wfpkEjegq8kQgwiNAzJQZ",
            "media": "image/jpeg",
            "name": "clyde.jpg",
            "size": "18145",
            "added": "2019-03-17T01:20:14.739531Z",
            "meta": {
                    "height": 240,
                    "width": 320
                },
            "targets": [
                "QmPngweFQ9VUhjtyy8nfJRZ8us9UFbS6Y2trwmAswfJ2yk"
            ]
        },
        "thumb": {
            "mill": "/image/resize",
            "checksum": "GzB1CWKkKQ5sWS8qQXDoBZxsfFgsgZwD9Z51qX5d7LGW",
            "source": "EqkWwbMQoSosYnu85XHpdTsM3NDKTRPk5j4RQjN6c4FZ",
            "opts": "7aGVJ7nGgmHdqv8oiEKZ2ZbrNBv1zVP3ADSuT2sW3MwT",
            "hash": "QmUuXPhrtLJUzfuoJu7BkfiB2mGfKwq4ExTTF8gVUvAh2U",
            "key": "KfW8nTEZqh1NbAcmB51DMaooe34ujucx2DMqBwiz4xs9sDVhNDYNPratgtbf",
            "media": "image/jpeg",
            "name": "clyde.jpg",
            "size": "2979",
            "added": "2019-03-17T01:20:17.133863Z",
            "meta": {
                    "height": 75,
                    "width": 100
                },
            "targets": [
                "QmPngweFQ9VUhjtyy8nfJRZ8us9UFbS6Y2trwmAswfJ2yk"
            ]
        }
    }
}
```
