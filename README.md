# natively-sdk

### Installation

Add to the website page header:

```
<script src="https://cdn.jsdelivr.net/npm/natively@1.0.0/natively-frontend.min.js"></script>
```

### Usage

```
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
