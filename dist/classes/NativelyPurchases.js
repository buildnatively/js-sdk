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

  /**
   * @deprecated Use appUserId() instead.
   * Kept as-is so existing integrations don't break. Despite the name, it returns
   * RevenueCat's originalAppUserId, which stays the anonymous ID after login().
   */
  customerId(customer_id_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, customer_id_callback, "purchases_customerid", {});
  }

  // Current RevenueCat App User ID (reflects login()); customerId() returns originalAppUserId.
  appUserId(app_user_id_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 46, app_user_id_callback, "purchases_appuserid", {});
  }
  restore(restore_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 10, restore_callback, "purchases_restore", {});
  }
  showPaywall(shouldShowCloseButton, offeringId, customVariablesOrCallback, show_paywall_callback) {
    var customVariables = typeof customVariablesOrCallback === "function" ? undefined : customVariablesOrCallback;
    var callback = typeof customVariablesOrCallback === "function" ? customVariablesOrCallback : show_paywall_callback;
    var params = {
      offeringId,
      shouldShowCloseButton,
      customVariables
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 38, callback, "purchases_show_paywall", params);
  }
  showPaywallIfNeeded(entitlementId, shouldShowCloseButton, offeringId, customVariablesOrCallback, show_paywall_if_needed_callback) {
    var customVariables = typeof customVariablesOrCallback === "function" ? undefined : customVariablesOrCallback;
    var callback = typeof customVariablesOrCallback === "function" ? customVariablesOrCallback : show_paywall_if_needed_callback;
    var params = {
      offeringId,
      entitlementId,
      shouldShowCloseButton,
      customVariables
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 38, callback, "purchases_show_paywall_if_needed", params);
  }
  purchasePackage(packageId, purchase_callback, oldProductId, prorationMode, offeringId, subscriptionOptionId) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 3, purchase_callback, "purchases_package", {
      packageId,
      oldProductId: oldProductId !== null && oldProductId !== void 0 ? oldProductId : null,
      prorationMode: prorationMode !== null && prorationMode !== void 0 ? prorationMode : null,
      offeringId: offeringId !== null && offeringId !== void 0 ? offeringId : null,
      subscriptionOptionId: subscriptionOptionId !== null && subscriptionOptionId !== void 0 ? subscriptionOptionId : null
    });
  }
  packagePrice(packageId, purchase_callback, offeringId) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
      packageId,
      offeringId: offeringId !== null && offeringId !== void 0 ? offeringId : null
    });
  }
  showCustomerCenter(show_customer_center_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 42, show_customer_center_callback, "purchases_show_customer_center", {});
  }
  getOfferings(get_offerings_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 44, get_offerings_callback, "purchases_get_offerings", {});
  }
  presentOfferCodeRedemptionSheet(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 45, callback, "purchases_present_code_redemption_sheet", {});
  }
}