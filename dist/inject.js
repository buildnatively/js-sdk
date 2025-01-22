import globalContext from "./utils/globalThis.js";
import { Natively } from "./classes/Natively.js";
import { NativelyAdmobBanner } from "./classes/NativelyAdmobBanner.js";
import { NativelyAdmobInterstitial } from "./classes/NativelyAdmobInterstitial.js";
import { NativelyAppleSignInService } from "./classes/NativelyAppleSignInService.js";
import { NativelyAudioRecorder } from "./classes/NativelyAudioRecorder.js";
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
import { NativelyTabBar } from './classes/NativelyTabBar.js';
import { NativelyWakelock } from './classes/NativelyWakelock.js';

// Assign natively to the global object
if (globalContext) {
  globalContext.natively = new Natively();
  // All other classes must be global to make a possibility to create any number of their instances
  globalContext.NativelyAdmobBanner = NativelyAdmobBanner;
  globalContext.NativelyAdmobInterstitial = NativelyAdmobInterstitial;
  globalContext.NativelyAppleSignInService = NativelyAppleSignInService;
  globalContext.NativelyAudioRecorder = NativelyAudioRecorder;
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
  globalContext.NativelyFirebaseNotifications = NativelyFirebaseNotifications;
  globalContext.NativelyKlaviyoNotifications = NativelyKlaviyoNotifications;
  globalContext.NativelyTabBar = NativelyTabBar;
  globalContext.NativelyWakelock = NativelyWakelock;
}