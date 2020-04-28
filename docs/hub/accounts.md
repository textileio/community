# Getting Started

## Installation

To access and manage Hub resources, you need to install the Textile CLI. First, [download the Textile CLI binary](https://github.com/textileio/textile/releases/latest) for your platform from the latest releases.

![[Download the Textile CLI Latest Release](https://github.com/textileio/textile/releases/latest).](/images/tt-cli/tt_help.png)

Open the contents of the downloaded archive and run the `install` script. This should install the `tt` tool on your computer. You can verify with `tt --help`.

## Account setup

### Initialize

![](/images/tt-cli/tt_init.png)

To start using remote services such as IPFS pinning, Bucket sharing, and Thread APIs, you need an account on the Hub. Textile provides a simple, password-less account setup. You can create a new account and username with just an email address.

```sh
tt init
```

### Whoami

You can always verify that you have an active session on the Hub and that you are using the correct account by running the `tt whoami` command.

### Login

![](/images/tt-cli/tt_login.png)

If you've just initialized your account successfully, there is no need to login. However, if you are returning to the Hub and need to re-login, simply use the login command.

```sh
tt login
```

## Organizations

The Hub allows you to create organizations easily. Organizations can be one or many collaborators. Members of an Org have management access to the [Buckets](./buckets) and [App Keys](./app-apis#app-keys) created while in an Org's directory.

!!! info
  
    You can [create](./cli/tt_orgs_create), [invite](./cli/tt_orgs_invite), and [leave](./cli/tt_orgs_leave) organizations easily. Read more about all Org methods on the [CLI docs](./cli/tt_orgs).

To learn more about sharing Buckets with an organization, read the intro on [Organization Buckets](/hub/buckets#organization-buckets).
