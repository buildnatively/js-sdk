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

