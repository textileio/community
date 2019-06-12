Textile uses a hierarchical deterministic (HD) wallet to derive account keys from a set of unique words, called a [mnemonic phrase](https://en.bitcoin.it/wiki/Seed_phrase).

![Textile account key derivation from a BIP39 mnemonic.](/images/wallet.png){: .center}

Every account seed "inside" the wallet can be derived from this mnemonic phrase. Meaning that the wallet effectively _is_ the mnemonic phrase. Any given wallet may create an arbitrary number of accounts. For example, a single wallet can be used to provision multiple Textile Photos "accounts", each with a completely different persona. This provides a powerful partitioning framework.

Textile _account seeds_ (private keys) always starts with an "S" for "secret" and _account addresses_ (public keys) always start with a "P" for "public".

!!! hint

    Peer initialization **does not** (by design) use the whole wallet, just one account seed. Users and applications are free to use any seed from their wallet, but most use cases will just make use of the seed from the default account, or _account 0_.

    This BIP39 mnemonic explorer can be helpful when learning about HD wallets: https://iancoleman.io/bip39/.

The current implementation is a [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Hierarchical [Deterministic Wallet](https://en.bitcoin.it/wiki/Deterministic_wallet) based on Stellar's implementation of [SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md).

See the [daemon installation section](/install/the-daemon/#create-a-new-wallet) for a guide to generating a wallet with the command-line client.

### Clients

Generating and interacting with a wallet are capabilities separate from the core peer API. Below is a list of clients that are currently able to generate and interact with wallets.

-   The command-line client via the [`wallet`](/develop/clients/command-line/#wallet) subcommand
-   [js-wallet](https://github.com/textileio/js-wallet)
-   [ios-textile](https://github.com/textileio/ios-textile/blob/master/Textile/Classes/TextileApi.m)
-   [android-textile](https://github.com/textileio/android-textile/blob/master/textile/src/main/java/io/textile/textile/Textile.java)

## Accounts

Account seeds and their public addresses are generated via the wallet pass-phrase. Textile uses [ed25519](https://ed25519.cr.yp.to/) keys because they provide fast key generation, signing, and verification. These properties become important on less powerful devices like phones.

### Sync

Peers that are backed by the same account are called [_account peers_](/concepts/#account-peers). Account peers will automatically stay in sync. They are able to instruct one another to create and delete threads. Additionally, they will continuously search the network for each other's encrypted thread [snapshots](/concepts/threads#snapshots) (metadata and the latest update hash, usually stored by [cafes](/concepts/cafes)). Learn how search works [here](/concepts/search).

!!! info

    Thread [snapshots](/concepts/threads#snapshots) also enable logins from new devices, as the new peer just needs to search for snapshots created by its account.

Every peer has in internal _account thread_, which is used to track account peers, profile information, and known contacts. Read more about account threads [here](/concepts/threads/#account-threads).

<br>
