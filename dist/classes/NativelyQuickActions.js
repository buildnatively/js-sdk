function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyQuickActions {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  setActions(actions, callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 46, callback, "quick_actions", {
      actions: actions.map(action => this.normalizeAction(action))
    });
  }
  clear(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 46, callback, "clear_quick_actions", {});
  }
  normalizeAction(action) {
    var normalizedAction = {
      type: action.type,
      url: action.url
    };
    if (typeof action.title !== "undefined") {
      normalizedAction.title = action.title;
    }
    if (typeof action.subtitle !== "undefined") {
      normalizedAction.subtitle = action.subtitle;
    }
    var isEnabled = typeof action.isEnabled !== "undefined" ? action.isEnabled : action.is_enabled;
    if (typeof isEnabled !== "undefined") {
      normalizedAction.is_enabled = isEnabled;
    }
    if (typeof action.icon !== "undefined") {
      normalizedAction.icon = action.icon;
    }
    var iosIcon = typeof action.iosIcon !== "undefined" ? action.iosIcon : action.ios_icon;
    if (typeof iosIcon !== "undefined") {
      normalizedAction.ios_icon = iosIcon;
    }
    var androidIcon = typeof action.androidIcon !== "undefined" ? action.androidIcon : action.android_icon;
    if (typeof androidIcon !== "undefined") {
      normalizedAction.android_icon = androidIcon;
    }
    return normalizedAction;
  }
}