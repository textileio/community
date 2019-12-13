The iOS SDK is designed to work in iOS mobile apps written in Objective-C or Swift.

Apps running the iOS SDK run an on device Textile peer (including a managed [IPFS](https://ipfs.io) peer). The SDK provides you with a number of helpful APIs to manage sharing, contacts, file encryption & storage, and much more.

Below are some basic examples to get you started. If you are interested in a more thorough walk-through, check out the [Tour of Textile's](/a-tour-of-textile) examples using Swift or Objective-C or jump to the full API documentation if you are ready.

## Installation

The iOS is published as a [pod on CocoaPod.org](https://cocoapods.org/pods/Textile). The library is also [published on GitHub](https://github.com/textileio/ios-textile).

#### CocoaPods

If you haven't already, you'll need to [setup CocoaPods in your project](https://guides.cocoapods.org/using/using-cocoapods.html). Next, add Textile to your project.

```cmd
pod 'Textile'
```

This will install the latest version of the SDK into your app.

#### Carthage (experimental)

Carthage support is minimally tested today, but if you are a Carthage user and would like to try, we'd love a PR here to update this process.

```cmd
github "textileio/ios-textile"
```

There you'll need two dependencies that are the Protobuf library from Google and the Textile Core iOS library [available on our releases page](https://github.com/textileio/go-textile/releases). You can see how those are handled in our [CocoaPods setup](https://github.com/textileio/ios-textile/blob/master/Textile.podspec#L18).

## Getting Started

### Initialize Textile

#### Objective-C

Then in your application delegate’s - application:didFinishLaunchingWithOptions: method, setup Textile as follows,

```Objective-C
{{core.setup.objc.code}}
```

#### Swift

```Swift
{{core.setup.swift.code}}
```

By default, the Textile instance will manage itself during app life-cycle events as long as you initialize it correctly in your app, meaning your app will be connected to the IPFS network whenever your app requires it.

### Get the account display name

```Objective-C tab="Objective-C"
{{profile.name.objc.code}}
```

```Swift tab="Swift"
{{profile.name.swift.code}}
```

### Subscribe to file updates

```Objective-C tab="Objective-C"
{{subscribe.files.objc.code}}
```

```Swift tab="Swift"
{{subscribe.files.swift.code}}
```

### Subscribe to raw ipfs pubsub topic

```Objective-C tab="Objective-C"
{{ipfs.pubsub_sub.objc.code}}
```

```Swift tab="Swift"
{{ipfs.pubsub_sub.swift.code}}
```

### Fetch chronological thread updates

```Objective-C tab="Objective-C"
{{examples.my_runs.feed.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.feed.swift.code}}
```

### Create a thread

```Objective-C tab="Objective-C"
{{threads.add.objc.code}}
```

```Swift tab="Swift"
{{threads.add.swift.code}}
```

### Add a file

```Objective-C tab="Objective-C"
{{examples.my_runs.add_location_data.objc.code}}
```

```Swift tab="Swift"
{{examples.my_runs.add_location_data.swift.code}}
```

#### Files stored on disk

You can add files stored on disk by passing the path information.

```Objective-C tab="Objective-C"
{{files.add.objc.code}}
```

```Swift tab="Swift"
{{files.add.swift.code}}
```

### Get a file

```Objective-C tab="Objective-C"
{{files.get_.objc.code}}
```

```Swift tab="Swift"
{{files.get_.swift.code}}
```

## Example application

The [ios-textile repo](https://github.com/textileio/ios-textile) contains a simple [code example](https://github.com/textileio/ios-textile/tree/master/Example) you may find useful in your exploration.

## API Documentation

The full API documentation for Textile's iOS SDK (ios-textile) can be found at https://textileio.github.io/ios-textile.

Feel free to join the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas.

<br>
