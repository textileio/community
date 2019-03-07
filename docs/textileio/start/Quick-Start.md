---
id: QuickStart
title: Quick Start
sidebar_label: Quick Start
---

#### Initialize a new wallet.

    $ textile wallet init

This will generate a mnemonic phrase for accessing / recovering derived accounts. You may specify a word count and password as well (run with `--help` for usage).

#### Initialize a peer with an account.

Next, use an account seed from your wallet to initialize a new peer. First time users should just use the first account’s (Account 0) seed, which is printed out by the `wallet init` sub-command. The private seed begins with “S”. The public address begins with “P”. Use the `accounts` sub-command to access deeper derived wallet accounts.

    $ textile init -s <account_seed>

#### Start the daemon.

    $ textile daemon

You can now use the command-line client to interact with your running peer.