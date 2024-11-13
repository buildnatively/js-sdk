/**
 * @description \>=2.9.0
 *
 * Can be only one instance of NativelyAdmobInterstitial per page.
 *
 * Make sure to use this and not reload page a lot.
 */
export declare class NativelyAdmobInterstitial {
    private readonly id;
    private auto_ad_reload;
    private auto_ad_reload_callback;
    private unitId;
    constructor(iOSUnitId?: string, androidUnitId?: string, setup_callback?: Function, auto_ad_reload?: boolean, auto_ad_reload_callback?: Function);
    loadAd(callback?: Function): void;
    showInterstitialAd(callback: Function): void;
    interstitialIsReady(callback: Function): void;
}
