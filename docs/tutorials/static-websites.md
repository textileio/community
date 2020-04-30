Buckets make it simple to publish websites using IPFS. If you are using a static site builder such as [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.org/), [Hugo](https://gohugo.io/), or [Mkdocs](https://www.mkdocs.org/) you can add Buckets to your build steps for both staging and production site hosting.

## Static site builders

If you are using one of these static site builders, jump to the specific tutorials.

<div class="txtl-options">
  <a href="/tutorials/static-jekyll-site" class="box">
    <h5>Jekyll Site</h5>
    <p>An example Jekyll site published in a Bucket.</p>
  </a>
  <span class="box-space"> </span>
  <a href="/tutorials/static-gatsby-site" class="box">
    <h5>Gatsby Site</h5>
    <p>An example Gatsby site published in a Bucket.</p>
  </a>
  <span class="box-space"> </span>
  <a href="/tutorials/static-hugo-site" class="box">
    <h5>Hugo Site</h5>
    <p>An example Hugo site published in a Bucket.</p>
  </a>
</div>

## Overview

### Initialize your Bucket

If you are building a static site with an engine such as Jekyll or Gatsyb, or even React you will want to initialize your Bucket in the root of the project, not in the build folder. Your project might look like this.

```bash
ls ./
build        package.json        src
```

In this case, we are building the raw site code in `src` into the `build` folder. We should initialize the Bucket at the root of the project.

```bash
tt bucket init
```

### Push your Bucket

Now, pushing your Bucket is simple. After you build your project so that `build` contains the latest version of your site ready to deploy you run the `bucket push` command.

```bash
tt bucket push build/ .
```

That's it! Your site is now available on the free subdomain and over IPNS. You can easily integrate it into your own DNS using DNSLink.

## DNSLink

You can use Buckets to host websites from your own domain using [DNSLink](https://docs.ipfs.io/guides/concepts/dnslink/). The easiest way to do this is using your Bucket's IPNS link. On [Cloudflare](https://cloudflare.com) for example, your updated DNS records should look like the following.

```bash
CNAME    <site>    www.cloudflare-ipfs.com
TXT    _dnslink.<site>    dnslink=/ipns/<bucket ipns link>
```

<br>
