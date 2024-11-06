function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class NativelyInfo {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  browserInfo() {
    var isNativeApp = typeof window.$agent !== "undefined";
    var isIOSApp = window.navigator.userAgent.includes("Natively/iOS");
    var isAndroidApp = window.navigator.userAgent.includes("Natively/Android");
    return {
      isNativeApp,
      isIOSApp,
      isAndroidApp
    };
  }
  getAppInfo(app_info_callback) {
    window.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }
  connectivity(connectivity_callback) {
    window.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
  }
  app_state(app_state_callback) {
    window.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}