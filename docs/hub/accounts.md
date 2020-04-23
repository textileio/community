# Getting Started

## Installation

To access and manage Hub resources, you need to install the Textile CLI. First, download the Textile CLI binary for your platform from the latest releases.

[Textile CLI Latest Release](https://github.com/textileio/textile/releases/latest).

![](/images/tt-cli/tt_help.png)

Open the contents of the downloaded archive and run the `install` script. This should install the `tt` tool on your computer. You can verify with `tt --help`.

## Initialize

![](/images/tt-cli/tt_init.png)

To start using remote services such as IPFS pinning, Bucket sharing, and Thread APIs, you'll need an account on the Hub. Textile provides a simple, password-less account setup. You can create a new account and username with just an email address.

```sh
tt init
```

## Whoami

![](/images/tt-cli/tt_whoami.png)

You can always verify that you have an active session on the Hub and that you are using the correct account by running the `tt whoami` command.


## Login

![](/images/tt-cli/tt_login.png)

If you've just initialized your account successfully, there is no need to login. However, if you are returning to the Hub and need to re-login, simply use the login command.

```sh
tt login
```

## Organizations

![](/images/tt-cli/tt_orgs_help.png)

The Hub provides some really helpful tools for you to collaborate with teams of developers. On the Hub, these are called `orgs` and you can easily create, join, or invite others to your own orgs. 

```sh
tt orgs --help
```
