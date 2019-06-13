![Textile Notes](/images/textile-notes-panels.png)

Documents come in many different formats and rely on many different standards. Textile remains flexible enough for your application to write or read any document your user wants to store. Below, we walk through how to think about each of these cases generally. Then we show an example of building on the popular note storage schema used [Slate](https://docs.slatejs.org/) and all the note-taking apps that use it.

## Get Started

Document connectors are use-case specific. However, there are many cases where applications want to store PDFs or other formats for their users. These often fall into specific connectors (e.g., purchasing or receipts for PDFs). Let's look quickly at how you can leverage Textile to connect to one of the popular notes formats used by many apps. We are going to jump right in, so if any of the below does not sound familiar, be sure to read over the [Tour of Textile](/a-tour-of-textile).

## The Slate Notes Schema

We are focusing on the [note storage schema](https://docs.slatejs.org/guides/schemas) used by Slate. The schema is simply this,

```JSON
{
  "document": Object,
  "blocks": Object,
  "inlines": Object,
  "rules": Array,
}
```

And so may result in a document that looks more like this,

```JSON
{
  "document": {
    "nodes": [
      {
        "match": { "type": "paragraph" }
      }
    ]
  },
  "blocks": {
    "list": {
      "nodes": [{
        "match": { "type": "item" }
      }]
    },
    "item": {
      "parent": { "type": "list" }
    }
  },
  "inlines": {
    "emoji": {
      "isVoid": true,
      "nodes": [{
        "match": { "object": "text" }
      }]
    }
  }
}
```

Any application using the Slate library is already using a variant of the schema shown above and so can store a user's notes (or other documents) in a way that other apps can make use of them (new UI, collaborative interfaces, etc.).

## Slate thread schema

The first thing we need to do is take the above Slate schema for documents and format it as a Textile JSON schema. Here is what that looks like, with each of the primary elements in the Slate document defined as properties of the JSON object.

```JSON
{
  "name": "slatejs",
  "mill": "/json",
  "plaintext": true,
  "pin": true,
  "json_schema": {
    "$id": "https://example.com/slatejs.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Hash Optimized Slate.js Schema",
    "description": "Slate.js Schema Files.",
    "required": [],
    "type": "object",
    "properties": {
      "document": {
        "type": "object"
      },
      "blocks": {
        "type": "object"
      },
      "inlines": {
        "type": "object"
      },
      "rules": {
        "type": "array"
      }
    }
  }
}
```

We can save that JSON file as `slate.json` to use for creating a thread below.

## Create a Slate thread

You can now use the above schema to quickly create Textile threads that are interoperable with other apps using the Slate library for document editing.

Here's how we create our app's new thread.

```tab="cmd"
{{connectors.documents.add_slate.cmd.code}}
```

```JavaScript tab="JS HTTP"
{{connectors.documents.add_slate.js_http_client.code}}
```

```JavaScript tab="React Native"
{{connectors.documents.add_slate.react_native.code}}
```

```ObjectiveC tab="Objective-C"
{{connectors.documents.add_slate.objc.code}}
```

```Swift tab="Swift"
{{connectors.documents.add_slate.swift.code}}
```

```Java tab="Android"
{{connectors.documents.add_slate.android.code}}
```

### Public notes

The schema above used the `plaintext: true` option, meaning that all each note shared to a thread will not be encrypted. This can be useful for interoperability, giving you ways to allow your user to open their documents in apps not connected to Textile.

If your app requires fully private notes, remove this option, or set it to `false`

## Adding new notes

Here, let's look at how a Slate document can be converted into JSON and stored in our thread.

```JavaScript tab="JS HTTP"
{{connectors.documents.add_slate_note.js_http_client.code}}
```

Using Slate's built-in JSON converter, you can extract a JSON document from your users live notes and store them in a Textile thread.

### Connect to existing photo threads

If your app can display Slate notes, you can now request access to other apps that are using the Slate schema and display a user's other notes in your app.

## Cafe Sync & Recovery

A critical component of the image & media connector is the ability for your users to recover their data in the future. Threads can be easily backed up by registering your app with a live cafe or by encouraging your users to manage their cafe subscriptions.

When a user joins your app, either new or by linking their existing Textile wallet, you can provide a cafe for app-specific thread storage. [Read our instructions on Cafe setup](/install/the-daemon/#initialize-a-cafe-peer) or try out [our developer instances](/concepts/cafes/#try-one) immediately.

## Apps & demos

There are a few apps that are using document connector already. The [Textile Notes mobile](https://medium.com/textileio/textile-notes-a-minimalist-tool-for-your-creative-ideas-68b9357d5cd0) and [desktop apps](http://github.com/textileio/notes-desktop) are two. You can also browse the source code for both of those apps to understand how they connect to and create a user's photo streams. Another up and coming document supporting app to check out is [the Epona app](https://getepona.com/).

<br>
