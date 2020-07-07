# User Buckets

In this tutorial, we'll walk through the key steps to building file hosting and sharing on IPFS into your application. To do it, we'll use Buckets and we'll use an example that allows users of your app to post photo galleries to IPFS, IPNS, and HTTP using Buckets.

## Getting Started

There are a few resources you'll need before you start writing code.

- [A new Typescript web app](https://webpack.js.org/guides/typescript/). We recommend using Typescript, as Textile libraries are in a period rapid of development and type detection is valuable during upgrades.
- You should already be familiar with how to create user identities and how to generate API keys.

## Initialize Buckets

In your app, there are two items you will regularly use when building on Buckets. The first is the [Buckets class](https://textileio.github.io/js-hub/docs/hub.buckets) object where you will initialize a new session for your user and call various bucket methods. The second is the `key` of any bucket you want to interact with regularly, since you will need to tell the API which Bucket you are acting on.

So, to get started in our app, we are going to do three things at once.

1. Create a new Bucket object.
2. Create or fetch the existing bucket of interest by name.
3. Get the key of the bucket.

```typescript
import { Buckets, Identity, KeyInfo } from '@textile/hub'

const setup = async (key: KeyInfo, identity: Identity) => {
  // Use the insecure key to setup a new session
  const buckets = await Buckets.withKeyInfo(key)
  // Authorize the user and your insecure keys with getToken
  await buckets.getToken(identity) 

  const root = await buckets.open('io.textile.dropzone')
  if (!root) {
    throw new Error('Failed to open bucket')
  }
  return {
      buckets: buckets, 
      bucketKey: root.key
  }
}
```

## Create a photo index

If you are going to allow your users to upload images, or files, that may become more than a few, it can be helpful to track metadata in an index. In our final example, we resample the photos on the fly, storing multiple sizes for better display performance. We track all those files with a simple JSON index in the root of our bucket. It would be better to store that index right in the user's Thread! But we wanted to keep this tutorial basic.

```typescript
import { Buckets, Identity } from '@textile/hub'

const initIndex = async (buckets: Buckets, bucketKey: string identity: Identity) => {
  // Create a json model for the index
  const index = {
    author: identity.public.toString(),
    date: (new Date()).getTime(),
    paths: []
  }
  // Store the index in the Bucket (or in the Thread later)
  const buf = Buffer.from(JSON.stringify(index, null, 2))
  const path = `index.json`
  await buckets.pushPath(bucketKey, path, buf)
}
```

Now, you can update the paths each time you add new images to the bucket. In our example, we add 4 files for every image, full res, medium res, thumbnail, and metdata. We also update the paths with a link to the file's own metadata on each update. In this way, an app can load just the single list of metadata and decide what to display.

## Create a public view

Buckets are cross-protocol objects, meaning you can use them in IPFS, IPNS or HTTP. If you want to create a public view of bucket over HTTP, you should add an `index.html` to the root. In our example, we add an `index.html` that knows how to parse and display files based on the `./index.json` stored above, in the same bucket.

```typescript
import { Buckets, Identity } from '@textile/hub'

const addIndexHTML = async (buckets: Buckets, bucketKey: string html: string) => {
  // Store the index.html in the root of the bucket
  const buf = Buffer.from(html)
  const path = `index.html`
  await buckets.pushPath(bucketKey, path, buf)
}
```

## Push files

You are now ready to start pushing your files to the bucket. You can push each binary file to a specific path in the bucket using `pushPath`.

```typescript
import { Buckets, PushPathResult } from '@textile/hub'

insertFile(buckets: Buckets, bucketKey: string, file: File, path: string): Promise<PushPathResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = () => reject('file reading was aborted')
    reader.onerror = () => reject('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      // Finally, push the full file to the bucket
      buckets.pushPath(bucketKey, path, binaryStr).then((raw) => {
        resolve(raw)
      })
    }
    reader.readAsArrayBuffer(file)
  })
}
```

At this point, we also update our `index.json` with the new file. 

#### Example on GitHub

```bash
git clone git@github.com:textileio/js-examples.git
cd js-examples/hub-browser-auth-app
```

<div class="txtl-options half">
  <a href="https://github.com/textileio/js-examples/tree/master/hub-browser-auth-app" class="box">
    <h5>Explore the repo</h5>
    <p>Try out the gallery app build with dropzone.js and buckets</p>
  </a>
</div>

<br />
