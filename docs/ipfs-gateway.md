All desktop and server peers host an IPFS gateway. A gateway is useful for light-clients which are unable to directly traverse the network, and/or want to request data from where they know it's stored.

For the most part, the gateway functions exactly like an IPFS gateway:

```
https://gateway.textile.cafe/ipfs|ipns/<path>
```

![This is an unencrypted file within a thread shared over a peer gateway.](https://gateway.textile.cafe/ipfs/QmarZwQEri4g2s8aw9CWKhxAzmg6rnLawGuSGYLSASEow6/0/d){: .center}

!!! tip
    Thread files are encrypted by default. Learn how to write schemas that generate unencrypted files [here](/concepts/threads/files#schemas).

## View file DAG nodes

You can explore a file DAG node by referencing its `target` hash:

```
https://gateway.textile.cafe/ipfs/<target>
```

- **target**: Top-level hash of a file DAG node, referenced by a thread update block.

Here is a DAG node served from one of Textile's federated gateways: [https://gateway.textile.cafe/ipfs/QmarZwQEri4g2s8aw9CWKhxAzmg6rnLawGuSGYLSASEow6](https://gateway.textile.cafe/ipfs/QmarZwQEri4g2s8aw9CWKhxAzmg6rnLawGuSGYLSASEow6).

If your thread files are encrypted (the default), the meta and content data won't be viewable over a normal IPFS gateway. See next.

## Decryption service

Gateways are primarily useful for sharing unencrypted data or in cases where the client can efficiently decrypt data locally. However, in many cases, it may be acceptable to let a gateway decrypt a file before serving it to a client.

Here, we ask a cafe's gateway to decrypt an image by appending its key as a query parameter:

```
https://gateway.textile.cafe/ipfs/<path>?key=<key>
```

- **path**: A path in a file DAG node to either a `meta` or `content` link.
- **key**: An AES encryption key for the data at `path`. See [files](/concepts/threads/files) for about keys.

![This is an encrypted image decrypted on a gateway.](https://cafe.us-east-1.textile.io/ipfs/QmY7ezUccNt3i7qnyhJWN8xKL6cDe7RkEQEViPd33TFfxj/photo?key=17q9mTWHjSOIjWiAoZxYy3cYTN917q9mUBhOu0mxr6YM){: .center}

<br>
