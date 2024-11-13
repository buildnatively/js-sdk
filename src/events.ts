import globalContext from "./utils/globalThis";

globalContext?.natively.addObserver(() =>
    globalContext?.natively.trigger(
        undefined,
        0,
        (resp: { minSDKVersion: number; sdkVersion: number }) => {
            if (globalContext) {
                globalContext.natively.min_app_version = resp.minSDKVersion;
                globalContext.natively.app_version = resp.sdkVersion;
            }
        },
        "app_info",
        {},
    ),
);
