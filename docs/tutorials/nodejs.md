# Building with NodeJS

There aren't many differences when using Textile's JavaScript libraries with NodeJS, except one, most of of the APIs exposed (Buckets daemon, Threads daemons, and the Hub) do so over WebSockets. WebSockets are baked into every major browser, but don't come with NodeJS by default, so we'll have to add them.

## Adding WebSockets to NodeJS

The easiest solution to make all libraries compatible is to add WebSockets to the global namespace.

**Install**

We'll use the [`isomorphic-ws`](https://www.npmjs.com/package/isomorphic-ws) library to add WebSockets to our Node app.

```bash
npm install --save isomorphic-ws ws
```

**Setup**

You can now just add WebSockets to the global namespace in your apps. Add this to the first line in your `js` or `ts` files, usually `index.js` or `main.js` or similar.

In TypeScript:

```typescript
;(global as any).WebSocket = require('isomorphic-ws')
```

In JavaScript:

```javascript
;global.WebSocket = require('isomorphic-ws')
```

## Start building

That's it, now start building the full suite of Textile tools. Check out the [app building tutorials](hub/web-app.md) for ideas.
