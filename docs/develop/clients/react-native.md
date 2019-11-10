Textile's React Native SDK is designed to work on iOS and Android devices in app's built with [React Native](https://facebook.github.io/react-native/).

## Installation

The React Native SDK is published as an [NPM Package](https://www.npmjs.com/package/@textile/react-native-sdk). You are free to use the [source code](https://github.com/textileio/react-native-sdk) directly or use a package manager to install the official release.

#### NPM

```JavaScript
npm install @textile/react-native-sdk
```

#### Yarn

```JavaScript
yarn add @textile/react-native-sdk
```

### Android Setup

#### Including maven repo

You'll need to include a new entry into your `repositories` found in `android/build.gradle`. The repository entry you need to include is (specifically the new `maven` entry):

```Java
allprojects {
    repositories {
      ...
      maven {
          url "https://dl.bintray.com/textile/maven"
      }
      ...
    }
}
```

Next, you'll need to add the SDK to your `android/settings.gradle` and `android/app/build.gradle`.

#### Add React Native SDk to build.gradle

Inside of `android/app/build.gradle` add the following entry into the `dependencies` object,

```Java
dependencies {
    ...
    implementation project(':@textile_react-native-sdk')
    ...
}
```

#### Add React Native SDK to settings.gradle

Inside of `android/settings.gradle` include the SDK module,

```Java
...
include ':@textile_react-native-sdk'
project(':@textile_react-native-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/@textile/react-native-sdk/android')
...
}
```

### iOS Setup

The iOS half of the React Native SDK will rely on Cocoapods to manage the library in your code. For now, we use Cocoapods to help keep the dependency management clear in client apps, in the future we will work to make it easy to link without Cocoapods.

!!! Tip

    If your app isn't already setup for Cocoapods, we recommend this nice overview of using Cocoapods in React Native projects, [Demystifying react-native modules linking](https://engineering.brigad.co/demystifying-react-native-modules-linking-ae6c017a6b4a).

Edit your podfile by opening up `ios/Podfile` and adding the following line,

```bash
target '<your-app-name>' do
  ...
  pod 'textile-react-native-sdk', :path => '../node_modules/@textile/react-native-sdk'
  ...
end
```

Save the file and run install.

```bash
cd ios/
pod install
```

## TypeScript

We strongly recommend using [TypeScript](https://www.typescriptlang.org/) if you plan to use the React Native SDK in your project. The React Native SDK's endpoints are all typed and those types are available to projects that support them. Because Textile libraries are rapidly developing, this will make your upgrade process much easier and faster.

If you don't normally use TypeScript in your projects, never fear, it will be very familiar and only takes a few steps to setup.

!!! tip

    We recommend [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) as a good place to start if you are totally new to TypeScript.

## Getting Started

### Initializing the Textile Wallet

To start using the mobile Textile peer your app needs to initialize the local wallet. A wallet can be generated from scratch or you can allow the user to pair your app with their existing Textile account. We recommend that you only support pairing, but we'll show you both methods so you can experiment with the right setup on your own.

#### Creating wallet from scratch

!!! Warning

    Mobile apps that use the React Native SDK (or one of our native libraries) run on-device Textile peers for their users. On-device peers require that the users pair the app with their primary account (see the [Tour of Textile](/a-tour-of-textile)). We recomment encouraging your users to pair with an external account during onboarding, as migrating their primary wallet out of an app later will be challenging (and is not supported yet!).

```JavaScript
{{core.init.react_native.code}}
```

#### Initialize with a paired account

```JavaScript
{{core.pair.react_native.code}}
```

Once a local account is paired, you don't need to pass the pairing key on every startup. Because the account data is now local, you can simply re-initialize.

```JavaScript
{{core.reinit.react_native.code}}
```

Below are some basic examples to get you started. If you are interested in a more thorough walk-through, check out the [Tour of Textile's](/a-tour-of-textile) examples using the React Native SDK.

### Get the account display name

```JavaScript
{{profile.name.react_native.code}}
```

### Subscribe to file updates

```JavaScript
{{subscribe.files.react_native.code}}
```

### Subscribe to raw ipfs pubsub topic

```JavaScript
{{ipfs.pubsub_sub.react_native.code}}
```

### Create a thread

```JavaScript
{{threads.add.react_native.code}}
```

### Add a file

```JavaScript
{{files.add.react_native.code}}
```

### Boilerplate app

You can clone the [react-native boilerplate](https://github.com/textileio/advanced-react-native-boilerplate) if you want to run a development app and start playing with the library right away. Be sure to check the Textile API in the boilerplate to know if it is currently up to date with the latest release of the SDK.

## API Documentation

You can read the full API Documentation for Textile's React Native SDK (react-native-sdk) at https://textileio.github.io/react-native-sdk.

Feel free to join the [Textile Developer Slack](https://slack.textile.io/) and let us know what you are building. People are always excited to share and learn about new ideas.

<br>
