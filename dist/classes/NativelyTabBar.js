function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyTabBar {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  showTabBar() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 33, undefined, "show_tab_bar");
  }
  hideTabBar() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 33, undefined, "hide_tab_bar");
  }
}