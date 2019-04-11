You can run a Textile node on any device by launching the daemon. The daemon will give you the ability to run the CLI against a local node, access the Textile gateway, and manage the embedded IPFS peer.

!!! info
    The Textile daemon is a program that runs as a 'background' process (without a terminal or user interface), waiting for Textile events to occur and offering services. It can be accessed via a client (e.g., command-line client), and exposes a number of commands and APIs for interacting with the Textile network and its associated data. Among other services, it provides access to the local Textile datastore and the underlying [IPFS](https://ipfs.io/) peer. In desktop/server environments, Textile provides access to daemon functionality via its local REST_API (which in turn is accessible via a command-line interface). In mobile environments, the daemon is not run, opting instead for direct access to Textile code via the mobile framework.

## Setup

#### Download

First, download the Textile from GitHub. Textile bundles multiple pre-built binaries with each release, for the command-line tools you will be looking for the release named,

`go-textile_<version-number>_<platform>.tar.gz`

So for **{{go_textile.version}}** you will download,

- For Mac OSX: [go-textile_{{go_textile.version}}_darwin-amd64.tar.gz]({{go_textile.releases_url}}/download/{{go_textile.version}}/go-textile_{{go_textile.version}}_darwin-amd64.tar.gz)
- For Windows: [go-textile_{{go_textile.version}}_windows-amd64.zip]({{go_textile.releases_url}}/download/{{go_textile.version}}/go-textile_{{go_textile.version}}_windows-amd64.zip)
- For Linux, be sure to choose your correct architecture: [go-textile_{{go_textile.version}}_linux-<arch\>.tar.gz]({{go_textile.releases_url}}/tag/v0.1.11)

View all the [latest release builds on GitHub]({{go_textile.releases_url}}).

#### Install on Mac OS X & Linux

Untar the archive ('darwin' will be 'linux' in below examples if on Linux),

```bash
tar xvfz go-textile_{{go_textile.version}}_darwin-amd64.tar.gz
```

Change directory to the newly untarred folder and run the install script,

```bash
cd go-textile_{{go_textile.version}}_darwin-amd64
./install.sh
```

#### Install on Windows

Untar the archive,

```bash
tar xvfz go-textile_{{go_textile.version}}_windows-amd64.tar.gz
```

Move the **Textile.exe** anyplace in your **PATH**.

## Run

### Initial Setup

Create a new Textile _Wallet_, initializing a new _Peer_ with the default Wallet account, and then fire up the Textile _`daemon`_ which will allow us to query and interact with our Peer.

#### Create new wallet

```
textile wallet init
```

Copy the output to a safe/secure place (we recommend something like [1Password](https://1password.com/) or your OS's keychain/keyring system). You’ll need `SECRET SEED` to initialize a new wallet ID:

#### Init new peer

```
textile init --seed=blahblahblah
```

This will create a new peer/repo in `~/.textile` by default (you can specify a custom location with the `--repo-dir=` flag). We can take a look at the config file (`~/.textile/repo/textile`) for that peer, and edit it if we need to (e.g., change ports etc), though for the purposes of this guide we can leave everything as their defaults.

If you want to tail the logs during development so you can see what's going on, open up a new terminal, and do:

```
tail -f ~/.textile/repo/logs/textile.log
```

!!! info
    Before starting a Textile daemon, the Textile repo must be initialized. Once initialized, there are multiple options available for customizing how the daemon is configured, accessed, and run (see also `textile daemon --help` for details). By default, a Textile repo is initialized at a user's default home directory (`~/.textile`). Once initialized, all that is required to start the daemon is `textile daemon`. If your repository was initialized in an alternative location, you may use the `--repo-dir` flag to specify where to find the repo. If you initialized your repo with a pin code for datastore encryption, you an specify this when starting your daemon with the `--pin-code` flag. Finally, if you would like to enable debug mode while running your daemon, all textile sub-systems can be set to output debug logs by specifying the `--debug` flag. All log settings may be additionally configured using the `textile logs` sub-command.

#### Start daemon

Now, we just fire up the `daemon` and you're ready to go:

```
textile daemon
```

If you ever get 'stuck' along the way, or want to learn more about a command or tool that Textile provides you can always call `textile --help`, and any of the textile sub-commands also have their own help entry. For example, to learn more about the `init` command, try `textile init --help`.

Note that most additional daemon settings are managed by the Textile config file. This includes whether the local Textile API and Gateway are enabled, where logs are output, etc. See [config](/learn/config) for a comprehensive coverage of config options.
