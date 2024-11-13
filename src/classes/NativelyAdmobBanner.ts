import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyAdmobBanner {
    private readonly id: string = generateID();

    constructor(
        config: {
            androidUnitId?: string;
            iOSUnitId?: string;
            position?: string;
            sizeType?: string;
            custom_width?: number;
            custom_height?: number;
        },
        setup_callback?: Function,
        preload_ad: boolean = false,
        preload_callback?: Function,
        show_ad: boolean = false,
        show_callback?: Function,
    ) {
        const params: any = {};

        if (globalContext?.natively.isAndroidApp) {
            params.unitId =
                config.androidUnitId ?? "ca-app-pub-3940256099942544/6300978111";
        } else if (globalContext?.natively.isIOSApp) {
            params.unitId =
                config.iOSUnitId ?? "ca-app-pub-3940256099942544/2934735716";
        }

        params.position = config.position ?? "BOTTOM";
        params.sizeType = config.sizeType ?? "AUTO";
        params.width = config.custom_width ?? 320;
        params.height = config.custom_height ?? 50;

        globalContext?.natively.trigger(
            this.id,
            14,
            (resp: any) => {
                setup_callback?.(resp);
                if (preload_ad) {
                    globalContext?.natively.trigger(
                        this.id,
                        14,
                        (resp: any) => {
                            preload_callback?.(resp);
                            if (show_ad) {
                                globalContext?.natively.trigger(
                                    this.id,
                                    14,
                                    show_callback,
                                    "bannerad_show",
                                    {},
                                );
                            }
                        },
                        "bannerad_load",
                        {},
                    );
                }
            },
            "bannerad_setup",
            params,
        );
    }

    loadAd(callback?: Function): void {
        globalContext?.natively.trigger(this.id, 14, callback, "bannerad_load", {});
    }

    showBanner(callback?: Function): void {
        globalContext?.natively.trigger(this.id, 14, callback, "bannerad_show", {});
    }

    hideBanner(callback?: Function): void {
        globalContext?.natively.trigger(this.id, 14, callback, "bannerad_hide", {});
    }

    bannerIsReady(callback: Function): void {
        globalContext?.natively.trigger(this.id, 14, callback, "bannerad_ready", {});
    }

    bannerIsVisible(callback: Function): void {
        globalContext?.natively.trigger(this.id, 14, callback, "bannerad_visible", {});
    }
}
