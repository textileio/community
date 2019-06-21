![IPFS Tag](/images/game_tag.png)

Build the next decentralized game using any of Textile's SDKs. The Textile SDKs and game connectors allow developers to create new real-world and digital experiences using the IPFS network, Textile user profiles, shared databases, and secure communications.

## Get Started

To demonstrate some of the capabilities of the Textile SDK for game development, we've provided a decentralized game example, IPFS Tag.

IPFS Tag uses Textile to allow a group of in-person users to create and join a real-world game of tag. Textile allows each participant to create an identity, join the game, chat, see current game state, and play. 

IPFS Tag was implemented using Textile's React Native SDK, and we've also created a live workshop that uses only shell and the Textile Daemon (no mobile components needed). Here, we'll walk through each of the data connectors used to build the game, focusing on the mobile variant.

## In-game profiles

IPFS Tag keeps profiles light-weight, only requiring a display name for each user. To create a profile, the game uses the Textile Account tools, just like Textile Photos and other apps, but skips selection, since the game won't be displaying those images.

![Textile Profile](/images/connectors/games/profile.png)

```tab="cmd"
{{profile.set_name.cmd.code}}
```

```JavaScript tab="JavaScript"
{{profile.set_name.js_http_client.code}}
```

```JavaScript tab="React Native"
{{profile.set_name.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{profile.set_name.objc.code}}
```

```Swift tab="Swift"
{{profile.set_name.swift.code}}
```

```Java tab="Android"
{{profile.set_name.android.code}}
```

??? success

    ```
    ok
    ```

Textile profiles come configured with cryptographic identity and verification tools. This means that an app can quickly verify that a user is who they claim to be and that user genuinely created any transaction. This helps verify the source of new activities and ensuring all players are playing by the rules of your game!

### Avatars

Avatars are a must in so many games. Using the Textile profile APIs, your app can easily help users change their usernames and avatars and update the rest of the gamers with that data.


```tab="cmd"
{{profile.set_avatar.cmd.code}}
```

```JavaScript tab="JavaScript"
{{profile.set_avatar.js_http_client.code}}
```

```JavaScript tab="React Native"
{{profile.set_avatar.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{profile.set_avatar.objc.code}}
```

```Swift tab="Swift"
{{profile.set_avatar.swift.code}}
```

```Java tab="Android"
{{profile.set_avatar.android.code}}
```

??? success

    ```
    ok
    ```

### Global contact index

Help your users find one-another by leveraging Textile's decentralized search index of contacts.

```tab="cmd"
{{contacts.search.cmd.code}}
```

```JavaScript tab="JavaScript"
{{contacts.search.js_http_client.code}}
```

```JavaScript tab="React Native"
{{contacts.search.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{contacts.search.objc.code}}
```

```Swift tab="Swift"
{{contacts.search.swift.code}}
```

```Java tab="Android"
{{contacts.search.android.code}}
```

??? success

    ```JSON
    {
        "id": "P8FxdgZ1rWxaQ4DrmMBADuYTz4XGpQeThJYxfL2X4WN89hP8",
        "date": "2019-04-12T21:41:28.071460350Z",
        "value": {
            "@type": "/Contact",
            "address": "P8FxdgZ1rWxaQ4DrmMBADuYTz4XGpQeThJYxfL2X4WN89hP8",
            "name": "devandrewwww",
            "avatar": "QmQwmPninpCRdkAhbPwKaf7hAUwkTb2wiwupcgnsMp5yW5",
            "peers": [
                /* ... */
            ]
        }
    }
    {
        "id": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
        "date": "2019-02-08T02:59:35.082729740Z",
        "value": {
            "@type": "/Contact",
            "address": "P8rW2RCMn75Dcb96Eiyg8mirb8nL4ruCumvJxKZRfAdpE5fG",
            "name": "andrew knees and toes, knees and toes",
            "avatar": "QmRLnTHdvg4rAh1AKJaHydAZ42sgygLNdvvA7aMwaRY5SK",
            "peers": [
                /* ... */
            ]
        }
    }
    /* ... */
    ```

### User authentication

Textile doesn't force you to use any single authentication system, we encourage you to use what's best for your app. The Textile libraries and data wallet are meant to work well with any user-management system you need to use. The sky is the limit!

## Game state sync

Next, a user will need to create a game, and the state of that game will need to be synchronized between all players. This is handled by a game thread that is generated just for this game. In the demo app, we kept thread configurations minimal, allowing any number of users to be added to the thread later. However, in your game, you may also want to take advantage of read-only permissions for cases where the game creator will be the only one sending game updates to users, or whitelists when all possible members of the thread are known at creation time.

![Globally shared app state in a game of tag](/images/connectors/games/state.png)

!!! info

    Read our [in-depth documentation](/concepts/threads) on threads and how to create them. Also, follow along with our [threads v2 roadmap](/concepts/threads/#v2-roadmap) to learn about what they will be able to do next.


### Create a new database

A game can have any number of threads to be used by players. Each thread can customize properties such as who can read or write, any data that shouldn't be encrypted, who can join, and who can invite new members to the database (to read or write accordingly). For example, to create the game of tag, each new game becomes a new thread that is kept for the duration of the game and any subsequent rematches. In the game of tag, any user can invite new users at any time.


```tab="cmd"
{{connectors.games.add_tag.cmd.code}}
```

```JavaScript tab="JS HTTP"
{{connectors.games.add_tag.js_http_client.code}}
```

```JavaScript tab="React Native"
{{connectors.games.add_tag.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{connectors.games.add_tag.objc.code}}
```

```Swift tab="Swift"
{{connectors.games.add_tag.swift.code}}
```

```Java tab="Android"
{{connectors.games.add_tag.android.code}}
```

The schema we use was designed to allow for basic game events needed in a game of tag. Those included Game Start with Duration, Tag Events, and Rematch Requests. Here's what that basic schema looks like,

#### Schemas

Schemas allow you to define the data model of each thread. By restricting what types or structure of data your app will write, you can ensure everyone is playing by the same set of rules! Here's what the schema looks like for a simple game of tag. 

```JavaScript
const tagSchema = {
  "name": "cmd-line-tag",
  "mill": "/json",
  "json_schema": {
      "title": "CMD Line Tag Mechanics",
      "description": "Possible events in cmd line tag.",
      "type": "object",
      "required": [ "event" ],
      "properties": {
          "event": {
              "type": "string",
              "description": "event type identifier, either tag or start"
          },
          "target": {
              "type": "string",
              "description": "peer-id of the person getting tagged"
          },
          "source": {
              "type": "string",
              "description": "peer-id of the person doing the tagging"
          },
          "duration": {
              "type": "number",
              "description": "game duration, required by start events"
          }
      }
  }
}
```

#### App-based rules and validation

The data schemas and rules about who can read or write data will only go so far for game development, but there is no limit to how you combine them with in-game rule systems. Additionally, you can combine your own rule systems with the cryptographic validation methods available through Textile.

Let's take a look at how we've done this in our example game of tag. In our game of tag, the actual tagging event happens as a new entry in the database. The app itself ensures that the only person that can write a tag event is the person getting tagged. That can be validated by their cryptographic signature.

Using the schema above, we can encode a rule in JavaScript as follows, where we easily ignore any falsified entries in our thread.

```JavaScript
    if (row.event === 'tag' && row.source === row.user.address && actor === row.target) {
        const tagger: IContact = await Textile.contacts.get(row.source)
        const tagged: IContact = await Textile.contacts.get(row.target)
        console.log({
            tagger: tagger,
            tagged: tagged, 
            timestamp: file.date.seconds
        })
    }
```

#### Thread limits

Apps aren't limited to a set number of threads. Developers can easily create ephemeral threads, private app threads, and long-term threads for their users.

## Content distribution

### Levels & assets

Threads also provide a tool to distribute new game content to users. This can be done by creating read-only Threads owned by the app developer and shared to every new game installation. Here is an example of a thread schema designed to allow the developer to distribute content to all the existing subscribers securely.

```JavaScript
const tagSchema = {
  "name": "app-thread",
  "mill": "/json",
  "json_schema": {
      "title": "Levels",
      "description": "In-app content distribution for new levels.",
      "type": "object",
      "required": [ "event" ],
      "properties": {
          "version": {
              "type": "string",
              "description": "A version ID."
          },
          "title": {
              "type": "string",
              "description": "Content title."
          },
          "address": {
              "type": "string",
              "description": "IPFS address of data."
          }
      }
  }
}
```

### Leader boards

Similarly, developers can embed global feeds such as leaderboards, where all members of the game can follow (but not modify) information such as leaders, scores, or achievements. 

## In-game chat

Many games rely on good group-based chat directly available within the game environment. In Textile, every thread you create can host a light-weight, end-to-end encrypted chat among participants with write capabilities. This means you can create chat rooms for small subsets of players or larger groups of players that can enter and leave a channel at any time. 

![IPFS Tag includes a private chat in every game](/images/game_tag.png)

Once a user has been added to a thread, transmitting a chat based message to other members is simple.

```tab="cmd"
{{messages.add.cmd.code}}
```

```JavaScript tab="JavaScript"
{{messages.add.js_http_client.code}}
```

```JavaScript tab="React Native"
{{messages.add.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{messages.add.objc.code}}
```

```Swift tab="Swift"
{{messages.add.swift.code}}
```

```Java tab="Android"
{{messages.add.android.code}}
```

??? success

    ```JSON
    {
        "block": "QmZPWbydtcuZLtbd6cqrLuGSEzSs2C9P1f5nH3Ycu41UfS",
        "body": "hello?",
        "comments": [],
        "date": "2019-04-20T20:55:05.278995Z",
        "likes": [],
        "user": {
            "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
            "avatar": "Qmea7R7cCSSkRZ5Jammj8xvkE44YvjDWz3aBuWm4PNcyf5",
            "name": "Clyde"
        }
    }
    ```

## Build your game today

Have an idea or project you want to build on Textile? Drop us a line on the [Textile Developer Slack](https://slack.textile.io/) channel. We'd be happy to help or to highlight your project to the community.

<br>
