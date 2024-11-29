function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyMessage {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  sendSMS(body, recipient, send_sms_callback) {
    var params = {
      body: body !== null && body !== void 0 ? body : "",
      recipient: recipient !== null && recipient !== void 0 ? recipient : ""
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, send_sms_callback, "send_sms", params);
  }
  sendEmail(subject, body, recipient, send_email_callback) {
    var params = {
      subject: subject !== null && subject !== void 0 ? subject : "",
      body: body !== null && body !== void 0 ? body : "",
      recipient: recipient !== null && recipient !== void 0 ? recipient : ""
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, send_email_callback, "send_email", params);
  }
}