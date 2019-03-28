# Messages

TODO: Expand, cleanup

In addition to [[Files|Files]] and the various [[Thread|Threads]] annotation [[Blocks|Blocks]], Textile supports adding arbitrary textual messages to Threads. These Messages are a specify type of Block update, and are _not_ required to meet [[Schema|Schemas]] requirements. This means it is possible to mix content types in a Textile Thread, thereby facilitating complex 'conversations' between interacting peers. With this mix of thread Block Types, it is possible to post a Photo, comment and like a photo, _and_ have an unstructured conversation related to the photo topic. This could facilitate new forms of Thread-based interactions, a prospect Textile is currently exploring.

You can play around with Textile Messages already using the [[Command-Line|Command-Line]] tooling provided with Textile. To start a chat conversation, simply create a new (maybe make it 'open') Thread via `textile threads add`, send a Thread invite to your peer via `textile invites create`, and then start up the `textile chat` sub-command. The workflow to get this working looks something like this:

```
textile daemon
```

Then in a separate terminal:

```
textile threads add -t open -s invite_only -m <peer-account-address> "Open Chat"
textile invites create -t <new-thread-id> -p <peer-account-address>
textile chat -t <new-thread-id>
```

Then have your peer start their daemon and then:

```
textile invites accept <invite-id>
textile chat -t <new-thread-id>
```

and start chatting!
