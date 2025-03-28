export declare class NativelyLocation {
    private readonly id;
    current(minAccuracyIOS: number, accuracyTypeIOS: string, priority_android: string, location_callback: Function, fallback_to_settings?: boolean): void;
    permission(location_permission_callback: Function): void;
    start(interval: number, minAccuracyIOS: number, accuracyTypeIOS: string, priority_android: string, location_callback: Function, fallback_to_settings?: boolean): void;
    stop(): void;
    startBackground(interval?: number, minAccuracyIOS?: number, accuracyTypeIOS?: string, priority_android?: string, responseIdentifier?: string, location_bg_callback?: Function, fallback_to_settings?: boolean): void;
    statusBackground(location_bg_status_callback: Function): void;
    stopBackground(location_bg_callback: Function): void;
}
