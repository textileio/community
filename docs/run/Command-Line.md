<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>command-line</small></h1>

# Initial Setup

Create a new Textile _Wallet_, initializing a new _Peer_ with the default Wallet account, and then fire up the Textile _`daemon`_ which will allow us to query and interact with our Peer.

### Create new wallet

```
textile wallet init
```

Copy the output to a safe/secure place (we recommend something like [1Password](https://1password.com/) or your OS's keychain/keyring system). You’ll need `SECRET SEED` to initialize a new wallet ID:

### Init new peer

```
textile init --seed=blahblahblah
```

This will create a new peer/repo in `~/.textile` by default (you can specify a custom location with the `--repo-dir=` flag). We can take a look at the config file (`~/.textile/repo/textile`) for that peer, and edit it if we need to (e.g., change ports etc), though for the purposes of this guide we can leave everything as their defaults.

If you want to tail the logs during development so you can see what's going on, open up a new terminal, and do:

```
tail -f ~/.textile/repo/logs/textile.log
```

### Start daemon

Now, we just fire up the `daemon` and you're ready to go:

```
textile daemon
```

If you ever get 'stuck' along the way, or want to learn more about a command or tool that Textile provides you can always call `textile --help`, and any of the textile sub-commands also have their own help entry. For example, to learn more about the `init` command, try `textile init --help`.

### Daemon details

The Textile daemon is a program that runs as a 'background' process (without a terminal or user interface), waiting for Textile events to occur and offering services. It can be accessed via a client (e.g., command-line client), and exposes a number of commands and APIs for interacting with the Textile network and its associated data. Among other services, it provides access to the local Textile datastore and the underlying [IPFS](https://ipfs.io/) peer. In desktop/server environments, Textile provides access to daemon functionality via its local [[REST API|REST-API]] (which in turn is accessible via a [Command-Line](/install) interface). In mobile environments, the daemon is not run, opting instead for direct access to Textile code via a [[Mobile Framework|Mobile-Framework]].

Before starting a Textile daemon, the Textile repo must be initialized (see [[Initialization|Getting-Started#Initialization]]). Once initialized, there are multiple options available for customizing how the daemon is configured, accessed, and run (see also `textile daemon --help` for details). By default, a Textile repo is initialized at a user's default home directory (`~/.textile`). Once initialized, all that is required to start the daemon is `textile daemon`. If your repository was initialized in an alternative location, you may use the `--repo-dir` flag to specify where to find the repo. If you initialized your repo with a pin code for datastore encryption, you an specify this when starting your daemon with the `--pin-code` flag. Finally, if you would like to enable debug mode while running your daemon, all textile sub-systems can be set to output debug logs by specifying the `--debug` flag. All log settings may be additionally configured using the `textile logs` sub-command (see [[Command-Line Logs|Command-Line#logs]] for details).

Note that most additional daemon settings are managed by the Textile config file. This includes whether the local Textile API and Gateway are enabled, where logs are output, etc. See [Config-file](/run/Command-Line#config-file) for a comprehensive coverage of config options.

### Config file

The Textile config file is similar in structure and usage to the [IPFS config](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md) file. It is a JSON document located at `<repo-dir>/textile`. It is read once at node instantiation, either for an offline command, or when starting the daemon. Commands that execute on a running daemon _do not_ read the config file at runtime. 

The config file controls different aspects of a Textile node, from public account information, to API access and functionality, to activity logging and everything in between. Here, we cover each config section in detail, though users are encouraged to explore the Textile commandline tools for further details and information (try `textile config --help` to get started).

#### Account

Stores public account information. These values are populated upon repository initialization, and are not currently configurable. <Further explanation needed here.>
* `Address` is the public key, whose seed is stored in the _possibly_ encrypted datastore.
* `Thread` is the thread id of the default account thread used for syncing information between account peers.

**Default**:

```json
"Account": {
    "Address": "",
    "Thread": ""
}
```

#### Addresses

Stores the bind addresses for the various node HTTP APIs.

* `API` is the address of the local node REST API (RPC).
* `CafeAPI` is the address of the cafe REST API.
* `Gateway` is the address to listen on for the IPFS HTTP gateway.

The `API` address is the address that the daemon will serve the HTTP API from. This API is used to control the daemon through the command line (or via curl or some other client). Unlike the Gateway address, you should ensure that the `API` address is _not_ dialable from outside of your machine, or potentially malicious parties may be able to send commands to your Textile daemon. Having said that, see the [`API`] config entry for details on further controlling the API HTTP server.

The `CafeAPI` address is the address that the Textile peer will serve the cafe REST API. This API is used to enable other peers on the network to request pinning, backup, and inbox services. Normally, a only a designated *cafe* peer would enable this API, though any peer may operate as a cafe if they want. See [Cafes](/learn#cafes) wiki page for details.

The `Gateway` address is the address that the daemon will serve the gateway interface from. The gateway may be used to view files through Textile, and serve static content. This port may or may not be dialable from outside you machine, that's entirely up to you. The `Gateway` address is on by default, but if you leave it blank, the gateway server will not start.

The `Addresses` config settings can be specified at node initialization via the Textile `init` subcommand's address options (see `textile init --help` for details). Alternatively, they can be modified individually via the `config` subcommand (e.g., `textile config Addresses.API '"127.0.0.1:40600"'`).

**Default**:

```
"Addresses": {
    "API": "127.0.0.1:40600",
    "CafeAPI": "127.0.0.1:40601",
    "Gateway": "127.0.0.1:5050"
}
```

#### API

Stores settings specific to the local node REST API.

* `HTTPHeaders` is a map of the HTTP headers to set on responses from the API HTTP server.

The `API` config entry contains information (settings) to be used by the node REST API. Essentially, your daemon is running a lightweight HTTP server that will respond to client (e.g., IPFS commands, curl) requests. The `HTTPHeaders` sub-entry (currently the only entry under the `API` config option) is a map of [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) to set on responses from your API HTTP server. You might want to edit these settings if you need to allow additional access control methods, or [require authorization headers](https://github.com/ipfs/js-ipfs-api/pull/741), etc. For example, you may want to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for your API; this can be done by modifying your `"Access-Control-Allow-Origin"` header. See [this blog post](https://medium.com/textileio/tutorial-setting-up-an-ipfs-peer-part-iii-f5f43506874c) for a discussion of similar IPFS gateway settings.

These settings can be modified via the `config` subcommand. For example, to allow CORS from all origins, you can do `textile config API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`.

**Default**:

```
"API": {
    "HTTPHeaders": {
        "Access-Control-Allow-Headers": [
            "Content-Type",
            "Method",
            "X-Textile-Args",
            "X-Textile-Opts",
            "X-Requested-With"
        ],
        "Access-Control-Allow-Methods": [
            "GET",
            "POST",
            "DELETE",
            "OPTIONS"
        ],
        "Access-Control-Allow-Origin": [],
        "Server": [
            "textile-go/<version>"
        ]
    }
}
```

#### Logs

Stores settings relevant to logging node activities and services.

* `LogToDisk` is a boolean indicating whether to send all logs to rolling files on disk (true) or Stdout (false).

The `LogToDisk` config entry controls how a node handles subsystem logging. By default, when `LogToDisk` is `true`, logs are written to `<repo-dir>/logs/textile.log`. These can be monitored via `tail -f <repo-dir>/logs/textile.log` or similar. The verbosity of these logs can be controlled at run-time via the Textile `logs` subcommand (see `textile logs --help` for details), or at node instantiation (`textile daemon`) via the `--logs` flag (see `textile daemon --help` for details). This config entry they can be modified directly via the `config` subcommand (e.g., `textile config Logs.LogToDisk 'true'`).

**Default**:

```
"Logs": {
    "LogToDisk": true,
}
```

#### Threads

Stores settings controlling defaults for threads.

* `Defaults.ID` is the default thread ID for reads/writes.

A node can have a default thread ID that is used when a thread ID is not supplied to a given command or API call. This can simplify thread access on a peer with a singular thread, when testing command line tools, or in mobile-specific apps where a default thread is useful (for example, a user's backup thread). This setting can be accessed via the Textile `threads default` subcommand (or via the `config` subcommand), and can be set directly via the `config` subcommand (e.g., `textile config Threads.Defaults.ID '"<thread-id>"'`).

#### Cafe

Stores settings controlling whether a node is running in *cafe* mode, and how it should be accessed by clients.

* `Host` is a JSON object where...
    * `Open` is a boolean controlling whether other peers can register with this node for cafe services.
    * `PublicIP` is a string specifying the public IP address for the Cafe.
    * `URL` is a string specifying the public-facing URL of the host machine. This is needed in order to issue sessions to mobile clients, which need to communicate with the cafe over HTTP for background upload tasks.
* `Client` is a JSON object where...
    * `Mobile` is a JSON object where...
        * `P2PWireLimit` is an integer cutoff/limit for determining how a message will be transmitted to peers.

The `Cafe` config entry is broken up into two sections, one for controlling how a cafe `Host` behaves, and one for controlling how a `Client` interacts with a host peer. Currently, only a `Mobile` client entry is  used. Cafes can be controlled to some degree via the Textile `cafes` subcommand (see `textile cafes --help` for details), and via the `config` subcommand (see `textile config --help` for details). See also the [Cafes](/learn#cafes) wiki page.

For the `Host` config entries, `Open` is used to control if a Textile node is running in *cafe mode* or not. If not, then the `Addresses.CafeAPI` settings are not used, and the node will only operate as a *potential* client node. If a node *is* running in *cafe mode*, then the `PublicIP` config entry can be used to specify the public IP address of a cafe node in instances where IPFS' NAT traversal is unable to discover the public IP. This may, for example, happen when running a cafe on an Amazon EC2 instance or similar. Both of these settings can be modified via the `config` subcommand (e.g., `textile config Cafe.Host.Open true`), though they will require the `daemon` to be restarted before taking effect.

Clients normally register with one or more cafes. The `Client` will then remote pin/upload files/messages to a _single_ cafe address provided by a cafe session object. Messages with size less than `P2PWireLimit` will be handled by the p2p cafe service, whereas messages with size greater than `P2PWireLimit` will be handled by the mobile OS's background upload service and the cafe's HTTP API. Clients can register with a cafe (see `textile cafes register --help`), and check cafe messages (see `textile cafes messages --help`) via the command line using the `cafes` subcommands. Again, the `P2PWireLimit` setting can be modified via the `config` subcommand (e.g., `textile config Cafe.Client.Mobile.P2PWireLimit 20000`).

**Default**:

```
"Cafe": {
    "Host": {
        "Open": false,
        "PublicIP": "",
        "URL": ""
    },
    "Client": {
        "Mobile": {
            "P2PWireLimit": 20000
        }
    }
}
```

#### Additional Settings

Stores settings specific to *how* a local node is set up; for example, for running on a mobile device, or as a server with a public IP address. 

* `IsMobile` is a boolean indicating whether the local node is setup for mobile.
* `IsServer` is a boolean indicating whether the local node is setup as a server with a public IP.

These settings are only modified when initializing a new nod. For example, when accessing Textile on a mobile device, the `IsMobile` config entry will automatically be set to `true`. Conversely, when initializing a desktop or server node, the `--server` flag may be specified, which will set `IsServer` to true, *and* apply the IPFS *server profile* to the underlying IPFS node. See `textile init --help` and [this blog post](https://medium.com/textileio/tutorial-setting-up-an-ipfs-peer-part-iv-1595d4ba221b) for details. Alternatively, they _can_ be modified individually via the `config` subcommand (e.g., `textile config IsServer true`).

**Default**:

```
"IsMobile": false,
"IsServer": false
```

### Creating Threads

From the command-line, Threads can be added, listed, accessed, removed, and their members can be queried. See `textile theads --help` for details. The most basic operation, adding a new Thread, takes multiple (mostly optional) inputs, and produces a new, empty Thread. Inputs can include a `key`, which is a locally unique key used by an app to identify this thread on recovery, a `type`, which sets the thread type as discussed above, a `sharing` option, which controls the sharing control as discussed above, and a `member` option to control Thread membership. This one can be used multiple times to include multiple peers, or left blank to include any/all peers. The additional options, `schema`, `media`, and `camera-roll` are used to control the [[Schema|Schemas]] used for the Thread, and are discussed elsewhere.

```
$ textile threads add --type 'open' --sharing 'shared' --media "My Open+Shared+Media Thread"
{
    "id": "blahblahblahblahblahblahblahblah",
    "key": "somelongalphanumerickey",
    "name": "My Open+Shared+Media Thread",
    "schema": {
        "name": "media",
        "pin": true,
        "plaintext": false,
        "links": {
            "large": {
                "use": ":file",
                "pin": false,
                "plaintext": false,
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "800"
                }
            },
            "small": {
                "use": ":file",
                "pin": false,
                "plaintext": false,
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "320"
                }
            },
            "thumb": {
                "use": "large",
                "pin": true,
                "plaintext": false,
                "mill": "/image/resize",
                "opts": {
                    "quality": "80",
                    "width": "100"
                }
            }
        }
    },
    "schema_id": "Qmblahblablablahbnlajbnlajlk",
    "initiator": "P4blahblahblahblahbla",
    "type": "OPEN",
    "sharing": "SHARED",
    "state": "LOADED",
    "peer_cnt": 1,
    "block_cnt": 1,
    "file_cnt": 0
}
```

**Default**:

```
"Threads": {
    "Defaults": {
        "ID": ""
    }
}
```

## [Gateway REST API](../Gateway)

