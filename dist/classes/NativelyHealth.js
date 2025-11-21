function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
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
  getDailySleepAnalysis(start_date, end_date, limit, callback) {
    var obj = {
      limit: limit || 100
    };
    if (start_date) {
      obj.start_date = start_date.getTime();
    }
    if (end_date) {
      obj.end_date = end_date.getTime();
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, callback, "health_get_daily_sleep_analysis", obj);
  }
  getWorkouts(start_date, end_date, limit, callback) {
    var obj = {
      limit: limit || 100
    };
    if (start_date) {
      obj.start_date = start_date.getTime();
    }
    if (end_date) {
      obj.end_date = end_date.getTime();
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 21, callback, "health_get_workouts", obj);
  }
  writeWorkout(workout, callback) {
    var obj = _objectSpread({}, workout);
    if ((workout === null || workout === void 0 ? void 0 : workout.start_date) instanceof Date) {
      obj.start_date = workout.start_date.getTime();
    }
    if ((workout === null || workout === void 0 ? void 0 : workout.end_date) instanceof Date) {
      obj.end_date = workout.end_date.getTime();
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, callback, "health_write_workout", obj);
  }
  writeNutrition(nutrition, callback) {
    var obj = _objectSpread({}, nutrition);
    if ((nutrition === null || nutrition === void 0 ? void 0 : nutrition.start_date) instanceof Date) {
      obj.start_date = nutrition.start_date.getTime();
    }
    if ((nutrition === null || nutrition === void 0 ? void 0 : nutrition.end_date) instanceof Date) {
      obj.end_date = nutrition.end_date.getTime();
    }
    if (Array.isArray(nutrition === null || nutrition === void 0 ? void 0 : nutrition.items)) {
      obj.items = nutrition.items.map(item => {
        var mappedItem = _objectSpread({}, item);
        if ((item === null || item === void 0 ? void 0 : item.start_date) instanceof Date) {
          mappedItem.start_date = item.start_date.getTime();
        }
        if ((item === null || item === void 0 ? void 0 : item.end_date) instanceof Date) {
          mappedItem.end_date = item.end_date.getTime();
        }
        return mappedItem;
      });
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, callback, "health_write_nutrition", obj);
  }
  getActivitySummary(start_date, end_date, callback) {
    var obj = {};
    if (start_date) {
      obj.start_date = start_date.getTime();
    }
    if (end_date) {
      obj.end_date = end_date.getTime();
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, callback, "health_get_activity_summary", obj);
  }
}