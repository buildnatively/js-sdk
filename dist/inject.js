import globalContext from "./utils/globalThis.js";
import { Natively } from "./classes/Natively.js";
import { NativelyAdmobBanner } from "./classes/NativelyAdmobBanner.js";
import { NativelyAdmobInterstitial } from "./classes/NativelyAdmobInterstitial.js";
import { NativelyAppleSignInService } from "./classes/NativelyAppleSignInService.js";
import { NativelyAudioRecorder } from "./classes/NativelyAudioRecorder.js";
import { NativelyAudioPlayer } from "./classes/NativelyAudioPlayer.js";
import { NativelyBiometrics } from "./classes/NativelyBiometrics.js";
import { NativelyCamera } from "./classes/NativelyCamera.js";
import { NativelyClipboard } from "./classes/NativelyClipboard.js";
import { NativelyContacts } from "./classes/NativelyContacts.js";
import { NativelyDatePicker } from "./classes/NativelyDatePicker.js";
import { NativelyGeolocation } from "./classes/NativelyGeolocation.js";
import { NativelyHealth } from "./classes/NativelyHealth.js";
import { NativelyInfo } from "./classes/NativelyInfo.js";
import { NativelyLocation } from "./classes/NativelyLocation.js";
import { NativelyMediaPicker } from "./classes/NativelyMediaPicker.js";
import { NativelyMessage } from "./classes/NativelyMessage.js";
import { NativelyNFCService } from "./classes/NativelyNFCService.js";
import { NativelyNotifications } from "./classes/NativelyNotifications.js";
import { NativelyPurchases } from "./classes/NativelyPurchases.js";
import { NativelyScanner } from "./classes/NativelyScanner.js";
import { NativelyStorage } from "./classes/NativelyStorage.js";
import { NativelyFirebaseNotifications } from "./classes/NativelyFirebaseNotifications.js";
import { NativelyKlaviyoNotifications } from './classes/NativelyKlaviyoNotifications.js';
import { NativelyCalendar } from "./classes/NativelyCalendar.js";
import { SDK_VERSION } from "./sdkVersion.js";
var HANDLER_NAME = "💙";
var WEB_NAVIGATION_PROGRESS_EVENT = "web_navigation_progress";
var WEB_SDK_VERSION_EVENT = "web_sdk_version";
var isIframe = context => {
  try {
    return context.self !== context.top;
  } catch (_unused) {
    return true;
  }
};
var installAgent = context => {
  var _context$$agent, _context$flutter_inap;
  if (typeof ((_context$$agent = context.$agent) === null || _context$$agent === void 0 ? void 0 : _context$$agent.trigger) === "function") return true;
  var runningInIframe = isIframe(context);
  var hasNativeHandler = typeof ((_context$flutter_inap = context.flutter_inappwebview) === null || _context$flutter_inap === void 0 ? void 0 : _context$flutter_inap.callHandler) === "function";
  if (!runningInIframe && !hasNativeHandler) return false;
  var agent = {
    __nativelyAgent: true,
    trigger(eventName, eventData) {
      var _context$flutter_inap2, _context$parent;
      var serializedArgs = JSON.stringify({
        trigger: {
          name: eventName,
          data: eventData
        }
      });
      if (typeof ((_context$flutter_inap2 = context.flutter_inappwebview) === null || _context$flutter_inap2 === void 0 ? void 0 : _context$flutter_inap2.callHandler) === "function") {
        context.flutter_inappwebview.callHandler(HANDLER_NAME, serializedArgs);
        return;
      }
      if (runningInIframe && typeof ((_context$parent = context.parent) === null || _context$parent === void 0 ? void 0 : _context$parent.postMessage) === "function") {
        context.parent.postMessage({
          source: "natively-webview",
          handlerName: HANDLER_NAME,
          args: [serializedArgs]
        }, "*");
      }
    },
    response() {},
    natively_logger() {
      this.trigger("natively_logger");
    }
  };
  context.$agent = agent;
  context.natively = context.natively || agent;
  if (runningInIframe && typeof context.addEventListener === "function") {
    context.addEventListener("message", event => {
      var data = event.data || {};
      if (data.source !== "natively-flutter" || data.type !== "evaluate") return;
      if (typeof data.script === "string") {
        context.eval(data.script);
      }
    });
  }
  return true;
};
var installNavigationProgressTracking = context => {
  var _context$addEventList, _context$addEventList2, _context$document2, _context$document3;
  if (context.__nativelyNavigationProgressInstalled) return;
  context.__nativelyNavigationProgressInstalled = true;
  var completionTimer = null;
  var maxTimer = null;
  var observer = null;
  var didReportSdkVersion = false;
  var emit = (phase, reason) => {
    var _context$natively, _context$location;
    (_context$natively = context.natively) === null || _context$natively === void 0 || _context$natively.trigger(undefined, 0, undefined, WEB_NAVIGATION_PROGRESS_EVENT, {
      phase,
      reason,
      href: (_context$location = context.location) === null || _context$location === void 0 ? void 0 : _context$location.href
    });
  };
  var emitSdkVersion = reason => {
    var _context$natively2, _context$location2;
    if (didReportSdkVersion) return;
    didReportSdkVersion = true;
    (_context$natively2 = context.natively) === null || _context$natively2 === void 0 || _context$natively2.trigger(undefined, 0, undefined, WEB_SDK_VERSION_EVENT, {
      version: SDK_VERSION,
      reason,
      href: (_context$location2 = context.location) === null || _context$location2 === void 0 ? void 0 : _context$location2.href
    });
  };
  var cancelTimers = () => {
    if (completionTimer) {
      clearTimeout(completionTimer);
      completionTimer = null;
    }
    if (maxTimer) {
      clearTimeout(maxTimer);
      maxTimer = null;
    }
  };
  var disconnectObserver = () => {
    var _observer;
    (_observer = observer) === null || _observer === void 0 || _observer.disconnect();
    observer = null;
  };
  var finish = reason => {
    cancelTimers();
    disconnectObserver();
    emitSdkVersion(reason);
    emit("done", reason);
  };
  var scheduleSettle = () => {
    if (completionTimer) {
      clearTimeout(completionTimer);
    }
    completionTimer = setTimeout(() => finish("settled"), 250);
  };
  var observeDom = () => {
    var _context$document;
    disconnectObserver();
    var root = (_context$document = context.document) === null || _context$document === void 0 ? void 0 : _context$document.documentElement;
    if (!root || typeof context.MutationObserver !== "function") {
      scheduleSettle();
      return;
    }
    var mutationObserver = new context.MutationObserver(() => scheduleSettle());
    mutationObserver.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    });
    observer = mutationObserver;
    scheduleSettle();
  };
  var start = function start(reason) {
    var maxDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    cancelTimers();
    emit("start", reason);
    observeDom();
    maxTimer = setTimeout(() => finish("timeout"), maxDuration);
  };
  var wrapHistoryMethod = methodName => {
    var _context$history;
    var original = (_context$history = context.history) === null || _context$history === void 0 ? void 0 : _context$history[methodName];
    if (typeof original !== "function") return;
    context.history[methodName] = function () {
      start(methodName, 1500);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return original.apply(this, args);
    };
  };
  wrapHistoryMethod("pushState");
  wrapHistoryMethod("replaceState");
  (_context$addEventList = context.addEventListener) === null || _context$addEventList === void 0 || _context$addEventList.call(context, "popstate", () => start("popstate", 1500));
  (_context$addEventList2 = context.addEventListener) === null || _context$addEventList2 === void 0 || _context$addEventList2.call(context, "hashchange", () => start("hashchange", 800));
  (_context$document2 = context.document) === null || _context$document2 === void 0 || _context$document2.addEventListener("click", event => {
    var target = event.target;
    if (!target || typeof target.closest !== "function") return;
    var anchor = target.closest("a[href]");
    if (!anchor) return;
    var href = anchor.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
    var targetAttr = anchor.getAttribute("target");
    if (targetAttr && targetAttr !== "_self") return;
    start("anchor", 4000);
  }, true);
  if (((_context$document3 = context.document) === null || _context$document3 === void 0 ? void 0 : _context$document3.readyState) === "complete") {
    finish("ready");
  } else {
    var _context$addEventList3;
    (_context$addEventList3 = context.addEventListener) === null || _context$addEventList3 === void 0 || _context$addEventList3.call(context, "load", () => finish("load"), {
      once: true
    });
  }
};

// Assign natively to the global object
if (globalContext) {
  var agentInstalled = installAgent(globalContext);
  if (!globalContext.natively || globalContext.natively.__nativelyAgent) {
    globalContext.natively = new Natively();
  }
  globalContext.natively.injected = agentInstalled;
  if (agentInstalled && !globalContext.natively.app_version) {
    globalContext.natively.app_version = Number.MAX_SAFE_INTEGER;
  }
  globalContext.natively.sdkVersion = SDK_VERSION;
  if (agentInstalled) {
    installNavigationProgressTracking(globalContext);
  }

  // All other classes must be global to make a possibility to create any number of their instances
  globalContext.NativelyAdmobBanner = NativelyAdmobBanner;
  globalContext.NativelyAdmobInterstitial = NativelyAdmobInterstitial;
  globalContext.NativelyAppleSignInService = NativelyAppleSignInService;
  globalContext.NativelyAudioRecorder = NativelyAudioRecorder;
  globalContext.NativelyAudioPlayer = NativelyAudioPlayer;
  globalContext.NativelyBiometrics = NativelyBiometrics;
  globalContext.NativelyCamera = NativelyCamera;
  globalContext.NativelyClipboard = NativelyClipboard;
  globalContext.NativelyContacts = NativelyContacts;
  globalContext.NativelyDatePicker = NativelyDatePicker;
  globalContext.NativelyGeolocation = NativelyGeolocation;
  globalContext.NativelyHealth = NativelyHealth;
  globalContext.NativelyInfo = NativelyInfo;
  globalContext.NativelyLocation = NativelyLocation;
  globalContext.NativelyMediaPicker = NativelyMediaPicker;
  globalContext.NativelyMessage = NativelyMessage;
  globalContext.NativelyNFCService = NativelyNFCService;
  globalContext.NativelyNotifications = NativelyNotifications;
  globalContext.NativelyPurchases = NativelyPurchases;
  globalContext.NativelyScanner = NativelyScanner;
  globalContext.NativelyStorage = NativelyStorage;
  globalContext.NativelyCalendar = NativelyCalendar;
  globalContext.NativelyFirebaseNotifications = NativelyFirebaseNotifications;
  globalContext.NativelyKlaviyoNotifications = NativelyKlaviyoNotifications;
}