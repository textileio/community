<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>install</small></h1>

Run a Textile node on your desktop, phone, or server.

## Installation

### Command-Line Tool

#### Download

First, download the Textile command-line tool from GitHub. Textile bundles multiple pre-built binaries with each release, for the command-line tools you will be looking for the release named,

`go-textile_<version-number>_<platform>.tar.gz`

So for the **{{go_textile.version}}** you will download,

- For Mac OS X: `go-textile_{{go_textile.version}}_darwin-amd64.tar.gz`
- For Linux (arm, arm64, 386): `go-textile_{{go_textile.version}}_linux-<arch>.tar.gz`
- For Windows: `go-txtile_{{go_textile.version}}_windows-amd64.tar.gz`

View all the [latest release builds on GitHub](https://github.com/textileio/go-textile/releases).

#### Install on Mac OS X & Linux

Untar the archive ('darwin' will be 'linux' in below examples if on Linux),

```bash
tar xvfz go-textile_{{go_textile.version}}_darwin-amd64.tar.gz
```

Change directory to the newly untarred folder and run the install script,

```bash
cd go-textile_{{go_textile.version}}_darwin-amd64
./install.sh
```

#### Install on Windows

Untar the archive,

```bash
tar xvfz go-textile_{{go_textile.version}}_windows-amd64.tar.gz
```

Move the **Textile.exe** anyplace in your **PATH**.

#### Run the CLI

[Read: How to run the Command-Line tool](../run/Command-Line)

### Desktop App

#### Download

First, download the Textile desktop app from GitHub. Textile bundles multiple pre-built binaries with each release, for the desktop app you will be looking for the release named,

`Textile_<version-number>_<platform>.tar.gz`

So for the **{{go_textile.version}}** you will download,

- For Mac OS X: `Textile_{{go_textile.version}}_darwin-amd64.tar.gz`
- For Linux (arm, arm64, 386): `Textile_{{go_textile.version}}_linux-<arch>.tar.gz`
- For Windows: `Textile_{{go_textile.version}}_windows-amd64.tar.gz`

View all the [latest release builds on GitHub](https://github.com/textileio/go-textile/releases).

#### Install on Mac OS X & Linux

Untar the archive or double-click the download.

```bash
tar xvfz Textile_{{go_textile.version}}_darwin-amd64.tar.gz
```

This will unpack the Textile desktop as an app. You can move this file `Textile` to your applications folder.

#### Install on Windows

Untar the archive or double-click the download.

```bash
tar xvfz Textile_{{go_textile.version}}_windows-amd64.tar.gz
```

Move the **Textile.exe** file to your applications folder.

#### Run Desktop

[Read: How to run the Desktop app](../run/Desktop-App)

### Cafe Server

#### Install 

You can run a Cafe server by using the same build distributed for the [command-line above](#command-line-tool). Textile Cafes are the same as you desktop nodes but running with a few extra responsibilities you can enable on setup.

#### Run a Cafe

[Read: How to run a Cafe server](../run/Cafe-Server)

## Build from source

The reference implementation of Textile is [go-textile](https://github.com/textileio/go-textile). You can read about build and running each of the above applications in the [go-textile documentation](/textileio/go-textile)
