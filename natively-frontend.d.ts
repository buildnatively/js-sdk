declare global {
    interface Window {
        [key: string]: any;
        natively: Natively;
        $agent: any;
    }
}
interface Natively {
    isDebug: boolean;
    min_app_version: number;
    app_version: number;
    injected: boolean;
    observers: Function[];
    isIOSApp: boolean;
    isAndroidApp: boolean;
    setDebug(isDebug: boolean): void;
    notify(min?: number, current?: number): void;
    addObserver(fn: Function): void;
    trigger(respId: string | undefined, minVersion: number, callback: Function | undefined, method: string, body?: any): void;
    openLogger(): void;
    openConsole(): void;
    closeApp(): void;
    showProgress(toggle: boolean): void;
    shareImage(image_url: string): void;
    shareText(text: string): void;
    shareTextAndImage(text: string, image_url: string): void;
    shareFile(file_url: string): void;
    openExternalURL(url?: string, external?: boolean): void;
}
export declare class NativelyInfo {
    private id;
    constructor();
    browserInfo(): {
        isNativeApp: boolean;
        isIOSApp: boolean;
        isAndroidApp: boolean;
    };
    getAppInfo(app_info_callback: Function): void;
    connectivity(connectivity_callback: Function): void;
    app_state(app_state_callback: Function): void;
}
export declare class NativelyClipboard {
    private id;
    constructor();
    copy(text: string): void;
    paste(paste_callback: Function): void;
}
export declare class NativelyNotifications {
    private id;
    constructor();
    getOneSignalId(onesignal_playerid_callback: Function): void;
    requestPermission(fallbackToSettings: boolean, push_register_callback: Function): void;
    getPermissionStatus(push_permission_callback: Function): void;
}
export declare class NativelyGeolocation {
    private id;
    constructor();
    getUserGeolocation(distance: number, geolocation_callback: Function): void;
    requestPermission(geo_register_callback: Function): void;
    getPermissionStatus(geo_permission_callback: Function): void;
}
export declare class NativelyLocation {
    private id;
    constructor();
    current(minAccuracyIOS: number, accuracyTypeIOS: string, priority_android: string, location_callback: Function): void;
    permission(location_permission_callback: Function): void;
    start(interval: number, minAccuracyIOS: number, accuracyTypeIOS: string, priority_android: string, location_callback: Function): void;
    stop(): void;
    startBackground(interval?: number, minAccuracyIOS?: number, accuracyTypeIOS?: string, priority_android?: string, responseIdentifier?: string, location_bg_callback?: Function): void;
    statusBackground(location_bg_status_callback: Function): void;
    stopBackground(location_bg_callback: Function): void;
}
export declare class NativelyMessage {
    private id;
    constructor();
    sendSMS(body?: string, recipient?: string, send_sms_callback?: Function): void;
    sendEmail(subject?: string, body?: string, recipient?: string, send_email_callback?: Function): void;
}
export declare class NativelyStorage {
    private id;
    constructor();
    setStorageValue(key: string, value: any): void;
    getStorageValue(key: string, get_storage_value_callback: Function): void;
    removeStorageValue(key: string): void;
    resetStorage(): void;
}
export declare class NativelyBiometrics {
    private allowPass;
    private id;
    constructor(allowPass: boolean);
    checkBiometricsSupport(biometrics_support_callback: Function): void;
    checkCredentials(biometrics_has_credentials_callback: Function): void;
    verifyUserIdentify(biometrics_verify_callback: Function): void;
    getUserCredentials(biometrics_auth_callback: Function): void;
    removeUserCredentials(biometrics_remove_credentials_callback: Function): void;
    saveUserCredentials(login: string, password: string, biometrics_auth_callback: Function): void;
}
export declare class NativelyDatePicker {
    private id;
    constructor();
    showDatePicker(title?: string, description?: string, type?: string, style?: string, datepicker_callback?: Function): void;
}
export declare class NativelyCamera {
    private id;
    constructor();
    showCamera(type?: string, quality?: string, camera?: string, open_camera_callback?: Function): void;
}
export declare class NativelyHealth {
    private id;
    constructor();
    available(available_callback: Function): void;
    requestAuthorization(write_data_types: string[], read_data_types: string[], request_callback: Function): void;
    permissionStatus(data_type: string, callback: Function): void;
    getAllCharacteristics(callback: Function): void;
    getStatisticQuantity(data_type: string, interval: string, start_date?: Date, end_date?: Date, callback?: Function): void;
}
export declare class NativelyScanner {
    private id;
    constructor();
    showScanner(open_scanner_callback: Function): void;
}
export declare class NativelyPurchases {
    private id;
    constructor();
    login(login: string, customerEmail?: string, login_callback?: Function): void;
    logout(logout_callback: Function): void;
    customerId(customer_id_callback: Function): void;
    restore(restore_callback: Function): void;
    purchasePackage(packageId: string, purchase_callback: Function): void;
    packagePrice(packageId: string, purchase_callback: Function): void;
}
export declare class NativelyContacts {
    private id;
    constructor();
    getAllContacts(contacts_all_callback: Function): void;
    createContact(firstName: string, lastName?: string, email?: string, phone?: string, contacts_save_callback?: Function): void;
}
export declare class NativelyMediaPicker {
    private id;
    constructor();
    showMediaPicker(mediapicker_callback: Function): void;
}
export declare class NativelyAudioRecorder {
    private id;
    constructor();
    showRecorder(max_duration?: number, record_callback?: Function): void;
}
export declare class NativelyAdmobBanner {
    private id;
    constructor(config: {
        androidUnitId?: string;
        iOSUnitId?: string;
        position?: string;
        sizeType?: string;
        custom_width?: number;
        custom_height?: number;
    }, setup_callback?: Function, preload_ad?: boolean, preload_callback?: Function, show_ad?: boolean, show_callback?: Function);
    loadAd(callback?: Function): void;
    showBanner(callback?: Function): void;
    hideBanner(callback?: Function): void;
    bannerIsReady(callback: Function): void;
    bannerIsVisible(callback: Function): void;
}
export declare class NativelyAdmobInterstitial {
    private id;
    private auto_ad_reload;
    private auto_ad_reload_callback;
    private unitId;
    constructor(iOSUnitId?: string, androidUnitId?: string, setup_callback?: Function, auto_ad_reload?: boolean, auto_ad_reload_callback?: Function);
    loadAd(callback?: Function): void;
    showInterstitialAd(callback: Function): void;
    interstitialIsReady(callback: Function): void;
}
export declare class NativelyNFCService {
    private id;
    private readAlertMessage;
    private writeAlertMessage;
    private readDetectedMessage;
    private writeDetectedMessage;
    constructor(readAlertMessage: string, writeAlertMessage: string, readDetectedMessage: string, writeDetectedMessage: string);
    read(callback: Function): void;
    write(recordId: string, recordData: string, callback: Function): void;
    available(callback: Function): void;
}
export declare class NativelyAppleSignInService {
    private id;
    constructor();
    signin(callback: Function): void;
}
export declare const natively: Natively | undefined;
export {};
