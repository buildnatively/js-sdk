function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyPurchases {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  login(login, customerEmail, login_callback) {
    var email = customerEmail !== null && customerEmail !== void 0 ? customerEmail : "";
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, login_callback, "purchases_login", {
      login,
      email
    });
  }
  logout(logout_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, logout_callback, "purchases_logout", {});
  }
  customerId(customer_id_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, customer_id_callback, "purchases_customerid", {});
  }
  restore(restore_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, restore_callback, "purchases_restore", {});
  }
  purchasePackage(packageId, purchase_callback, oldProductId) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, purchase_callback, "purchases_package", {
      packageId,
      oldProductId: oldProductId !== null && oldProductId !== void 0 ? oldProductId : null
    });
  }
  packagePrice(packageId, purchase_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
      packageId
    });
  }
}