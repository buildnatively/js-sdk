function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyDatePicker {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  showDatePicker(title, description, type, style, datepicker_callback) {
    var params = {
      type: type !== null && type !== void 0 ? type : "DATE",
      style: style !== null && style !== void 0 ? style : "LIGHT",
      title: title !== null && title !== void 0 ? title : "",
      description: description !== null && description !== void 0 ? description : ""
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, datepicker_callback, "datepicker", params);
  }
}