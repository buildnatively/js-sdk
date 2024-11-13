import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

/**
 * @description \>=2.9.0
 *
 * Can be only one instance of NativelyAdmobInterstitial per page.
 *
 * Make sure to use this and not reload page a lot.
 */
export class NativelyAdmobInterstitial {
    private readonly id: string = generateID();
    private auto_ad_reload: boolean;
    private auto_ad_reload_callback: Function | undefined;
    private unitId: string | undefined;

    constructor(
        iOSUnitId: string = "ca-app-pub-3940256099942544/4411468910",
        androidUnitId: string = "ca-app-pub-3940256099942544/1033173712",
        setup_callback?: Function,
        auto_ad_reload: boolean = false,
        auto_ad_reload_callback?: Function,
    ) {
        if (globalContext?.natively.isAndroidApp) {
            this.unitId = androidUnitId;
        } else if (globalContext?.natively.isIOSApp) {
            this.unitId = iOSUnitId;
        }
        this.auto_ad_reload = auto_ad_reload;
        this.auto_ad_reload_callback = auto_ad_reload_callback;
        this.loadAd(setup_callback);
    }

    loadAd(callback?: Function): void {
        const params = {
            unitId: this.unitId ?? "ca-app-pub-3940256099942544/4411468910",
        };
        globalContext?.natively.trigger(
            this.id,
            14,
            callback,
            "interstitialad_setup",
            params,
        );
    }

    showInterstitialAd(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            14,
            (resp: any) => {
                callback(resp);
                if (resp.event === "DID_DISMISS_AD" && this.auto_ad_reload) {
                    setTimeout(() => {
                        this.loadAd(this.auto_ad_reload_callback);
                    }, 500);
                }
            },
            "interstitialad_show",
            {},
        );
    }

    interstitialIsReady(callback: Function): void {
        globalContext?.natively.trigger(this.id, 14, callback, "interstitialad_ready", {});
    }
}
