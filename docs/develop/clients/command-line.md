The command-line client ships alongside the daemon. Usage information for all commands, including sub-commands, is available via the --help flag.

<style>pre { background: inherit !important; word-wrap: inherit !important;  white-space: pre-wrap !important; }</style>

<h1>textile [&lt;flags&gt;]</h1>
<p><pre>Textile is a set of tools and trust-less infrastructure for building censorship resistant and privacy preserving applications</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--help</code></td><td><pre>Show context-sensitive help (also try --help-long and --help-man).</pre></td></tr>
	<tr><td><code>--help-long</code></td><td><pre>Generate long help.</pre></td></tr>
	<tr><td><code>--help-man</code></td><td><pre>Generate a man page.</pre></td></tr>
	<tr><td><code>--completion-bash</code></td><td><pre>Output possible completions for the given args.</pre></td></tr>
	<tr><td><code>--completion-script-bash</code></td><td><pre>Generate completion script for bash.</pre></td></tr>
	<tr><td><code>--completion-script-zsh</code></td><td><pre>Generate completion script for ZSH.</pre></td></tr>
	<tr><td><code>--api=&#34;http://127.0.0.1:40600&#34;</code></td><td><pre>API Address to use</pre></td></tr>
	<tr><td><code>--api-version=&#34;v0&#34;</code></td><td><pre>API version to use</pre></td></tr>
	<tr><td><code>--debug</code></td><td><pre>Set the logging level to debug</pre></td></tr>
</table>

<h2>textile help [&lt;command&gt;]</h2>
<p><pre>Show help.</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;command&gt;]</code></td><td><pre>Show help on command.</pre></td></tr>
</table>

<h2>textile account</h2>
<p><pre>Manage the account that the initialised textile repository is associated with</pre></p>

<h3>textile account get</h3>
<p><pre>Shows the local peer&#39;s account info as a contact</pre></p>

<h3>textile account seed</h3>
<p><pre>Shows the local peer&#39;s account seed, treat this as top secret</pre></p>

<h3>textile account address</h3>
<p><pre>Shows the local peer&#39;s account address</pre></p>

<h3>textile account sync [&lt;flags&gt;]</h3>
<p><pre>Syncs the local account peer with other peers found on the network</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--wait=2</code></td><td><pre>Stops searching after &#39;wait&#39; seconds have elapsed (max 30s)</pre></td></tr>
</table>

<h2>textile block</h2>
<p><pre>Threads are composed of an append-only log of blocks, use these commands to manage them</pre></p>

<h3>textile block list [&lt;flags&gt;] &lt;thread&gt;</h3>
<p><pre>Paginates blocks in a thread</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><td><code>-d, --dots</code></td><td><pre>Return GraphViz dots instead of JSON</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

<h3>textile block meta &lt;block&gt;</h3>
<p><pre>Get the metadata for a block</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID</pre></td></tr>
</table>

<h3>textile block ignore &lt;block&gt;</h3>
<p><pre>Remove a block by marking it to be ignored</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID</pre></td></tr>
</table>

<h3>textile block files [&lt;flags&gt;] &lt;block&gt;</h3>
<p><pre>Get the files, or a specific file, of a Files Block</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--index=0</code></td><td><pre>If provided, the index of a specific file to retrieve</pre></td></tr>
	<tr><td><code>--path=PATH</code></td><td><pre>If provided, the path of a specific file to retrieve</pre></td></tr>
	<tr><td><code>--content</code></td><td><pre>If provided alongside a path, the content of the specific file is retrieved</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Files Block ID</pre></td></tr>
</table>

<h2>textile cafe</h2>
<p><pre>Commands to manage cafes</pre></p>

<h3>textile cafe add --token=TOKEN &lt;peer&gt;</h3>
<p><pre>Registers with a cafe and saves an expiring service session token.
An access token is required to register, and should be obtained separately from the target cafe.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-t, --token=TOKEN</code></td><td><pre>An access token supplied by the cafe</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;peer&gt;</code></td><td><pre>The host cafe&#39;s IPFS peer ID</pre></td></tr>
</table>

<h3>textile cafe list</h3>
<p><pre>List info about all active cafe sessions</pre></p>

<h3>textile cafe get &lt;cafe&gt;</h3>
<p><pre>Gets and displays info about a cafe session</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;cafe&gt;</code></td><td><pre>Cafe ID</pre></td></tr>
</table>

<h3>textile cafe delete &lt;cafe&gt;</h3>
<p><pre>Deregisters a cafe (content will expire based on the cafe&#39;s service rules)</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;cafe&gt;</code></td><td><pre>Cafe ID</pre></td></tr>
</table>

<h3>textile cafe messages</h3>
<p><pre>Check for messages at all cafes. New messages are downloaded and processed opportunistically.</pre></p>

<h2>textile chat &lt;thread&gt;</h2>
<p><pre>Starts an interactive chat session in a thread</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

<h2>textile comment</h2>
<p><pre>Comments are added as blocks in a thread, which target another block, usually a file(s)</pre></p>

<h3>textile comment add &lt;block&gt; &lt;body&gt;</h3>
<p><pre>Attach a comment to a block</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>The Block ID to attach the comment to</pre></td></tr>
	<tr><td><code>&lt;body&gt;</code></td><td><pre>Text to use as the comment</pre></td></tr>
</table>

<h3>textile comment list &lt;block&gt;</h3>
<p><pre>Get the comments that are attached to a block</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>The Block ID which the comments attached to</pre></td></tr>
</table>

<h3>textile comment get &lt;comment-block&gt;</h3>
<p><pre>Get a comment by its own Block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;comment-block&gt;</code></td><td><pre>Comment Block ID</pre></td></tr>
</table>

<h3>textile comment ignore &lt;comment-block&gt;</h3>
<p><pre>Ignore a comment by its own Block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;comment-block&gt;</code></td><td><pre>Comment Block ID</pre></td></tr>
</table>

<h2>textile config [&lt;name&gt; [&lt;value&gt;]]</h2>
<p><pre>Get or set configuration variables</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;name&gt;]</code></td><td><pre>If provided, will restrict the operation to this specific configuration variable, e.g. &#39;Addresses.API&#39;</pre></td></tr>
	<tr><td><code>[&lt;value&gt;]</code></td><td><pre>If provided, will set the specific configuration variable to this JSON escaped value, e.g. &#39;&#34;127.0.0.1:40600&#34;&#39;</pre></td></tr>
</table>

<h2>textile contact</h2>
<p><pre>Manage local contacts and find other contacts on the network</pre></p>

<h3>textile contact add [&lt;flags&gt;]</h3>
<p><pre>Adds a contact by display name or account address to known contacts</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --name=NAME</code></td><td><pre>Add by display name</pre></td></tr>
	<tr><td><code>-a, --address=ADDRESS</code></td><td><pre>Add by account address</pre></td></tr>
	<tr><td><code>--wait=WAIT</code></td><td><pre>Stops searching after [wait] seconds have elapsed</pre></td></tr>
</table>

<h3>textile contact list</h3>
<p><pre>List known contacts</pre></p>

<h3>textile contact get &lt;address&gt;</h3>
<p><pre>Gets a known contact</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;address&gt;</code></td><td><pre>Account Address</pre></td></tr>
</table>

<h3>textile contact delete &lt;address&gt;</h3>
<p><pre>Deletes a known contact</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;address&gt;</code></td><td><pre>Account Address</pre></td></tr>
</table>

<h3>textile contact search [&lt;flags&gt;]</h3>
<p><pre>Searches locally and on the network for contacts</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --name=NAME</code></td><td><pre>Search by display name</pre></td></tr>
	<tr><td><code>-a, --address=ADDRESS</code></td><td><pre>Search by account address</pre></td></tr>
	<tr><td><code>--only-local</code></td><td><pre>Only search local contacts</pre></td></tr>
	<tr><td><code>--only-remote</code></td><td><pre>Only search remote contacts</pre></td></tr>
	<tr><td><code>--limit=5</code></td><td><pre>Stops searching after [limit] results are found</pre></td></tr>
	<tr><td><code>--wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapsed (max 30s)</pre></td></tr>
</table>

<h2>textile daemon [&lt;flags&gt;]</h2>
<p><pre>Start a node daemon session</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-r, --repo=REPO</code></td><td><pre>Specify a custom repository path</pre></td></tr>
	<tr><td><code>-p, --pin=PIN</code></td><td><pre>Specify the pin code for datastore encryption (omit no pin code was used during init)</pre></td></tr>
	<tr><td><code>-s, --serve-docs</code></td><td><pre>Whether to serve the local REST API docs</pre></td></tr>
</table>

<h2>textile docs</h2>
<p><pre>Prints the CLI help as HTML</pre></p>

<h2>textile feed [&lt;flags&gt;] [&lt;thread&gt;]</h2>
<p><pre>Paginates post (join|leave|files|message) and annotation (comment|like) block types as a consumable feed.

The --mode option dictates how the feed is displayed:

-  &#34;chrono&#34;: All feed block types are shown. Annotations always nest their target post, i.e., the post a comment is about.
-  &#34;annotated&#34;: Annotations are nested under post targets, but are not shown in the top-level feed.
-  &#34;stacks&#34;: Related blocks are chronologically grouped into &#34;stacks&#34;. A new stack is started if an unrelated block
   breaks continuity. This mode is used by Textile Photos.

Stacks may include:

- The initial post with some nested annotations. Newer annotations may have already been listed.
- One or more annotations about a post. The newest annotation assumes the &#34;top&#34; position in the stack. Additional
 annotations are nested under the target. Newer annotations may have already been listed in the case as well.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listening from</pre></td></tr>
	<tr><td><code>-l, --limit=3</code></td><td><pre>List page size</pre></td></tr>
	<tr><td><code>-m, --mode=&#34;chrono&#34;</code></td><td><pre>Feed mode, one of: chrono, annotated, stacks</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

<h2>textile file</h2>
<p><pre>Manage Textile Files Blocks</pre></p>

<h3>textile file list</h3>
<p><pre>Get all the files, or just the files for a specific thread or block</pre></p>

<h4>textile file list thread [&lt;flags&gt;] [&lt;thread&gt;]</h4>
<p><pre>Paginates the files of a thread, or of all threads</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

<h4>textile file list block [&lt;flags&gt;] &lt;block&gt;</h4>
<p><pre>Get the files, or a specific file, of a Files Block</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--index=0</code></td><td><pre>If provided, the index of a specific file to retrieve</pre></td></tr>
	<tr><td><code>--path=PATH</code></td><td><pre>If provided, the path of a specific file to retrieve</pre></td></tr>
	<tr><td><code>--content</code></td><td><pre>If provided alongside a path, the content of the specific file is retrieved</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Files Block ID</pre></td></tr>
</table>

<h3>textile file keys &lt;target-block&gt;</h3>
<p><pre>Shows file keys under the given target</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;target-block&gt;</code></td><td><pre>Files Block Target ID</pre></td></tr>
</table>

<h3>textile file add [&lt;flags&gt;] &lt;thread&gt; [&lt;path&gt;]</h3>
<p><pre>Adds a file, directory, or hash to a thread. Files not supported by the thread schema are ignored</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-c, --caption=CAPTION</code></td><td><pre>File(s) caption</pre></td></tr>
	<tr><td><code>-g, --group</code></td><td><pre>If provided, group a directory&#39;s files together into a single object, includes nested directories</pre></td></tr>
	<tr><td><code>-v, --verbose</code></td><td><pre>Prints files as they are milled</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
	<tr><td><code>[&lt;path&gt;]</code></td><td><pre>The path to the file or directory to add, can also be an existing hash. If omitted, you must provide a stdin blob input.</pre></td></tr>
</table>

<h3>textile file ignore &lt;files-block&gt;</h3>
<p><pre>Ignores a thread file by its own block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;files-block&gt;</code></td><td><pre>Files Block ID</pre></td></tr>
</table>

<h3>textile file get [&lt;flags&gt;] &lt;hash&gt;</h3>
<p><pre>Get the metadata or content of a specific file</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>--content</code></td><td><pre>If provided, the decrypted content of the file is retrieved</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;hash&gt;</code></td><td><pre>File Hash</pre></td></tr>
</table>

<h2>textile init [&lt;flags&gt;] &lt;account-seed&gt;</h2>
<p><pre>Configure textile to use the account by creating a local repository to house its data</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-p, --pin=PIN</code></td><td><pre>Specify a pin for datastore encryption</pre></td></tr>
	<tr><td><code>-r, --repo=REPO</code></td><td><pre>Specify a custom repository path</pre></td></tr>
	<tr><td><code>--server</code></td><td><pre>Apply IPFS server profile</pre></td></tr>
	<tr><td><code>--swarm-ports=SWARM-PORTS</code></td><td><pre>Set the swarm ports (TCP,WS). A random TCP port is chosen by default</pre></td></tr>
	<tr><td><code>--log-files</code></td><td><pre>If true, writes logs to rolling files, if false, writes logs to stdout</pre></td></tr>
	<tr><td><code>--api-bind-addr=&#34;127.0.0.1:40600&#34;</code></td><td><pre>Set the local API address</pre></td></tr>
	<tr><td><code>--cafe-bind-addr=&#34;0.0.0.0:40601&#34;</code></td><td><pre>Set the cafe REST API address</pre></td></tr>
	<tr><td><code>--gateway-bind-addr=&#34;127.0.0.1:5050&#34;</code></td><td><pre>Set the IPFS gateway address</pre></td></tr>
	<tr><td><code>--profile-bind-addr=&#34;127.0.0.1:6060&#34;</code></td><td><pre>Set the profiling address</pre></td></tr>
	<tr><td><code>--cafe-open</code></td><td><pre>Open the p2p cafe service for other peers</pre></td></tr>
	<tr><td><code>--cafe-url=CAFE-URL</code></td><td><pre>Specify a custom URL of this cafe, e.g., https://mycafe.com</pre></td></tr>
	<tr><td><code>--cafe-neighbor-url=CAFE-NEIGHBOR-URL</code></td><td><pre>Specify the URL of a secondary cafe. Must return cafe info, e.g., via a Gateway: https://my-gateway.yolo.com/cafe, or a cafe API: https://my-cafe.yolo.com</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;account-seed&gt;</code></td><td><pre>The account seed to use, if you do not have one, refer to: textile wallet --help</pre></td></tr>
</table>

<h2>textile invite</h2>
<p><pre>Invites allow other users to join threads.

There are two types of invites, direct account-to-account and external:

- Account-to-account invites are encrypted with the invitee&#39;s account address (public key).
- External invites are encrypted with a single-use key and are useful for onboarding new users.</pre></p>

<h3>textile invite create [&lt;flags&gt;] &lt;thread&gt;</h3>
<p><pre>Creates a direct account-to-account or external invite to a thread</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-a, --address=ADDRESS</code></td><td><pre>Account Address, omit to create an external invite</pre></td></tr>
	<tr><td><code>--wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapsed (max 30s)</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

<h3>textile invite list</h3>
<p><pre>Lists all pending thread invites</pre></p>

<h3>textile invite accept [&lt;flags&gt;] &lt;id&gt;</h3>
<p><pre>Accepts a direct account-to-account or external invite to a thread</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --key=KEY</code></td><td><pre>Key for an external invite</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;id&gt;</code></td><td><pre>Invite ID that you have received</pre></td></tr>
</table>

<h3>textile invite ignore &lt;id&gt;</h3>
<p><pre>Ignores a direct account-to-account invite to a thread</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;id&gt;</code></td><td><pre>Invite ID that you wish to ignore</pre></td></tr>
</table>

<h2>textile ipfs</h2>
<p><pre>Provides access to some IPFS commands</pre></p>

<h3>textile ipfs peer</h3>
<p><pre>Shows the local node&#39;s IPFS peer ID</pre></p>

<h3>textile ipfs swarm</h3>
<p><pre>Provides access to a limited set of IPFS swarm commands</pre></p>

<h4>textile ipfs swarm connect [&lt;address&gt;]</h4>
<p><pre>Opens a new direct connection to a peer address</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;address&gt;]</code></td><td><pre>An IPFS multiaddr, such as: /ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ</pre></td></tr>
</table>

<h4>textile ipfs swarm peers [&lt;flags&gt;]</h4>
<p><pre>Lists the set of peers this node is connected to</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-v, --verbose</code></td><td><pre>Display all extra information</pre></td></tr>
	<tr><td><code>-s, --streams</code></td><td><pre>Also list information about open streams for search peer</pre></td></tr>
	<tr><td><code>-l, --latency</code></td><td><pre>Also list information about the latency to each peer</pre></td></tr>
	<tr><td><code>-d, --direction</code></td><td><pre>Also list information about the direction of connection</pre></td></tr>
</table>

<h3>textile ipfs cat [&lt;flags&gt;] &lt;hash&gt;</h3>
<p><pre>Displays the data behind an IPFS CID (hash)</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --key=KEY</code></td><td><pre>Encryption key</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;hash&gt;</code></td><td><pre>IPFS CID</pre></td></tr>
</table>

<h2>textile like</h2>
<p><pre>Likes are added as blocks in a thread, which target another block</pre></p>

<h3>textile like add &lt;block&gt;</h3>
<p><pre>Attach a like to a block</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID to like, usually a file&#39;s block</pre></td></tr>
</table>

<h3>textile like list &lt;block&gt;</h3>
<p><pre>Get likes that are attached to a block</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;block&gt;</code></td><td><pre>Block ID to like, usually a file&#39;s block</pre></td></tr>
</table>

<h3>textile like get &lt;like-block&gt;</h3>
<p><pre>Get a like by its own Block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;like-block&gt;</code></td><td><pre>Like Block ID</pre></td></tr>
</table>

<h3>textile like ignore &lt;like-block&gt;</h3>
<p><pre>Ignore a like by its own Block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;like-block&gt;</code></td><td><pre>Like Block ID</pre></td></tr>
</table>

<h2>textile log [&lt;flags&gt;]</h2>
<p><pre>List or change the verbosity of one or all subsystems log output. Textile logs piggyback on the IPFS event logs.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-s, --subsystem=SUBSYSTEM</code></td><td><pre>The subsystem logging identifier, omit for all</pre></td></tr>
	<tr><td><code>-l, --level=LEVEL</code></td><td><pre>One of: debug, info, warning, error, critical. Omit to get current level.</pre></td></tr>
	<tr><td><code>-t, --textile-only</code></td><td><pre>Whether to list/change only Textile subsystems, or all available subsystems</pre></td></tr>
</table>

<h2>textile message</h2>
<p><pre>Manage Textile Messages</pre></p>

<h3>textile message add &lt;thread&gt; &lt;body&gt;</h3>
<p><pre>Adds a message to a thread</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
	<tr><td><code>&lt;body&gt;</code></td><td><pre>The message to add the thread</pre></td></tr>
</table>

<h3>textile message list [&lt;flags&gt;] [&lt;thread&gt;]</h3>
<p><pre>Paginates thread messages</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start the listing from</pre></td></tr>
	<tr><td><code>-l, --limit=10</code></td><td><pre>List page size</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit to paginate all messages</pre></td></tr>
</table>

<h3>textile message get [&lt;message-block&gt;]</h3>
<p><pre>Gets a message by its own Block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;message-block&gt;]</code></td><td><pre>Message Block ID</pre></td></tr>
</table>

<h3>textile message ignore [&lt;message-block&gt;]</h3>
<p><pre>Ignores a message by its own Block ID</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;message-block&gt;]</code></td><td><pre>Message Block ID</pre></td></tr>
</table>

<h2>textile migrate [&lt;flags&gt;]</h2>
<p><pre>Migrate the node repository and exit</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-r, --repo=REPO</code></td><td><pre>Specify a custom repository path</pre></td></tr>
	<tr><td><code>-p, --pin=PIN</code></td><td><pre>Specify the pin for datastore encryption, omit if no pin was used during init</pre></td></tr>
</table>

<h2>textile notification</h2>
<p><pre>Manage notifications that have been generated by thread and account activity</pre></p>

<h3>textile notification list</h3>
<p><pre>Lists all notifications</pre></p>

<h3>textile notification read &lt;id&gt;</h3>
<p><pre>Marks a notification as read</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;id&gt;</code></td><td><pre>Notification ID, set to [all] to mark all notifications as read</pre></td></tr>
</table>

<h2>textile ping &lt;address&gt;</h2>
<p><pre>Pings another peer on the network, returning [online] or [offline]</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;address&gt;</code></td><td><pre>The address of the other peer on the network</pre></td></tr>
</table>

<h2>textile profile</h2>
<p><pre>Manage the profile for your Textile Account, each peer will have its own profile</pre></p>

<h3>textile profile get</h3>
<p><pre>Gets the local peer profile</pre></p>

<h3>textile profile set [&lt;flags&gt;]</h3>
<p><pre>Sets the profile name and avatar of the peer</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --name=NAME</code></td><td><pre>Set the peer&#39;s display name</pre></td></tr>
	<tr><td><code>-a, --avatar=AVATAR</code></td><td><pre>Set the peer&#39;s avatar from an image path (JPEG, PNG, or GIF)</pre></td></tr>
</table>

<h4>textile profile set name &lt;value&gt;</h4>
<p><pre>Sets the profile name of the peer</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;value&gt;</code></td><td><pre>The value to set the profile name to</pre></td></tr>
</table>

<h4>textile profile set avatar &lt;value&gt;</h4>
<p><pre>Sets the profile avatar of the peer</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;value&gt;</code></td><td><pre>The value (as an image path: JPEG, PNG, GIF) to set the profile avatar to</pre></td></tr>
</table>

<h2>textile observe [&lt;flags&gt;] [&lt;thread&gt;]</h2>
<p><pre>Observe updates in a thread or all threads. An update is generated when a new block is added to a thread.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --type=TYPE ...</code></td><td><pre>Only be alerted to specific type of updates, possible values: merge, ignore, flag, join, announce, leave, text, files comment, like. Can be used multiple times, e.g., --type files --type comment</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

<h2>textile summary</h2>
<p><pre>Get a summary of the local node&#39;s data</pre></p>

<h2>textile thread</h2>
<p><pre>Threads are distributed sets of encrypted files, often shared between peers, governed by schemas.
Use this command to add, list, get, and remove threads. See below for additional commands.

Control over thread access and sharing is handled by a combination of the --type and --sharing flags.
An immutable member address &#34;whitelist&#34; gives the initiator fine-grained control.
The table below outlines access patterns for the thread initiator and the whitelist members.
An empty whitelist is taken to be &#34;everyone&#34;, which is the default.

Thread type controls read (R), annotate (A), and write (W) access:

private   --&gt; initiator: RAW, whitelist:
read_only --&gt; initiator: RAW, whitelist: R
public    --&gt; initiator: RAW, whitelist: RA
open      --&gt; initiator: RAW, whitelist: RAW

Thread sharing style controls if (Y/N) a thread can be shared:

not_shared  --&gt; initiator: N, whitelist: N
invite_only --&gt; initiator: Y, whitelist: N
shared      --&gt; initiator: Y, whitelist: Y</pre></p>

<h3>textile thread add [&lt;flags&gt;] &lt;name&gt;</h3>
<p><pre>Adds and joins a new thread</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-k, --key=KEY</code></td><td><pre>A locally unique key used by an app to identify this thread on recovery</pre></td></tr>
	<tr><td><code>-t, --type=&#34;private&#34;</code></td><td><pre>Set the thread type to one of: private, read_only, public, open</pre></td></tr>
	<tr><td><code>-s, --sharing=&#34;not_shared&#34;</code></td><td><pre>Set the thread sharing style to one of: not_shared, invite_only, shared</pre></td></tr>
	<tr><td><code>-w, --whitelist=WHITELIST ...</code></td><td><pre>A contact address. When supplied, the thread will not allow additional peers, useful for 1-1 chat/file sharing. Can be used multiple times to include multiple contacts</pre></td></tr>
	<tr><td><code>--schema=SCHEMA</code></td><td><pre>Thread schema ID. Supersedes schema filename</pre></td></tr>
	<tr><td><code>--schema-file=SCHEMA-FILE</code></td><td><pre>Thread schema filename, supersedes the built-in schema flags</pre></td></tr>
	<tr><td><code>--blob</code></td><td><pre>Use the built-in blob schema for generic data</pre></td></tr>
	<tr><td><code>--camera-roll</code></td><td><pre>Use the built-in camera roll schema</pre></td></tr>
	<tr><td><code>--media</code></td><td><pre>Use the built-in media schema</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;name&gt;</code></td><td><pre>The name to use for the new thread</pre></td></tr>
</table>

<h3>textile thread list</h3>
<p><pre>Lists info on all threads</pre></p>

<h3>textile thread get &lt;thread&gt;</h3>
<p><pre>Gets and displays info about a thread</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

<h3>textile thread peer &lt;thread&gt;</h3>
<p><pre>Lists all peers in a thread</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

<h3>textile thread rename &lt;thread&gt; &lt;name&gt;</h3>
<p><pre>Renames a thread. Only the initiator of a thread can rename it.</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
	<tr><td><code>&lt;name&gt;</code></td><td><pre>The name to rename the thread to</pre></td></tr>
</table>

<h3>textile thread abandon &lt;thread&gt;</h3>
<p><pre>Abandon a thread. If no one is else remains participating, the thread dissipates.</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;thread&gt;</code></td><td><pre>Thread ID</pre></td></tr>
</table>

<h3>textile thread snapshot</h3>
<p><pre>Manage thread snapshots</pre></p>

<h4>textile thread snapshot create</h4>
<p><pre>Snapshots all threads and pushes to registered cafes</pre></p>

<h4>textile thread snapshot search [&lt;flags&gt;]</h4>
<p><pre>Searches the network for thread snapshots</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-w, --wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapse (max 30s)</pre></td></tr>
</table>

<h4>textile thread snapshot apply [&lt;flags&gt;] &lt;snapshot&gt;</h4>
<p><pre>Applies a single thread snapshot</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-w, --wait=2</code></td><td><pre>Stops searching after [wait] seconds have elapse (max 30s)</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;snapshot&gt;</code></td><td><pre>The ID of the snapshot to apply</pre></td></tr>
</table>

<h3>textile thread files [&lt;flags&gt;] [&lt;thread&gt;]</h3>
<p><pre>Paginates the files of a thread, or of all threads</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-o, --offset=OFFSET</code></td><td><pre>Offset ID to start listing from</pre></td></tr>
	<tr><td><code>-l, --limit=5</code></td><td><pre>List page size</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;thread&gt;]</code></td><td><pre>Thread ID, omit for all</pre></td></tr>
</table>

<h2>textile token</h2>
<p><pre>Tokens allow other peers to register with a cafe peer</pre></p>

<h3>textile token add [&lt;flags&gt;]</h3>
<p><pre>Generates an access token (44 random bytes) and saves a bcrypt hashed version for future lookup.
The response contains a base58 encoded version of the random bytes token.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-n, --no-store</code></td><td><pre>If used instead of token, the token is generated but not stored in the local cafe database</pre></td></tr>
	<tr><td><code>-t, --token=TOKEN</code></td><td><pre>If used instead of no-store, use this existing token rather than creating a new one</pre></td></tr>
</table>

<h3>textile token list</h3>
<p><pre>List info about all stored cafe tokens</pre></p>

<h3>textile token validate &lt;token&gt;</h3>
<p><pre>Check validity of existing cafe access token</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;token&gt;</code></td><td><pre>The token to validate</pre></td></tr>
</table>

<h3>textile token delete &lt;token&gt;</h3>
<p><pre>Removes an existing cafe token</pre></p>
<table>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;token&gt;</code></td><td><pre>The token to delete</pre></td></tr>
</table>

<h2>textile version [&lt;flags&gt;]</h2>
<p><pre>Print the current version and exit</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-g, --git</code></td><td><pre>Show full git version summary</pre></td></tr>
</table>

<h2>textile wallet</h2>
<p><pre>Create a new wallet, or list its available accounts</pre></p>

<h3>textile wallet create [&lt;flags&gt;] [&lt;passphrase&gt;]</h3>
<p><pre>Generate a hierarchical deterministic wallet and output the first child account. A wallet is a seed that deterministically generates child accounts. Child accounts are used to interact with textile. Formula: Autogenerated Mnemonic + Optionally Specified Passphrase = Generated Seed. The seed, mnemonic, and passphrase must be kept top secret. The mnemonic and passphrase must be remembered by you.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-w, --words=12</code></td><td><pre>How many words to use for the autogenerated mnemonic? 12, 15, 18, 21, 24</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>[&lt;passphrase&gt;]</code></td><td><pre>If provided, the resultant wallet seed will be salted with this passphrase, resulting in a different (and more unique) wallet seed than if just the mnemonic was used.</pre></td></tr>
</table>

<h3>textile wallet accounts [&lt;flags&gt;] &lt;mnemonic&gt; [&lt;passphrase&gt;]</h3>
<p><pre>List the available accounts (within a specific range) within the wallet&#39;s deterministic bounds. Formula: Account = Account Index + Parent Private Key from Parent Seed. Parent Seed = Wallet Mnemonic + Passphrase.</pre></p>
<table>
	<tr><th>Flag</th><th>Description</th></tr>
	<tr><td><code>-d, --depth=1</code></td><td><pre>Number of accounts to show</pre></td></tr>
	<tr><td><code>-o, --offset=0</code></td><td><pre>Account depth to start from</pre></td></tr>
	<tr><th>Argument</th><th>Description</th></tr>
	<tr><td><code>&lt;mnemonic&gt;</code></td><td><pre>The autogenerated mnemonic of the wallet</pre></td></tr>
	<tr><td><code>[&lt;passphrase&gt;]</code></td><td><pre>If the wallet was generated with a passphrase, specify it here to ensure the accounts you are listing are for the same wallet</pre></td></tr>
</table>