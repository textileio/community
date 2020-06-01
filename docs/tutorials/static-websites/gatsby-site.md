[Gatsby](https://www.gatsbyjs.org/) is an open source, free, and easy to use static site builder. Gatsby uses React and helps you deploy your website or app as a [progressive web app](https://web.dev/progressive-web-apps/) with the smallest amount of effort. 

Gatsby allows you to write your content in Markdown and then compile it to HTML with a command-line tool. When you compile your website, Gatsby will create a single folder containing your final website. When you add that folder to a Textile Bucket, you can simultaneously publishing your Gatsby site to [IPFS](https://ipfs.io/), [IPNS](https://docs.ipfs.io/guides/concepts/ipns/), and HTTP.

## Getting started

The rest of this post assumes that you have a basic familiarity with Gatsby. If you don't, at a minimum, you'll need to complete the [Gatsby Quickstart](https://www.gatsbyjs.org/docs/quick-start/). You should now have a basic webpage setup with Gatsby. If you have run `gatsby develop`, you should be able to see your website at http://localhost:8000.

## Building your website

When you run your website on your computer, Gatsby will dynamically render HTML from the Markdown you write. When you are ready to publish your website to the world, you need to build your website. By default, Gatsby will build your site into a folder `public`. The content of `public` is what you'll want to publish to your Bucket.

## Publish your Bucket

First, you'll need to login to Textile and initialize a Project in the root of your Gatsby folder.

1. Download and install Textile CLI (see [installation](../../hub/accounts.md)).
2. Init and login to Textile (see [account intro](../../hub/accounts.md)).
3. CD into your Jekyll directory and initialize a Bucket with `textile bucket init`.
4. Build your site with `gatsby build`.

That's it! You can now view the content of your Bucket on the free domain, on the Gateway, or using IPNS.
