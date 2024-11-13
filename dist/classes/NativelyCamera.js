function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";
export class NativelyCamera {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  showCamera(type, quality, camera, open_camera_callback) {
    var params = {
      type: type !== null && type !== void 0 ? type : "photo",
      quality: quality !== null && quality !== void 0 ? quality : "high",
      camera: camera !== null && camera !== void 0 ? camera : "BACK"
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 2, open_camera_callback, "open_camera", params);
  }
}