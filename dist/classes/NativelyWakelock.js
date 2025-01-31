function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js.js";
import globalContext from "../utils/globalThis.js.js";
export class NativelyWakelock {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  enable_wakelock(wakelock_callback) {
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively)) return;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 34, wakelock_callback, "wakelock_enable");
  }
  disable_wakelock(wakelock_callback) {
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively)) return;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 34, wakelock_callback, "wakelock_disable");
  }
}