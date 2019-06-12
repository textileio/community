Textile peers have a built in mechanism for certain types of network-wide queries. In order to support both [cafe](/concepts/cafes) and [cafe](/concepts/cafes)-less search, this mechanism uses a combination of direct peer-to-peer and publish-subscribe messaging.

Search responses will usually come from [cafe](/concepts/cafes) peers. However, any peer on the network can respond to a query.

## Search with a cafe

If they have any registered, peers will send queries to their [cafes](/concepts/cafes), which are usually connected to a larger portion of the network. Cafes publish search queries on behalf of their clients. Results are more easily sent to always-online cafes, which are then streamed back down to the client peer.

## Search without a cafe

When not registered with a [cafe](/concepts/cafes), peers will publish queries directly to the network. Responding peers will publish results to the requesting peer's ID-based pubsub topic.

## Types

### Contacts

See `textile contacts search --help` or check out the tour section on [contact search](/a-tour-of-textile/#search-for-contacts).

### Threads

[Thread](/concepts/threads) search is currently limited to account peers searching for each other's [snapshots](/concepts/threads#snapshots). This functionality is the backbone of [account sync](/concepts/the-wallet#sync).

!!! info

    Check out the [threads v2 roadmap](/concepts/threads/#v2-roadmap) for some coming functionality around public-facing thread search.

<br>
