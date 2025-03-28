function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyLocation {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  current(minAccuracyIOS, accuracyTypeIOS, priority_android, location_callback) {
    var fallback_to_settings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 12, location_callback, "location_current", {
      minAccuracy: minAccuracyIOS,
      accuracyType: accuracyTypeIOS,
      priority: priority_android,
      fallbackToSettings: fallback_to_settings
    });
  }
  permission(location_permission_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 6, location_permission_callback, "location_permission");
  }
  start(interval, minAccuracyIOS, accuracyTypeIOS, priority_android, location_callback) {
    var fallback_to_settings = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 12, location_callback, "location_start", {
      minAccuracy: minAccuracyIOS,
      accuracyType: accuracyTypeIOS,
      priority: priority_android,
      fallbackToSettings: fallback_to_settings,
      interval
    });
  }
  stop() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, undefined, "location_stop", {});
  }
  startBackground(interval, minAccuracyIOS, accuracyTypeIOS, priority_android, responseIdentifier, location_bg_callback) {
    var fallback_to_settings = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var params = {
      identifier: responseIdentifier !== null && responseIdentifier !== void 0 ? responseIdentifier : "empty",
      interval: interval !== null && interval !== void 0 ? interval : 1000 * 60,
      minAccuracy: minAccuracyIOS !== null && minAccuracyIOS !== void 0 ? minAccuracyIOS : 50,
      accuracyType: accuracyTypeIOS !== null && accuracyTypeIOS !== void 0 ? accuracyTypeIOS : "Best",
      priority: priority_android !== null && priority_android !== void 0 ? priority_android : "BALANCED",
      fallbackToSettings: fallback_to_settings
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 12, location_bg_callback, "location_start_bg", params);
  }
  statusBackground(location_bg_status_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 20, location_bg_status_callback, "location_status_bg", {});
  }
  stopBackground(location_bg_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 4, location_bg_callback, "location_stop_bg", {});
  }
}