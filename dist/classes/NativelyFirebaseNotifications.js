function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyFirebaseNotifications {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  firebase_get_token(token_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 31, token_callback, "firebase_get_token");
  }
  firebase_get_apns_token(apns_token_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 31, apns_token_callback, "firebase_get_apns_token");
  }
  firebase_request_permission(permission_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 31, permission_callback, "firebase_request_permission");
  }
  firebase_has_permission(permission_status_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 31, permission_status_callback, "firebase_has_permission");
  }
  firebase_subscribe_to_topic(topic, subscribe_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 31, subscribe_callback, "firebase_subscribe_to_topic", {
      topic
    });
  }
  firebase_unsubscribe_from_topic(topic, unsubscribe_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 31, unsubscribe_callback, "firebase_unsubscribe_from_topic", {
      topic
    });
  }
}