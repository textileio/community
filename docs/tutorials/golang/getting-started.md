You have access to the full suite of Textile APIs and technologies in Go. Including access to Hub-based persistence, thread client, local thread databases, bucket client, and more. Below, we'll walk you through the basic flow for creating new user identities and giving them access to your resources on the Hub. 

You can read more about Go support in the [Thread Client](https://godoc.org/github.com/textileio/go-threads/api/client), [Bucket Client](https://godoc.org/github.com/textileio/textile/api/buckets), and [Hub API](https://godoc.org/github.com/textileio/textile/api/hub/client) docs.

## Create a new Identity

Many functions below require some form of PKI identity. You can use the Threads library to generate a basic one.

```go
package main

import (
	crand "crypto/rand"
	"github.com/libp2p/go-libp2p-core/crypto"
	"github.com/textileio/go-threads/core/thread"
)

func createIdentity() (thread.Identity, error) {
	sk, _, err := crypto.GenerateEd25519Key(crand.Reader)
	if err != nil {
		return nil, err
	}
	return thread.NewLibp2pIdentity(sk), nil
}
```

!!!info
    The `NewLibp2pIdentity` method returns a new [thread.Identity](https://godoc.org/github.com/textileio/go-threads/core/thread#Identity).

## Hub authentication

Authentication on the Hub is done using your API keys and secrets, either Account Keys or User Group Keys depending on what kind of application you are building and which APIs you plan to use.

Below is an example authentication function that will use your User Group Key to create a `context` that stores the correct session information to begin using the APIs. This function would need to be run before all functions below in order to generate the proper `context` object.

```go
package main

import (
	"context"
  "time"
	"github.com/textileio/textile/api/common"
)

func authenticate(ctx context.Context, userGroupKey string, userGroupSecret string) (context.Context, error) {
  // Add our user group key to the context
  ctx = common.NewAPIKeyContext(ctx, userGroupKey)
  // Add a signature using our user group secret
	var err error
	ctx, err = common.CreateAPISigContext(ctx, time.Now().Add(time.Minute), userGroupSecret)

	return ctx, err
}
```

## Hub user authorization

Next, you can provide access to your Hub APIs to your users by generating an API token for them. Tokens are based on your user's identity public keys and your `context` created above. You could use any keypair identity, but we'll use the simple `threads.Identity` type shown above.

```go
package main

import (
	"context"
	"github.com/textileio/go-threads/api/client"
	"github.com/textileio/go-threads/core/thread"
	"google.golang.org/grpc"
)

var HUB_API = "api.textile.io:3447"
var HUB_HEADERS = []grpc.DialOption{grpc.WithInsecure(), grpc.WithPerRPCCredentials(common.Credentials{})}

func authorizeUser(ctx context.Context, user thread.Identity) (context.Context, error) {
	// Create an API Client
	cli, err := client.NewClient(HUB_API, HUB_HEADERS...)
	if err != nil {
		return nil, err
	}
  // Generate a new token for the user
  tok, err := cli.GetToken(ctx, user)
	if err != nil {
		return nil, err
	}
  // // Add the token to the context
	ctx = thread.NewTokenContext(ctx, tok)
	return ctx, nil
}
```

## Create threads with the client

The client allows you to create fully remote threads on the Hub. This is a good approach for cases where the application doesn't require fully offline modes.

```go
package main

import (
	"context"
  "time"
	crand "crypto/rand"
	"github.com/libp2p/go-libp2p-core/crypto"
	"github.com/textileio/go-threads/core/thread"
	"github.com/textileio/go-threads/common"
	"google.golang.org/grpc"
)

var HUB_API = "api.textile.io:3447"
var HUB_HEADERS = []grpc.DialOption{grpc.WithInsecure(), grpc.WithPerRPCCredentials(common.Credentials{})}

func createThreadDB(ctx context.Context, name string) error {
  // Assign the name for the Thread
  ctx = common.NewThreadNameContext(ctx, name)
  // Generate our client again
	cli, err := client.NewClient(HUB_API, HUB_HEADERS...)
	if err != nil {
		return err
  }
  // Create the ID
	dbID := thread.NewIDV1(thread.Raw, 32)
  // Create the database
	return cli.NewDB(ctx, dbID)
}
```

## Create a Bucket

Creating buckets in Go applications shares many of the same steps as creating threads. Because buckets are managed in a thread, you must first create a thread where you will then add a bucket. A single thread can store all of your user's buckets (and more).

```go
package main

import (
	"context"
  "time"
	crand "crypto/rand"
	"github.com/textileio/go-threads/core/thread"
	"github.com/textileio/go-threads/common"
	buckets "github.com/textileio/textile/api/buckets/client"
	"google.golang.org/grpc"
)

var HUB_API = "api.textile.io:3447"
var HUB_HEADERS = []grpc.DialOption{grpc.WithInsecure(), grpc.WithPerRPCCredentials(common.Credentials{})}

func createBucket(ctx context.Context, name string) error {
  // Create a new threaddb for our buckets
  ctx = common.NewThreadNameContext(ctx, "my-buckets")
	cli, err := client.NewClient(HUB_API, HUB_HEADERS...)
	if err != nil {
		return err
	}
	dbID := thread.NewIDV1(thread.Raw, 32)
  err = cli.NewDB(ctx, dbID)
	if err != nil {
		return err
	}
	
	// Connect our Bucket client
	bucket, err := buckets.NewClient(HUB_API, HUB_HEADERS...)
	if err != nil {
		return err
	}

	// Initialize a new bucket in the db
	ctx = common.NewThreadIDContext(ctx, dbID)
  buck, err := bucket.Init(ctx, "images")
	if err != nil {
		return err
	}
	
  //Finally, push a file to the bucket.
	file, err := os.Open("data/file1.jpg")
	if err != nil {
		return err
	}
	defer file.Close()
	_, file1Root, err := buckets.PushPath(ctx, buck.Root.Key, "file1.jpg", file)

	return err
}
```
