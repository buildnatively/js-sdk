import globalContext from "./utils/globalThis";
import {Natively} from "./classes/Natively";
import {NativelyAdmobBanner} from "./classes/NativelyAdmobBanner";
import {NativelyAdmobInterstitial} from "./classes/NativelyAdmobInterstitial";
import {NativelyAppleSignInService} from "./classes/NativelyAppleSignInService";
import {NativelyAudioRecorder} from "./classes/NativelyAudioRecorder";
import {NativelyBiometrics} from "./classes/NativelyBiometrics";
import {NativelyCamera} from "./classes/NativelyCamera";
import {NativelyClipboard} from "./classes/NativelyClipboard";
import {NativelyContacts} from "./classes/NativelyContacts";
import {NativelyDatePicker} from "./classes/NativelyDatePicker";
import {NativelyGeolocation} from "./classes/NativelyGeolocation";
import {NativelyHealth} from "./classes/NativelyHealth";
import {NativelyInfo} from "./classes/NativelyInfo";
import {NativelyLocation} from "./classes/NativelyLocation";
import {NativelyMediaPicker} from "./classes/NativelyMediaPicker";
import {NativelyMessage} from "./classes/NativelyMessage";
import {NativelyNFCService} from "./classes/NativelyNFCService";
import {NativelyNotifications} from "./classes/NativelyNotifications";
import {NativelyPurchases} from "./classes/NativelyPurchases";
import {NativelyScanner} from "./classes/NativelyScanner";
import {NativelyStorage} from "./classes/NativelyStorage";
import {NativelyFirebaseNotifications} from "./classes/NativelyFirebaseNotifications";
import {NativelyKlaviyoNotifications} from './classes/NativelyKlaviyoNotifications';
import {NativelyTabBar} from './classes/NativelyTabBar';
import {NativelyWakelock} from './classes/NativelyWakelock';

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
