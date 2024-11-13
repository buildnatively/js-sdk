function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";

/**
 * @description \>=2.9.0
 *
 * Can be only one instance of NativelyAdmobInterstitial per page.
 *
 * Make sure to use this and not reload page a lot.
 */
export class NativelyAdmobInterstitial {
  constructor() {
    var iOSUnitId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ca-app-pub-3940256099942544/4411468910";
    var androidUnitId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ca-app-pub-3940256099942544/1033173712";
    var setup_callback = arguments.length > 2 ? arguments[2] : undefined;
    var auto_ad_reload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var auto_ad_reload_callback = arguments.length > 4 ? arguments[4] : undefined;
    _defineProperty(this, "id", generateID());
    _defineProperty(this, "auto_ad_reload", void 0);
    _defineProperty(this, "auto_ad_reload_callback", void 0);
    _defineProperty(this, "unitId", void 0);
    if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isAndroidApp) {
      this.unitId = androidUnitId;
    } else if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isIOSApp) {
      this.unitId = iOSUnitId;
    }
    this.auto_ad_reload = auto_ad_reload;
    this.auto_ad_reload_callback = auto_ad_reload_callback;
    this.loadAd(setup_callback);
  }
  loadAd(callback) {
    var _this$unitId;
    var params = {
      unitId: (_this$unitId = this.unitId) !== null && _this$unitId !== void 0 ? _this$unitId : "ca-app-pub-3940256099942544/4411468910"
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "interstitialad_setup", params);
  }
  showInterstitialAd(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, resp => {
      callback(resp);
      if (resp.event === "DID_DISMISS_AD" && this.auto_ad_reload) {
        setTimeout(() => {
          this.loadAd(this.auto_ad_reload_callback);
        }, 500);
      }
    }, "interstitialad_show", {});
  }
  interstitialIsReady(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 14, callback, "interstitialad_ready", {});
  }
}