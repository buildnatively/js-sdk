function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getGlobalObject = () => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof global !== "undefined") return global;
  if (typeof window !== "undefined") return window;
  return {};
};
export default class NativelyInfo {
  constructor() {
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "globalObj", void 0);
    this.globalObj = getGlobalObject();
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  browserInfo() {
    var _this$globalObj$navig, _this$globalObj$navig2, _this$globalObj$navig3, _this$globalObj$navig4;
    var isNativeApp = typeof this.globalObj.$agent !== "undefined";
    var isIOSApp = (_this$globalObj$navig = (_this$globalObj$navig2 = this.globalObj.navigator) === null || _this$globalObj$navig2 === void 0 ? void 0 : _this$globalObj$navig2.userAgent.includes("Natively/iOS")) !== null && _this$globalObj$navig !== void 0 ? _this$globalObj$navig : false;
    var isAndroidApp = (_this$globalObj$navig3 = (_this$globalObj$navig4 = this.globalObj.navigator) === null || _this$globalObj$navig4 === void 0 ? void 0 : _this$globalObj$navig4.userAgent.includes("Natively/Android")) !== null && _this$globalObj$navig3 !== void 0 ? _this$globalObj$navig3 : false;
    return {
      isNativeApp,
      isIOSApp,
      isAndroidApp
    };
  }
  getAppInfo(app_info_callback) {
    if (!this.globalObj.natively) return;
    this.globalObj.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }
  connectivity(connectivity_callback) {
    if (!this.globalObj.natively) return;
    this.globalObj.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
  }
  app_state(app_state_callback) {
    if (!this.globalObj.natively) return;
    this.globalObj.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}