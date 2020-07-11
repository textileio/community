[Jekyll](https://jekyllrb.com) is one of the most popular static website building frameworks around. Bonus, Jekyll is also open-source and free. Jekyll allows you to write your content in Markdown and then compile it to HTML with a command-line tool. When you compile your website, Jekyll will create a single folder containing your final website. When you add that folder to a Textile Bucket, you can simultaneously publishing your Jekyll site to [IPFS](https://ipfs.io/), [IPNS](https://docs.ipfs.io/guides/concepts/ipns/), and HTTP.

## Getting started

The rest of this post assumes that you have a basic familiarity with Jekyll. If you don't, at a minimum, you'll need to complete the Jekyll [Quickstart](https://jekyllrb.com/docs/) tutorial. You should now have a basic webpage setup with Jekyll. If you have run bundle exec `jekyll serve`, you should be able to see your website at http://localhost:4000.

## Building your website

When you run your Jekyll site on your computer, Jekyll will dynamically render HTML from the Markdown you write. When you are ready to publish your website to the world, you need to build your website. By default, Jekyll will build your site into a folder `_site`. The content of `_site` is what you'll want to publish to your Bucket.

## Publish your Bucket

First, you'll need to login to Textile and initialize a Project in the root of your Jekyll folder.

1. Download and install Textile CLI (see [installation](../../hub/accounts.md)).
2. Init and login to Textile (see [account intro](../../hub/accounts.md)).
3. Build your site with Jekyll build.
4. CD into your Jekyll `_site` directory and initialize a Bucket with `textile bucket init`.

Now, you are ready to push your Bucket.

```bash
textile buckets push
```

That's it! You can now view the content of your Bucket on the free domain, on the Gateway, or using IPNS.
