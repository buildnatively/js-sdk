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
var HANDLER_NAME = "💙";
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