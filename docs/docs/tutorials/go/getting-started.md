# ThreadDB & Buckets and in Go

!!! Warning
We are shutting down our hosted Hub infrastructure. Please see this [deprecation notice](https://github.com/textileio/textile/issues/578) for details.

You have access to the full suite of Textile APIs and technologies in Go. This includes access to:

-   Hub-based persistence
-   Thread client
-   Local Thread databases
-   Bucket client
-   And more.

Below, we'll walk you through the basic flow for interacting with the Hub-backed [ThreadDB](https://github.com/textileio/go-threads).

## Set up your project

Create a directory for your project and initialize a new go module.

```sh
mkdir hello-threads
cd hello-threads
go mod init github.com/example/hello-threads
```

Go is particular about how you install libraries above v2. To ensure you are using the latest, grab v2 now.

```sh
go get github.com/textileio/textile/v2
```

Next, create a `main.go` that you'll use to build your first thread client.

```sh
touch main.go
```

## Connect a new thread client

Inside `main.go` you'll create a new client connection to the Textile Hub's thread APIs.

```go
package main

import (
    "context"
    "crypto/rand"
    "crypto/tls"
    "fmt"
    "time"

    crypto "github.com/libp2p/go-libp2p-crypto"
    "github.com/textileio/go-threads/api/client"
    "github.com/textileio/go-threads/core/thread"
    "github.com/textileio/textile/api/common"
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials"
)

func main() {

    // Create an API Client
    creds := credentials.NewTLS(&tls.Config{})
    auth := common.Credentials{}
    opts := []grpc.DialOption{grpc.WithTransportCredentials(creds), grpc.WithPerRPCCredentials(auth)}
    cli, err := client.NewClient("api.hub.textile.io:443", opts...)
    if err != nil {
        panic(err)
    }

    fmt.Println("Success!")
}
```

You can now run your example,

```sh
go run main.go

> Success!
```

## Create a random user

This function will use the `crypto` and `thread` libraries to generate a new random private key identity.

```go
func GetRandomUser() (thread.Identity, error) {
    privateKey, _, err := crypto.GenerateEd25519Key(rand.Reader)
    if err != nil {
        return nil, err
    }
    myIdentity := thread.NewLibp2pIdentity(privateKey)
    return myIdentity, nil
}
```

## Hub authentication

Authentication on the Hub is done with either your [Account Keys or User Group Keys](/hub/apis/) depending on what type of application you're building and which APIs you plan on using.

Below is an example of using your user key to generate an authenticated API `context` to use with Hub-backed buckets and threadDB APIs. You can generate a similar context using account keys for accessing a developer or organization account.

```go
func NewUserAuthCtx(ctx context.Context, userGroupKey string, userGroupSecret string) (context.Context, error) {
    // Add our user group key to the context
    ctx = common.NewAPIKeyContext(ctx, userGroupKey)

    // Add a signature using our user group secret
    return common.CreateAPISigContext(ctx, time.Now().Add(time.Minute), userGroupSecret)
}
```

The above function will take your API key and secret and set up a `context` ready to prove to the API that the user is who they claim to be.

## Request and specify a user token

A user token is generated per-user and can then be used with subsequent API calls to specify what user is making the request. They can only be created using valid API credentials and provable user identity.

```go
func NewTokenCtx(ctx context.Context, user thread.Identity) (context.Context, error){
    // Generate a new token for the user
    token, err := cli.GetToken(ctx, user)
    if err != nil {
        return nil, err
    }
    return thread.NewTokenContext(ctx, token), nil
}
```

You can also store and reuse the token, but it needs to be attached the the `context` before future API calls.

## Create a new DB

Let's put it all together and then create a new Thread database for our user.

```go
package main

import (
    "context"
    "crypto/rand"
    "crypto/tls"
    "fmt"
    "time"

    crypto "github.com/libp2p/go-libp2p-crypto"
    "github.com/textileio/go-threads/api/client"
    "github.com/textileio/go-threads/core/thread"
    "github.com/textileio/textile/api/common"
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials"
)

func GetRandomUser() (thread.Identity, error) {
    privateKey, _, err := crypto.GenerateEd25519Key(rand.Reader)
    if err != nil {
        return nil, err
    }
    myIdentity := thread.NewLibp2pIdentity(privateKey)
    return myIdentity, nil
}


func NewUserAuthCtx(ctx context.Context, userGroupKey string, userGroupSecret string) (context.Context, error) {
    // Add our user group key to the context
    ctx = common.NewAPIKeyContext(ctx, userGroupKey)

    // Add a signature using our user group secret
    return common.CreateAPISigContext(ctx, time.Now().Add(time.Minute), userGroupSecret)
}

func NewTokenCtx(ctx context.Context, cli *client.Client, user thread.Identity) (context.Context, error){
    // Generate a new token for the user
    token, err := cli.GetToken(ctx, user)
    if err != nil {
        return nil, err
    }
    return thread.NewTokenContext(ctx, token), nil
}

func main() {

    // Create an API Client
    creds := credentials.NewTLS(&tls.Config{})
    auth := common.Credentials{}
    opts := []grpc.DialOption{grpc.WithTransportCredentials(creds), grpc.WithPerRPCCredentials(auth)}
    cli, err := client.NewClient("api.hub.textile.io:443", opts...)
    if err != nil {
        panic(err)
    }

    user, err := GetRandomUser()
    if err != nil {
        panic(err)
    }

    authCtx, err := NewUserAuthCtx(context.Background(), "<key>", "<secret>")
    if err != nil {
        panic(err)
    }

    tokenCtx, err := NewTokenCtx(authCtx, cli, user)
    if err != nil {
        panic(err)
    }

    // Generate a new thread ID
    threadID := thread.NewIDV1(thread.Raw, 32)

    // Create your new thread
    err = cli.NewDB(tokenCtx, threadID)
    if err != nil {
        panic(err)
    }

    fmt.Println("> Success!")
    fmt.Println(threadID)
}


```

Please refer to the [ThreadDB](https://github.com/textileio/go-threads) and [Buckets](https://github.com/textileio/go-buckets) docs for more.
