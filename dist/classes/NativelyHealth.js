function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";
export class NativelyHealth {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  available(available_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, available_callback, "health_available", {});
  }
  requestAuthorization(write_data_types, read_data_types, request_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, request_callback, "health_register", {
      write_data_types,
      read_data_types
    });
  }
  permissionStatus(data_type, callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, callback, "health_permission", {
      data_type
    });
  }
  getAllCharacteristics(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, callback, "health_get_all_characteristics", {});
  }
  getStatisticQuantity(data_type, interval, start_date, end_date, callback) {
    var obj = {
      data_type,
      interval
    };
    if (start_date) {
      obj.start_date = start_date.getTime();
    }
    if (end_date) {
      obj.end_date = end_date.getTime();
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, callback, "health_get_statistic_quantity", obj);
  }
}