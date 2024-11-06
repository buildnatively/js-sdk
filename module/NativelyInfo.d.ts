export default class NativelyInfo {
    private id;
    private globalObj;
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
