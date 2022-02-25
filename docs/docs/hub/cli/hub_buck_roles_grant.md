# hub buck roles grant

Grants remote object access roles to an identity.

Identity must be a multibase encoded public key. A "\*" value will set the default access role for an object.

Access roles:
"none": Revokes all access.
"reader": Grants read-only access.
"writer": Grants read and write access.
"admin": Grants read, write, delete and role editing access.

```
hub buck roles grant [identity] [path] [flags]
```

### Options

```
  -h, --help          help for grant
  -r, --role string   Access role: none, reader, writer, admin
```

### SEE ALSO

-   [hub buck roles](hub_buck_roles.md) - Object access role management
