## Install

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