# hub fil index query

Query miners in the index.
The API allows to handle paging with filters and sorting.
The sort-field flag can take the following values: - "textile-deals-total-successful": Total successful deals in Textile. - "textile-deals-last-successful": Last successful deal in Textile. - "ask-price": Raw ask-price. - "verified-ask-price": Verified ask-price. - "active-sectors": Total active sectors in the network.

    The default sorting field is "textile-deals-last-successful".
    The sort-textile-region allows to apply textile-deals-* flags to a specific
    textile region. An empty value would be interpreted to the aggregate of all
    regions (default).

    If the flag --show-full-details is set, an extra set of columns with more details
    is printed.

    If the flag --json is set, the output will be printed in JSON and it always contains
    full details.

```
hub fil index query [flags]
```

### Options

```
      --ascending                      sort results ascending, default is sort descending
      --filter-miner-location string   filter by miner's location
  -h, --help                           help for query
      --json                           indicates that the output should be printed in JSON
      --limit int                      maximum results per page (default 10)
      --offset int                     number of results to skip
      --show-full-details              indicates that the results will contain extended data about miners
      --sort-field string              sort field (default "textile-deals-last-successful")
      --sort-textile-region string     make the sorting criteria in a specified region
```

### SEE ALSO

-   [hub fil index](hub_fil_index.md) - Interact with the Miner Index.
