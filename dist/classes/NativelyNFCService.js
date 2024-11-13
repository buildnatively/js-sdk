function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";
export class NativelyNFCService {
  constructor(readAlertMessage, writeAlertMessage, readDetectedMessage, writeDetectedMessage) {
    _defineProperty(this, "id", generateID());
    _defineProperty(this, "readAlertMessage", void 0);
    _defineProperty(this, "writeAlertMessage", void 0);
    _defineProperty(this, "readDetectedMessage", void 0);
    _defineProperty(this, "writeDetectedMessage", void 0);
    this.readAlertMessage = readAlertMessage;
    this.writeAlertMessage = writeAlertMessage;
    this.readDetectedMessage = readDetectedMessage;
    this.writeDetectedMessage = writeDetectedMessage;
  }
  read(callback) {
    var _this$readAlertMessag, _this$readDetectedMes;
    var params = {
      alertMessage: (_this$readAlertMessag = this.readAlertMessage) !== null && _this$readAlertMessag !== void 0 ? _this$readAlertMessag : "please set readAlertMessage",
      detectedMessage: (_this$readDetectedMes = this.readDetectedMessage) !== null && _this$readDetectedMes !== void 0 ? _this$readDetectedMes : "readDetectedMessage"
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 15, callback, "nfc_read", params);
  }
  write(recordId, recordData, callback) {
    var _this$writeAlertMessa, _this$writeDetectedMe;
    var params = {
      alertMessage: (_this$writeAlertMessa = this.writeAlertMessage) !== null && _this$writeAlertMessa !== void 0 ? _this$writeAlertMessa : "please set writeAlertMessage",
      detectedMessage: (_this$writeDetectedMe = this.writeDetectedMessage) !== null && _this$writeDetectedMe !== void 0 ? _this$writeDetectedMe : "please set writeDetectedMessage",
      recordData: recordData !== null && recordData !== void 0 ? recordData : "please set recordData",
      recordId: recordId !== null && recordId !== void 0 ? recordId : "please set recordId"
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 15, callback, "nfc_write", params);
  }
  available(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 15, callback, "nfc_available", {});
  }
}