function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID";
import globalContext from "../utils/globalThis";
export class NativelyBiometrics {
  constructor(allowPass) {
    _defineProperty(this, "id", generateID());
    _defineProperty(this, "allowPass", void 0);
    this.allowPass = allowPass;
  }
  checkBiometricsSupport(biometrics_support_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, biometrics_support_callback, "biometrics_support", {
      allowPass: this.allowPass
    });
  }
  checkCredentials(biometrics_has_credentials_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, biometrics_has_credentials_callback, "biometrics_has_credentials");
  }
  verifyUserIdentify(biometrics_verify_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, biometrics_verify_callback, "biometrics_verify", {
      allowPass: this.allowPass
    });
  }
  getUserCredentials(biometrics_auth_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, biometrics_auth_callback, "biometrics_auth", {
      allowPass: this.allowPass
    });
  }
  removeUserCredentials(biometrics_remove_credentials_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, biometrics_remove_credentials_callback, "biometrics_remove_credentials");
  }
  saveUserCredentials(login, password, biometrics_auth_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, biometrics_auth_callback, "biometrics_auth", {
      allowPass: this.allowPass,
      login,
      password
    });
  }
}