# Command-line

<p>The command-line client ships alongside the daemon. Usage information for all commands, including sub-commands, is available via the --help flag.</p>

<style>pre { background: inherit !important; word-wrap: inherit !important; white-space: pre-wrap !important; }</style>

## textile [&lt;flags&gt;]
<pre>Textile is a set of tools and trust-less infrastructure for building censorship resistant and privacy preserving applications</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--help</code></td><td><pre>Show context-sensitive help (also try --help-long and --help-man).</pre></td></tr>
	<tr><td><code>--help-long</code></td><td><pre>Generate long help.</pre></td></tr>
	<tr><td><code>--help-man</code></td><td><pre>Generate a man page.</pre></td></tr>
	<tr><td><code>--completion-bash</code></td><td><pre>Output possible completions for the given args.</pre></td></tr>
	<tr><td><code>--completion-script-bash</code></td><td><pre>Generate completion script for bash.</pre></td></tr>
	<tr><td><code>--completion-script-zsh</code></td><td><pre>Generate completion script for ZSH.</pre></td></tr>
	<tr><td><code>--api="http://127.0.0.1:40600"</code></td><td><pre>API Address to use</pre></td></tr>
	<tr><td><code>--api-version="v0"</code></td><td><pre>API version to use</pre></td></tr>
	<tr><td><code>--debug</code></td><td><pre>Set the logging level to debug</pre></td></tr>
</table>

## textile help [&lt;command&gt;]
<pre>Show help.</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;command&gt;]</code></td><td><pre>Show help on command.</pre></td></tr>
</table>

## textile account
<pre>Manage the account that the initialised textile repository is associated with</pre>

### textile account get
<pre>Shows the local peer's account info as a contact</pre>

### textile account seed
<pre>Shows the local peer's account seed, treat this as top secret</pre>

### textile account address
<pre>Shows the local peer's account address</pre>

### textile account sync [&lt;flags&gt;]
<pre>Syncs the local account peer with other peers found on the network</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--wait=2</code></td><td><pre>Stops searching after 'wait' seconds have elapsed (max 30s)</pre></td></tr>
</table>

## textile block
<pre>Threads are composed of an append-only log of blocks, use these commands to manage them</pre>

### textile block list [&lt;flags&gt;] &lt;thread&gt;
<pre>Paginates blocks in a thread</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><td><code>-d, --dots</code></td><td><pre>Return GraphViz dots instead of JSON</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

### textile block meta &lt;block&gt;
<pre>Get the metadata for a block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID</pre></td></tr>
</table>

### textile block ignore &lt;block&gt;
<pre>Remove a block by marking it to be ignored</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID</pre></td></tr>
</table>

### textile block files
<pre>Commands to interact with File Blocks</pre>

#### textile block files list &lt;block&gt;
<pre>List all files within a File Block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>File Block ID</pre></td></tr>
</table>

#### textile block files get [&lt;flags&gt;] &lt;block&gt;
<pre>Get a specific file within the File Block</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--index=0</code></td><td><pre>The index of the file to fetch</pre></td></tr>
	<tr><td><code>--path="."</code></td><td><pre>The link path of the file to fetch</pre></td></tr>
	<tr><td><code>--content</code></td><td><pre>If provided, the decrypted content of the file is retrieved</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>File Block ID</pre></td></tr>
</table>

## textile cafe
<pre>Commands to manage cafes</pre>

### textile cafe add --token=TOKEN &lt;peer&gt;
<pre>Registers with a cafe and saves an expiring service session token.
An access token is required to register, and should be obtained separately from the target cafe.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-t, --token=TOKEN</code></td><td><pre>An access token supplied by the cafe</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;peer&gt;</code></td><td><pre>The host cafe's IPFS peer ID</pre></td></tr>
</table>

### textile cafe list
<pre>List info about all active cafe sessions</pre>

### textile cafe get &lt;cafe&gt;
<pre>Gets and displays info about a cafe session</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;cafe&gt;</code></td><td><pre>Cafe ID</pre></td></tr>
</table>

### textile cafe delete &lt;cafe&gt;
<pre>Deregisters a cafe (content will expire based on the cafe's service rules)</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;cafe&gt;</code></td><td><pre>Cafe ID</pre></td></tr>
</table>

### textile cafe messages
<pre>Check for messages at all cafes. New messages are downloaded and processed opportunistically.</pre>

## textile chat &lt;thread&gt;
<pre>Starts an interactive chat session in a thread</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

## textile comment
<pre>Comments are added as blocks in a thread, which target another block, usually a file(s)</pre>

### textile comment add &lt;block&gt; &lt;body&gt;
<pre>Attach a comment to a block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>The Block ID to attach the comment to</pre></td></tr>
	<tr><td><code>&lt;body&gt;</code></td><td><pre>Text to use as the comment</pre></td></tr>
</table>

### textile comment list &lt;block&gt;
<pre>Get the comments that are attached to a block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>The Block ID which the comments attached to</pre></td></tr>
</table>

### textile comment get &lt;comment-block&gt;
<pre>Get a comment by its own Block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;comment-block&gt;</code></td><td><pre>Comment Block ID</pre></td></tr>
</table>

### textile comment ignore &lt;comment-block&gt;
<pre>Ignore a comment by its own Block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;comment-block&gt;</code></td><td><pre>Comment Block ID</pre></td></tr>
</table>

## textile config [&lt;name&gt; [&lt;value&gt;]]
<pre>Get or set configuration variables</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;name&gt;]</code></td><td><pre>If provided, will restrict the operation to this specific configuration variable, e.g. 'Addresses.API'</pre></td></tr>
	<tr><td><code>[&lt;value&gt;]</code></td><td><pre>If provided, will set the specific configuration variable to this JSON escaped value, e.g. '"127.0.0.1:40600"'</pre></td></tr>
</table>

## textile contact
<pre>Manage local contacts and find other contacts on the network</pre>

### textile contact add [&lt;flags&gt;]
<pre>Adds a contact by display name or account address to known contacts</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --name=NAME</code></td><td><pre>Add by display name</pre></td></tr>
	<tr><td><code>-a, --address=ADDRESS</code></td><td><pre>Add by account address</pre></td></tr>
	<tr><td><code>--wait=WAIT</code></td><td><pre>Stops searching after [wait] seconds have elapsed</pre></td></tr>
</table>

### textile contact list
<pre>List known contacts</pre>

### textile contact get &lt;address&gt;
<pre>Gets a known local contact</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;address&gt;</code></td><td><pre>Account Address</pre></td></tr>
</table>

### textile contact delete &lt;address&gt;
<pre>Deletes a known contact</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;address&gt;</code></td><td><pre>Account Address</pre></td></tr>
</table>

### textile contact search [&lt;flags&gt;]
<pre>Searches locally and on the network for contacts</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --name=NAME</code></td><td><pre>Search by display name</pre></td></tr>
	<tr><td><code>-a, --address=ADDRESS</code></td><td><pre>Search by account address</pre></td></tr>
	<tr><td><code>--only-local</code></td><td><pre>Only search local contacts</pre></td></tr>
	<tr><td><code>--only-remote</code></td><td><pre>Only search remote contacts</pre></td></tr>
	<tr><td><code>--limit=5</code></td><td><pre>Stops searching after [limit] results are found</pre></td></tr>
	<tr><td><code>--wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapsed (max 30s)</pre></td></tr>
</table>

## textile daemon [&lt;flags&gt;]
<pre>Start a node daemon session</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-r, --repo=REPO</code></td><td><pre>Specify a custom repository path</pre></td></tr>
	<tr><td><code>-p, --pin=PIN</code></td><td><pre>Specify the pin code for datastore encryption (omit no pin code was used during init)</pre></td></tr>
	<tr><td><code>-s, --serve-docs</code></td><td><pre>Whether to serve the local REST API docs</pre></td></tr>
</table>

## textile docs
<pre>Prints the CLI help as HTML</pre>

## textile feed [&lt;flags&gt;] [&lt;thread&gt;]
<pre>Paginates post (join|leave|files|message) and annotation (comment|like) block types as a consumable feed.

The --mode option dictates how the feed is displayed:

-  "chrono": All feed block types are shown. Annotations always nest their target post, i.e., the post a comment is about.
-  "annotated": Annotations are nested under post targets, but are not shown in the top-level feed.
-  "stacks": Related blocks are chronologically grouped into "stacks". A new stack is started if an unrelated block
   breaks continuity. This mode is used by Textile Photos.

Stacks may include:

- The initial post with some nested annotations. Newer annotations may have already been listed.
- One or more annotations about a post. The newest annotation assumes the "top" position in the stack. Additional
 annotations are nested under the target. Newer annotations may have already been listed in the case as well.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listening from</pre></td></tr>
	<tr><td><code>-l, --limit=3</code></td><td><pre>List page size</pre></td></tr>
	<tr><td><code>-m, --mode="chrono"</code></td><td><pre>Feed mode, one of: chrono, annotated, stacks</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

## textile file
<pre>Manage Textile Files Blocks</pre>

### textile file list
<pre>Get all the files, or just the files for a specific thread or block</pre>

#### textile file list thread [&lt;flags&gt;] [&lt;thread&gt;]
<pre>Paginates the files of a thread, or of all threads</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

#### textile file list block
<pre>Commands to interact with File Blocks</pre>

##### textile file list block list &lt;block&gt;
<pre>List all files within a File Block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>File Block ID</pre></td></tr>
</table>

##### textile file list block get [&lt;flags&gt;] &lt;block&gt;
<pre>Get a specific file within the File Block</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--index=0</code></td><td><pre>The index of the file to fetch</pre></td></tr>
	<tr><td><code>--path="."</code></td><td><pre>The link path of the file to fetch</pre></td></tr>
	<tr><td><code>--content</code></td><td><pre>If provided, the decrypted content of the file is retrieved</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>File Block ID</pre></td></tr>
</table>

### textile file keys &lt;block-data&gt;
<pre>Shows the encryption keys for each content/meta pair for the given block DAG</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block-data&gt;</code></td><td><pre>Block Data ID</pre></td></tr>
</table>

### textile file add [&lt;flags&gt;] &lt;thread&gt; [&lt;path&gt;]
<pre>Adds a file, directory, or hash to a thread. Files not supported by the thread schema are ignored</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-c, --caption=CAPTION</code></td><td><pre>File(s) caption</pre></td></tr>
	<tr><td><code>-g, --group</code></td><td><pre>If provided, group a directory's files together into a single object, includes nested directories</pre></td></tr>
	<tr><td><code>-v, --verbose</code></td><td><pre>Prints files as they are milled</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
	<tr><td><code>[&lt;path&gt;]</code></td><td><pre>The path to the file or directory to add, can also be an existing hash. If omitted, you must provide a stdin blob input.</pre></td></tr>
</table>

### textile file ignore &lt;files-block&gt;
<pre>Ignores a thread file by its own block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;files-block&gt;</code></td><td><pre>Files Block ID</pre></td></tr>
</table>

### textile file get [&lt;flags&gt;] &lt;hash&gt;
<pre>Get the metadata or content of a specific file</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--content</code></td><td><pre>If provided, the decrypted content of the file is retrieved</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;hash&gt;</code></td><td><pre>File Hash</pre></td></tr>
</table>

## textile init [&lt;flags&gt;] &lt;account-seed&gt;
<pre>Configure textile to use the account by creating a local repository to house its data</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-p, --pin=PIN</code></td><td><pre>Specify a pin for datastore encryption</pre></td></tr>
	<tr><td><code>-r, --repo=REPO</code></td><td><pre>Specify a custom repository path</pre></td></tr>
	<tr><td><code>--server</code></td><td><pre>Apply IPFS server profile</pre></td></tr>
	<tr><td><code>--swarm-ports=SWARM-PORTS</code></td><td><pre>Set the swarm ports (TCP,WS). A random TCP port is chosen by default</pre></td></tr>
	<tr><td><code>--log-files</code></td><td><pre>If true, writes logs to rolling files, if false, writes logs to stdout</pre></td></tr>
	<tr><td><code>--api-bind-addr="127.0.0.1:40600"</code></td><td><pre>Set the local API address</pre></td></tr>
	<tr><td><code>--cafe-bind-addr="0.0.0.0:40601"</code></td><td><pre>Set the cafe REST API address</pre></td></tr>
	<tr><td><code>--gateway-bind-addr="127.0.0.1:5050"</code></td><td><pre>Set the IPFS gateway address</pre></td></tr>
	<tr><td><code>--profile-bind-addr="127.0.0.1:6060"</code></td><td><pre>Set the profiling address</pre></td></tr>
	<tr><td><code>--cafe</code></td><td><pre>Open the p2p cafe service for other peers</pre></td></tr>
	<tr><td><code>--cafe-open</code></td><td><pre>Open the p2p cafe service for other peers</pre></td></tr>
	<tr><td><code>--cafe-url=CAFE-URL</code></td><td><pre>Specify a custom URL of this cafe, e.g., https://mycafe.com</pre></td></tr>
	<tr><td><code>--cafe-neighbor-url=CAFE-NEIGHBOR-URL</code></td><td><pre>Specify the URL of a secondary cafe. Must return cafe info, e.g., via a Gateway: https://my-gateway.yolo.com/cafe, or a cafe API: https://my-cafe.yolo.com</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;account-seed&gt;</code></td><td><pre>The account seed to use, if you do not have one, refer to: textile wallet --help</pre></td></tr>
</table>

## textile invite
<pre>Invites allow other users to join threads.

There are two types of invites, direct account-to-account and external:

- Account-to-account invites are encrypted with the invitee's account address (public key).
- External invites are encrypted with a single-use key and are useful for onboarding new users.</pre>

### textile invite create [&lt;flags&gt;] &lt;thread&gt;
<pre>Creates a direct account-to-account or external invite to a thread</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-a, --address=ADDRESS</code></td><td><pre>Account Address, omit to create an external invite</pre></td></tr>
	<tr><td><code>--wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapsed (max 30s)</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

### textile invite list
<pre>Lists all pending thread invites</pre>

### textile invite accept [&lt;flags&gt;] &lt;id&gt;
<pre>Accepts a direct account-to-account or external invite to a thread</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --key=KEY</code></td><td><pre>Key for an external invite</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;id&gt;</code></td><td><pre>Invite ID that you have received</pre></td></tr>
</table>

### textile invite ignore &lt;id&gt;
<pre>Ignores a direct account-to-account invite to a thread</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;id&gt;</code></td><td><pre>Invite ID that you wish to ignore</pre></td></tr>
</table>

## textile ipfs
<pre>Provides access to some IPFS commands</pre>

### textile ipfs peer
<pre>Shows the local node's IPFS peer ID</pre>

### textile ipfs swarm
<pre>Provides access to a limited set of IPFS swarm commands</pre>

#### textile ipfs swarm connect [&lt;address&gt;]
<pre>Opens a new direct connection to a peer address</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;address&gt;]</code></td><td><pre>An IPFS multiaddr, such as: /ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ</pre></td></tr>
</table>

#### textile ipfs swarm peers [&lt;flags&gt;]
<pre>Lists the set of peers this node is connected to</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-v, --verbose</code></td><td><pre>Display all extra information</pre></td></tr>
	<tr><td><code>-s, --streams</code></td><td><pre>Also list information about open streams for search peer</pre></td></tr>
	<tr><td><code>-l, --latency</code></td><td><pre>Also list information about the latency to each peer</pre></td></tr>
	<tr><td><code>-d, --direction</code></td><td><pre>Also list information about the direction of connection</pre></td></tr>
</table>

### textile ipfs cat [&lt;flags&gt;] &lt;hash&gt;
<pre>Displays the data behind an IPFS CID (hash)</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --key=KEY</code></td><td><pre>Encryption key</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;hash&gt;</code></td><td><pre>IPFS CID</pre></td></tr>
</table>

## textile like
<pre>Likes are added as blocks in a thread, which target another block</pre>

### textile like add &lt;block&gt;
<pre>Attach a like to a block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID to like, usually a file's block</pre></td></tr>
</table>

### textile like list &lt;block&gt;
<pre>Get likes that are attached to a block</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID to like, usually a file's block</pre></td></tr>
</table>

### textile like get &lt;like-block&gt;
<pre>Get a like by its own Block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;like-block&gt;</code></td><td><pre>Like Block ID</pre></td></tr>
</table>

### textile like ignore &lt;like-block&gt;
<pre>Ignore a like by its own Block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;like-block&gt;</code></td><td><pre>Like Block ID</pre></td></tr>
</table>

## textile log [&lt;flags&gt;]
<pre>List or change the verbosity of one or all subsystems log output. Textile logs piggyback on the IPFS event logs.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-s, --subsystem=SUBSYSTEM</code></td><td><pre>The subsystem logging identifier, omit for all</pre></td></tr>
	<tr><td><code>-l, --level=LEVEL</code></td><td><pre>One of: debug, info, warning, error, critical. Omit to get current level.</pre></td></tr>
	<tr><td><code>-t, --textile-only</code></td><td><pre>Whether to list/change only Textile subsystems, or all available subsystems</pre></td></tr>
</table>

## textile message
<pre>Manage Textile Messages</pre>

### textile message add &lt;thread&gt; &lt;body&gt;
<pre>Adds a message to a thread</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
	<tr><td><code>&lt;body&gt;</code></td><td><pre>The message to add the thread</pre></td></tr>
</table>

### textile message list [&lt;flags&gt;] [&lt;thread&gt;]
<pre>Paginates thread messages</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start the listing from</pre></td></tr>
	<tr><td><code>-l, --limit=10</code></td><td><pre>List page size</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit to paginate all messages</pre></td></tr>
</table>

### textile message get [&lt;message-block&gt;]
<pre>Gets a message by its own Block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;message-block&gt;]</code></td><td><pre>Message Block ID</pre></td></tr>
</table>

### textile message ignore [&lt;message-block&gt;]
<pre>Ignores a message by its own Block ID</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;message-block&gt;]</code></td><td><pre>Message Block ID</pre></td></tr>
</table>

## textile migrate [&lt;flags&gt;]
<pre>Migrate the node repository and exit</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-r, --repo=REPO</code></td><td><pre>Specify a custom repository path</pre></td></tr>
	<tr><td><code>-p, --pin=PIN</code></td><td><pre>Specify the pin for datastore encryption, omit if no pin was used during init</pre></td></tr>
</table>

## textile notification
<pre>Manage notifications that have been generated by thread and account activity</pre>

### textile notification list
<pre>Lists all notifications</pre>

### textile notification read &lt;id&gt;
<pre>Marks a notification as read</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;id&gt;</code></td><td><pre>Notification ID, set to [all] to mark all notifications as read</pre></td></tr>
</table>

## textile ping &lt;address&gt;
<pre>Pings another peer on the network, returning [online] or [offline]</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;address&gt;</code></td><td><pre>The address of the other peer on the network</pre></td></tr>
</table>

## textile profile
<pre>Manage the profile for your Textile Account, each peer will have its own profile</pre>

### textile profile get
<pre>Gets the local peer profile</pre>

### textile profile set [&lt;flags&gt;]
<pre>Sets the profile name and avatar of the peer</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --name=NAME</code></td><td><pre>Set the peer's display name</pre></td></tr>
	<tr><td><code>-a, --avatar=AVATAR</code></td><td><pre>Set the peer's avatar from an image path (JPEG, PNG, or GIF)</pre></td></tr>
</table>

## textile observe [&lt;flags&gt;] [&lt;thread&gt;]
<pre>Observe updates in a thread or all threads. An update is generated when a new block is added to a thread.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --type=TYPE ...</code></td><td><pre>Only be alerted to specific type of updates, possible values: merge, ignore, flag, join, announce, leave, text, files comment, like. Can be used multiple times, e.g., --type files --type comment</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

## textile summary
<pre>Get a summary of the local node's data</pre>

## textile thread
<pre>Threads are distributed sets of encrypted files, often shared between peers, governed by schemas.
Use this command to add, list, get, and remove threads. See below for additional commands.

Control over thread access and sharing is handled by a combination of the --type and --sharing flags.
An immutable member address "whitelist" gives the initiator fine-grained control.
The table below outlines access patterns for the thread initiator and the whitelist members.
An empty whitelist is taken to be "everyone", which is the default.

Thread type controls read (R), annotate (A), and write (W) access:

private   --&gt; initiator: RAW, whitelist:
read_only --&gt; initiator: RAW, whitelist: R
public    --&gt; initiator: RAW, whitelist: RA
open      --&gt; initiator: RAW, whitelist: RAW

Thread sharing style controls if (Y/N) a thread can be shared:

not_shared  --&gt; initiator: N, whitelist: N
invite_only --&gt; initiator: Y, whitelist: N
shared      --&gt; initiator: Y, whitelist: Y</pre>

### textile thread add [&lt;flags&gt;] &lt;name&gt;
<pre>Adds and joins a new thread</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --key=KEY</code></td><td><pre>A locally unique key used by an app to identify this thread on recovery</pre></td></tr>
	<tr><td><code>-t, --type="private"</code></td><td><pre>Set the thread type to one of: private, read_only, public, open</pre></td></tr>
	<tr><td><code>-s, --sharing="not_shared"</code></td><td><pre>Set the thread sharing style to one of: not_shared, invite_only, shared</pre></td></tr>
	<tr><td><code>-w, --whitelist=WHITELIST ...</code></td><td><pre>A contact address. When supplied, the thread will not allow additional peers, useful for 1-1 chat/file sharing. Can be used multiple times to include multiple contacts</pre></td></tr>
	<tr><td><code>--schema=SCHEMA</code></td><td><pre>Thread schema ID. Supersedes schema filename</pre></td></tr>
	<tr><td><code>--schema-file=SCHEMA-FILE</code></td><td><pre>Thread schema filename, supersedes the built-in schema flags</pre></td></tr>
	<tr><td><code>--blob</code></td><td><pre>Use the built-in blob schema for generic data</pre></td></tr>
	<tr><td><code>--camera-roll</code></td><td><pre>Use the built-in camera roll schema</pre></td></tr>
	<tr><td><code>--media</code></td><td><pre>Use the built-in media schema</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;name&gt;</code></td><td><pre>The name to use for the new thread</pre></td></tr>
</table>

### textile thread list
<pre>Lists info on all threads</pre>

### textile thread get &lt;thread&gt;
<pre>Gets and displays info about a thread</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

### textile thread peer &lt;thread&gt;
<pre>Lists all peers in a thread</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

### textile thread rename &lt;thread&gt; &lt;name&gt;
<pre>Renames a thread. Only the initiator of a thread can rename it.</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
	<tr><td><code>&lt;name&gt;</code></td><td><pre>The name to rename the thread to</pre></td></tr>
</table>

### textile thread abandon &lt;thread&gt;
<pre>Abandon a thread. If no one is else remains participating, the thread dissipates.</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

### textile thread snapshot
<pre>Manage thread snapshots</pre>

#### textile thread snapshot create
<pre>Snapshots all threads and pushes to registered cafes</pre>

#### textile thread snapshot search [&lt;flags&gt;]
<pre>Searches the network for thread snapshots</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-w, --wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapse (max 30s)</pre></td></tr>
</table>

#### textile thread snapshot apply [&lt;flags&gt;] &lt;snapshot&gt;
<pre>Applies a single thread snapshot</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-w, --wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapse (max 30s)</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;snapshot&gt;</code></td><td><pre>The ID of the snapshot to apply</pre></td></tr>
</table>

### textile thread files [&lt;flags&gt;] [&lt;thread&gt;]
<pre>Paginates the files of a thread, or of all threads</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

### textile thread blocks [&lt;flags&gt;] &lt;thread&gt;
<pre>Paginates blocks in a thread</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><td><code>-d, --dots</code></td><td><pre>Return GraphViz dots instead of JSON</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

## textile token
<pre>Tokens allow other peers to register with a cafe peer</pre>

### textile token add [&lt;flags&gt;]
<pre>Generates an access token (44 random bytes) and saves a bcrypt hashed version for future lookup.
The response contains a base58 encoded version of the random bytes token.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --no-store</code></td><td><pre>If used instead of token, the token is generated but not stored in the local cafe database</pre></td></tr>
	<tr><td><code>-t, --token=TOKEN</code></td><td><pre>If used instead of no-store, use this existing token rather than creating a new one</pre></td></tr>
</table>

### textile token list
<pre>List info about all stored cafe tokens</pre>

### textile token validate &lt;token&gt;
<pre>Check validity of existing cafe access token</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;token&gt;</code></td><td><pre>The token to validate</pre></td></tr>
</table>

### textile token delete &lt;token&gt;
<pre>Removes an existing cafe token</pre>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;token&gt;</code></td><td><pre>The token to delete</pre></td></tr>
</table>

## textile version [&lt;flags&gt;]
<pre>Print the current version and exit</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-g, --git</code></td><td><pre>Show full git version summary</pre></td></tr>
</table>

## textile wallet
<pre>Create a new wallet, or list its available accounts</pre>

### textile wallet create [&lt;flags&gt;] [&lt;passphrase&gt;]
<pre>Generate a hierarchical deterministic wallet and output the first child account. A wallet is a seed that deterministically generates child accounts. Child accounts are used to interact with textile. Formula: Autogenerated Mnemonic + Optionally Specified Passphrase = Generated Seed. The seed, mnemonic, and passphrase must be kept top secret. The mnemonic and passphrase must be remembered by you.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-w, --words=12</code></td><td><pre>How many words to use for the autogenerated mnemonic? 12, 15, 18, 21, 24</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;passphrase&gt;]</code></td><td><pre>If provided, the resultant wallet seed will be salted with this passphrase, resulting in a different (and more unique) wallet seed than if just the mnemonic was used.</pre></td></tr>
</table>

### textile wallet accounts [&lt;flags&gt;] &lt;mnemonic&gt; [&lt;passphrase&gt;]
<pre>List the available accounts (within a specific range) within the wallet's deterministic bounds. Formula: Account = Account Index + Parent Private Key from Parent Seed. Parent Seed = Wallet Mnemonic + Passphrase.</pre>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-d, --depth=1</code></td><td><pre>Number of accounts to show</pre></td></tr>
	<tr><td><code>-o, --offset=0</code></td><td><pre>Account depth to start from</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;mnemonic&gt;</code></td><td><pre>The autogenerated mnemonic of the wallet</pre></td></tr>
	<tr><td><code>[&lt;passphrase&gt;]</code></td><td><pre>If the wallet was generated with a passphrase, specify it here to ensure the accounts you are listing are for the same wallet</pre></td></tr>
</table>
