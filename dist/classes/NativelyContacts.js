function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";
export class NativelyContacts {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  getAllContacts(contacts_all_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, contacts_all_callback, "contacts_all", {});
  }
  createContact(firstName, lastName, email, phone, contacts_save_callback) {
    var params = {
      firstName,
      lastName: lastName !== null && lastName !== void 0 ? lastName : "",
      email: email !== null && email !== void 0 ? email : "",
      phone: phone !== null && phone !== void 0 ? phone : ""
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, contacts_save_callback, "contacts_save", params);
  }
}