export interface RewardedAdSsvOptions {
    userId?: string;
    customData?: string;
}
/**
 * @description >=2.28.12
 *
 * Can be only one instance of NativelyAdmobRewarded per page.
 */
export declare class NativelyAdmobRewarded {
    private readonly id;
    private autoAdReload;
    private autoAdReloadCallback;
    private serverSideVerificationOptions;
    private unitId;
    constructor(iOSUnitId?: string, androidUnitId?: string, setupCallback?: Function, autoAdReload?: boolean, autoAdReloadCallback?: Function, serverSideVerificationOptions?: RewardedAdSsvOptions);
    loadAd(callback?: Function, serverSideVerificationOptions?: RewardedAdSsvOptions): void;
    showRewardedAd(callback: Function): void;
    rewardedIsReady(callback: Function): void;
}
