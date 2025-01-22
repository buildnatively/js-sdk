import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyInfo {
    private readonly id: string = generateID();

    browserInfo(): {
        isNativeApp: boolean;
        isIOSApp: boolean;
        isAndroidApp: boolean;
    } {
        const isNativeApp = typeof globalContext?.$agent !== "undefined";
        const isIOSApp =
            globalContext?.navigator?.userAgent?.includes("Natively/iOS") || false;
        const isAndroidApp =
            globalContext?.navigator?.userAgent?.includes("Natively/Android") || false;
        return {isNativeApp, isIOSApp, isAndroidApp};
    }

    getAppInfo(app_info_callback: Function): void {
        if (!globalContext?.natively) return;
        globalContext?.natively.trigger(this.id, 0, app_info_callback, "app_info");
    }

    connectivity(connectivity_callback: Function): void {
        if (!globalContext?.natively) return;
        globalContext?.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
    }

    app_state(app_state_callback: Function): void {
        if (!globalContext?.natively) return;
        globalContext?.natively.trigger(undefined, 19, app_state_callback, "app_state");
    }

    keyboard_visibility(keyboard_visibility_callback: Function): void {
        if (!globalContext?.natively) return;
        globalContext?.natively.trigger(undefined, 0, keyboard_visibility_callback, "keyboard_visibility");
    }
}
