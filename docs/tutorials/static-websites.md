Buckets make it simple to publish websites using IPFS. If you are using a static site builder such as [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.org/), [Hugo](https://gohugo.io/), or [Mkdocs](https://www.mkdocs.org/) you can add Buckets to your build steps for both staging and production site hosting.

## Site builder tutorials

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

## Automation and deployment (CI/CD)

Buckets are an ideal tool for persisting your website, source code, or documentation on IPFS using continuous integration. Tools like Travis CI, CircleCI, and GitHub Actions all make it possible to do very easily.

If you kepe your website source code on GitHub, we have provided a configurable [GitHub Action](https://github.com/marketplace/actions/textile-buckets) that allows you to automatically push updates to your Bucket whenever your website changes.

View the [Textile Buckets GitHub Action](https://github.com/marketplace/actions/textile-buckets).

## Resources

### Domain Name Management

<div class="txtl-options">
  <a href="https://fleek.co/" target="_blank" class="box">
    <h5>Fleek</h5>
    <p>Fleek offers domain management tools and soon, Bucket support.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://blog.cloudflare.com/distributed-web-gateway/" target="_blank" class="box">
    <h5>Cloudflare</h5>
    <p>Easily add your Bucket IPNS address to Cloudflare with DNSLink.</p>
  </a>
  <span class="box-space"> </span>
  <span class="box-fill">
  </span>
</div>

### Network Replication

Your website may be one of your most important assets on IPFS. Why not pin it on multiple infrastructure providers for added network speed.

<div class="txtl-options">
  <a href="https://pinata.cloud/" target="_blank" class="box">
    <h5>Pinata</h5>
    <p>Simple and easy to use, Pinata offers a great pinning API for IPFS.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://infura.io/" target="_blank" class="box">
    <h5>Infura</h5>
    <p>Seasoned builders of API portals for the dWeb, pin with confidence on Infura.</p>
  </a>
  <span class="box-space"> </span>
  <a href="https://temporal.cloud/" target="_blank" class="box">
    <h5>Temporal</h5>
    <p>Get the stopwatch out, Temporal is your pinning service with speed on the brain  .</p>
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
