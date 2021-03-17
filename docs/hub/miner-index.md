The miner index is an open API meant to help Filecoin clients store their data efficiently and cheaply on the network. It has three primary endpoints.

* Index: list and query miners based on their recent storage history.
* Calculate: calculate actual costs for verified and standard deal storage with specified miners.
* Profiles: review the complete set of data and recent history for a specific miner.

There are two primary ways you can use the API. 

**Rest API**

The first is by accessing the open API endpoint over REST. You can find the documentation for that [endpoint here](https://minerindex.hub.textile.io/docs/#/APIService/). We'll walk through some of the live results from that API in the next section.

**CLI**

The index is made available over the [Hub CLI](../). We'll review some common commands below.

## Live Results

Let's walk through each of the API endpoints while also reviewing some live results.

<div>
<table id="miners">
<thead>
<tr>
  <th align="left">MINER</th>
  <th align="left">ASK-PRICE</th>
  <th align="left">VERIFIED ASK-PRICE</th>
  <th align="left">LOCATION</th>
  <th align="left">MIN-PIECE-SIZE</th>
  <th align="left">TEXTILE-LAST-DEAL</th>
</tr>
</thead>
<tbody id="miners-results">
</tbody>
</table>
</div>

<script>
function updateProfile(miner) {
  var url = "https://minerindex.hub.textile.io/v1/index/miner/" + miner

  var apiurl = document.getElementById("profile-api");
  apiurl.href = url;
  apiurl.text = url;

  var rct = 0;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var res = document.querySelector("#profile-result pre span")
      res.innerHTML = JSON.stringify(data, undefined, 2);
    })
}
function updateCalculator(miners) {
  var table = document.getElementById("calculator-results");

  var url = "https://minerindex.hub.textile.io/v1/calculator/calculate?dataSizeBytes=1000000&durationDays=180&"
  for (var miner of miners) {
    url += "&minerAddresses=" + miner
  }

  var apiurl = document.getElementById("calculator-api");
  apiurl.href = url;
  apiurl.text = url;

  var rct = 0;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var res = document.querySelector("#calculator-result pre span")
      res.innerHTML = JSON.stringify(data, undefined, 2);
      for (var r of data.results) {
        console.log(r)
        var row = table.insertRow(rct);
        rct += 1;
        var minerAddr = row.insertCell(0);
        minerAddr.innerHTML = r.miner;
        var cost = row.insertCell(1);
        cost.innerHTML = r.totalCost;
        var verified = row.insertCell(2);
        verified.innerHTML = r.verifiedTotalCost;
        var duration = row.insertCell(3);
        duration.innerHTML = data.durationEpochs;
        var padded = row.insertCell(4);
        padded.innerHTML = data.paddedSize;
      }
    })
}

var table = document.getElementById("miners-results");
var rct = 0;
var calc = []
fetch('https://minerindex.hub.textile.io/v1/index/query?sort.ascending=false&sort.field=TEXTILE_DEALS_LAST_SUCCESSFUL&limit=5')
  .then(response => response.json())
  .then(data => {
    for (var row of data.miners) {
      var miner = row.miner;
      var row = table.insertRow(rct);
      if (rct === 0) {
        var res = document.querySelector("#first-result pre span")
        res.innerHTML = JSON.stringify(miner, undefined, 2);
        updateProfile(miner.minerAddr)

        res = document.querySelector("#deals-summary pre span")
        res.innerHTML = JSON.stringify(miner.textile.dealsSummary, undefined, 2);

        res = document.querySelector("#transfer-stats pre span")
        res.innerHTML = JSON.stringify(miner.textile.regions["021"].deals.tailTransfers, undefined, 2);

        res = document.querySelector("#sealing-stats pre span")
        res.innerHTML = JSON.stringify(miner.textile.regions["021"].deals.tailSealed, undefined, 2);

        res = document.querySelector("#latest-retrievals pre span")
        res.innerHTML = JSON.stringify(miner.textile.regions["021"].retrievals, undefined, 2);
      }
      calc.push(miner.minerAddr);
      rct += 1;
      var minerAddr = row.insertCell(0);
      minerAddr.innerHTML = miner.minerAddr;
      var price = row.insertCell(1);
      price.innerHTML = miner["filecoin"].askPrice;
      var verified = row.insertCell(2);
      verified.innerHTML = miner.filecoin.askVerifiedPrice;
      var location = row.insertCell(3);
      location.innerHTML = miner.metadata.location;
      var minSize = row.insertCell(4);
      minSize.innerHTML = miner.filecoin.minPieceSize;
      var lastDeal = row.insertCell(5);
      lastDeal.innerHTML = miner.textile.dealsSummary.last;
    }
    updateCalculator(calc)
  });
</script>

### Understanding the results

That data shown here are the latest five miners to successfully store data for a request originating from Textile. This is a great list to use for a first-time storage deal maker, as these miners have shown recent storage activity on the network. 

All FIL columns (e.g. askPrice) are reported as `attoFil`.

The above table only represents a small portion of the data available from the index. However, the default sorting of the table ensures (by recently active and successful deals) ensures that even this basic view should give most clients a reliable list of storage miners to use right away. If you want to see the full data that comes back from the API, check out this direct query:

https://minerindex.hub.textile.io/v1/index/query?sort.ascending=false&sort.field=TEXTILE_DEALS_LAST_SUCCESSFUL&limit=5

The following is the full JSON result returned from the API for just the first miner in the table.

<div id="first-result">

```json
{
  "minerAddr": "f09848",
  "metadata": {
    "location": "US"
  },
  "filecoin": {
    "relativePower": 0.000020719814040295776,
    "askPrice": "10000000000",
    "askVerifiedPrice": "0",
    "minPieceSize": "536870912",
    "maxPieceSize": "34359738368",
    "sectorSize": "34359738368",
    "activeSectors": "2314",
    "faultySectors": "0",
    "updatedAt": "2021-03-17T20:03:22.059Z"
  },
  "textile": {
    "regions": {
      "021": {
        "deals": {
          "total": "120",
          "last": "2021-03-17T14:56:51.360Z",
          "failures": "57",
          "lastFailure": "2021-03-17T19:41:28.922Z",
          "tailTransfers": [
            {
              "transferedAt": "2021-03-16T16:02:57Z",
              "mibPerSec": 13.257300327974415
            },
            {
              "transferedAt": "2021-03-15T19:43:35Z",
              "mibPerSec": 20.399272781121926
            },
            {
              "transferedAt": "2021-03-15T20:19:30Z",
              "mibPerSec": 20.739260660807293
            },
            {
              "transferedAt": "2021-03-05T17:23:59Z",
              "mibPerSec": 13.070962601349134
            },
            {
              "transferedAt": "2021-03-05T17:00:31Z",
              "mibPerSec": 14.778570542142964
            },
            {
              "transferedAt": "2021-03-05T16:56:07Z",
              "mibPerSec": 16.953074109651737
            },
            {
              "transferedAt": "2021-03-05T17:32:04Z",
              "mibPerSec": 15.791315223964943
            },
            {
              "transferedAt": "2021-03-03T18:16:38Z",
              "mibPerSec": 9.75200344552067
            },
            {
              "transferedAt": "2021-02-27T02:47:50Z",
              "mibPerSec": 7.480152248979115
            },
            {
              "transferedAt": "2021-02-24T20:46:23Z",
              "mibPerSec": 20.966012990699625
            },
            {
              "transferedAt": "2021-02-23T02:00:08Z",
              "mibPerSec": 12.749545486246953
            }
          ],
          "tailSealed": [
            {
              "sealedAt": "2021-03-17T14:56:51Z",
              "durationSeconds": "9440"
            },
            {
              "sealedAt": "2021-03-16T14:02:38Z",
              "durationSeconds": "7200"
            },
            {
              "sealedAt": "2021-03-16T13:56:09Z",
              "durationSeconds": "7200"
            },
            {
              "sealedAt": "2021-03-06T05:49:39Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-03-06T05:49:37Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-03-06T05:46:35Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-03-06T05:45:37Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-03-04T07:00:50Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-03-03T22:40:39Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-03-03T22:40:39Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-02-27T15:57:58Z",
              "durationSeconds": "9000"
            },
            {
              "sealedAt": "2021-02-25T08:57:14Z",
              "durationSeconds": "7200"
            },
            {
              "sealedAt": "2021-02-23T14:44:18Z",
              "durationSeconds": "9000"
            }
          ]
        },
        "retrievals": {
          "total": "0",
          "last": null,
          "failures": "0",
          "lastFailure": null,
          "tailTransfers": []
        }
      }
    },
    "dealsSummary": {
      "total": "120",
      "last": "2021-03-17T14:56:51.360Z",
      "failures": "57",
      "lastFailure": "2021-03-17T19:41:28.922Z"
    },
    "retrievalsSummary": {
      "total": "0",
      "last": null,
      "failures": "0",
      "lastFailure": null
    },
    "updatedAt": "2021-03-17T20:03:02.813Z"
  },
  "updatedAt": "2021-03-17T20:03:02.813Z"
}
```

</div>

### Make a deal with one of the results

#### Buckets

If you are using [bucket archives](../buckets/archiving) to start data, you can replicate your data with two miners as follows.

```sh
hub buck archive set-default-config --fast-retrieval --trusted-miners {id1, id2}
```

Or, if you have your address verified on the network ([learn more here](https://plus.fil.org)), you can make a verified deal. 

```sh
hub buck archive set-default-config --fast-retrieval --verified-deal --trusted-miners {id1, id2}
```

#### Lotus

If you are using lotus, you can use the above miners the same way, but you'll need to specify each deal at a time.

```
lotus client deal --fast-retrieval --verified-deal <data-cid> {id1} 66355200000000000 518400
```

## Calculator

You can use the calculator endpoint to determine the cost of storage with one or multiple miners at at a time. You can play with that below. 

<div>
<table id="calculator">
<thead>
<tr>
  <th align="left">MINER</th>
  <th align="left">NORMAL COST</th>
  <th align="left">VERIFIED COST</th>
  <th align="left">DURATION</th>
  <th align="left">PADDED SIZE</th>
</tr>
</thead>
<tbody id="calculator-results">
</tbody>
</table>
</div>

The calculator results are based on storing `1,000,000` bytes for `180` days. You can use the API directly to modify those parameters or which miners you are calculating with. 

<a href="" id="calculator-api" target="_blank"></a>

The following is the full JSON result from the calculator API request.

<div id="calculator-result">

```json
{
  "results": [
    {
      "miner": "f09848",
      "totalCost": "5060000000000",
      "verifiedTotalCost": "0",
      "price": "10000000000",
      "verifiedPrice": "0"
    },
    {
      "miner": "f066596",
      "totalCost": "10120000000000",
      "verifiedTotalCost": "0",
      "price": "20000000000",
      "verifiedPrice": "0"
    },
    {
      "miner": "f0156452",
      "totalCost": "253000000000",
      "verifiedTotalCost": "25300000000",
      "price": "500000000",
      "verifiedPrice": "50000000"
    },
    {
      "miner": "f0165539",
      "totalCost": "25300000000",
      "verifiedTotalCost": "2530000000",
      "price": "50000000",
      "verifiedPrice": "5000000"
    },
    {
      "miner": "f0230200",
      "totalCost": "253000000000",
      "verifiedTotalCost": "25300000000",
      "price": "500000000",
      "verifiedPrice": "50000000"
    }
  ],
  "paddedSize": "1048576",
  "durationEpochs": "518400"
}
```

</div>

## Miner profiles

The API also has an endpoint to retrieve the latest stats and profile information for a single user. Here is the request for the profile of the first miner in our results above.

<a href="" id="profile-api" target="_blank"></a>

The following is the full JSON result from the profile API request.

<div id="profile-result">

```json
{
  "info": {
    "minerAddr": "f0221135",
    "metadata": {
      "location": "US"
    },
    "filecoin": {
      "relativePower": 1.7012885147319677e-7,
      "askPrice": "1000000000",
      "askVerifiedPrice": "500000000",
      "minPieceSize": "10485760",
      "maxPieceSize": "34359738368",
      "sectorSize": "34359738368",
      "activeSectors": "19",
      "faultySectors": "0",
      "updatedAt": "2021-03-17T20:03:17.390Z"
    },
    "textile": {
      "regions": {
        "021": {
          "deals": {
            "total": "2",
            "last": "2021-03-06T14:30:38.165Z",
            "failures": "0",
            "lastFailure": null,
            "tailTransfers": [
              {
                "transferedAt": "2021-03-05T17:25:41Z",
                "mibPerSec": 12.671646024933173
              },
              {
                "transferedAt": "2021-03-03T18:16:38Z",
                "mibPerSec": 9.75200344552067
              }
            ],
            "tailSealed": [
              {
                "sealedAt": "2021-03-06T14:30:38Z",
                "durationSeconds": "9900"
              },
              {
                "sealedAt": "2021-03-04T13:59:13Z",
                "durationSeconds": "9900"
              }
            ]
          },
          "retrievals": {
            "total": "0",
            "last": null,
            "failures": "0",
            "lastFailure": null,
            "tailTransfers": []
          }
        }
      },
      "dealsSummary": {
        "total": "2",
        "last": "2021-03-06T14:30:38.165Z",
        "failures": "0",
        "lastFailure": null
      },
      "retrievalsSummary": {
        "total": "0",
        "last": null,
        "failures": "0",
        "lastFailure": null
      },
      "updatedAt": "2021-03-17T20:03:01.056Z"
    },
    "updatedAt": "2021-03-17T20:03:01.056Z"
  }
}
```
</div>

## Hub CLI

We leverage the REST API above to provide simple command-line access to the miner index. Here are some interesting places to get started.

* [Query the index](../cli/hub_fil_index_query)
* [Calculate deal costs](../cli/hub_fil_index_calculate)
* [Get miner profiles](../cli/hub_fil_index_get)

**Expanded results**

You can access a full table of results for any query by using the `--show-full-details` flag.

```sh
hub fil index query --show-full-details --limit 20
```

**Scripting**

Each of the index methods in the CLI supports a `--json` flag to output results to JSON. 

```sh
hub fil index query --show-full-details --limit 1 --json | jq -r ".miners[]"
```

## How it works

Textile's miner index is different than most others you'll find on the network. The key distinction is that this index pulls real data from many Lotus and Powergate notes connected to mainnet. The index collects both the on-chain information plus a suite of off-chain telemetry that can be very informative for advanced selection of miners. All telemetry is currently measured from clients based in North America (region `021` in the API), but will expand in the future. 

Some interesting features of the index you may wish to leverage include the following. We've populated the below from real-time index results for the first miner listed above.

### Deals summary

Calculated across all regions.

<div id="deals-summary">

```json
{
  "total": "120",
  "last": "2021-03-17T14:56:51.360Z",
  "failures": "57",
  "lastFailure": "2021-03-17T19:41:28.922Z"
}
```

</div>

### Transfer stats

Tail of latest transfer stats from clients in North America.

<div id="transfer-stats">

```json
[
  {
    "transferedAt": "2021-03-16T16:02:57Z",
    "mibPerSec": 13.257300327974415
  },
  {
    "transferedAt": "2021-03-15T19:43:35Z",
    "mibPerSec": 20.399272781121926
  },
  {
    "transferedAt": "2021-03-15T20:19:30Z",
    "mibPerSec": 20.739260660807293
  },
  {
    "transferedAt": "2021-03-05T17:23:59Z",
    "mibPerSec": 13.070962601349134
  },
  {
    "transferedAt": "2021-03-05T17:00:31Z",
    "mibPerSec": 14.778570542142964
  },
  {
    "transferedAt": "2021-03-05T16:56:07Z",
    "mibPerSec": 16.953074109651737
  },
  {
    "transferedAt": "2021-03-05T17:32:04Z",
    "mibPerSec": 15.791315223964943
  },
  {
    "transferedAt": "2021-03-03T18:16:38Z",
    "mibPerSec": 9.75200344552067
  },
  {
    "transferedAt": "2021-02-27T02:47:50Z",
    "mibPerSec": 7.480152248979115
  },
  {
    "transferedAt": "2021-02-24T20:46:23Z",
    "mibPerSec": 20.966012990699625
  },
  {
    "transferedAt": "2021-02-23T02:00:08Z",
    "mibPerSec": 12.749545486246953
  }
]

```

</div>

### Sealing stats

Tail of latest sealing stats from clients in North America.

<div id="sealing-stats">

```json
[
  {
    "sealedAt": "2021-03-17T14:56:51Z",
    "durationSeconds": "9440"
  },
  {
    "sealedAt": "2021-03-16T14:02:38Z",
    "durationSeconds": "7200"
  },
  {
    "sealedAt": "2021-03-16T13:56:09Z",
    "durationSeconds": "7200"
  },
  {
    "sealedAt": "2021-03-06T05:49:39Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-03-06T05:49:37Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-03-06T05:46:35Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-03-06T05:45:37Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-03-04T07:00:50Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-03-03T22:40:39Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-03-03T22:40:39Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-02-27T15:57:58Z",
    "durationSeconds": "9000"
  },
  {
    "sealedAt": "2021-02-25T08:57:14Z",
    "durationSeconds": "7200"
  },
  {
    "sealedAt": "2021-02-23T14:44:18Z",
    "durationSeconds": "9000"
  }
]
```

</div>

### Latest Retrievals

Latest retrievals for clients in North America.

<div id="latest-retrievals">

```json
{
  "total": "0",
  "last": null,
  "failures": "0",
  "lastFailure": null,
  "tailTransfers": []
}
```

</div>

Build on!