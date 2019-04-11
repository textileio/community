TODO: Break out types into link-able sections, expand

Blocks are the literal building blocks of Textile's [[Threads|Threads]] infrastructure. They are the basic components for all interactions between Textile peers, from messaging, to sharing photos, to commenting and 'likeing' content—each update to a Thread is backed by a Block, and each Block is hash-linked to its parent, forming a traversable tree or chain of block updates—a blockchain if you will.

## Structure

In practice, Textile Blocks are relatively small (encrypted) [Protobuf messages](https://developers.google.com/protocol-buffers/), linked together by their IPFS CID (content id or hash). You can explore their proto definitions in our [GitHub repo](https://github.com/textileio/textile-go/tree/master/pb/protos). Essentially, a `ThreadBlock` (or `Block` for short) is made up of a `BlockHeader`, a `Type`, and an optional `Payload`. The `BlockHeader` contains information such as the event timestamp (`Date`), an array of `Parent` Blocks (this is usually an array of length one), the original Block `Author` (Peer Id), and an `Address`, which is the [[Account address|Wallet#Accounts]] of the Block's original author. The `Type` field represents the kind of update the block represents and can be one of the eleven block types outline in the table below.

After the header and type comes the block's `Payload`. For some block types, this can be left null or empty. For example, `Merge` blocks are only ever generated locally, and so do not need to contain a payload (additionally, these can be stored as plaintext, as they carry no identifiable information). Similarly, a `Leave` block requires no payload information, just the header and type. Conversely, mostly other block types require at least a `Target` field (the target block to which that update refers), and often also requires a `Contact` and/or `Body` field. Contacts are used to represent another Peer (say for an Invite block) and Body is generally used for textual information (say the body of a Comment block). The most complex block type is a `Files` block. In this case, the 'target' is actually the top-level CID/hash of a directory (DAG Node) that contains one or more outputs from a [[Schema|Schemas]], and the block update itself includes the keys required to decrypt the ciphertext. See [[Files|Files]] for details on the structure of the Files objects.

## Types

Textile Threads support eleven different Block `Types`. Each type describes a specific event or update to a Thread. From the most basic events such as a Thread `Join` or `Leave`, to more complex interactions such as a `Comment` or `Like` of a previous block update (such as a `Files` block).

| Type | Description |
|---|---|
| Merge | Used for conflict resolution, and always has _two_ parents. See [Threads](./Threads#Example) for details. |
| Ignore | Used to 'delete' or otherwise request that peers ignore or remove a previous Block from the Thread (currently not used in Textile Photos) |
| Flag | Used to 'highlight' a given previous Block. It is currently not used in Textile Photos, but could be used by an application developer to 'star' an item, flag it as inappropriate, or even mark it for removal or some other 'state'. |
| Join | Used when a peer joins a Thread. |
| Leave | Used when a peer leaves a Thread. Leaves have no payload. |
| Announce | Used to announce information to all members of a Thread, such as when a user updates their avatar, or changes their username. |
| Message | Represents and 'standalone' message or piece of text. This might be a message in a chat application, or a specific text-based update. |
| Files | Used to add data to a Thread. In Textile Photos, this is generally a new Photo. However, and File object can be used. See [Files](./Files) for details. |
| Comment | Used to annotate a previous block with textual information. This is commonly used to allow peers to 'comment' on a given Photo or post. Any other type of Block could be a target for a Comment Block (including another Comment block). |
| Like | Used to annotate a previous block with a 'like' flag. This is commonly used to allow peers to 'like' a given Photo or post. Any other type of Block could be a target for a Like Block (including another Like block). |
| Invite | Used to indicate an invite to the Thread has been created. The type of invite will depend on how it was created, and could be a 'direct' or 'open' invite. |
