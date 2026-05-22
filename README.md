## Plain HTML Header Injection

### Installation

Put the following code in your website header (between `<head></head>` tags):

```html
<head>
<script async onload="nativelyOnLoad()" src="https://cdn.jsdelivr.net/npm/natively@2.14.0/natively-frontend.min.js"></script>
<script>
function nativelyOnLoad() {
    window.natively.setDebug(true); // To see errors
}
</script>
</head>
```


You can specify an SDK version by replacing version number 2.14.0. The latest version number can be found in this repo. Debug mode which enables native alerts with errors. It's can be very useful while you developing a website.

### Flutter Web iframe mode

When a website is embedded in Flutter Web as an iframe, the website page must load this SDK itself, for example from a CDN script tag or bundled application code. The outer Flutter Web app cannot inject `window.$agent` into a cross-origin iframe.

The SDK supports both native WebView injection and Flutter Web iframe messaging. In native WebViews it calls `window.flutter_inappwebview.callHandler(...)`. When the SDK is running inside an iframe and that native handler is unavailable, it sends the same serialized trigger payload to the parent window with `postMessage`.

### Usage


```javascript
// Elements (with callback from the App)
const notifications = new NativelyNotifications();
const playerId_callback = function(resp) {
    console.log(resp);
    console.log(resp.playerId);
};
notifications.getOneSignalId(playerId_callback);

// Actions (without callback from the App)
window.natively.shareText("Hello world!");
```

### Quick actions

Quick actions are available as a module export and are not registered on `window`.

```javascript
import { NativelyQuickActions } from 'natively';

const quickActions = new NativelyQuickActions();

quickActions.setActions(
    [
        {
            type: 'open_docs',
            title: 'Docs',
            subtitle: 'Open docs',
            url: 'https://example.com/docs',
            is_enabled: true,
        },
    ],
    (resp) => {
        console.log(resp.status);
        console.log(resp.actions);
    },
);

quickActions.clear((resp) => {
    console.log(resp.actions); // []
});
```

API:

```javascript
const quickActions = new NativelyQuickActions();

quickActions.setActions(actions, callback);
quickActions.clear(callback);
```

`setActions(actions, callback)`

- Sends the `quick_actions` runtime event.
- Replaces the full configured quick action set.
- Accepts an array of actions.
- Invokes `callback(response)` when native returns a result.

`clear(callback)`

- Sends the `clear_quick_actions` runtime event.
- Removes all active quick actions.
- Invokes `callback(response)` with an empty `actions` array on success.

Action fields:

- `type: string` is required.
- `url: string` is required.
- `title?: string` is optional. Native defaults it to `type` if omitted.
- `subtitle?: string` is optional.
- `is_enabled?: boolean` is optional.
- `icon?: string` is optional.
- `ios_icon?: string` is optional.
- `android_icon?: string` is optional.

Example payload sent by the SDK:

```json
{
  "actions": [
    {
      "type": "open_docs",
      "title": "Docs",
      "subtitle": "Open docs",
      "url": "https://example.com/docs",
      "is_enabled": true
    }
  ]
}
```

Example response:

```json
{
  "status": "SUCCESS",
  "actions": [
    {
      "type": "open_docs",
      "url": "https://example.com/docs",
      "title": "Docs",
      "subtitle": "Open docs",
      "is_enabled": true,
      "ios_icon": "natively_quick_action_2",
      "android_icon": "natively_quick_action_2"
    }
  ]
}
```

Runtime behavior:

- `setActions()` replaces the full configured set. If you send only one action, the app keeps only that one action.
- Native stores all configured actions, including disabled ones.
- Only actions with `is_enabled: true` are initially registered with the OS.
- If you update an existing action with the same `type`, native can reuse previously known icon assets even when the runtime payload omits icon fields.
- Icon reuse is keyed by `type`. A different `type` does not reuse another action's icons.
- The recommended contract is to define icon URLs in app config and usually omit runtime icon fields.
- When a quick action is tapped, native matches it by `type` and opens its `url` through the app's existing navigation flow.
- If the URL matches a configured tab URL, the app switches tabs. Otherwise it loads the URL in the main webview.
- Cold-start quick action taps are queued until launch services are ready.

Build-time config notes:

- App config should use `ICON_URL`, `IOS_ICON_URL`, and `ANDROID_ICON_URL`.
- Static native resource names such as `ICON`, `IOS_ICON`, and `ANDROID_ICON` are not the intended source-config contract.
- iOS quick action icons are template-style assets, so simple glyph-style transparent icons work best for `IOS_ICON_URL`.

## 🛠 React/NextJS (min version 2.15.0)

### Installation:


npm i natively@">=2.15.0"


### Usage:

```javascript
'use client'; // <--- THIS IS IMPORTANT, Natively can't be used on server side
import { NativelyInfo, useNatively } from 'natively';

export default function Home() {
    const natively = useNatively(); // <--- useNatively is just a wrapper on window.natively
    const info = new NativelyInfo();
    const browserInfo = info.browserInfo();
    const openConsole = () => {
        natively.openConsole();
    };
    console.log(browserInfo);
    return (
        <div>
            Check the console for browser info. isNativeApp: {browserInfo.isNativeApp ? "true" : "false"}
            <button onClick={openConsole}>Open Console</button>
        </div>
    );
};
```

Important for NextJS users make sure to add 'use client' to the component where you're using Natively SDK. "useNatively" is referring to "window.natively" everywhere in this documentation.

Example project: [https://github.com/romanfurman6/nextjs-boilerplate](https://github.com/romanfurman6/nextjs-boilerplate)

### Debugging (Inspect console inside of mobile app)

```javascript
// Make sure you have JS SDK >=v2.7.2
window.natively.openConsole();  

// NextJS/React
import { useNatively } from 'natively';
const natively = useNatively();
natively.openConsole();
```

### Release new version (for developers)
0. login to npm registry
1. npm run build
2. git commit... 
3. npm version patch/minor/major
4. git push...
5. npm publish
6. Create a new release in GitHub

More in [documentation](https://docs.buildnatively.com/guides/integration/how-to-get-started#javascript-sdk)
