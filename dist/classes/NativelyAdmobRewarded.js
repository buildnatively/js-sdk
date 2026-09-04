function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
/**
 * @description >=2.28.12
 *
 * Can be only one instance of NativelyAdmobRewarded per page.
 */
export class NativelyAdmobRewarded {
  constructor() {
    var iOSUnitId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ca-app-pub-3940256099942544/1712485313";
    var androidUnitId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ca-app-pub-3940256099942544/5224354917";
    var setupCallback = arguments.length > 2 ? arguments[2] : undefined;
    var autoAdReload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var autoAdReloadCallback = arguments.length > 4 ? arguments[4] : undefined;
    var serverSideVerificationOptions = arguments.length > 5 ? arguments[5] : undefined;
    _defineProperty(this, "id", generateID());
    _defineProperty(this, "autoAdReload", void 0);
    _defineProperty(this, "autoAdReloadCallback", void 0);
    _defineProperty(this, "serverSideVerificationOptions", void 0);
    _defineProperty(this, "unitId", void 0);
    if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isAndroidApp) {
      this.unitId = androidUnitId;
    } else if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isIOSApp) {
      this.unitId = iOSUnitId;
    }
    this.autoAdReload = autoAdReload;
    this.autoAdReloadCallback = autoAdReloadCallback;
    this.serverSideVerificationOptions = serverSideVerificationOptions;
    this.loadAd(setupCallback, serverSideVerificationOptions);
  }
  loadAd(callback, serverSideVerificationOptions) {
    var _this$unitId, _this$serverSideVerif, _this$serverSideVerif2;
    if (serverSideVerificationOptions !== undefined) {
      this.serverSideVerificationOptions = serverSideVerificationOptions;
    }
    var params = {
      unitId: (_this$unitId = this.unitId) !== null && _this$unitId !== void 0 ? _this$unitId : "ca-app-pub-3940256099942544/1712485313",
      userId: (_this$serverSideVerif = this.serverSideVerificationOptions) === null || _this$serverSideVerif === void 0 ? void 0 : _this$serverSideVerif.userId,
      customData: (_this$serverSideVerif2 = this.serverSideVerificationOptions) === null || _this$serverSideVerif2 === void 0 ? void 0 : _this$serverSideVerif2.customData
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 47, callback, "rewardedad_setup", params);
  }
  showRewardedAd(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 47, resp => {
      callback(resp);
      if (resp.event === "DID_DISMISS_AD" && this.autoAdReload) {
        setTimeout(() => {
          this.loadAd(this.autoAdReloadCallback, this.serverSideVerificationOptions);
        }, 500);
      }
    }, "rewardedad_show", {});
  }
  rewardedIsReady(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 47, callback, "rewardedad_ready", {});
  }
}