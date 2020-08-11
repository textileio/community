# User Mailboxes

The Hub user APIs provide mechanisms for sending and receiving messages between Hub users. Mailboxes are built on ThreadDB.

Visit the [GoDoc](https://pkg.go.dev/github.com/textileio/textile/mail/local?tab=doc) or [JavaScript Users doc](https://textileio.github.io/js-hub/docs/hub.users) for a complete list of methods and more usage descriptions.

## Mailboxes, Identity, and Encryption

User mailboxes are designed to be used with private key based identities. You can read more about creating basic PKI identities in our [tutorial](./../tutorials/hub/pki-identities.md). It is important that you keep these mailboxes secure by encrypting messages between your users, ideally using their keypairs, so the API clients will handle encryption and decryption for you automatically.

### How Message Inboxing Works

#### Sending

1. Your app creates a new user using their identity and your Hub API key.
2. Your app user authors a new message for a contact, based on the remote contact's public key.
3. Your app user encrypts the message using the remote users public key (encyption is handled by Hub library).
4. You app sends the message to the remote user's inbox

#### Receiving

1. You app user checks their Hub inbox using your API key.
2. Your user can pull any available messages (latest or using simple filters).
3. Any message body will be encrypted, so will require to decrypt the message using their private key.
4. User can then read and verify the message came from the recipient.

### Creating mailboxes

A user's mailbox needs to be initiated by them (through your app) before other users can begin sending them messages. We suggest you do this as part of the onboarding steps in your app. You can read about this creation process in [Go here](https://github.com/textileio/textile#creating-a-mailbox) and in [JavaScript here](https://textileio.github.io/js-hub/docs/hub.users).

### Using inboxes and sentboxes

After a mailbox is set up you can now add the following methods to your application:

* Get existing mailbox. [Golang](https://github.com/textileio/textile#getting-an-existing-mailbox) [JavaScript](https://textileio.github.io/js-hub/docs/hub.users.getmailboxid).
* Send messages. [Golang](https://github.com/textileio/textile#sending-a-message) [JavaScript](https://textileio.github.io/js-hub/docs/hub.users.sendmessage).
* Watch inbox. [Golang](https://github.com/textileio/textile#watching-for-new-messages) [JavaScript](https://textileio.github.io/js-hub/docs/hub.users.watchinbox).

And more!

### Message encryption and signing

Messages are encypted using the recipient's ed2559 public key, meaning that the body of the message can only be read by the private key holder. 

Read more about the identity utilities in the [identity tutorial](../tutorials/hub/pki-identities.md).

Some methods you will find useful include:

* [PrivateKey Identities](https://textileio.github.io/js-hub/docs/hub.privatekey)
* [Encryption by PublicKey](https://textileio.github.io/js-hub/docs/hub.publickey.encrypt)
* [Decrypt by PrivateKey](https://textileio.github.io/js-hub/docs/hub.privatekey.decrypt)
* [Sign by PrivateKey](https://textileio.github.io/js-hub/docs/hub.privatekey.sign)
