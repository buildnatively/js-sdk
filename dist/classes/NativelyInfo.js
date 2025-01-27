function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyInfo {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  browserInfo() {
    var _globalContext$naviga, _globalContext$naviga2;
    var isNativeApp = typeof (globalContext === null || globalContext === void 0 ? void 0 : globalContext.$agent) !== "undefined";
    var isIOSApp = (globalContext === null || globalContext === void 0 || (_globalContext$naviga = globalContext.navigator) === null || _globalContext$naviga === void 0 || (_globalContext$naviga = _globalContext$naviga.userAgent) === null || _globalContext$naviga === void 0 ? void 0 : _globalContext$naviga.includes("Natively/iOS")) || false;
    var isAndroidApp = (globalContext === null || globalContext === void 0 || (_globalContext$naviga2 = globalContext.navigator) === null || _globalContext$naviga2 === void 0 || (_globalContext$naviga2 = _globalContext$naviga2.userAgent) === null || _globalContext$naviga2 === void 0 ? void 0 : _globalContext$naviga2.includes("Natively/Android")) || false;
    return {
      isNativeApp,
      isIOSApp,
      isAndroidApp
    };
  }
  getAppInfo(app_info_callback) {
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively)) return;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }
  connectivity(connectivity_callback) {
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively)) return;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
  }
  app_state(app_state_callback) {
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively)) return;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
  keyboard_visibility(keyboard_visibility_callback) {
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively)) return;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 34, keyboard_visibility_callback, "keyboard_visibility");
  }
}