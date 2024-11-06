function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class NativelyInfo {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  browserInfo() {
    var _window$navigator$use, _window$navigator$use2;
    var isNativeApp = typeof window.$agent !== "undefined";
    var isIOSApp = (_window$navigator$use = window.navigator.userAgent.includes("Natively/iOS")) !== null && _window$navigator$use !== void 0 ? _window$navigator$use : false;
    var isAndroidApp = (_window$navigator$use2 = window.navigator.userAgent.includes("Natively/Android")) !== null && _window$navigator$use2 !== void 0 ? _window$navigator$use2 : false;
    return {
      isNativeApp,
      isIOSApp,
      isAndroidApp
    };
  }
  getAppInfo(app_info_callback) {
    if (!window.natively) return;
    window.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }
  connectivity(connectivity_callback) {
    if (!window.natively) return;
    window.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
  }
  app_state(app_state_callback) {
    if (!window.natively) return;
    window.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}