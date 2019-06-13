A _contact_ can be thought of as a set of ephemeral agents (peers) owned by a single account.

!["Contacts" are derived from account peer profiles. Peers may be connected with different cafe inboxes.](/images/contact.png){: .center}

Each of these peers shares a special private [_account thread_](/concepts/threads#account-threads), which tracks account peers, profile information, and known contacts. When indexed, this thread provides:

-   A "self" contact, much like iOS or other contact systems, which is advertised to the network and indexed for search by registered [cafes](/concepts/cafes).
-   A contact "address book" for interacting with other users.

As shown in the diagram above, a contact will display profile information (name and avatar) from the most recently updated peer.

!!! tip

    See `textile contacts --help` or check out the tour section on [contacts](/a-tour-of-textile/#contacts) to learn more about contact management.

<br>
