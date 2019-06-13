!!! Warning

The desktop tray is very new and should be considered unstable until further notice.

Textile provides a "tray" (or taskbar) application, which can manage one or more account peers for your laptop or desktop. Using a [client library](/clients), other desktop or web applications can be quickly built on top of the running peer's localhost HTTP API.

The tray will soon ship with [Photos Desktop](https://github.com/textileio/photos-desktop) pre-installed, as the first "app". Please [contact us](mailto:contact@textile.io) if you'd like to learn more about developing against Textile Desktop.

!!! Tip

    The tray can be paired with your other account peers running on your other devices. After the initial pairing, your threads will auto-magically stay in sync.

## Install

Download and extract the [latest release](https://github.com/textileio/desktop/releases/latest) for your OS and architecture.

### macOS and Linux:

    tar xvfz Textile_$VERSION_$OS-$ARCH.tar.gz

Move `Textile` into your application folder.

### Windows

Extract the zip file and move `Textile.exe` into your applications folder.

## Run

Double-click the application. After a few moments, you should see the Textile icon in your taskbar. Click it to reveal the tray's UI.

![](/images/tray_welcome.png){: .center}

Existing accounts will appear in the dropdown menu. Click "New" to initialize a new account.

Textile uses a hierarchical deterministic (HD) wallet to derive account keys from a set of unique words, called a [mnemonic phrase](https://en.bitcoin.it/wiki/Seed_phrase). Read more about the wallet [here](/concepts/the-wallet).

Every key "inside" an HD wallet can be derived from this mnemonic phrase. Effectively, the wallet _is_ the mnemonic phrase. So, by clicking "Create" on this screen, you are creating an entirely new and unique wallet. By default, the tray app will use the first account key in the wallet to initialize an account peer. However, a wallet can derive an infinite number of account keys.

You can optionally add a password that will be required along with your mnemonic phrase when accessing the wallet's account keys. If supplied, this same password will be used to encrypt the account peer's datastore _at rest_. The datastore _will not_ be encrypted if the password field is left blank.

The "Refresh" button simply re-generates the wallet. You can do this as many times as you like.

![](/images/tray_account.png){: .center}

Once you're signed into an account, set a global avatar and display name for your peer. You can click "Threads" to preview the datasets accessible by your peer. The "Sync" button searches for and syncs with other peers that share your account key.

Lastly, registering your peer with an always-online cafe is highly recommended. See [this section](/a-tour-of-textile#register-with-a-cafe) of the tour for details.

![](/images/tray_cafes.png){: .center}

Click "Messages" to manually query your cafe(s) for new messages that may have been received from others when your peer was offline or otherwise unreachable. This is also automatically done on an interval.

!!! success

    You're up and running with the desktop tray! Now you're ready to start the [tour](/a-tour-of-textile)!

<br>
