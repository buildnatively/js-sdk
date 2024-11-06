declare const _default: {
    new (): {
        browserInfo(): {
            isNativeApp: boolean;
            isIOSApp: boolean;
            isAndroidApp: boolean;
        };
        getAppInfo(): void;
        connectivity(): void;
        app_state(): void;
    };
} | {
    new (): {
        id: string;
        browserInfo(): {
            isNativeApp: boolean;
            isIOSApp: boolean;
            isAndroidApp: boolean;
        };
        getAppInfo(app_info_callback: Function): void;
        connectivity(connectivity_callback: Function): void;
        app_state(app_state_callback: Function): void;
    };
};
export default _default;
