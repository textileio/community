# Buckets

## Getting Started

If you've used cloud storage before, you'll find Buckets easy to understand. Unlike traditional cloud services, Buckets are built on open, decentralized protocols including the IPFS and Libp2p. You can serve websites, data, and apps from Buckets.

Buckets are packed with useful features, including:

- Explore your Buckets on the [Hub gateway](#explore-on-the-gateway).
- Render web content in your Bucket on a persistent [website](#render-on-a-website).
- Automatically distribute your updates [on IPFS using IPNS](#render-on-ipfs-gateways).
- Collaboratively manage Buckets as an [organization](#organization-buckets).
- Create private Buckets where your [app users can store data](#app-user-buckets).

## Initialize a Bucket

When working on your local machine, Buckets are mapped to working directories. Once you initialize a Bucket in a directory, anytime you return to the directory, the Textile CLI will automatically detect the Bucket you are interacting with. To start a Bucket in your current working directory, you must first initialize the Bucket.

![[Read CLI docs for Buckets](/hub/cli/tt_buckets).](/images/tt-cli/tt_bucket_init.png)

### Shared Buckets

You can create Buckets to share with all members of an organization. To do so, simply initialize an Org first and then initialize a Bucket using the `--org` flag, specifying the name of the Org you want to share the bucket with. All members of the Org will be able to push and pull files to and from the shared Bucket. [Read more about creating Orgs](/hub/accounts#organizations).

## Publishing content

### Push new files

![[View the Bucket push CLI docs](/hub/cli/tt_buckets_push).](/images/tt-cli/tt_bucket_push.png)

@todo when push/pull updated

## Retrieving content

### Pull files

@todo when push/pull updated

### Explore on the gateway

![](/images/buckets/bucket_gateway.png)

The Hub gateway gives you a static URL where you can explore, download, and share your latest Bucket content.

### Render on a website

![](/images/buckets/bucket_website.png)

If your Bucket contains web content, the Bucket website endpoint will provide you a static URL that will always render the latest content from your Bucket.

### Render on IPFS gateways

Buckets are dynamic folders distributed over IPFS using ThreadsDB. Each Bucket has a unique [IPNS](https://docs.ipfs.io/guides/concepts/ipns/) address that will allow you to render or fetch your Bucket on any IPFS peer or gateway that supports IPNS (including [ipfs.io](https://ipfs.io) and [Cloudflare](https://cloudflare.com)).

Buckets can't change the speed that IPNS propogates through the network, but we recommend you explore and try for yourself. The [Hub gateway](#explore-on-the-gateway) will always render the latest data right away.

## Buckets CLI

![[Visit Textile Hub CLI docs for Buckets](/hub/cli/tt_buckets).](/images/tt-cli/tt_bucket_init.png)

## Learn more about Buckets

### Bucket Permissions

#### Developer Buckets

All Buckets you create are scoped to your developer account. You can always find your currently logged in account with `tt whoami`. 

#### Organization Buckets

Any Buckets you create using the `--org` flag will also be shared with Org members. Here are the steps to create Org, create a new Bucket in the Org, and invite a collaborator to the Org:

##### Create a new Org

![](/images/tt-cli/tt_org_create.png)

```bash
tt org create
Choose an Org name: nasa█
> The name of your account on Textile will be nasa
> Your URL will be http://hub.textile.io/nasa
Please confirm: y█
> Success! Created new org nasa with URL http://hub.textile.io/nasa
```

You have now created the `nasa` Org.

##### Create a new Bucket shared with an Org

```bash
mkdir launchpad
cd launchpad
tt bucket init --org nasa
```

You have now created a new Bucket inside of the `launchpad` directory and owned by your `nasa` organization.

##### Invite a collaborator

```bash
tt org invite
```

The final step is to invite collaborators to your Org. Once they accept the invite, they will be able to interact with Buckets associated with the Org.

#### App user Buckets

If you are building an app using one of our [developer libraries](/hub/app-apis/#app-libraries) you can use Buckets from inside yoru apps. Apps generally will create Buckets on behalf of each user, meaning the user should retain control of the Bucket metadata and contents.

<div class="txtl-options">
  <a href="https://textileio.github.com/js-textile" target="_blank" class="box">
    <h5>JS Textile Docs</h5>
    <p>Create user Buckets in your JS app.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://github.com/textileio/js-examples/tree/master/react-3box-threadsdb" target="_blank" class="box">
    <h5>3Box example</h5>
    <p>See how to use 3Box identities to own Threads and Buckets.</p>
  </a>
  <span class="box-space"> </span>
  <span class="box-fill">
  </span>
</div>

### Bucket Protocols

Buckets are designed to be interoperable across protocols and services. Here are a few examples.

#### Buckets and Threads

Buckets are built on [ThreadsDB](/threads/introduction). In fact, in their most basic form, Buckets are just a document in a Thread that is updated each time the directory of data is updated. Since Buckets run on Threads, it opens the door to many new integrations that can be built on Buckets! 

#### Buckets and HTTP

Buckets can be rendered over HTTP through either the [Hub Gateway](#explore-on-the-gateway), the [Bucket subdomains](#render-on-a-website), or on any IPFS gateway supporting IPNS (see below).

#### Buckets and IPFS

Data in a Bucket is stored as IPLD and pinned on IPFS. You can use the underlying content addresses to pin new Bucket content on additional pinning services such as [Pinata](https://pinata.cloud) or [Infura](https://infura.io/). This can be useful if you want additinal replication of your content on the IPFS network.

#### Buckets and IPNS

Every Bucket you create has a unique ID associated with it. The Bucket ID is an [IPNS](https://docs.ipfs.io/guides/concepts/ipns/) address that you can also use to fetch the latest Bucket content from any IFPS peer or view it over IPFS gateways that support the IPNS protocol.

### More resources

<div class="txtl-options">
  <a href="/hub/cli/tt" class="box">
    <h5>Textile Hub CLI</h5>
    <p>Read the full CLI documentation.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://textileio.github.io/js-textile" target="_blank" class="box">
    <h5>Textile JavaScript SDK</h5>
    <p>Create Buckets from your JavaScript app.</p>
  </a>
  <span class="box-space"> </span>
  <span class="box-fill">
  </span>
</div>
