function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyStorage {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  setStorageValue(key, value) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, undefined, "set_storage_value", {
      key,
      value
    });
  }
  getStorageValue(key, get_storage_value_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, get_storage_value_callback, "get_storage_value", {
      key
    });
  }
  removeStorageValue(key) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, undefined, "remove_storage_value", {
      key
    });
  }
  resetStorage() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, undefined, "reset_storage");
  }
}