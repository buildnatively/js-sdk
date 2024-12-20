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
import {NativelyKlaviyoNotifications} from "./classes/NativelyKlaviyoNotifications";

interface NativelyProps {
    natively: Natively;
    NativelyAdmobBanner: NativelyAdmobBanner;
    NativelyAdmobInterstitial: NativelyAdmobInterstitial;
    NativelyAppleSignInService: NativelyAppleSignInService;
    NativelyAudioRecorder: NativelyAudioRecorder;
    NativelyBiometrics: NativelyBiometrics;
    NativelyCamera: NativelyCamera;
    NativelyClipboard: NativelyClipboard;
    NativelyContacts: NativelyContacts;
    NativelyDatePicker: NativelyDatePicker;
    NativelyGeolocation: NativelyGeolocation;
    NativelyHealth: NativelyHealth;
    NativelyInfo: NativelyInfo;
    NativelyLocation: NativelyLocation;
    NativelyMediaPicker: NativelyMediaPicker;
    NativelyMessage: NativelyMessage;
    NativelyNFCService: NativelyNFCService;
    NativelyNotifications: NativelyNotifications;
    NativelyPurchases: NativelyPurchases;
    NativelyScanner: NativelyScanner;
    NativelyStorage: NativelyStorage;
    NativelyFirebaseNotifications: NativelyFirebaseNotifications;
    NativelyKlaviyoNotifications: NativelyKlaviyoNotifications;
    $agent: never;
}

declare global {
    const natively: Natively;
    const $agent: never;
    // Global classes are optional here as soon as we use them by importing from 'natively' module

    interface Window extends NativelyProps {}
}
