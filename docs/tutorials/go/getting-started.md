# ThreadDB & Buckets and  in Go

You have access to the full suite of Textile APIs and technologies in Go. This includes access to:

* Hub-based persistence
* Thread client
* Local Thread databases
* Bucket client
* And more. 

Below, we'll walk you through the basic flow for interacting with the Hub-backed [ThreadDB](https://github.com/textileio/go-threads) and [Buckets](https://github.com/textileio/textile).

## Hub authentication

Authentication on the Hub is done with either your [Account Keys or User Group Keys](/hub/apis/) depending on what type of application you're building and which APIs you plan on using.

Below is an example of how to use your User Group Key to generate an authenticated API `context` to use with Hub-backed Buckets and ThreadDB APIs.

```go
package main

import (
    "context"
    "time"

    "github.com/textileio/textile/api/common"
)

func NewUserAuthCtx(ctx context.Context, userGroupKey string, userGroupSecret string) (context.Context, error) {
    // Add our user group key to the context
    ctx = common.NewAPIKeyContext(ctx, userGroupKey)

    // Add a signature using our user group secret
    return common.CreateAPISigContext(ctx, time.Now().Add(time.Minute), userGroupSecret)
}
```

You can generate a similar context using Account Keys for accessing a developer or organization account.

## Hub user authorization

Users access Hub-backed Buckets and ThreadDB APIs by identifying themselves with a `thread.Token` (JWT), which can be requested with the ThreadDB client as shown below:

```go
package main

import (
    "context"

    "github.com/textileio/go-threads/api/client"
    "github.com/textileio/go-threads/core/thread"
    "google.golang.org/grpc"
)

func NewUserTokenCtx(ctx context.Context, user thread.Identity) (context.Context, error) {
    // Create an API Client
    cli, err := client.NewClient("api.hub.textile.io:443", grpc.WithInsecure(), grpc.WithPerRPCCredentials(common.Credentials{}))
    if err != nil {
        return nil, err
    }

    // Generate a new token for the user
    token, err := client.GetToken(ctx, user)
    if err != nil {
        return nil, err
    }

    // Add the token to the context
    thread.NewTokenContext(ctx, token), nil
}
```

Please refer to the [ThreadDB](https://github.com/textileio/go-threads) and [Buckets](https://github.com/textileio/textile) docs for more.