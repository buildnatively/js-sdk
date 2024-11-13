function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";
export class NativelyAudioRecorder {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  showRecorder(max_duration, record_callback) {
    var params = {
      max_duration: max_duration !== null && max_duration !== void 0 ? max_duration : 0
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 13, record_callback, "record_start", params);
  }
}