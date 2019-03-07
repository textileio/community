## Config

The Textile config file is similar in structure and usage to the [IPFS config](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md) file. It is a JSON document located at `<repo-dir>/textile`. It is read once at node instantiation, either for an offline command, or when starting the daemon. Commands that execute on a running daemon _do not_ read the config file at runtime. The various settings control different aspects of a Textile node, from public account information, to API access and functionality, to activity logging and everything in between. Here, we cover each config section in detail, though users are encouraged to explore the Textile commandline tools for further details and information (try `textile config --help` to get started).

### Account

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

## Addresses

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

## API

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

## Logs

Stores settings relevant to logging node activities and services.

* `LogToDisk` is a boolean indicating whether to send all logs to rolling files on disk (true) or Stdout (false).

The `LogToDisk` config entry controls how a node handles subsystem logging. By default, when `LogToDisk` is `true`, logs are written to `<repo-dir>/logs/textile.log`. These can be monitored via `tail -f <repo-dir>/logs/textile.log` or similar. The verbosity of these logs can be controlled at run-time via the Textile `logs` subcommand (see `textile logs --help` for details), or at node instantiation (`textile daemon`) via the `--logs` flag (see `textile daemon --help` for details). This config entry they can be modified directly via the `config` subcommand (e.g., `textile config Logs.LogToDisk 'true'`).

**Default**:

```
"Logs": {
    "LogToDisk": true,
}
```

## Threads

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

## Cafe

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

## Additional Settings

Stores settings specific to *how* a local node is set up; for example, for running on a mobile device, or as a server with a public IP address. 

* `IsMobile` is a boolean indicating whether the local node is setup for mobile.
* `IsServer` is a boolean indicating whether the local node is setup as a server with a public IP.

These settings are only modified when initializing a new nod. For example, when accessing Textile on a mobile device, the `IsMobile` config entry will automatically be set to `true`. Conversely, when initializing a desktop or server node, the `--server` flag may be specified, which will set `IsServer` to true, *and* apply the IPFS *server profile* to the underlying IPFS node. See `textile init --help` and [this blog post](https://medium.com/textileio/tutorial-setting-up-an-ipfs-peer-part-iv-1595d4ba221b) for details. Alternatively, they _can_ be modified individually via the `config` subcommand (e.g., `textile config IsServer true`).

**Default**:

```
"IsMobile": false,
"IsServer": false
```