The Android SDK is designed to work in Android mobile apps written in Java or Kotlin.

Apps running the Android SDK run an on device Textile peer (including a managed [IPFS](https://ipfs.io) peer). The SDK provides you with a number of helpful APIs to manage sharing, contacts, file encryption & storage, and much more.

Below are some basic examples to get you started. If you are interested in a more thorough walk-through, check out the [Tour of Textile's](/a-tour-of-textile) examples using Java or jump to the full [API documentation](https://textileio.github.io/android-textile/) if you are ready.

## Installation

The Textile Android library is published in [Textile's Bintray Maven repository](https://dl.bintray.com/textile/maven). The library source is [published on GitHub](https://github.com/textileio/android-textile).

#### Gradle

First, you'll need to add Textile's Bintray Maven repository to you project's top level `build.gradle` in the `allProjects.repositories` section:

```cmd
allprojects {
    repositories {
        ...
        maven { url "https://dl.bintray.com/textile/maven" }
        ...
    }
}
```

Next, add the Textile dependency to your app module's `build.gradle` `dependencies` section, specifying the [latest version available](https://bintray.com/textile/maven/textile/_latestVersion):

```cmd
dependencies {
    ...
    implementation 'io.textile:textile:0.1.20'
    ...
}
```

## Getting Started

### Initialize Textile

Then, in your application’s `MainActivity.java`, setup Textile as follows,

```Java
{{core.setup.android.code}}
```

By default, the Textile instance will manage itself during app life-cycle events as long as you initialize it correctly in your app, meaning your app will be connected to the IPFS network whenever your app requires it.

### Get the account display name

```Java tab="Android"
{{profile.name.android.code}}
```

### Subscribe to file updates

```Java tab="Android"
{{subscribe.files.android.code}}
```

### Subscribe to raw ipfs pubsub topic

```Java tab="Android"
{{ipfs.pubsub_sub.android.code}}
```

### Fetch chronological thread updates

```Java tab="Android"
{{examples.my_runs.feed.android.code}}
```

### Create a thread

```Java tab="Android"
{{threads.add.android.code}}
```

### Add a file

```Java tab="Android"
{{examples.my_runs.add_location_data.android.code}}
```

#### Files stored on disk

You can add files stored on disk by passing the path information.

```Java tab="Android"
{{files.add.android.code}}
```

### Get a file

```Java tab="Android"
{{files.get_.android.code}}
```

## Example application

The [android-textile repo](https://github.com/textileio/android-textile) contains a simple [code example](https://github.com/textileio/android-textile/tree/master/app) you may find useful in your exploration.

## API Documentation

The full API documentation for Textile's Android SDK (android-textile) can be found at https://textileio.github.io/android-textile.

Feel free to join the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas.

<br>
