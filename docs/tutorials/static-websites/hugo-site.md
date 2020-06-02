[Hugo](https://gohugo.io/) is a static website development framework written in Go, meaning it's fast. In fact, Hugo claims to be the fastest framework for building websites. Like many of the popular static website frameworks, Hugo allows you to write your content in Markdown and then compile it to HTML with a command-line tool. When you compile your website, Hugo will create a single folder containing your final website. When you add that folder to a Textile Bucket, you can simultaneously publishing your Hugo site to [IPFS](https://ipfs.io/), [IPNS](https://docs.ipfs.io/guides/concepts/ipns/), and HTTP. Here's how.

## Getting started

The rest of this post assumes that you have a basic familiarity with Hugo. If you don't, at a minimum, you'll need to complete the [Hugo Quickstart](https://gohugo.io/getting-started/quick-start/) tutorial. You should now have a basic webpage setup with Hugo. If you have run `hugo server -D`, you should be able to see your website at `http://localhost:1313`.

## Building your website

When you run your site on your computer, Hugo will dynamically render HTML from the Markdown you write. When you are ready to publish your website to the world, you need to build your website. By default, Hugo will build your site into a folder `public`. The content of `public` is what you'll want to publish to your Bucket.

## Publish your Bucket

First, you'll need to login to Textile and initialize a Project in the root of your Hugo folder. 

1. Download and install Textile CLI (see [installation](../../hub/accounts.md)).
2. Init and login to Textile (see [account intro](../../hub/accounts.md)).
3. CD into your Jekyll directory and initialize a Bucket with `textile bucket init`.
4. Build your site with `hugo -D`.

Now, you are ready to push your Bucket.

`textile buckets push public/ .`

That's it! You can now view the content of your Bucket on the free domain, on the Gateway, or using IPNS.
