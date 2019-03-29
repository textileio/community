## Install

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