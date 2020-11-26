# APIs and API Keys

Textile has three API categories for building an application: Threads, Buckets, and Mailboxes.

To use any of these APIs, you need to use API keys. Read Google's [API key best practices](https://developers.google.com/maps/api-key-best-practices) for an overview of how API keys will be used here.

This section will cover the overview of the three APIs and how to work with the API keys.

## A Tour of Available APIs

### Buckets

[Buckets](../buckets/index.md) provide S3-like data storage on IPFS. Just as you can create Buckets with the [Hub CLI](../hub/cli/hub.md), you can create Buckets using JavaScript with [js-textile](#api-libraries).

The [js-textile](#api-libraries) library allows you to create and edit Buckets owned by you or your organization using an [account key](#account-key). Alternatively, you can use Buckets to store your user's data using a [user group key](#user-group-key).

### ThreadDB

[ThreadDB](../threads/index.md) is a mongo-like database that runs on IPFS. You can use [js-textile](#api-libraries) to connect to the Hub's hosted thread server (`Client`) to push and persist encrypted data on an IPFS-backed database. 

Alternatively, you can embed local, p2p databases in your app that use remote IPFS peers for pinning and remote ThreadDB peers to relay updates (`Database`). 

### Mailboxes

The Users API provides tools for sending and receiving messages between Hub users. Mailboxes are built on ThreadDB. 

Hub mailboxes are a unique inboxing and messaging system designed for modern apps where users hold private keys linked to their identity. With just their private and public key, a user can send and receive encrypted messages to other users in your app.

## API Access

You can access the Hub APIs through the use of API keys.

### API Keys

The Hub has two forms of an API key, an *Account Key* and a *User Group Key*.

#### Account Keys

Account keys grant access to the developer's resources (e.g. Buckets you create using the command-line interface).

If Account Keys are generated with the `-o` (organization) flag, they will grant access to that organization's resources.

Example uses include, integrating your Buckets into CI, dashboards, team messaging integration, etc.

#### User Group Keys

User group keys only grant access to new resources for new identities, not those of the developer.

User group keys can be used in an application to allow app users to leverage Hub APIs (e.g. create and push new buckets). User group keys do not have permission to access the developer or organization resources, but threads and buckets created using these keys _are counted against API limits_.

### Key Use and Security

API keys are project-centric credentials that you can use to provision your Hub resources to end-users (either within your organization or in a public app). We recommend reading this thorough overview of [API key design and best practices](https://developers.google.com/maps/api-key-best-practices).

### Access Summary

Below is a summary of the Hub resources you may create and access with each key type. 

<center>

| Resource example    |     Owner    |       CLI      |   Required Key  |
|----------------------|:------------:|:--------------:|:--------------:|
| Developer Threads    |   Hub Developer  | create, access | Account Key |
| Developer Buckets    |   Hub Developer  | create, access | Account Key |
| Organization Threads |   Hub Developer(s)  | create, access | Account Key |
| Organization Buckets |   Hub Developer(s)  | create, access | Account Key |
| User Threads     | App User |                |   User Group Key  |
| User Buckets     | App User |                |   User Group Key  |

</center>

### Creating Keys

#### Account Key

Create a new **Account Key** by using `hub key create` with the `account` option:

![](../images/hub-cli/hub_keys_create.png)

<!-- 
^ Is this image correct? I don't see an "account" option.
- Albert Kim
-->

_[See CLI options](../hub/cli/hub_keys.md)_

#### User Group Key

Create a new **User Group Key** by using `hub key create` with the `user group` option.

If you're building an app in an organization, use:

```bash
HUB_ORG=<org name> hub key create
```

To link a new key to the organization, not your personal account. 

Currently, there are no migration tools, so we recommend creating a new organization or using an existing organization when starting a new app (see [Organizations](../hub/accounts.md)).

```bash
➜ hub key create # select the 'user' option

✔ user

  KEY                          SECRET                          TYPE  
  bqab5csdh...no6jjezox4       bm2tk476yivwlw...3a4cayll7ztha  user  

> Success! Created new API key and secret
```

#### Non-signing User Group keys

You can use insecure keys with the API by creating non-signing keys. These keys are meant to be used during development only. Read the tutorial on [development mode](../tutorials/hub/development-mode.md) to use these keys.

#### Updating User Group keys

You can replace your keys in your app at any time and the user will still have access to their Threads and Buckets as long as the key is connected to the same developer or organization.

_[See CLI commands](../hub/cli/hub_keys.md)_

## API Libraries

You can find all the remote Thread and Bucket APIs in the `textile` libraries below. These libraries are meant to work in combination with the `threads` libraries when you want to create and manage Thread databases in your app. 

<div class="txtl-options">
  <a href="https://textileio.github.io/js-textile/docs/" target="_blank" class="box">
    <h5>JS Hub</h5>
    <p>Start threads, buckets, and user creation in any JavaScript app.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://godoc.org/github.com/textileio/textile/api/buckets" target="_blank" class="box">
    <h5>JS Hub</h5>
    <p>Use the Buckets client from Go</p>
  </a>
  <span class="box-space"> </span>
  <a href="../cli/hub" class="box">
    <h5>Hub CLI</h5>
    <p>Use scripting and command-line tooling with the Hub CLI.</p>
  </a>
</div>
