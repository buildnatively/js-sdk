import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export interface RewardedAdSsvOptions {
    userId?: string;
    customData?: string;
}

/**
 * @description >=2.28.12
 *
 * Can be only one instance of NativelyAdmobRewarded per page.
 */
export class NativelyAdmobRewarded {
    private readonly id: string = generateID();
    private autoAdReload: boolean;
    private autoAdReloadCallback: Function | undefined;
    private serverSideVerificationOptions: RewardedAdSsvOptions | undefined;
    private unitId: string | undefined;

    constructor(
        iOSUnitId: string = "ca-app-pub-3940256099942544/1712485313",
        androidUnitId: string = "ca-app-pub-3940256099942544/5224354917",
        setupCallback?: Function,
        autoAdReload: boolean = false,
        autoAdReloadCallback?: Function,
        serverSideVerificationOptions?: RewardedAdSsvOptions,
    ) {
        if (globalContext?.natively.isAndroidApp) {
            this.unitId = androidUnitId;
        } else if (globalContext?.natively.isIOSApp) {
            this.unitId = iOSUnitId;
        }
        this.autoAdReload = autoAdReload;
        this.autoAdReloadCallback = autoAdReloadCallback;
        this.serverSideVerificationOptions = serverSideVerificationOptions;
        this.loadAd(setupCallback, serverSideVerificationOptions);
    }

    loadAd(
        callback?: Function,
        serverSideVerificationOptions?: RewardedAdSsvOptions,
    ): void {
        if (serverSideVerificationOptions !== undefined) {
            this.serverSideVerificationOptions = serverSideVerificationOptions;
        }
        const params = {
            unitId: this.unitId ?? "ca-app-pub-3940256099942544/1712485313",
            userId: this.serverSideVerificationOptions?.userId,
            customData: this.serverSideVerificationOptions?.customData,
        };
        globalContext?.natively.trigger(
            this.id,
            47,
            callback,
            "rewardedad_setup",
            params,
        );
    }

    showRewardedAd(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            47,
            (resp: any) => {
                callback(resp);
                if (resp.event === "DID_DISMISS_AD" && this.autoAdReload) {
                    setTimeout(() => {
                        this.loadAd(
                            this.autoAdReloadCallback,
                            this.serverSideVerificationOptions,
                        );
                    }, 500);
                }
            },
            "rewardedad_show",
            {},
        );
    }

    rewardedIsReady(callback: Function): void {
        globalContext?.natively.trigger(this.id, 47, callback, "rewardedad_ready", {});
    }
}
