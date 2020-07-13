# Accounts & Limits

## Accounts overview

When you sign-up to use the Hub, you do so as a developer. Each developer account on the Hub has their own set of API keys and quotas. Developers can create two other entities on the Hub, Organizations (just Orgs for short) and Users. 

### Organizations

Organizations allow multiple developers to work together using shared resources. Members of an organization can collaboratively manage [Buckets](../buckets/index.md), create or remove [API Keykeyss](../hub/app-apis.md#app-keys), and more. 

!!! info
  
    You can [create](../hub/cli/hub_orgs_create.md), [invite](../hub/cli/hub_orgs_invite.md), and [leave](../hub/cli/hub_orgs_leave.md) organizations easily. Read more about all Org methods on the [CLI docs](../hub/cli/hub_orgs.md).

To learn more about sharing Buckets with an organization, read the intro on [Organization Buckets](../buckets/index.md#organization-buckets).

### Users

If a developer is creating an app or service with its own users, those users can be mapped to user instances in the Hub by using [User Group keys](app-apis.md#user-group-key). Each user of an app can have their own Buckets and Threads. Unlike developers or organizations, app users cannot create their own API keys. This allows you to embed bucket and thread functionality into your app, see the [app building tutorial](../tutorials/hub/web-app.md) to learn more.

## Quotas

Owners are developers, organizations, or users (see above) depending on how the resource is created. If these limits are not enough for you, or if you need to talk to us about a custom account, you can reach us at [support@textile.io](mailto:support@textile.io).

| Threads | |
| :------ | :------ |
| Max Threads Per Owner | 100 |

| Buckets | |
| :------ | :------ |
| Max Buckets Size | 1Gib |
| Max Size All Buckets | 1Gib |
| Max Buckets Per Thread | 10,000 |

## Installation

### Download

To access and manage Hub resources, you need to install the Hub CLI. First, download the Hub CLI binary for your platform from the [latest releases](https://github.com/textileio/textile/releases/latest).

!!! info
  
    You'll see two binaries available for download on the Textile releases page, `hub` and `buck`. You can ignore the `buck` binary for now; It's used to interact with Buckets in a stand-alone manner, independent of Textile Hub. For our purposes here, `hub` provides all the functionality you'll need to interact with the Textile Hub and Buckets.

### Install

![Open the contents of the downloaded archive and run the `install` script. This should install the `hub` tool on your computer. You can verify with `hub --help`.](../images/install/install.png)

#### Mac Installation

On MacOS you will need to confirm that it is okay to run the `hub` binary before it will run successfully. You will see this warning:

![Select 'Cancel'](../images/install/install_warn.png)

![Go to 'System Settings' => 'General' where you will be able to click, 'Allow Anyway'](../images/install/install_allow.png)


![Run `hub --help` again and this time select, 'Open` when prompted.](../images/install/install_confirm.png)

You will now be able to continue using the CLI without issue. When you update the binary, you may need to repeat the above steps. We will add developer signing to our MacOS binaries soon.

![Successfully running `hub --help` to print out the command docs.](../images/hub-cli/hub_help.png)

## Account setup

### Initialize

![](../images/hub-cli/hub_init.png)

To start using remote services such as IPFS pinning, Bucket sharing, and Thread APIs, you need an account on the Hub. Textile provides a simple, password-less account setup. You can create a new account and username with just an email address.

```sh
hub init
```

### Whoami

You can always verify that you have an active session on the Hub and that you are using the correct account by running the `hub whoami` command.

### Login

If you've just initialized your account successfully, there is no need to login. However, if you are returning to the Hub and need to re-login, simply use the login command.

```sh
hub login
```

### Enterprise users

If you are interested in enterprise support from Textile, please email us at [support@textile.io](mailto:support@textile.io).
