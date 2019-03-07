<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>command-line</small></h1>

Before you jump into using and playing with Textile, you'll need to have a working Textile binary. If you're interested in developing with Textile, you can [[follow these steps|Development-Setup]] to get your development environment setup, otherwise, you can download the latest [binary release](https://github.com/textileio/textile-go/releases):

```
wget https://github.com/textileio/textile-go/releases/download/{release}/textile-go_{release}_{os}-amd64.tar.gz
tar xvfz textile-go_{release}_{os}-amd64.tar.gz
rm textile-go__{release}_{os}-amd64.tar.gz
sudo ./install.sh
```

Where `{release}` and `{os}` are the release (e.g., `v1.0.0`) and operating system (e.g., `linux`) that you are using. This should install the binary in your `PATH`, so that it is available from the command-line as `textile`.

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

**Default**:

```
"Threads": {
    "Defaults": {
        "ID": ""
    }
}
```

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

# REST API

Textile provides access to the underlying Textile node via a comprehensive REST API. Currently, we are on version `0.0` of the API. By default, the API runs on `http://127.0.0.1:40600/api/v0`, and provides access to all necessary Textile functionality. Note that the API is not secure, and should _not_ generally be exposed to the wider Internet. These endpoints are for administration and peer operation only. For a 'safer' API to expose to the outside, you may want to allow access to your peer's [[Secure Gateway|Secure-Gateway]] instead/also. The following is a regularly updated listing of the available API endpoints. For an update-to-date, local API reference with additional (very nice) functionality, see your local peer's [docs API endpoint](http://127.0.0.1:40600/docs/index.html) by viewing `http://127.0.0.1:40600/docs/index.html` (substitute whatever port you are running it on if different from default) in your browser. The local 'live' version of the API provides useful tools to 'try out' the API, better viewing and code syntax, and is much easier to explore and understand.

## Textile Node API
Textile Node Local REST API Documentation

### Version: 0

**License:** [MIT License](https://github.com/textileio/textile-go/blob/master/LICENSE)

#### /account/address

##### GET
###### Summary:

Show account address

###### Description:

Shows the local node's account address

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | address | string |

#### /account/backups

##### POST
###### Summary:

Show account peers

###### Description:

Shows all known account peers

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | wait: Stops searching after 'wait' seconds have elapsed (max 10s), events: Whether to emit Server-Sent Events (SSEvent) or plain JSON | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | results stream | [pb.QueryResult](#pb.queryresult) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /account/peers

##### GET
###### Summary:

Show account peers

###### Description:

Shows all known account peers

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | peers | [pb.ContactList](#pb.contactlist) |
| 400 | Bad Request | string |

#### /blocks

##### GET
###### Summary:

Paginates blocks in a thread

###### Description:

Paginates blocks in a thread. Blocks are the raw components in a thread.
Think of them as an append-only log of thread updates where each update is
hash-linked to its parent(s). New / recovering peers can sync history by simply
traversing the hash tree.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | thread: Thread ID (can also use 'default'), offset: Offset ID to start listing from (omit for latest), limit: List page size (default: 5) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | blocks | [pb.BlockList](#pb.blocklist) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /blocks/{id}

##### DELETE
###### Summary:

Remove thread block

###### Description:

Removes a thread block by ID

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | block | [pb.Block](#pb.block) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

##### GET
###### Summary:

Gets thread block

###### Description:

Gets a thread block by ID

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | block | [pb.Block](#pb.block) |
| 404 | Not Found | string |

#### /blocks/{id}/comment

##### GET
###### Summary:

Get thread comment

###### Description:

Gets a thread comment by block ID

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | comment | [pb.Comment](#pb.comment) |
| 400 | Bad Request | string |

#### /blocks/{id}/comments

##### GET
###### Summary:

List comments

###### Description:

Lists comments on a thread block

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | comments | [pb.CommentList](#pb.commentlist) |
| 500 | Internal Server Error | string |

##### POST
###### Summary:

Add a comment

###### Description:

Adds a comment to a thread block

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |
| X-Textile-Args | header | urlescaped comment body | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | comment | [pb.Comment](#pb.comment) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /blocks/{id}/like

##### GET
###### Summary:

Get thread like

###### Description:

Gets a thread like by block ID

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | like | [pb.Like](#pb.like) |
| 400 | Bad Request | string |

#### /blocks/{id}/likes

##### GET
###### Summary:

List likes

###### Description:

Lists likes on a thread block

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | likes | [pb.LikeList](#pb.likelist) |
| 500 | Internal Server Error | string |

##### POST
###### Summary:

Add a like

###### Description:

Adds a like to a thread block

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | like | [pb.Like](#pb.like) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /cafes

##### GET
###### Summary:

List info about all active cafe sessions

###### Description:

List info about all active cafe sessions. Cafes are other peers on the network
who offer pinning, backup, and inbox services

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | cafe sessions | [pb.CafeSessionList](#pb.cafesessionlist) |
| 500 | Internal Server Error | string |

##### POST
###### Summary:

Register with a Cafe

###### Description:

Registers with a cafe and saves an expiring service session token. An access
token is required to register, and should be obtained separately from the target
Cafe

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | cafe host | Yes | string |
| X-Textile-Opts | header | token: An access token supplied by the Cafe | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | cafe session | [pb.CafeSession](#pb.cafesession) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /cafes/{id}

##### DELETE
###### Summary:

Deregisters a cafe

###### Description:

Deregisters with a cafe (content will expire based on the cafe's service rules)

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | cafe id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 500 | Internal Server Error | string |

##### GET
###### Summary:

Gets and displays info about a cafe session

###### Description:

Gets and displays info about a cafe session. Cafes are other peers on the network
who offer pinning, backup, and inbox services

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | cafe id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | cafe session | [pb.CafeSession](#pb.cafesession) |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /cafes/messages

##### POST
###### Summary:

Check for messages at all cafes

###### Description:

Check for messages at all cafes. New messages are downloaded and processed
opportunistically.

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 500 | Internal Server Error | string |

#### /config

##### PATCH
###### Summary:

Get active config settings

###### Description:

When patching config values, valid JSON types must be used. For example, a string
should be escaped or wrapped in single quotes (e.g., \"127.0.0.1:40600\") and
arrays and objects work fine (e.g. '{"API": "127.0.0.1:40600"}') but should be
wrapped in single quotes. Be sure to restart the daemon for changes to take effect.
See https://tools.ietf.org/html/rfc6902 for details on RFC6902 JSON patch format.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| patch | body | An RFC6902 JSON patch (array of ops) | Yes | [mill.Json](#mill.json) |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 204 | No Content | string |
| 400 | Bad Request | string |

##### PUT
###### Summary:

Replce config settings.

###### Description:

Replace entire config file contents. The config command controls configuration
variables. It works much like 'git config'. The configuration values are stored
in a config file inside the Textile repository.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| config | body | JSON document | Yes | [mill.Json](#mill.json) |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 204 | No Content | string |
| 400 | Bad Request | string |

#### /config/{path}

##### GET
###### Summary:

Get active config settings

###### Description:

Report the currently active config settings, which may differ from the values
specifed when setting/patching values.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| path | path | config path (e.g., Addresses/API) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | new config value | [mill.Json](#mill.json) |
| 400 | Bad Request | string |

#### /contacts

##### GET
###### Summary:

List known contacts

###### Description:

Lists all, or thread-based, contacts.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | thread: Thread ID (omit for all known contacts) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | contacts | [pb.ContactList](#pb.contactlist) |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /contacts/{id}

##### DELETE
###### Summary:

Remove a contact

###### Description:

Removes a known contact

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | contact id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

##### GET
###### Summary:

Get a known contact

###### Description:

Gets information about a known contact

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | contact id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | contact | [pb.Contact](#pb.contact) |
| 404 | Not Found | string |

##### PUT
###### Summary:

Add to known contacts

###### Description:

Adds a contact to list of known local contacts. A common workflow is to pipe
/contact/search results into this endpoint, just be sure you know what the results
of the search are before adding!

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | contact id | Yes | string |
| contact | body | contact | Yes | [pb.Contact](#pb.contact) |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 400 | Bad Request | string |

#### /contacts/search

##### POST
###### Summary:

Search for contacts

###### Description:

Search for contacts known locally and on the network

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | local: Whether to only search local contacts, limit: Stops searching after limit results are found, wait: Stops searching after 'wait' seconds have elapsed (max 10s), username: search by username string, peer: search by peer id string, address: search by account address string, events: Whether to emit Server-Sent Events (SSEvent) or plain JSON | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | results stream | [pb.QueryResult](#pb.queryresult) |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /feed

##### GET
###### Summary:

Paginates post and annotation block types

###### Description:

Paginates post (join|leave|files|message) and annotation (comment|like) block types
The mode option dictates how the feed is displayed:
"chrono": All feed block types are shown. Annotations always nest their target post,
i.e., the post a comment is about.
"annotated": Annotations are nested under post targets, but are not shown in the
top-level feed.
"stacks": Related blocks are chronologically grouped into "stacks". A new stack is
started if an unrelated block breaks continuity. This mode is used by Textile
Photos. Stacks may include:
* The initial post with some nested annotations. Newer annotations may have already
been listed.
* One or more annotations about a post. The newest annotation assumes the "top"
position in the stack. Additional annotations are nested under the target.
Newer annotations may have already been listed in the case as well.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | thread: Thread ID (can also use 'default'), offset: Offset ID to start listing from (omit for latest), limit: List page size (default: 5), mode: Feed mode (one of 'chrono', 'annotated', or 'stacks') | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | feed | [pb.FeedItemList](#pb.feeditemlist) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /files

##### GET
###### Summary:

Paginates thread files

###### Description:

Paginates thread files. If thread id not provided, paginate all files. Specify
"default" to use the default thread (if set).

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | thread: Thread ID. Omit for all, offset: Offset ID to start listing from. Omit for latest, limit: List page size. (default: 5) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | files | [pb.FilesList](#pb.fileslist) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /files/{block}

##### GET
###### Summary:

Get thread file

###### Description:

Gets a thread file by block ID

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| block | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | file | [pb.Files](#pb.files) |
| 400 | Bad Request | string |

#### /invites

##### GET
###### Summary:

List invites

###### Description:

Lists all pending thread invites

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | invites | [pb.InviteViewList](#pb.inviteviewlist) |

##### POST
###### Summary:

Create an invite to a thread

###### Description:

Creates a direct peer-to-peer or external invite to a thread

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | thread: Thread ID (can also use 'default'), peer: Peer ID (omit to create an external invite) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | invite | [pb.NewInvite](#pb.newinvite) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /invites/{id}/accept

##### POST
###### Summary:

Accept a thread invite

###### Description:

Accepts a direct peer-to-peer or external invite to a thread. Use the key option
with an external invite

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | invite id | Yes | string |
| X-Textile-Opts | header | key: key for an external invite | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | join block | [pb.Block](#pb.block) |
| 400 | Bad Request | string |
| 409 | Conflict | string |
| 500 | Internal Server Error | string |

#### /invites/{id}/ignore

##### POST
###### Summary:

Ignore a thread invite

###### Description:

Ignores a direct peer-to-peer invite to a thread

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | invite id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 400 | Bad Request | string |

#### /ipfs/cat/{cid}

##### GET
###### Summary:

Cat IPFS data

###### Description:

Displays the data behind an IPFS CID (hash)

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| cid | path | ipfs/ipns cid | Yes | string |
| X-Textile-Opts | header | key: Key to decrypt data on-the-fly | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | data | [ integer ] |
| 400 | Bad Request | string |
| 401 | Unauthorized | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /ipfs/id

##### GET
###### Summary:

Get IPFS peer ID

###### Description:

Displays underlying IPFS peer ID

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | peer id | string |
| 500 | Internal Server Error | string |

#### /ipfs/swarm/connect

##### POST
###### Summary:

Opens a new direct connection to a peer address

###### Description:

Opens a new direct connection to a peer using an IPFS multiaddr

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | peer address | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | [ string ] |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /ipfs/swarm/peers

##### GET
###### Summary:

List swarm peers

###### Description:

Lists the set of peers this node is connected to

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | verbose: Display all extra information, latency: Also list information about latency to each peer, streams: Also list information about open streams for each peer, direction: Also list information about the direction of connection | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | connection | [ipfs.ConnInfos](#ipfs.conninfos) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /keys/{target}

##### GET
###### Summary:

Show file keys

###### Description:

Shows file keys under the given target from an add

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| blotargetck | path | target id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | keys | [pb.Keys](#pb.keys) |
| 400 | Bad Request | string |

#### /logs/{subsystem}

##### POST
###### Summary:

Access subsystem logs

###### Description:

List or change the verbosity of one or all subsystems log output. Textile logs
piggyback on the IPFS event logs

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| subsystem | path | subsystem logging identifier (omit for all) | No | string |
| X-Textile-Opts | header | level: Log-level (one of: debug, info, warning, error, critical, or  | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | subsystems | [core.SubsystemInfo](#core.subsysteminfo) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /messages

##### GET
###### Summary:

Paginates thread messages

###### Description:

Paginates thread messages

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | thread: Thread ID (can also use 'default', omit for all), offset: Offset ID to start listing from (omit for latest), limit: List page size (default: 5) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | messages | [pb.TextList](#pb.textlist) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /messages/{block}

##### GET
###### Summary:

Get thread message

###### Description:

Gets a thread message by block ID

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| block | path | block id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | message | [pb.Text](#pb.text) |
| 400 | Bad Request | string |

#### /mills/blob

##### POST
###### Summary:

Process raw data blobs

###### Description:

Takes a binary data blob, and optionally encrypts it, before adding to IPFS,
and returns a file object

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| file | formData | multipart/form-data file | No | file |
| X-Textile-Opts | header | plaintext: whether to leave unencrypted), use: if empty, assumes body contains multipart form file data, otherwise, will attempt to fetch given CID from IPFS | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | file | [pb.FileIndex](#pb.fileindex) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /mills/image/exif

##### POST
###### Summary:

Extract EXIF data from image

###### Description:

Takes an input image, and extracts its EXIF data (optionally encrypting output),
before adding to IPFS, and returns a file object

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| file | formData | multipart/form-data file | No | file |
| X-Textile-Opts | header | plaintext: whether to leave unencrypted, use: if empty, assumes body contains multipart form file data, otherwise, will attempt to fetch given CID from IPFS | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | file | [pb.FileIndex](#pb.fileindex) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /mills/image/resize

##### POST
###### Summary:

Resize an image

###### Description:

Takes an input image, and resizes/resamples it (optionally encrypting output),
before adding to IPFS, and returns a file object

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| file | formData | multipart/form-data file | No | file |
| X-Textile-Opts | header | plaintext: whether to leave unencrypted, use: if empty, assumes body contains multipart form file data, otherwise, will attempt to fetch given CID from IPFS, width: the requested image width (required), quality: the requested JPEG image quality | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | file | [pb.FileIndex](#pb.fileindex) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /mills/json

##### POST
###### Summary:

Process input JSON data

###### Description:

Takes an input JSON document, validates it according to its schema.org definition,
optionally encrypts the output before adding to IPFS, and returns a file object

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| file | formData | multipart/form-data file | No | file |
| X-Textile-Opts | header | plaintext: whether to leave unencrypted, use: if empty, assumes body contains multipart form file data, otherwise, will attempt to fetch given CID from IPFS | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | file | [pb.FileIndex](#pb.fileindex) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /mills/schema

##### POST
###### Summary:

Validate, add, and pin a new Schema

###### Description:

Takes a JSON-based Schema, validates it, adds it to IPFS, and returns a file object

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| schema | body | schema | Yes | [pb.Node](#pb.node) |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | file | [pb.FileIndex](#pb.fileindex) |
| 400 | Bad Request | string |

#### /notifications

##### GET
###### Summary:

List notifications

###### Description:

Lists all notifications generated by thread and account activity.

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | notifications | [pb.NotificationList](#pb.notificationlist) |

#### /notifications/{id}/read

##### POST
###### Summary:

Mark notifiction as read

###### Description:

Marks a notifiction as read by ID. Use 'all' to mark all as read.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | notification id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 400 | Bad Request | string |

#### /ping

##### GET
###### Summary:

Ping a network peer

###### Description:

Pings another peer on the network, returning online|offline.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | peerid | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | One of online|offline | string |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /profile

##### GET
###### Summary:

Get public profile

###### Description:

Gets the local node's public profile

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | contact | [pb.Contact](#pb.contact) |
| 400 | Bad Request | string |

#### /profile/avatar

##### POST
###### Summary:

Set avatar

###### Description:

Sets public profile avatar by specifying an existing image file hash

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | hash | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | ok | string |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /profile/username

##### POST
###### Summary:

Set username

###### Description:

Sets public profile username to given string

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | username | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | ok | string |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /sub/{id}

##### GET
###### Summary:

Subscribe to thread updates

###### Description:

Subscribes to updates in a thread or all threads. An update is generated
when a new block is added to a thread. There are several update types:
JOIN, ANNOUNCE, LEAVE, MESSAGE, FILES, COMMENT, LIKE, MERGE, IGNORE, FLAG

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | thread id, omit to stream all events | No | string |
| X-Textile-Opts | header | type: Or'd list of event types (e.g., FILES|COMMENTS|LIKES) or empty to include all types, events: Whether to emit Server-Sent Events (SSEvent) or plain JSON | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | stream of updates | [pb.FeedItem](#pb.feeditem) |
| 500 | Internal Server Error | string |

#### /threads

##### GET
###### Summary:

Lists info on all threads

###### Description:

Lists all local threads, returning a ThreadList object

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | threads | [pb.ThreadList](#pb.threadlist) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

##### POST
###### Summary:

Adds and joins a new thread

###### Description:

Adds a new Thread with given name, type, and sharing and members options, returning
a Thread object

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | name | Yes | string |
| X-Textile-Opts | header | key: A locally unique key used by an app to identify this thread on recovery, schema: Existing Thread Schema IPFS CID, type: Set the thread type to one of 'private', 'read_only', 'public', or 'open', sharing: Set the thread sharing style to one of 'not_shared','invite_only', or 'shared', members: An array of contact addresses. When supplied, the thread will not allow additional peers beyond those in array, useful for 1-1 chat/file sharing | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | thread | [pb.Thread](#pb.thread) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /threads/{id}

##### DELETE
###### Summary:

Leave and remove a thread

###### Description:

Leaves and removes a thread

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | thread id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

##### GET
###### Summary:

Gets a thread

###### Description:

Gets and displays info about a thread

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | thread id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | thread | [pb.Thread](#pb.thread) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

##### PUT
###### Summary:

Add or update a thread directly

###### Description:

Adds or updates a thread directly, usually from a backup

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| thread | body | thread | Yes | [pb.Thread](#pb.thread) |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 400 | Bad Request | string |

#### /threads/{id}/files

##### POST
###### Summary:

Adds a file or directory of files to a thread

###### Description:

Adds a file or directory of files to a thread. Files not supported by the thread
schema are ignored. Nested directories are included. An existing file hash may
also be used as input.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| dir | body | milled dir (output from mill endpoint) | Yes | [pb.Directory](#pb.directory) |
| X-Textile-Opts | header | caption: Caption to add to file(s) | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | file | [pb.Files](#pb.files) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /threads/{id}/messages

##### POST
###### Summary:

Add a message

###### Description:

Adds a message to a thread

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Args | header | urlescaped message body | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | message | [pb.Text](#pb.text) |
| 400 | Bad Request | string |
| 404 | Not Found | string |
| 500 | Internal Server Error | string |

#### /threads/{id}/peers

##### GET
###### Summary:

List all thread peers

###### Description:

Lists all peers in a thread, optionally listing peers in the default thread

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | thread id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | contacts | [pb.ContactList](#pb.contactlist) |
| 404 | Not Found | string |

#### /tokens

##### GET
###### Summary:

List local tokens

###### Description:

List info about all stored cafe tokens

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | tokens | [ string ] |
| 500 | Internal Server Error | string |

##### POST
###### Summary:

Create an access token

###### Description:

Generates an access token (44 random bytes) and saves a bcrypt hashed version for
future lookup. The response contains a base58 encoded version of the random bytes
token. If the 'store' option is set to false, the token is generated, but not
stored in the local Cafe db. Alternatively, an existing token can be added using
by specifying the 'token' option.
Tokens allow other peers to register with a Cafe peer.

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-Textile-Opts | header | token: Use existing token, rather than creating a new one, store: Whether to store the added/generated token to the local db | No | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | token | string |
| 400 | Bad Request | string |
| 500 | Internal Server Error | string |

#### /tokens/{id}

##### DELETE
###### Summary:

Removes a cafe token

###### Description:

Removes an existing cafe token

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | path | token | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 500 | Internal Server Error | string |

##### GET
###### Summary:

Check token validity

###### Description:

Check validity of existing cafe access token

###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | path | invite id | Yes | string |

###### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | ok | string |
| 401 | Unauthorized | string |

#### Models


##### core.SubsystemInfo

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| core.SubsystemInfo | object |  |  |

##### ipfs.ConnInfos

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| peers | [ [ipfs.connInfo](#ipfs.conninfo) ] |  | No |

##### ipfs.connInfo

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| addr | string |  | No |
| direction | string |  | No |
| latency | string |  | No |
| muxer | string |  | No |
| peer | string |  | No |
| streams | [ [ipfs.streamInfo](#ipfs.streaminfo) ] |  | No |

##### ipfs.streamInfo

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| protocol | string |  | No |

##### mill.Json

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| mill.Json | object |  |  |

##### pb.Block

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| author | string |  | No |
| body | string |  | No |
| date | string |  | No |
| id | string |  | No |
| parents | [ string ] |  | No |
| target | string |  | No |
| thread | string |  | No |
| type | integer |  | No |
| user | [pb.User](#pb.user) | view info | No |

##### pb.BlockList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Block](#pb.block) ] |  | No |

##### pb.Cafe

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| address | string |  | No |
| api | string |  | No |
| node | string |  | No |
| peer | string |  | No |
| protocol | string |  | No |
| swarm | [ string ] |  | No |
| url | string |  | No |

##### pb.CafeSession

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| access | string |  | No |
| cafe | [pb.Cafe](#pb.cafe) |  | No |
| exp | string |  | No |
| id | string |  | No |
| refresh | string |  | No |
| rexp | string |  | No |
| subject | string |  | No |
| type | string |  | No |

##### pb.CafeSessionList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.CafeSession](#pb.cafesession) ] |  | No |

##### pb.Comment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| body | string |  | No |
| date | string |  | No |
| id | string |  | No |
| target | [pb.FeedItem](#pb.feeditem) |  | No |
| user | [pb.User](#pb.user) |  | No |

##### pb.CommentList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Comment](#pb.comment) ] |  | No |

##### pb.Contact

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| address | string |  | No |
| avatar | string |  | No |
| created | string |  | No |
| id | string |  | No |
| inboxes | [ [pb.Cafe](#pb.cafe) ] |  | No |
| threads | [ string ] | view info | No |
| updated | string |  | No |
| username | string |  | No |

##### pb.ContactList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Contact](#pb.contact) ] |  | No |

##### pb.Directory

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| files | object |  | No |

##### pb.FeedItem

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| block | string |  | No |
| payload | string |  | No |
| thread | string |  | No |

##### pb.FeedItemList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| count | integer |  | No |
| items | [ [pb.FeedItem](#pb.feeditem) ] |  | No |
| next | string |  | No |

##### pb.File

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| file | [pb.FileIndex](#pb.fileindex) |  | No |
| index | integer |  | No |
| links | object |  | No |

##### pb.FileIndex

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| added | string |  | No |
| checksum | string |  | No |
| hash | string |  | No |
| key | string |  | No |
| media | string |  | No |
| meta | string |  | No |
| mill | string |  | No |
| name | string |  | No |
| opts | string |  | No |
| size | integer |  | No |
| source | string |  | No |
| targets | [ string ] |  | No |

##### pb.Files

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| block | string |  | No |
| caption | string |  | No |
| comments | [ [pb.Comment](#pb.comment) ] |  | No |
| date | string |  | No |
| files | [ [pb.File](#pb.file) ] |  | No |
| likes | [ [pb.Like](#pb.like) ] |  | No |
| target | string |  | No |
| threads | [ string ] |  | No |
| user | [pb.User](#pb.user) |  | No |

##### pb.FilesList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Files](#pb.files) ] |  | No |

##### pb.InviteView

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | string |  | No |
| id | string |  | No |
| inviter | [pb.User](#pb.user) |  | No |
| name | string |  | No |

##### pb.InviteViewList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.InviteView](#pb.inviteview) ] |  | No |

##### pb.Keys

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| files | object |  | No |

##### pb.Like

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | string |  | No |
| id | string |  | No |
| target | [pb.FeedItem](#pb.feeditem) |  | No |
| user | [pb.User](#pb.user) |  | No |

##### pb.LikeList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Like](#pb.like) ] |  | No |

##### pb.NewInvite

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | No |
| inviter | string |  | No |
| key | string |  | No |

##### pb.Node

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| json_schema | string |  | No |
| links | object |  | No |
| mill | string |  | No |
| name | string |  | No |
| opts | object |  | No |
| pin | boolean |  | No |
| plaintext | boolean |  | No |

##### pb.Notification

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| actor | string |  | No |
| block | string |  | No |
| body | string |  | No |
| date | string |  | No |
| id | string |  | No |
| read | boolean |  | No |
| subject | string |  | No |
| subject_desc | string |  | No |
| target | string |  | No |
| type | integer |  | No |
| user | [pb.User](#pb.user) | view info | No |

##### pb.NotificationList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Notification](#pb.notification) ] |  | No |

##### pb.QueryResult

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | string |  | No |
| id | string |  | No |
| local | boolean |  | No |
| value | string |  | No |

##### pb.Text

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| block | string |  | No |
| body | string |  | No |
| comments | [ [pb.Comment](#pb.comment) ] |  | No |
| date | string |  | No |
| likes | [ [pb.Like](#pb.like) ] |  | No |
| user | [pb.User](#pb.user) |  | No |

##### pb.TextList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Text](#pb.text) ] |  | No |

##### pb.Thread

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| block_count | integer |  | No |
| head | string |  | No |
| head_block | [pb.Block](#pb.block) | view info | No |
| id | string |  | No |
| initiator | string |  | No |
| key | string |  | No |
| members | [ string ] |  | No |
| name | string |  | No |
| peer_count | integer |  | No |
| schema | string |  | No |
| schema_node | [pb.Node](#pb.node) |  | No |
| sharing | integer |  | No |
| sk | [ integer ] |  | No |
| state | integer |  | No |
| type | integer |  | No |

##### pb.ThreadList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| items | [ [pb.Thread](#pb.thread) ] |  | No |

##### pb.User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| address | string |  | No |
| avatar | string |  | No |
| name | string |  | No |

------

The above REST API docs were generated from the built-in Swagger docs (`docs/swagger/swagger.yaml`) via [`swagger-markdown`](https://www.npmjs.com/package/swagger-markdown) from within the `textile-go` project: `swagger-markdown -i docs/swagger/swagger.yaml -o docs/swagger/swagger.md`
