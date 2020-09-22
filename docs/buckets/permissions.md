# Bucket Permissions

## Bucket owners

### Developer Buckets

All buckets you create are scoped to your developer account. You can always find your currently logged in account with `hub whoami`.

### Organization Buckets

Any buckets you create using the `HUB_ORG` setting will also be shared with Org members. Here are the steps to create an Org, create a new Bucket in the Org, and invite a collaborator to the Org:

#### Create a new Org

![](../images/hub-cli/hub_org_create.png)

```bash
hub org create
Choose an Org name: nasa█
> The name of your account on Textile will be nasa
> Your URL will be http://hub.textile.io/nasa
Please confirm: y█
> Success! Created new org nasa with URL http://hub.textile.io/nasa
```

You have now created the `nasa` Org.

#### Create a new Bucket shared with an Org

The default bucket command is simply `buck`, because it's two letters less to type each time. If you prefer, you can still type `bucket`

```bash
mkdir launchpad
cd launchpad
HUB_ORG=nasa hub buck init
```

You have now created a new Bucket inside of the `launchpad` directory and owned by your `nasa` organization.

#### Invite a collaborator

```bash
hub org invite
```

The final step is to invite collaborators to your Org. Once they accept the invite, they will be able to interact with buckets associated with the Org.

### App user Buckets

If you are building an app using one of our [developer libraries](../hub/apis.md#libraries) you can use buckets from inside your apps. Apps generally will create buckets on behalf of each user, meaning the user should retain control of the Bucket metadata and contents.

## Bucket Access Roles

Buckets can be shared in more ways than in organizations. Multi-writer buckets leverage the distributed nature of ThreadDB by allowing multiple identities to write to the same bucket hosted by different Libp2p hosts. Since buckets are ThreadDB collection instances, this is no different than normal ThreadDB peer collaboration.

#### Path access

Read and write access roles are defined in a bucket at *any* path. Any subpaths automatically inheret the permissions of their parent. For example, granting read access to your bucket at `/` would include a file that exists at `/path/to/foo.jpg`. You can set different access rules within the same bucket using combination of *paths* and specified *roles* at the path. 

#### Role types

| | |
| :------ | :------ |
| Admin | Users with the ability to modify permissions. |
| Writer | Users allowed update data at the specified path. |
| Reader | Users allowed read data at the specified path. |
| Unspecified | Users with any permissions specified path. |

#### Authorizing users

You can specify new users and their roles by inserting their public key into the bucket access rules. Let's take a look at how we update roles using the CLI. 

```sh
hub buck roles grant -r writer bbaareicookqfgeosr225wwdknmpmvgemydxolzxesu6woxghpulxvizose /path/to

  IDENTITY                                                     ROLE    
  *                                                            Reader  
  bbaareicookqfgeosr225wwdknmpmvgemydxolzxesu6woxghpulxvizose  Writer  
  bbaareieyrq92sbfcx2bhbmsfxzj25pi7ldx2vkrtcn6hu3xzi4mpzwqvcy  Admin   

> Success! Updated access roles for path /path/to
```

Success! You can see the new user has been added as a writer to the path `/path/to` and that the bucket creator is still listed as the admin.

<div class="txtl-options">
  <a href="../tutorials/hub/user-buckets/" class="box">
    <h5>Buckets in your app</h5>
    <p>View the tutorial on adding Buckets to your JavaScript app.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://textileio.github.io/js-hub" target="_blank" class="box">
    <h5>JS Hub Docs</h5>
    <p>Persist user buckets on IPFS from your JS app.</p>
  </a>
  <span class="box-space"> </span>
  <a href="../tutorials/react-native-buckets/" class="box">
    <h5>React Native tutorial</h5>
    <p>See how to create user buckets & threads in React Native.</p>
  </a>
</div>

