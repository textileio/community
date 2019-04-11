TODO: Make endpoints link-able sections, expand, cleanup

In order to fulfill a Textile Schema, input data will likely have to be processed by a _Mill_. A Textile Mill is simply an interface that provides a unique endpoint id, whether it supports encryption (most do/should), whether it will 'pin' its outputs by default, and the type of 'media' that it supports. For things like image processing mills (resize, extract EXIF) this would be `"image/*"` mime-types, whereas for a generic 'blob' type Mill, this might be `nil` (accepts anything). Additionally, a Mill will have a specific set of options that it supports, and of course, implement the actual function that performs the 'milling' or processing. This should take in 'raw' bytes, and return a `Result` object, which is simply a wrapper around a file byte array and its metadata (see below).

Depending on how the Schema is structured, Mills may be combined, run in series (i.e., one run on the output of a another) or parallel, etc. It is generally up to the client to satisfy the Schema via the requested Mills. For developers, adding new Mills is relatively straightforward, and only requires that they satisfy the specified Iinterface. This makes Schemas and Mills extremely powerful and flexible. For instance, Textile supports a generic JSON Mill, which is not currently used in Textile Photos, but provides a useful example for extending Textile with new Mills.

## Mill Interface

```
type Mill interface {
    ID() string
    Encrypt() bool
    Pin() bool
    AcceptMedia(media string) error
    Options(add map[string]interface{}) (string, error)
    Mill(input []byte, name string) (*Result, error)
}
```

## Results Object

```
type Result struct {
    File []byte
    Meta map[string]interface{}
}
```

## Endpoints

Currently, Textile supports five Mill 'endpoints' or methods:
* `blob`: Takes a binary data blob, and optionally encrypts it, before adding to IPFS,
and returns a file object
* `schema`: Takes a JSON-based Schema, validates it, adds it to IPFS, and returns a file object
* `json`: Takes an input JSON document, validates it according to its schema.org definition,
optionally encrypts the output before adding to IPFS, and returns a file object
* `image/resize`: Takes an input image, and resizes/resamples it (optionally encrypting output),
before adding to IPFS, and returns a file object
* `image/exif`: Takes an input image, and extracts its EXIF data (optionally encrypting output),
before adding to IPFS, and returns a file object

See [[REST-API]] wiki entry for additional details and API parameters. It is also relatively easy to add new Mill endpoints. If you'd like to contribute new endpoints, or require a specific endpoint for your application or idea, please get in touch!
