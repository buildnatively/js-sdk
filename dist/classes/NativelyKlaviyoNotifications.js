function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyKlaviyoNotifications {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  setProfile(data, callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 32, callback, "klaviyo_set_profile", data);
  }
  getExternalId(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 32, callback, "klaviyo_external_id");
  }
  resetProfile(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 32, callback, "klaviyo_reset_profile");
  }
  registerToken(callback, token) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 32, callback, "klaviyo_register_token", {
      token: token
    });
  }
  pushPermission(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 32, callback, "klaviyo_push_permission");
  }
  pushRegister(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 32, callback, "klaviyo_push_register");
  }
}