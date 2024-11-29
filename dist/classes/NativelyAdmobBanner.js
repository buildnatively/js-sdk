function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyAdmobBanner {
  constructor(config, setup_callback) {
    var _config$position, _config$sizeType, _config$custom_width, _config$custom_height;
    var preload_ad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var preload_callback = arguments.length > 3 ? arguments[3] : undefined;
    var show_ad = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var show_callback = arguments.length > 5 ? arguments[5] : undefined;
    _defineProperty(this, "id", generateID());
    var params = {};
    if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isAndroidApp) {
      var _config$androidUnitId;
      params.unitId = (_config$androidUnitId = config.androidUnitId) !== null && _config$androidUnitId !== void 0 ? _config$androidUnitId : "ca-app-pub-3940256099942544/6300978111";
    } else if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isIOSApp) {
      var _config$iOSUnitId;
      params.unitId = (_config$iOSUnitId = config.iOSUnitId) !== null && _config$iOSUnitId !== void 0 ? _config$iOSUnitId : "ca-app-pub-3940256099942544/2934735716";
    }
    params.position = (_config$position = config.position) !== null && _config$position !== void 0 ? _config$position : "BOTTOM";
    params.sizeType = (_config$sizeType = config.sizeType) !== null && _config$sizeType !== void 0 ? _config$sizeType : "AUTO";
    params.width = (_config$custom_width = config.custom_width) !== null && _config$custom_width !== void 0 ? _config$custom_width : 320;
    params.height = (_config$custom_height = config.custom_height) !== null && _config$custom_height !== void 0 ? _config$custom_height : 50;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, resp => {
      setup_callback === null || setup_callback === void 0 || setup_callback(resp);
      if (preload_ad) {
        globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, resp => {
          preload_callback === null || preload_callback === void 0 || preload_callback(resp);
          if (show_ad) {
            globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, show_callback, "bannerad_show", {});
          }
        }, "bannerad_load", {});
      }
    }, "bannerad_setup", params);
  }
  loadAd(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "bannerad_load", {});
  }
  showBanner(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "bannerad_show", {});
  }
  hideBanner(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "bannerad_hide", {});
  }
  bannerIsReady(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "bannerad_ready", {});
  }
  bannerIsVisible(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "bannerad_visible", {});
  }
}