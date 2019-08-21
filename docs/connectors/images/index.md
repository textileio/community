![Textile Photos](/images/textile-mobile-panels.png)

If you are building a consumer app, it's highly likely you encounter the need to store and retrieve images for your user at some point. The Textile image & media connector is an excellent place for you to start. Textile has already designed a robust system for user photo storage and recovery, and all your app needs to do is plug into it.

## Get Started

Handling images for your users falls generally into two use-cases. First, images need to be store in full-resolution form, typically useful for backup & recovery or editing apps. Second, images need to be formatted for efficient distribution to other users or on the web. Here, we'll walk through setting up each use-case in your app.

## Images & media threads

Threads help a user grant access to their photos & media to new applications, share individual photos to new users, or sync all their data to trusted peers like their desktop or store it encrypted on the cafes.

We covered threads in depth in the [Tour of Textile](/a-tour-of-textile) and in the [Threads Introduction](/concepts/threads/) pages. We recommend reviewing those two documents if you haven't already.

Let's look apps can create new image-based threads in their app or connect to existing ones the user is already maintaining in other apps.

### Create new photo threads

#### Full resolution images

To handle full-res images, your app can connect to existing user threads (such as those created in Textile Photos) or create new ones. Every Textile peer already knows how to create and talk to Threads of this type. Here is how you would create one of these threads in your app.

```tab="cmd"
{{threads.cameraroll_add.cmd.code}}
```

```JavaScript tab="JS HTTP"
{{threads.cameraroll_add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{threads.cameraroll_add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{threads.cameraroll_add.objc.code}}
```

```Swift tab="Swift"
{{threads.cameraroll_add.swift.code}}
```

```Java tab="Android"
{{threads.cameraroll_add.android.code}}
```

The app posting new photos to this thread doesn't need to handle sampling raw images proactively, instead, the Textile peer has the [file milling logic](/concepts/threads/files/#mills) to transform any input image into the output schema. Here's what the schema looks like,

```json
{
    "name": "camera_roll",
    "pin": true,
    "links": {
        "raw": {
            "use": ":file",
            "mill": "/blob"
        },
        "exif": {
            "use": "raw",
            "mill": "/image/exif"
        },
        "thumb": {
            "use": "raw",
            "pin": true,
            "mill": "/image/resize",
            "opts": {
                "width": "320",
                "quality": "80"
            }
        }
    }
}
```

Here are the major ideas of the schema and how to think about them in your app.

-   Input photos will be transformed into 3 files: Raw, EXIF metadata, and thumbnail.
-   Thumbnails will be pinned locally for fast lookup.
-   Raw files will keep the input resolution.
-   Thumbnails will be max 320px wide and have JPEG quality reduction to save storage space.

#### Sharable images

Sharable image threads are optimized for p2p or group sharing of content. Every Textile peer contains a schema (and mill) for handling these kinds of threads, simply named, `media`. You can create a new media thread as follows.

```tab="cmd"
{{threads.media_add.cmd.code}}
```

```JavaScript tab="JS HTTP"
{{threads.media_add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{threads.media_add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{threads.media_add.objc.code}}
```

```Swift tab="Swift"
{{threads.media_add.swift.code}}
```

```Java tab="Android"
{{threads.media_add.android.code}}
```

Like the CameraRoll thread types, Media thread types contain a local file mill that will resample any input image to make it share-ready. Here is what the thread's schema looks like.

```json
{
    "name": "media",
    "pin": true,
    "links": {
        "large": {
            "use": ":file",
            "mill": "/image/resize",
            "opts": {
                "width": "800",
                "quality": "80"
            }
        },
        "small": {
            "use": ":file",
            "mill": "/image/resize",
            "opts": {
                "width": "320",
                "quality": "80"
            }
        },
        "thumb": {
            "use": "large",
            "pin": true,
            "mill": "/image/resize",
            "opts": {
                "width": "100",
                "quality": "80"
            }
        }
    }
}
```

Unlike the CameraRoll schema, you can see that images are resampled into a few different variants but the original, full-resolution file is not maintained. You may also notice that the small format of a Media thread is the same format as the thumbnail in the CameraRoll thread. This can be helpful if you add a photo to multiple threads, as there is the opportunity to deduplicate this content.

### Connect to existing photo threads

In many cases, it is just as easy for your app to connect to a user's existing photo threads. Connecting to an existing stream can give your app the ability to provide value across many more photos or simplify photo selection, editing, or sharing workflows. Requesting permission to a user's existing Media or CameraRoll threads is straightforward in your app and is expected to be released to production in the first half of July. Subscribe to [this Issue](https://github.com/textileio/go-textile/issues/694) to track our progress on the feature.

Beyond improving the experience in your app, leveraging existing user threads can help reduce the overall data you or your users are required to store. IPFS based content addressing allows photos to be shared across all of a user's apps without the need to ever duplicate that content.

## Created unencrypted content

There are some use-cases where media created by a user is best shared in a decrypted format. Every Textile thread supports encrypted raw file content by default, but apps have the ability to create encrypted threads that contain plaintext file content. [Read more about thread encryption here](/concepts/threads/files/#encryption).

## Cafe Sync & Recovery

A critical component of the image & media connector is the ability for your users to recover their data in the future. Threads can be easily backed up by registering your app with a live cafe or by encouraging your users to manage their cafe subscriptions.

When a user joins your app, either new or by linking their existing Textile wallet, you can provide a cafe for app-specific thread storage. [Read our instructions on Cafe setup](/install/the-daemon/#initialize-a-cafe-peer) or try out [our developer instances](/concepts/cafes/#try-one) immediately.

## Apps & demos

There are a couple of apps already using the images & media connector. We recommend downloading the [Textile Photos](https://textile.photos/) mobile (iOS and Android) app or the [desktop](https://github.com/textileio/photos-desktop) app. You can also browse the source code for both of those apps to understand how they connect to and create a user's photo streams.

<br>
