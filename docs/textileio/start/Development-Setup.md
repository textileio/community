---
id: DevelopmentSetup
title: Development Setup
sidebar_label: Development Setup
---

If you are interested in developing with Textile, you'll need to setup a Go development environment. This is easier than ever to get going, and just requires a few developer tools and some initial build steps. If you already have a development environment setup (or are using a [pre-compiled binary](https://github.com/textileio/textile-go/releases)), you can probably just skip to the [[Quick-Start]] guide, or even to more advanced topics like running in [[Cafe Mode|Run-Cafe]].

First, you'll need [Go installed](https://golang.org/doc/install). Some of our developer tools assume you have a pretty recent version (we're currently on `go1.11`), so just be aware. While you're at it, make sure your Go environment variables are setup (they should be by default). You might need to set `GOROOT` and `GOPATH` and update your `PATH` to reflect where your go binary is installed. Here are [some good instructions](https://blog.learngoprogramming.com/what-are-goroot-and-gopath-1231b084723f) on getting this all setup.

# Developer tools

We'll be using [`dep` for Golang dependency management](https://github.com/golang/dep), and [`git` for fetching packages](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). You’ll also need [`gx` for `ipfs`/`libp2p` dependencies](https://github.com/whyrusleeping/gx). Installation instructions for these various tools will depend on your OS, but both have good instructions. For example, on Mac they're both just a simple `brew install` away. For `gx`, you’ll just do:

```
go get -u github.com/whyrusleeping/gx
go get -u github.com/whyrusleeping/gx-go
```

# Installing `textile-go`

This part is easy! Just grab the package from our [GitHub repo](https://github.com/textileio/textile-go) and get installing:

```
go get github.com/textileio/textile-go
cd ~/go/src/github.com/textileio/textile-go/
make setup
```

While you're at it, you might as well build and install the command line tools:

```
make build && make install
```

Now you're ready to follow the rest of the [[Getting Started|Getting-Started]] guide, or more advanced topics!