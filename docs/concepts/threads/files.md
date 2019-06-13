Any data added to a thread ends up as a _file_. Most of the time, a [schema](#schemas) is used to define one or more types of data in a thread such that other users and applications can understand it. Currently, the following input types are available: Raw data blobs, images, EXIF data, and JSON documents.

## Structure

Thread data is built into an [IPLD](https://ipld.io/) merkle DAG structure (similar to a [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree)) and stored separately from update [blocks](/concepts/threads#blocks) on IPFS. A `FILES` block points to the top-level hash of a file's DAG node.

The structure of files DAG nodes are determined by, and validated against, a [schema](#schemas). **A thread can have only one schema**. It has two main functions:

1. Define a Thread's data DAG structure
2. Define the order of _mills_ (transforms) needed to produce this structure from the input

To illustrate these functions, take a look at the builtin [_media_](#media) schema. Each link (`large`, `small`, `thumb`) produces a resized and encrypted image by leveraging the [image/resize](#imageresize) mill. Notice that the `thumb` link uses the `large` as input. This means that `large` will need to milled before `thumb`. Once you understand how schemas and mills work, you can design complex workflows and structures for your applications.

In addition to the transformed bytes, a mill will produce a file _metadata_ object for every input:

``` go
message FileMeta {
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

File metadata objects are what most applications will interact with. They are the objects listed by the Files and Feed APIs. These objects are also used internally for various functions. For example, because good encryption is not deterministic, an input's checksum is used to de-duplicate encrypted data.

At this point, it should be clear that adding data to a thread results in a DAG defined by a schema. But how exactly is the data stored so as to be programmatically accessible to thread consumers? Let's take a closer look at the DAG produced by the builtin media schema...

![A DAG node created by the built-in "media" schema.](/images/files.png)

Note that a files target is by default a directory of indexes (`0`, `1`, etc.). This mean that you can add an entire folder of images (or whatever your data is) with a single update.

Also, each link (`large`, `small`, etc.) will _always_ have the special `meta` and `content` sub-links, which correspond to the (usually encrypted) file metadata and content.

Below is a JSON representation of file indexes from a single image corresponding to say, file `0` above.

???+ example

    ```JSON
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

## Schemas

Schemas are used to create and validate the structure of thread files, defining their type and purpose for consumers (users and applications). For example, a photos application may create photo-based threads, a health application my create threads with medical records, etc. By treating schemas as first-class citizens, other applications are also able to understand and make use of these threads.

In practice, schemas have three distinct roles:

1. Provide instructions for how to transform or "mill" an input, e.g., given a photo, create three different sizes and discard the raw input (this is the [media](#media) schema).
2. Define whether or not the resulting DAG nodes should be stored (pinned) on account peers.
3. Validate thread files from other participants, applying the same storage rules as in (2).

The structure of a schema maps closely to the DAG nodes it creates (see below for examples). Highly complex nodes can be specified with dependencies between each link. A peer will automatically sort this 'graph' of dependencies (using [topological sorting](https://en.wikipedia.org/wiki/Topological_sorting)) into a series of "steps". Each step is handled by a [_mill_](#mills).

For example, consider a thread backed by the builtin [camera roll](#camera-roll) schema. The following steps must be taken to add a photo:

1. The raw photo is sent to the _blob_ mill (passthrough) and encrypted. The next two steps can be done in parallel.
2. The output of (1) is stripped of EXIF data, resampled to a `thumb`nail size, and encrypted.
3. EXIF data is extracted and encrypted from the output of (1).
4. All of these output files (and their metadata) are added to IPFS in a single "folder" or DAG structure.

### Encryption

Threads blocks and their links are always encrypted. However, _file_ encryption is defined by schema nodes using the `"plaintext"` param and is on by default, i.e, `"plaintext": true` means "do not encrypt this node".

The [decrypting gateway](/develop/ipfs-gateway/#decrypt-thread-files) can be used to decrypt files outside of a peer's API.

### Presets

There are several "preset" or builtin schemas, available for use from client libraries. [Textile Photos](https://textile.photos) uses the [media](#media) and [camera roll](#camera-roll) presets.

#### Media

> Used for posting media intended for sharing

???+ example

    ```JSON
    {
      "name": "media",
      "pin": true,
      "links": {
        "large": {
          "use": ":file",
          "mill": "/image/resize",
          "opts": {
            "width": "800",
            "quality": "80"
        }
        },
        "small": {
         "use": ":file",
          "mill": "/image/resize",
          "opts": {
            "width": "320",
            "quality": "80"
          }
        },
        "thumb": {
          "use": "large",
          "pin": true,
          "mill": "/image/resize",
          "opts": {
            "width": "100",
            "quality": "80"
          }
        }
      }
    }
    ```

#### Camera Roll

> Used for backing up a mobile phone camera roll

???+ example

    ```JSON
    {
      "name": "camera_roll",
      "pin": true,
      "links": {
        "raw": {
          "use": ":file",
          "mill": "/blob"
        },
        "exif": {
          "use": "raw",
          "mill": "/image/exif"
        },
        "thumb": {
          "use": "raw",
          "pin": true,
          "mill": "/image/resize",
          "opts": {
            "width": "320",
            "quality": "80"
          }
        }
      }
    }
    ```

#### Avatars

> Used by the internal account thread for user avatar images

???+ example

    ```JSON
    {
      "name": "avatar",
      "pin": true,
      "links": {
        "large": {
          "use": ":file",
          "pin": true,
          "plaintext": true,
          "mill": "/image/resize",
          "opts": {
            "width": "320",
            "quality": "75"
          }
        },
        "small": {
          "use": ":file",
          "pin": true,
          "plaintext": true,
          "mill": "/image/resize",
          "opts": {
            "width": "100",
            "quality": "75"
          }
        }
      }
    }
    ```

### JSON Schemas

JSON-based schemas are defined using the `json_schema` property:

???+ example

    ```JSON
    {
        "pin": true,
        "plaintext": true,
        "mill": "/json",
        "json_schema": /* ... */
    }
    ```

Simply embed your [JSON Schema](https://json-schema.org/) within the thread schemas.

#### Examples

##### A "Person"

> The "Person" example from http://json-schema.org/learn/miscellaneous-examples.html

???+ example

    ```JSON
    {
      "pin": true,
      "mill": "/json",
      "json_schema": {
        "$id": "https://example.com/person.schema.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Person",
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "description": "The person's first name."
          },
          "lastName": {
            "type": "string",
            "description": "The person's last name."
          },
          "age": {
            "description": "Age in years which must be equal to or greater than zero.",
            "type": "integer",
            "minimum": 0
          }
        }
      }
    }
    ```

##### Logs

> BSD syslog protocol (https://tools.ietf.org/html/rfc3164)

???+ example

    ```JSON
    {
      "pin": true,
      "plaintext": false,
      "mill": "/json",
      "json_schema": {
        "$ref": "#/definitions/Log",
        "$schema": "http://json-schema.org/draft-04/schema#",
        "definitions": {
          "Log": {
            "additionalProperties": false,
            "properties": {
              "application": {
                "type": "string"
              },
              "hostname": {
                "type": "string"
              },
              "message": {
                "type": "string"
              },
              "pid": {
                "type": "integer"
              },
              "priority": {
                "type": "integer"
              },
              "timestamp": {
                "type": "string"
              }
            },
            "required": [
              "priority",
              "timestamp",
              "hostname",
              "application",
              "pid",
              "message"
            ],
            "type": "object"
          }
        }
      }
    }
    ```

##### JSON Patch

[RFC 6902](https://tools.ietf.org/html/rfc6902)

A schema for tracking JSON document modifications can be built with the [JSON Patch specification](https://tools.ietf.org/html/rfc6902):

> JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation (JSON) document...

The JSON schema store provides [one solution](http://json.schemastore.org/json-patch):

???+ example

    ```JSON
    {
      "pin": true,
      "plaintext": true,
      "mill": "/json",
      "json_schema": {
        "title": "JSON schema for JSONPatch files",
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "array",
        "items": {
          "$ref": "#/definitions/operation"
        },
        "definitions": {
          "operation": {
            "type": "object",
            "required": [
              "op",
              "path"
            ],
            "allOf": [
              {
                "$ref": "#/definitions/path"
              }
            ],
            "oneOf": [
              {
                "required": [
                  "value"
                ],
                "properties": {
                  "op": {
                    "description": "The operation to perform.",
                    "type": "string",
                    "enum": [
                      "add",
                      "replace",
                      "test"
                    ]
                  },
                  "value": {
                    "description": "The value to add, replace or test."
                  }
                }
              },
              {
                "properties": {
                  "op": {
                    "description": "The operation to perform.",
                    "type": "string",
                    "enum": [
                      "remove"
                    ]
                  }
                }
              },
              {
                "required": [
                  "from"
                ],
                "properties": {
                  "op": {
                    "description": "The operation to perform.",
                    "type": "string",
                    "enum": [
                      "move",
                      "copy"
                    ]
                  },
                  "from": {
                    "description": "A JSON Pointer path pointing to the location to move/copy from.",
                    "type": "string"
                  }
                }
              }
            ]
          },
          "path": {
            "properties": {
              "path": {
                "description": "A JSON Pointer path.",
                "type": "string"
              }
            }
          }
        }
      }
    }
    ```

##### Weather

> A [stream of forecasts from Dark Sky weather data](https://twitter.com/sanderpick/status/1068279840946585600)

???+ example

    ```JSON
    {
      "pin": true,
      "mill": "/json",
      "json_schema": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "$ref": "#/definitions/Forecast",
        "definitions": {
          "Alert": {
            "required": [
              "description",
              "expires",
              "time",
              "title",
              "uri"
            ],
            "properties": {
              "description": {
                "type": "string"
              },
              "expires": {
                "type": "integer"
              },
              "time": {
                "type": "integer"
              },
              "title": {
                "type": "string"
              },
              "uri": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "type": "object"
          },
          "Flags": {
            "required": [
              "units"
            ],
            "properties": {
              "units": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "type": "object"
          },
          "Forecast": {
            "required": [
              "currently",
              "code",
              "flags",
              "latitude",
              "longitude",
              "offset",
              "timezone"
            ],
            "properties": {
              "alerts": {
                "items": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "$ref": "#/definitions/Alert"
                },
                "type": "array"
              },
              "code": {
                "type": "integer"
              },
              "currently": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "$ref": "#/definitions/Weather"
              },
              "error": {
                "type": "string"
              },
              "flags": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "$ref": "#/definitions/Flags"
              },
              "latitude": {
                "type": "number"
              },
              "longitude": {
                "type": "number"
              },
              "offset": {
                "type": "number"
              },
              "timezone": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "type": "object"
          },
          "Weather": {
            "required": [
              "apparentTemperature",
              "apparentTemperatureMax",
              "apparentTemperatureMaxTime",
              "apparentTemperatureMin",
              "apparentTemperatureMinTime",
              "cloudCover",
              "dewPoint",
              "humidity",
              "icon",
              "nearestStormDistance",
              "nearestStormBearing",
              "ozone",
              "precipIntensity",
              "precipIntensityMax",
              "precipIntensityMaxTime",
              "precipProbability",
              "precipType",
              "pressure",
              "summary",
              "sunriseTime",
              "sunsetTime",
              "temperature",
              "temperatureMax",
              "temperatureMaxTime",
              "temperatureMin",
              "temperatureMinTime",
              "time",
              "visibility",
              "windBearing",
              "windSpeed"
            ],
            "properties": {
              "apparentTemperature": {
                "type": "number"
              },
              "apparentTemperatureMax": {
                "type": "number"
              },
              "apparentTemperatureMaxTime": {
                "type": "integer"
              },
              "apparentTemperatureMin": {
                "type": "number"
              },
              "apparentTemperatureMinTime": {
                "type": "integer"
              },
              "cloudCover": {
                "type": "number"
              },
              "dewPoint": {
                "type": "number"
              },
              "humidity": {
                "type": "number"
              },
              "icon": {
                "type": "string"
              },
              "nearestStormBearing": {
                "type": "number"
              },
              "nearestStormDistance": {
                "type": "number"
              },
              "ozone": {
                "type": "number"
              },
              "precipIntensity": {
                "type": "number"
              },
              "precipIntensityMax": {
                "type": "number"
              },
              "precipIntensityMaxTime": {
                "type": "integer"
              },
              "precipProbability": {
                "type": "number"
              },
              "precipType": {
                "type": "string"
              },
              "pressure": {
                "type": "number"
              },
              "summary": {
                "type": "string"
              },
              "sunriseTime": {
                "type": "integer"
              },
              "sunsetTime": {
                "type": "integer"
              },
              "temperature": {
                "type": "number"
              },
              "temperatureMax": {
                "type": "number"
              },
              "temperatureMaxTime": {
                "type": "integer"
              },
              "temperatureMin": {
                "type": "number"
              },
              "temperatureMinTime": {
                "type": "integer"
              },
              "time": {
                "type": "integer"
              },
              "visibility": {
                "type": "number"
              },
              "windBearing": {
                "type": "number"
              },
              "windSpeed": {
                "type": "number"
              }
            },
            "additionalProperties": false,
            "type": "object"
          }
        }
      }
    }
    ```

## Mills

The `meta` and `content` node pairs in a files DAG are generated by file _mills_. Mills serve three distinct purposes:

1. Validate the input against accepted media types. The JSON mill will also validate the input against a [JSON Schema](https://json-schema.org/).
2. Transform the input data, e.g., encode, resample, encrypt, etc.
3. Index a metadata object (JSON) describing the transformed output. This allows thread content to be efficiently queried and provides a mechanism for de-duplicating encrypted data.

### Endpoints

#### `blob`

> Passthrough (output equals input)

#### `schema`

> Validate and returns a schema (JSON)

#### `json`

> Validates a JSON document against a [JSON Schema](https://json-schema.org/)

#### `image/resize`

> Resizes and/or resamples an input image

#### `image/exif`

> Extracts EXIF data from an input image

Applications are free to define new mills. Simply conform to the `Mill` interface:

```go
type Result struct {
	File []byte
	Meta map[string]interface{}
}

type Mill interface {
	ID() string
	Encrypt() bool // encryption allowed
	Pin() bool     // pin by default
	AcceptMedia(media string) error
	Options(add map[string]interface{}) (string, error)
	Mill(input []byte, name string) (*Result, error)
}
```

!!! hint

    We have planned support for audio and video mills. Let us know if there are other mill types you need, e.g., PDF, XML, etc.

<br>
