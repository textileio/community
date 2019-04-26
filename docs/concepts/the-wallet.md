A Textile 'wallet' is a core component of the Textile system. A wallet is represented by mnemonic phrase, and in practice is a [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Hierarchical [Deterministic Wallet](https://en.bitcoin.it/wiki/Deterministic_wallet) based on Stellar's implementation of [SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md). You can learn more about BIP39 mnemonics and more in this really nice [interactive webpage](https://iancoleman.io/bip39/). You can think of a wallet as a master key, and the account (see [accounts](/concepts/the-wallet#Accounts)) represent keys specific to a given application or use-case. Any given wallet may create an arbitrary number of accounts. For example, you may use a wallet to provision multiple Textile Photos 'accounts', each with a completely different persona if you so choose. This provides a powerful framework 'partitioning' use cases. It is also the backbone for enabling account backup and recovery.

From the command-line, a new wallet can be generated with the `textile wallet init` command. The output produces a simple, multi-word 'phrase' (of varying levels of entropy) useful for the generation of deterministic binary seeds. Textile currently supports 12, 15, 18, 21, or 24 'words'.

```
$textile wallet init
-----------------------------------------------------------------------
| blah blah blah blade blah blah blah blah blah blah blah blah |
-----------------------------------------------------------------------
WARNING! Store these words above in a safe place!
WARNING! If you lose your words, you will lose access to data in all derived accounts!
WARNING! Anyone who has access to these words can access your wallet accounts!

Use: `wallet accounts` command to inspect more accounts.

--- ACCOUNT 0 ---
blahblahblahblahblahblahblahblahblahblahblahblah
blahblahblahblahblahblahblahblahblahblahblahblah
```

## Accounts

Accounts are generated via the wallet pass-phrase (as above) and are an [Ed25519](https://ed25519.cr.yp.to/) public/private keypair used to sign backups, provision libp2p identities, etc. Textile uses Ed25519 here because it's fast, compact, secure, and widely used. See the [EdDSA Wikipedia page](https://en.wikipedia.org/wiki/EdDSA) for more details.

From the command-line, a new account can be generated with the `textile wallet accounts` command. The output produces a new account address and key (see `textile wallet accounts --help` for details). Multiple accounts can be provisioned at once, to any arbitrary depth. An offset can also be supplied.

```
$textile wallet accounts "blah blah ... blah blah -d 2 -o 1
--- ACCOUNT 1 ---
blahblahblahblahblahblahblahblahblahblahblahblah
blahblahblahblahblahblahblahblahblahblahblahblah
--- ACCOUNT 2 ---
blahblahblahblahblahblahblahblahblahblahblahblah
blahblahblahblahblahblahblahblahblahblahblahblah
```

<br>
