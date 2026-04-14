function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import globalContext from "../utils/globalThis.js";
export class Natively {
  constructor() {
    var _globalContext$naviga, _globalContext$naviga2;
    _defineProperty(this, "isDebug", false);
    _defineProperty(this, "min_app_version", 0);
    _defineProperty(this, "app_version", 0);
    _defineProperty(this, "injected", false);
    _defineProperty(this, "observers", []);
    _defineProperty(this, "onNativeError", null);
    _defineProperty(this, "onTabChanged", null);
    _defineProperty(this, "isIOSApp", (globalContext === null || globalContext === void 0 || (_globalContext$naviga = globalContext.navigator) === null || _globalContext$naviga === void 0 || (_globalContext$naviga = _globalContext$naviga.userAgent) === null || _globalContext$naviga === void 0 ? void 0 : _globalContext$naviga.includes("Natively/iOS")) || false);
    _defineProperty(this, "isAndroidApp", (globalContext === null || globalContext === void 0 || (_globalContext$naviga2 = globalContext.navigator) === null || _globalContext$naviga2 === void 0 || (_globalContext$naviga2 = _globalContext$naviga2.userAgent) === null || _globalContext$naviga2 === void 0 ? void 0 : _globalContext$naviga2.includes("Natively/Android")) || false);
  }
  setDebug(isDebug) {
    if (globalContext) {
      globalContext.natively.isDebug = isDebug;
    }
  }
  notify(min, current) {
    if (globalContext) {
      globalContext.natively.injected = true;
      if (min) {
        globalContext.natively.min_app_version = min;
      }
      if (current) {
        globalContext.natively.app_version = current;
      }
    }
    var observers = globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively.observers;
    if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isDebug) {
      console.log("[INFO] Notify observers: ", observers.length);
    }
    while (observers.length > 0) {
      var observer = observers.shift();
      observer === null || observer === void 0 || observer();
    }
  }
  addObserver(fn) {
    if (globalContext !== null && globalContext !== void 0 && globalContext.natively.injected) {
      fn();
    } else {
      if (globalContext !== null && globalContext !== void 0 && globalContext.natively.isDebug) {
        console.log("[DEBUG] addObserver: ".concat(fn));
      }
      globalContext === null || globalContext === void 0 || globalContext.natively.observers.push(fn);
    }
  }
  trigger(respId, minVersion, callback, method, body) {
    var isTestVersion = globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively.isDebug;
    if (!(globalContext !== null && globalContext !== void 0 && globalContext.natively.injected)) {
      globalContext === null || globalContext === void 0 || globalContext.natively.addObserver(() => {
        globalContext === null || globalContext === void 0 || globalContext.natively.trigger(respId, minVersion, callback, method, body);
      });
      return;
    }
    if (minVersion > (globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively.app_version)) {
      if (isTestVersion) {
        alert("[ERROR] Please rebuild the app to use this functionality. App Version: ".concat(globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively.app_version, ", feature version: ").concat(minVersion));
      }
      return;
    }
    if (callback) {
      var fullMethodName;
      if (respId) {
        fullMethodName = method + "_response" + "_" + respId;
      } else {
        fullMethodName = method + "_response";
      }
      if (globalContext) {
        globalContext[fullMethodName] = function (resp, err) {
          globalContext === null || globalContext === void 0 || globalContext.$agent.response();
          if (err.message && isTestVersion) {
            alert("[ERROR] Error message: ".concat(err.message));
            return;
          }
          if (isTestVersion) {
            console.log("[DEBUG] Callback method: ".concat(fullMethodName, ", body: ").concat(JSON.stringify(resp), ", respId: ").concat(respId));
          }
          callback(resp);
        };
      }
      if (body) {
        body.response_id = respId;
      } else {
        body = {
          response_id: respId
        };
      }
    }
    if (isTestVersion) {
      console.log("[DEBUG] Trigger method: ".concat(method, ", body: ").concat(JSON.stringify(body)));
    }
    globalContext === null || globalContext === void 0 || globalContext.$agent.trigger(method, body);
  }
  setTabChangedHandler(callback) {
    if (typeof callback !== 'function') {
      console.warn('[Natively] Tab changed handler must be a function');
      return;
    }
    this.onTabChanged = callback;
  }
  removeTabChangedHandler() {
    this.onTabChanged = null;
  }
  setErrorHandler(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    this.onNativeError = callback;
  }
  removeErrorHandler() {
    this.onNativeError = null;
  }
  setErrorScreen(showError) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "error_screen", {
      show_error: showError
    });
  }
  openLogger() {
    globalContext === null || globalContext === void 0 || globalContext.$agent.natively_logger();
  }
  openConsole() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "app_console");
  }
  closeApp() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 11, undefined, "app_close");
  }
  showProgress(toggle) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 11, undefined, "app_show_progress", {
      toggle
    });
  }
  shareImage(image_url) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "share_image", {
      url: image_url
    });
  }
  shareText(text) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "share_text", {
      text
    });
  }
  shareTextAndImage(text, image_url) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "share_text_and_image", {
      url: image_url,
      text
    });
  }
  shareFile(file_url) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 2, undefined, "share_file", {
      url: file_url
    });
  }
  openExternalURL(url, external) {
    var params = {
      url: typeof url === "undefined" ? "https://buildnatively.com" : url,
      view: typeof external !== "undefined" && external ? "external" : "web"
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 18, undefined, "open_link", params);
  }
  openExternalApp(url) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "open_app", {
      url
    });
  }
  showAppToast(type, text) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "show_toast", {
      text: text || "",
      type: type || "DEFAULT"
    });
  }
  showAppBanner(type, title, description) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "show_banner", {
      type: type || "INFO",
      title: title || "",
      description: description || ""
    });
  }
  analyticsTrackEvent(name, data) {
    var params = {
      name
    };
    if (data) {
      params.data = data;
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 37, undefined, "analytics_log_event", params);
  }
  analyticsSetUserId(data) {
    var params = {
      id: data.id
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 37, undefined, "analytics_set_user_id", params);
  }
  analyticsSetUserProperty(data) {
    var params = {
      key: data.key,
      value: data.value
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 37, undefined, "analytics_set_user_property", params);
  }
  requestAppReview() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "request_review");
  }
  attShowPopup(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 41, callback, "att_show_popup");
  }
  attGetStatus(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 41, callback, "att_get_status");
  }
  getInsets(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 36, callback, "get_insets");
  }
  getLocales(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 40, callback, "get_locales");
  }
  setLocale(locale, callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 40, callback, "set_locale", {
      locale
    });
  }
  setAppBackgroundColor(color) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 1, undefined, "app_background", {
      color
    });
  }
  setAppProgressColor(color) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 1, undefined, "app_progress", {
      color
    });
  }
  setAppSwipeNavigation(toggle) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "app_navigation", {
      toggle
    });
  }
  setAppPullToRefresh(toggle) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 1, undefined, "app_pull", {
      toggle
    });
  }
  setAppOrientation(orientation) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 3, undefined, "app_orientation", {
      orientation
    });
  }
  setAppStatusBarStyle(style) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "status_bar_style", {
      style
    });
  }
  hideLoadingScreen() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 17, undefined, "loading_screen", {
      show_loader: false,
      auto_hide: true
    });
  }
  showLoadingScreen(autoHide) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 17, undefined, "loading_screen", {
      show_loader: true,
      auto_hide: autoHide || false
    });
  }
  openAppSettings() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 0, undefined, "open_appsettings");
  }
  showTabBar() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 33, undefined, "show_tab_bar");
  }
  enableWakelock() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 34, undefined, "wakelock_enable");
  }
  disableWakelock() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 34, undefined, "wakelock_disable");
  }
  hideTabBar() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 33, undefined, "hide_tab_bar");
  }
  reloadWebview() {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 35, undefined, "reset_webview");
  }
  hapticPattern(pattern, delay) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "haptic_pattern", {
      pattern,
      delay
    });
  }
  openPDF(options, callback) {
    var params = {
      url: options.url || '',
      base64: options.base64 || '',
      fileName: options.fileName || "pdf-".concat(new Date().getTime(), ".pdf"),
      download: options.download === true
    };
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 38, callback, "open_pdf", params);
  }
  hapticImpact(type) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "haptic_impact", {
      type
    });
  }
  hapticNotification(type) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(undefined, 22, undefined, "haptic_notification", {
      type
    });
  }
}