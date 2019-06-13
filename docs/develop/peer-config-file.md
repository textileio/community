A JSON config file (`<repo-dir>/textile`) is used to control various peer settings. This file lives alongside the [IPFS config](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md) file (named `config`) and has a similar structure and functionality. Both of these files are read once at node instantiation, either for an offline command, or when starting the daemon. Commands that execute on a running daemon _do not_ read the config file at runtime.

The JSON config is marshaled from the Go [type definition](https://github.com/textileio/go-textile/blob/master/repo/config/init.go):

``` go
type Config struct {
	Account   Account   // local node's account (public info only)
	Addresses Addresses // local node's addresses
	API       API       // local node's API settings
	Logs      Logs      // local node's log settings
	Threads   Threads   // local node's thread settings
	IsMobile  bool      // local node is setup for mobile
	IsServer  bool      // local node is setup for a server w/ a public IP
	Cafe      Cafe      // local node cafe settings
}
```

These settings can be modified via the [command-line](/develop/clients/command-line) `config` command. For example, to allow CORS from all origins:

???+ example

    ```
    textile config API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
    ```

## `Account`

``` go
// Account store public account info
type Account struct {
	Address string // public key (seed is stored in the _possibly_ encrypted datastore)
	Thread  string // thread id of the default account thread used for sync between account peers
}
```

### `Account.Address`

Address is the account-wide public key derived from a [wallet](/concepts/the-wallet) account seed.

**Default**: _Populated upon repository initialization_

### `Account.Thread`

`Thread` is currently a [libp2p peer](https://github.com/libp2p/go-libp2p-peer) ID derived from the account seed. **This will be changed to the hash of a symmetric key in the next version of threads.**

**Default**: _Populated upon repository initialization_

## `Addresses`

``` go
// Addresses stores the (string) bind addresses for the node.
type Addresses struct {
	API       string // bind address of the local REST API
	CafeAPI   string // bind address of the cafe REST API
	Gateway   string // bind address of the IPFS object gateway
	Profiling string // bind address of the profiling API
}
```

### `Addresses.API`

This API is used to control the daemon through the command line (or via curl or some other client). Unlike the Gateway address, you should ensure that the `API` address is _not_ dial-able from outside of your machine, or potentially malicious parties may be able to send commands to your daemon. Having said that, see the [`API`](#API) config entry for details on further controlling the API HTTP server.

**Default**: `"127.0.0.1:40600"`

### `Addresses.CafeAPI`

Normally, only a designated _cafe_ peer would enable this API, though any peer may operate as a cafe if desired. See the [cafes](/concepts/cafes) overview for more.

**Default**: `"127.0.0.1:40601"`

### `Addresses.Gateway`

The [gateway](/develop/ipfs-gateway) may be used to view and decrypt files. This port may or may not be dial-able from outside you machine, that's entirely up to you. The `Gateway` address is on by default, but if you leave it blank, the gateway server will not start.

**Default**: `"127.0.0.1:5050"`

### `Addresses.Profiling`

This API is used internally for obtaining memory and CPU profiles from a running peer.

**Default**: `"127.0.0.1:6060"`

## `API`

``` go
// API settings
type API struct {
	HTTPHeaders map[string][]string // HTTP headers to return with the API.
	SizeLimit   int64               // Maximum file size limit to accept for POST requests in bytes (a zero value means no limit)
}
```

### `API.HTTPHeaders`

A map of [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) for responses from the API. You might want to edit these settings if you need to allow additional access control methods, or [require authorization headers](https://github.com/ipfs/js-ipfs-api/pull/741), etc. For example, you may want to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for your API; this can be done by modifying your `"Access-Control-Allow-Origin"` header. See [this blog post](https://medium.com/textileio/tutorial-setting-up-an-ipfs-peer-part-iii-f5f43506874c) for a discussion of similar IPFS gateway settings.

**Default**:

``` go
{
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
```

### `API.SizeLimit`

Maximum file size limit to accept for POST requests in bytes. A zero value indicates no limit should be enforced.

**Default**: `0`

## `Logs`

``` go
// Logs settings
type Logs struct {
	LogToDisk bool // when true, sends all logs to rolling files on disk
}
```

### `Logs.LogToDisk`

A boolean indicating whether to send all logs to rolling files on disk (true) or Stdout (false).

Logs written to disk (`<repo-dir>/logs/textile.log`) can be monitored via `tail -f <repo-dir>/logs/textile.log` or similar. The verbosity of these logs can be controlled at run-time via the `logs` command (see `textile logs --help` for details).

**Default**: `true`

## `Threads`

``` go
// Thread settings
type Threads struct {
	Defaults ThreadDefaults // default settings
}
```

### `Threads.Defaults`

``` go
// ThreadDefaults settings
type ThreadDefaults struct {
	ID string // default thread ID for reads/writes
}
```

#### `Threads.Defaults.ID`

Default thread ID for reads/writes (`textile threads default`).

**Default**: `""`

### `IsMobile`

A boolean indicating whether or not to apply the [IPFS low-power profile](https://github.com/ipfs/go-ipfs-config/blob/master/profile.go#L158), among other optimizations.

**Default**: `false`

### `IsServer`

A boolean indicating whether or not to apply the [IPFS server profile](https://github.com/ipfs/go-ipfs-config/blob/master/profile.go#L49), among other optimizations.

**Default**: `false`

## `Cafe`

``` go
type Cafe struct {
	Host   CafeHost
	Client CafeClient
}
```

For more information about configuring and running a cafe peer, see the [daemon installation guide](/install/the-daemon/#initialize-a-cafe-peer).

The `Cafe` config entry is broken up into two sections, one for controlling how a cafe `Host` behaves, and one for controlling how a `Client` interacts with a host peer.

### `Cafe.CafeHost`

``` go
type CafeHost struct {
	Open        bool   // When true, other peers can register with this node for cafe services.
	URL         string // Override the resolved URL of this cafe, useful for load HTTPS and/or load balancers
	NeighborURL string // Specifies the URL of a secondary cafe. Must return cafe info.
	SizeLimit   int64  // Maximum file size limit to accept for POST requests in bytes.
}
```

#### `Cafe.CafeHost.Open`

A boolean indicating whether or not to open the Cafe API and accept client requests.

**Default**: `false`

#### `Cafe.CafeHost.URL`

Override this value if a cafe peer is behind a DNS-based load balancer and/or requires HTTPS. For example, [Textile's federated cafes](https://github.com/textileio/textile-opts#network) run behind EC2 load balancers with HTTPS listeners, which route traffic to the cafe API bind address.

If not specified during repository initialization, a peer will try to determine its "most public" IP address on start up:

1. Use a LAN address if present in the peer host's advertised addresses
2. If no LAN is present, poll the peer host for an address that passes a superficial test for being public (it may take a few seconds to to complete NAT discovery)
3. Use the loopback address (`127.0.0.1`)

**Default**: `http://<SWARM_IP>:40601`

#### `Cafe.CafeHost.NeighborURL`

_Deprecated_.

**Default**: `""`

#### `Cafe.CafeHost.SizeLimit`

Maximum file size limit to accept for POST requests in bytes. A zero value indicates no limit should be enforced.

**Default**: `0`

### `Cafe.CafeClient`

``` go
// CafeClient settings
type CafeClient struct {
	Mobile MobileCafeClient
}
```

#### `Cafe.CafeClient.MobileCafeClient`

``` go
// MobileCafeClient settings
type MobileCafeClient struct {
	// messages w/ size less than limit will be handled by the p2p cafe service,
	// messages w/ size greater than limit will be handled by the mobile OS's background
	// upload service and the cafe HTTP API
	P2PWireLimit int
}
```

##### `Cafe.MobileCafeClient.P2PWireLimit`

_Deprecated_.

**Default**: `0`

<br>
