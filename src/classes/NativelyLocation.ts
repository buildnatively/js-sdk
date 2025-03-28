import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyLocation {
    private readonly id: string = generateID();

    current(
        minAccuracyIOS: number,
        accuracyTypeIOS: string,
        priority_android: string,
        location_callback: Function,
        fallback_to_settings: boolean = true,
    ): void {
        globalContext?.natively.trigger(this.id, 12, location_callback, "location_current", {
            minAccuracy: minAccuracyIOS,
            accuracyType: accuracyTypeIOS,
            priority: priority_android,
            fallbackToSettings: fallback_to_settings,
        });
    }

    permission(location_permission_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            6,
            location_permission_callback,
            "location_permission",
        );
    }

    start(
        interval: number,
        minAccuracyIOS: number,
        accuracyTypeIOS: string,
        priority_android: string,
        location_callback: Function,
        fallback_to_settings: boolean = true,
    ): void {
        globalContext?.natively.trigger(this.id, 12, location_callback, "location_start", {
            minAccuracy: minAccuracyIOS,
            accuracyType: accuracyTypeIOS,
            priority: priority_android,
            fallbackToSettings: fallback_to_settings,
            interval,
        });
    }

    stop(): void {
        globalContext?.natively.trigger(this.id, 3, undefined, "location_stop", {});
    }

    startBackground(
        interval?: number,
        minAccuracyIOS?: number,
        accuracyTypeIOS?: string,
        priority_android?: string,
        responseIdentifier?: string,
        location_bg_callback?: Function,
        fallback_to_settings: boolean = true,
    ): void {
        const params = {
            identifier: responseIdentifier ?? "empty",
            interval: interval ?? 1000 * 60,
            minAccuracy: minAccuracyIOS ?? 50,
            accuracyType: accuracyTypeIOS ?? "Best",
            priority: priority_android ?? "BALANCED",
            fallbackToSettings: fallback_to_settings,
        };
        globalContext?.natively.trigger(
            this.id,
            12,
            location_bg_callback,
            "location_start_bg",
            params,
        );
    }

    statusBackground(location_bg_status_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            20,
            location_bg_status_callback,
            "location_status_bg",
            {},
        );
    }

    stopBackground(location_bg_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            4,
            location_bg_callback,
            "location_stop_bg",
            {},
        );
    }
}
