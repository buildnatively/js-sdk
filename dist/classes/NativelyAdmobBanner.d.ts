export declare class NativelyAdmobBanner {
    private readonly id;
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
