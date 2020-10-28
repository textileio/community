# Admin APIs

Powergate includes some administrative APIs. They allow the caller to create and list Storage Profiles, view wallet addresses, send FIL, and show information about jobs and data accross all Storage Profiles managed by the Powergate node.

## Admin Auth Token

Powergate's backend server may be configured with an admin auth token to restrict access to only those clients that provide the token with their requests, so be sure to set the admin token correctly in your [client of choice](/powergate/#powergate-apis). In the case of the Powergate CLI, `pow`, the admin token can be provided with the `--admin-token` flag or by setting the `POW_ADMIN_TOKEN` environment variable.

## CLI Usage

We can get a quick overview of the `pow` admin API below:

```bash
➜ pow admin --help
Provides admin commands

Usage:
  pow admin [command]

Available Commands:
  jobs        Provides admin jobs commands
  profiles    Provides admin storage profile commands
  wallet      Provides admin wallet commands

Flags:
      --admin-token string   admin auth token
  -h, --help                 help for admin

Global Flags:
      --serverAddress string   address of the powergate service api (default "127.0.0.1:5002")
  -t, --token string           storage profile auth token

Use "pow admin [command] --help" for more information about a command.
```

As an example, you can create a new Storage Profile by running:

```bash
➜ export POW_ADMIN_TOKEN=<admin token value>
➜ pow admin profile create
{
  "authEntry":  {
    "id":  "57b2f476-cc6f-4063-a8cb-d07652742722",
    "token":  "2ddab280-8ba7-4579-8026-04573fc8d0f5"
  }
}
```
