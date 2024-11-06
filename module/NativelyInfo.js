function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class NativelyInfo {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  browserInfo() {
    var _window, _window2, _window3;
    var isNativeApp = typeof ((_window = window) === null || _window === void 0 ? void 0 : _window.$agent) !== "undefined";
    var isIOSApp = (_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.navigator.userAgent.includes("Natively/iOS");
    var isAndroidApp = (_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent.includes("Natively/Android");
    return {
      isNativeApp,
      isIOSApp,
      isAndroidApp
    };
  }
  getAppInfo(app_info_callback) {
    var _window4;
    (_window4 = window) === null || _window4 === void 0 || _window4.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }
  connectivity(connectivity_callback) {
    var _window5;
    (_window5 = window) === null || _window5 === void 0 || _window5.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
  }
  app_state(app_state_callback) {
    var _window6;
    (_window6 = window) === null || _window6 === void 0 || _window6.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}