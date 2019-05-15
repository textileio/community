The command-line client ships alongside the daemon. Usage information for all commands, including sub-commands, is available via the `--help` flag.

## `textile`

```
Usage:
  textile [OPTIONS] <command>

Help Options:
  -h, --help  Show this help message

Available commands:
  account        Manage a wallet account
  blocks         View thread blocks
  cafes          Manage cafes
  chat           Start a thread chat
  commands       List available commands
  comments       Manage thread comments
  config         Get and set config values
  contacts       Manage contacts
  daemon         Start the daemon
  docs           Print docs
  feed           Paginate thread content as a consumable feed
  files          Manage thread files
  init           Init the node repo and exit
  invites        Manage thread invites
  ipfs           Access IPFS commands
  likes          Manage thread likes
  logs           List and control subsystem logs
  messages       Manage thread messages
  migrate        Migrate the node repo and exit
  notifications  Manage notifications
  ping           Ping another peer
  profile        Manage public profile
  sub            Subscribe to thread updates
  summary        Get a summary of local data
  threads        Manage threads
  tokens         Manage Cafe access tokens
  version        Print version and exit
  wallet         Manage or create an account wallet

```

### `account`

```
Usage:
  textile [OPTIONS] account <command>

Use this command to manage a wallet account.

Help Options:
  -h, --help      Show this help message

Available commands:
  address  Show wallet account address
  get      Show account contact
  seed     Show wallet account seed
  sync     Sync account with all network snapshots

```

#### `get`

```
Usage:
  textile [OPTIONS] account get 

Shows the local peer's account info as a contact.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `seed`

```
Usage:
  textile [OPTIONS] account seed 

Shows the local peer's account seed.

Help Options:
  -h, --help             Show this help message

[seed command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `address`

```
Usage:
  textile [OPTIONS] account address 

Shows the local peer's account address.

Help Options:
  -h, --help             Show this help message

[address command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `sync`

```
Usage:
  textile [OPTIONS] account sync 

Syncs the local account peer with other peers found on the network.

Help Options:
  -h, --help             Show this help message

[sync command options]
          --wait=        Stops searching after 'wait' seconds have elapsed (max
                         30s). (default: 2)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `blocks`

```
Usage:
  textile [OPTIONS] blocks <get | ls>

Blocks are the raw components in a thread. Think of them as an
append-only log of thread updates where each update is hash-linked
to its parent(s). New / recovering peers can sync history by simply
traversing the hash tree.

There are several block types:

-  MERGE:    3-way merge added.
-  IGNORE:   A block was ignored.
-  FLAG:     A block was flagged.
-  JOIN:     Peer joined.
-  ANNOUNCE: Peer set username / avatar / inbox addresses
-  LEAVE:    Peer left.
-  TEXT:     Text message added.
-  FILES:    File(s) added.
-  COMMENT:  Comment added to another block.
-  LIKE:     Like added to another block.

Use this command to list and get blocks in a thread.

Help Options:
  -h, --help      Show this help message

Available commands:
  get  Get a thread block
  ls   Paginate thread blocks

```

#### `ls`

```
Usage:
  textile [OPTIONS] blocks ls 

Paginates blocks in a thread.
Use the --dots option to return GraphViz dots instead of JSON.

Help Options:
  -h, --help             Show this help message

[ls command options]
      -t, --thread=      Thread ID. Omit for default.
      -o, --offset=      Offset ID to start listing from.
      -l, --limit=       List page size. (default: 5)
      -d, --dots         Return GraphViz dots instead of JSON.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] blocks get 

Gets a thread block by ID.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `cafes`

```
Usage:
  textile [OPTIONS] cafes <command>

Cafes are other peers on the network who offer pinning, backup, and inbox
services.
Use this command to add, list, get, and remove cafes and check messages.

Help Options:
  -h, --help      Show this help message

Available commands:
  add       Register with a cafe
  get       Get a cafe
  ls        List cafes
  messages  Checks cafe messages
  rm        Remove a cafe

```

#### `add`

```
Usage:
  textile [OPTIONS] cafes add 

Registers with a cafe and saves an expiring service session token.
An access token is required to register, and should be obtained separately from the target Cafe.

Help Options:
  -h, --help             Show this help message

[add command options]
      -t, --token=       An access token supplied by the Cafe.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] cafes ls 

List info about all active cafe sessions.

Help Options:
  -h, --help             Show this help message

[ls command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] cafes get 

Gets and displays info about a cafe session.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `rm`

```
Usage:
  textile [OPTIONS] cafes rm 

Deregisters a cafe (content will expire based on the cafe's service rules).

Help Options:
  -h, --help             Show this help message

[rm command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `messages`

```
Usage:
  textile [OPTIONS] cafes messages 

Check for messages at all cafes. New messages are downloaded and processed opportunistically.

Help Options:
  -h, --help             Show this help message

[messages command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `chat`

```
Usage:
  textile [OPTIONS] chat [chat-OPTIONS]

Starts an interactive chat session in a thread.
Omit the --thread option to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[chat command options]
      -t, --thread=      Thread ID. Omit for all.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `commands`

```
Usage:
  textile [OPTIONS] commands

List all available textile commands.

Help Options:
  -h, --help      Show this help message

```

### `comments`

```
Usage:
  textile [OPTIONS] comments <command>

Comments are added as blocks in a thread, which target
another block, usually a file(s).
Use this command to add, list, get, and ignore comments.

Help Options:
  -h, --help      Show this help message

Available commands:
  add     Add a thread comment
  get     Get a thread comment
  ignore  Ignore a thread comment
  ls      List thread comments

```

#### `add`

```
Usage:
  textile [OPTIONS] comments add 

Adds a comment to a thread block.

Help Options:
  -h, --help             Show this help message

[add command options]
      -b, --block=       Thread block ID. Usually a file(s) block.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] comments ls 

Lists comments on a thread block.

Help Options:
  -h, --help             Show this help message

[ls command options]
      -b, --block=       Thread block ID. Usually a file(s) block.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] comments get 

Gets a thread comment by block ID.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ignore`

```
Usage:
  textile [OPTIONS] comments ignore 

Ignores a thread comment by its block ID.
This adds an "ignore" thread block targeted at the comment.
Ignored blocks are by default not returned when listing.

Help Options:
  -h, --help             Show this help message

[ignore command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `config`

```
Usage:
  textile [OPTIONS] config [config-OPTIONS]

The config command controls configuration variables.
It works much like 'git config'. The configuration
values are stored in a config file inside your Textile
repository.

Getting config values will report the currently active
config settings. This may differ from the values specified
when setting values.

When changing values, valid JSON types must be used.
For example, a string should be escaped or wrapped in
single quotes (e.g., \"127.0.0.1:40600\") and arrays and
objects work fine (e.g. '{"API": "127.0.0.1:40600"}')
but should be wrapped in single quotes. Be sure to restart
the daemon for changes to take effect.

Examples:

Get the value of the 'Addresses.API' key:

$ textile config Addresses.API
$ textile config Addresses/API # Alternative syntax

Print the entire Textile config file to console:

$ textile config

Set the value of the 'Addresses.API' key:

$ textile config Addresses.API \"127.0.0.1:40600\"

Help Options:
  -h, --help             Show this help message

[config command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `contacts`

```
Usage:
  textile [OPTIONS] contacts <command>

Use this command to add, list, get, and remove local contacts and find other
contacts on the network.

Help Options:
  -h, --help      Show this help message

Available commands:
  add     Add a contact
  get     Get a known contact
  ls      List known contacts
  rm      Remove a known contact
  search  Find contacts

```

#### `add`

```
Usage:
  textile [OPTIONS] contacts add 

Adds a contact by display name or account address to known contacts.

Help Options:
  -h, --help             Show this help message

[add command options]
      -n, --name=        Add by display name.
      -a, --address=     Add by account address.
          --wait=        Stops searching after 'wait' seconds have elapsed (max
                         30s). (default: 2)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] contacts ls 

Lists known contacts.

Help Options:
  -h, --help             Show this help message

[ls command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] contacts get 

Gets a known contact.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `rm`

```
Usage:
  textile [OPTIONS] contacts rm 

Removes a known contact.

Help Options:
  -h, --help             Show this help message

[rm command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `search`

```
Usage:
  textile [OPTIONS] contacts search 

Searches locally and on the network for contacts.

Help Options:
  -h, --help             Show this help message

[search command options]
      -n, --name=        Search by display name.
      -a, --address=     Search by account address.
          --only-local   Only search local contacts.
          --only-remote  Only search remote contacts.
          --limit=       Stops searching after limit results are found.
                         (default: 5)
          --wait=        Stops searching after 'wait' seconds have elapsed (max
                         30s). (default: 2)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `daemon`

```
Usage:
  textile [OPTIONS] daemon [daemon-OPTIONS]

Start a node daemon session.

Help Options:
  -h, --help            Show this help message

[daemon command options]
      -p, --pin-code=   Specify the pin code for datastore encryption (omit of
                        none was used during init).
      -r, --repo-dir=   Specify a custom repository path.
      -d, --debug       Set the logging level to debug.
      -s, --serve-docs  Whether to serve the local REST API docs.

```

### `docs`

```
Usage:
  textile [OPTIONS] docs

Prints markdown docs for the command-line client.

Help Options:
  -h, --help      Show this help message

```

### `feed`

```
Usage:
  textile [OPTIONS] feed [feed-OPTIONS]

Paginates post (join|leave|files|message) and annotation (comment|like) block
types as a consumable feed.
The --mode option dictates how the feed is displayed:

-  "chrono": All feed block types are shown. Annotations always nest their
target post, i.e., the post a comment is about.
-  "annotated": Annotations are nested under post targets, but are not shown in
the top-level feed.
-  "stacks": Related blocks are chronologically grouped into "stacks". A new
stack is started if an unrelated block
breaks continuity. This mode is used by Textile Photos. Stacks may include:

*  The initial post with some nested annotations. Newer annotations may have
already been listed.
*  One or more annotations about a post. The newest annotation assumes the
"top" position in the stack. Additional
annotations are nested under the target. Newer annotations may have already
been listed in the case as well.

Omit the --thread option to paginate all files.
Specify "default" to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[feed command options]
      -t, --thread=      Thread ID. Omit for all.
      -o, --offset=      Offset ID to start listing from.
      -l, --limit=       List page size. (default: 5)
      -m, --mode=        Feed mode. One of: chrono, annotated, stacks.
                         (default: chrono)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `files`

```
Usage:
  textile [OPTIONS] files <command>

Files are added as blocks in a thread.
Use this command to add, list, get, and ignore files.
The 'key' command provides access to file encryption keys.

Help Options:
  -h, --help      Show this help message

Available commands:
  add     Add file(s) to a thread
  get     Get a thread file by ID
  ignore  Ignore thread files
  keys    Show file keys
  ls      Paginate thread files

```

#### `add`

```
Usage:
  textile [OPTIONS] files add 

Adds a file or directory of files to a thread. Files not supported 
by the thread schema are ignored. Nested directories are included.
An existing file hash may also be used as input.
Use the --group option to add directory files as a single object.  
Omit the --thread option to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[add command options]
      -t, --thread=      Thread ID. Omit for default.
      -c, --caption=     File(s) caption.
      -g, --group        Group directory files.
      -v, --verbose      Prints files as they are milled.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] files ls 

Paginates thread files.
Omit the --thread option to paginate all files.
Specify "default" to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[ls command options]
      -t, --thread=      Thread ID. Omit for all.
      -o, --offset=      Offset ID to start listing from.
      -l, --limit=       List page size. (default: 5)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] files get 

Gets a thread file by block ID.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ignore`

```
Usage:
  textile [OPTIONS] files ignore 

Ignores a thread file by its block ID.
This adds an "ignore" thread block targeted at the file.
Ignored blocks are by default not returned when listing.

Help Options:
  -h, --help             Show this help message

[ignore command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `keys`

```
Usage:
  textile [OPTIONS] files keys 

Shows file keys under the given target from an add.

Help Options:
  -h, --help             Show this help message

[keys command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `init`

```
Usage:
  textile [OPTIONS] init [init-OPTIONS]

Initialize the node repository and exit.

Help Options:
  -h, --help                   Show this help message

[init command options]
      -s, --seed=              Account seed (run 'wallet' command to generate
                               new seeds).
      -p, --pin-code=          Specify a pin code for datastore encryption.
      -r, --repo-dir=          Specify a custom repository path.

    Address Options:
      -a, --api-bind-addr=     Set the local API address. (default:
                               127.0.0.1:40600)
      -c, --cafe-bind-addr=    Set the cafe REST API address. (default:
                               127.0.0.1:40601)
      -g, --gateway-bind-addr= Set the IPFS gateway address. (default:
                               127.0.0.1:5050)

    Cafe Options:
          --cafe-open          Open the p2p Cafe Service for other peers.
          --cafe-public-ip=    Required with --cafe-open on a server with a
                               public IP address.
          --cafe-url=          Specify the URL of this cafe, e.g.,
                               https://mycafe.com
          --cafe-neighbor-url= Specify the URL of a secondary cafe. Must return
                               cafe info, e.g., via a Gateway:
                               https://my-gateway.yolo.com/cafe, or a Cafe API:
                               https://my-cafe.yolo.com

    IPFS Options:
          --server             Apply IPFS server profile.
          --swarm-ports=       Set the swarm ports (TCP,WS). Random ports are
                               chosen by default.

    Log Options:
      -n, --no-log-files       Write logs to stdout instead of rolling files.
      -d, --debug              Set the logging level to debug.

```

### `invites`

```
Usage:
  textile [OPTIONS] invites <command>

Invites allow other users to join threads. There are two types of
invites, direct account-to-account and external:

- Account-to-account invites are encrypted with the invitee's account address
(public key).
- External invites are encrypted with a single-use key and are useful for
onboarding new users.

Help Options:
  -h, --help      Show this help message

Available commands:
  accept  Accept an invite to a thread
  create  Create account-to-account or external invites to a thread
  ignore  Ignore direct invite to a thread
  ls      List thread invites

```

#### `create`

```
Usage:
  textile [OPTIONS] invites create 

Creates a direct account-to-account or external invite to a thread.
Omit the --address option to create an external invite.
Omit the --thread option to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[create command options]
      -t, --thread=      Thread ID. Omit for default.
      -a, --address=     Account address. Omit to create an external invite.
          --wait=        Stops searching after 'wait' seconds have elapsed (max
                         30s). (default: 2)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] invites ls 

Lists all pending thread invites.

Help Options:
  -h, --help             Show this help message

[ls command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `accept`

```
Usage:
  textile [OPTIONS] invites accept 

Accepts a direct account-to-account or external invite to a thread.
Use the --key option with an external invite.

Help Options:
  -h, --help             Show this help message

[accept command options]
      -k, --key=         Key for an external invite.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ignore`

```
Usage:
  textile [OPTIONS] invites ignore 

Ignores a direct account-to-account invite to a thread.

Help Options:
  -h, --help             Show this help message

[ignore command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `ipfs`

```
Usage:
  textile [OPTIONS] ipfs <cat | id | swarm>

Provides access to some IPFS commands.

Help Options:
  -h, --help      Show this help message

Available commands:
  cat    Show IPFS object data
  id     Show IPFS peer ID
  swarm  Access some IPFS swarm commands

```

#### `id`

```
Usage:
  textile [OPTIONS] ipfs id 

Shows the local node's IPFS peer ID.

Help Options:
  -h, --help             Show this help message

[id command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `swarm`

```
Usage:
  textile [OPTIONS] ipfs swarm 

Provides access to a limited set of IPFS swarm commands. <connect | peers>

Help Options:
  -h, --help      Show this help message

Available commands:
  connect  Open connection to a given address
  peers    List peers with open connections

```

#### `cat`

```
Usage:
  textile [OPTIONS] ipfs cat 

Displays the data behind an IPFS CID (hash).

Help Options:
  -h, --help             Show this help message

[cat command options]
      -k, --key=         Encyrption key.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `likes`

```
Usage:
  textile [OPTIONS] likes <command>

Likes are added as blocks in a thread, which target
another block, usually a file(s).
Use this command to add, list, get, and ignore likes.

Help Options:
  -h, --help      Show this help message

Available commands:
  add     Add a thread like
  get     Get a thread like
  ignore  Ignore a thread like
  ls      List thread likes

```

#### `add`

```
Usage:
  textile [OPTIONS] likes add 

Adds a like to a thread block.

Help Options:
  -h, --help             Show this help message

[add command options]
      -b, --block=       Thread block ID. Usually a file(s) block.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] likes ls 

Lists likes on a thread block.

Help Options:
  -h, --help             Show this help message

[ls command options]
      -b, --block=       Thread block ID. Usually a file(s) block.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] likes get 

Gets a thread like by block ID.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ignore`

```
Usage:
  textile [OPTIONS] likes ignore 

Ignores a thread like by its block ID.
This adds an "ignore" thread block targeted at the like.
Ignored blocks are by default not returned when listing.

Help Options:
  -h, --help             Show this help message

[ignore command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `logs`

```
Usage:
  textile [OPTIONS] logs [logs-OPTIONS]

List or change the verbosity of one or all subsystems log output.
Textile logs piggyback on the IPFS event logs.

Help Options:
  -h, --help             Show this help message

[logs command options]
      -s, --subsystem=   The subsystem logging identifier. Omit for all.
      -l, --level=       One of: debug, info, warning, error, critical. Omit to
                         get current level.
      -t, --tex-only     Whether to list/change only Textile subsystems, or all
                         available subsystems.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `messages`

```
Usage:
  textile [OPTIONS] messages <command>

Messages are added as blocks in a thread.
Use this command to add, list, get, and ignore messages.


Help Options:
  -h, --help      Show this help message

Available commands:
  add     Add a thread message
  get     Get a thread message
  ignore  Ignore a thread message
  ls      List thread messages

```

#### `add`

```
Usage:
  textile [OPTIONS] messages add 

Adds a message to a thread.
Omit the --thread option to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[add command options]
      -t, --thread=      Thread ID. Omit for default.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] messages ls 

Paginates thread messages.
Omit the --thread option to paginate all messages.
Specify "default" to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[ls command options]
      -t, --thread=      Thread ID. Omit for all.
      -o, --offset=      Offset ID to start listing from.
      -l, --limit=       List page size. (default: 10)

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] messages get 

Gets a thread message by block ID.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ignore`

```
Usage:
  textile [OPTIONS] messages ignore 

Ignores a thread message by its block ID.
This adds an "ignore" thread block targeted at the message.
Ignored blocks are by default not returned when listing.

Help Options:
  -h, --help             Show this help message

[ignore command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `migrate`

```
Usage:
  textile [OPTIONS] migrate [migrate-OPTIONS]

Migrate the node repository and exit.

Help Options:
  -h, --help          Show this help message

[migrate command options]
      -r, --repo-dir= Specify a custom repository path.
      -p, --pin-code= Specify the pin code for datastore encryption (omit of
                      none was used during init).

```

### `notifications`

```
Usage:
  textile [OPTIONS] notifications <ls | read>

Notifications are generated by thread and account activity.
Use this command to list, get, and mark notifications as read.

Help Options:
  -h, --help      Show this help message

Available commands:
  ls    List notifications
  read  Mark notification(s) as read

```

#### `ls`

```
Usage:
  textile [OPTIONS] notifications ls 

Lists notifications.

Help Options:
  -h, --help             Show this help message

[ls command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `read`

```
Usage:
  textile [OPTIONS] notifications read 

Marks a notifiction as read by ID.
"textile notifications read all" marks all as read.

Help Options:
  -h, --help             Show this help message

[read command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `ping`

```
Usage:
  textile [OPTIONS] ping [ping-OPTIONS]

Pings another peer on the network, returning online|offline.

Help Options:
  -h, --help             Show this help message

[ping command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `profile`

```
Usage:
  textile [OPTIONS] profile <get | set>

Use this command to view and update the peer profile. A Textile account will
show a profile for each of its peers, e.g., mobile, desktop, etc.


Help Options:
  -h, --help      Show this help message

Available commands:
  get  Get profile
  set  Set profile name and avatar

```

#### `get`

```
Usage:
  textile [OPTIONS] profile get 

Gets the local peer profile.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `set`

```
Usage:
  textile [OPTIONS] profile set 

Sets the peer display name and avatar. <avatar | name>

Help Options:
  -h, --help      Show this help message

Available commands:
  avatar  Set avatar
  name    Set display name

```

### `sub`

```
Usage:
  textile [OPTIONS] sub [sub-OPTIONS]

Subscribes to updates in a thread or all threads. An update is generated
when a new block is added to a thread.

There are several update types:

-  MERGE
-  IGNORE
-  FLAG
-  JOIN
-  ANNOUNCE
-  LEAVE
-  TEXT
-  FILES
-  COMMENT
-  LIKE

Use the --thread option to subscribe to events emmitted from a specific thread.
The --type option can be used multiple times, e.g., --type files --type comment.

Help Options:
  -h, --help             Show this help message

[sub command options]
      -t, --thread=      Thread ID. Omit for all.
      -k, --type=        An update type to filter for. Omit for all.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `summary`

```
Usage:
  textile [OPTIONS] summary [summary-OPTIONS]

Get a summary of the local node's data.

Help Options:
  -h, --help             Show this help message

[summary command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `threads`

```
Usage:
  textile [OPTIONS] threads <command>

Threads are distributed sets of encrypted files, often shared between peers,
governed by schemas.
Use this command to add, list, get, and remove threads. See below for
additional commands.

Control over thread access and sharing is handled by a combination of the
--type and --sharing flags.
An immutable member address "whitelist" gives the initiator fine-grained
control.
The table below outlines access patterns for the thread initiator and the
whitelist members.
An empty whitelist is taken to be "everyone", which is the default.

Thread type controls read (R), annotate (A), and write (W) access:

private   --> initiator: RAW, whitelist:
read_only --> initiator: RAW, whitelist: R
public    --> initiator: RAW, whitelist: RA
open      --> initiator: RAW, whitelist: RAW

Thread sharing style controls if (Y/N) a thread can be shared:

not_shared  --> initiator: N, whitelist: N
invite_only --> initiator: Y, whitelist: N
shared      --> initiator: Y, whitelist: Y

Help Options:
  -h, --help      Show this help message

Available commands:
  add        Add a new thread
  default    Get default thread
  get        Get a thread
  ls         List threads
  peers      List thread peers
  rename     Rename thread
  rm         Remove a thread
  snapshots  Manage thread snapshots

```

#### `add`

```
Usage:
  textile [OPTIONS] threads add 

Adds and joins a new thread. See 'textile threads --help' for more about threads.

Help Options:
  -h, --help             Show this help message

[add command options]
      -k, --key=         A locally unique key used by an app to identify this
                         thread on recovery.
      -t, --type=        Set the thread type to one of 'private', 'read_only',
                         'public', or 'open'. (default: private)
      -s, --sharing=     Set the thread sharing style to one of 'not_shared',
                         'invite_only', or 'shared'. (default: not_shared)
      -w, --whitelist=   A contact address. When supplied, the thread will not
                         allow additional peers, useful for 1-1 chat/file
                         sharing. Can be used multiple times to include
                         multiple contacts.'
          --schema=      Thread schema ID. Supersedes schema filename.
          --schema-file= Thread schema filename. Supersedes the built-in schema
                         flags.
          --blob         Use the built-in blob schema for generic data.
          --camera-roll  Use the built-in camera roll schema.
          --media        Use the built-in media schema.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] threads ls 

Lists info on all threads.

Help Options:
  -h, --help             Show this help message

[ls command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `get`

```
Usage:
  textile [OPTIONS] threads get 

Gets and displays info about a thread.

Help Options:
  -h, --help             Show this help message

[get command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `default`

```
Usage:
  textile [OPTIONS] threads default 

Gets and displays info about the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[default command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `peers`

```
Usage:
  textile [OPTIONS] threads peers 

Lists all peers in a thread.
Omit the --thread option to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[peers command options]
      -t, --thread=      Thread ID. Omit for default.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `rename`

```
Usage:
  textile [OPTIONS] threads rename 

Renames a thread. Only the initiator can rename a thread.
Omit the --thread option to use the default thread (if selected).

Help Options:
  -h, --help             Show this help message

[rename command options]
      -t, --thread=      Thread ID. Omit for default.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `rm`

```
Usage:
  textile [OPTIONS] threads rm 

Leaves and removes a thread.

Help Options:
  -h, --help             Show this help message

[rm command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `snapshots`

```
Usage:
  textile [OPTIONS] threads snapshots 

Use this command to create, search, and apply thread snapshots. <apply | create | search>

Help Options:
  -h, --help      Show this help message

Available commands:
  apply   Apply a single thread snapshot
  create  Create thread snapshots
  search  Search for thread snapshots

```

### `tokens`

```
Usage:
  textile [OPTIONS] tokens <command>

Tokens allow other peers to register with a Cafe peer.
Use this command to create, list, validate, and remove tokens required for
access to this peer's Cafe.

Help Options:
  -h, --help      Show this help message

Available commands:
  create    Create a new access token
  ls        List available access tokens
  rm        Remove a specific access token
  validate  Check if access token is valid

```

#### `create`

```
Usage:
  textile [OPTIONS] tokens create 

Generates an access token (44 random bytes) and saves a bcrypt hashed version for future lookup.
The response contains a base58 encoded version of the random bytes token. If '--no-store' is used,
the token is generated, but not stored in the local Cafe db. Alternatively, an existing token
can be added using the '--token' flag.

Help Options:
  -h, --help             Show this help message

[create command options]
      -n, --no-store     Generate token only, do not store in local db.
      -t, --token=       Use existing token, rather than creating a new one.

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `ls`

```
Usage:
  textile [OPTIONS] tokens ls 

List info about all stored cafe tokens.

Help Options:
  -h, --help             Show this help message

[ls command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `validate`

```
Usage:
  textile [OPTIONS] tokens validate 

Check validity of existing cafe access token.

Help Options:
  -h, --help             Show this help message

[validate command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

#### `rm`

```
Usage:
  textile [OPTIONS] tokens rm 
	
	Removes an existing cafe token.

Help Options:
  -h, --help             Show this help message

[rm command options]

    Client Options:
          --api=         API address to use (default: http://127.0.0.1:40600)
          --api-version= API version to use (default: v0)

```

### `version`

```
Usage:
  textile [OPTIONS] version [version-OPTIONS]

Print the current version and exit.

Help Options:
  -h, --help      Show this help message

[version command options]
      -g, --git   Show full git version summary.

```

### `wallet`

```
Usage:
  textile [OPTIONS] wallet <accounts | init>

Initialize a new wallet, or view accounts from an existing wallet.

Help Options:
  -h, --help      Show this help message

Available commands:
  accounts  Show derived accounts
  init      Initialize a new wallet

```

#### `init`

```
Usage:
  textile [OPTIONS] wallet init 

Initializes a new account wallet backed by a mnemonic recovery phrase.

Help Options:
  -h, --help            Show this help message

[init command options]
      -w, --word-count= Number of mnemonic recovery phrase words:
                        12,15,18,21,24. (default: 12)
      -p, --password=   Mnemonic recovery phrase password (omit if none).

```

#### `accounts`

```
Usage:
  textile [OPTIONS] wallet accounts 

Shows the derived accounts (address/seed pairs) in a wallet.

Help Options:
  -h, --help          Show this help message

[accounts command options]
      -p, --password= Mnemonic recovery phrase password (omit if none).
      -d, --depth=    Number of accounts to show. (default: 1)
      -o, --offset=   Account depth to start from. (default: 0)

```

<br>
