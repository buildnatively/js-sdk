export interface NativelyLiveUpdateSegment {
    length: number;
    color?: string;
}
export interface NativelyLiveUpdatePoint {
    position: number;
    color?: string;
}
export interface NativelyLiveUpdatePayload {
    id: string;
    title: string;
    body?: string;
    progress?: number;
    max_progress?: number;
    indeterminate?: boolean;
    ongoing?: boolean;
    silent?: boolean;
    auto_cancel?: boolean;
    only_alert_once?: boolean;
    show_when?: boolean;
    when_epoch_ms?: number;
    uses_chronometer?: boolean;
    chronometer_count_down?: boolean;
    channel_id?: string;
    channel_name?: string;
    channel_description?: string;
    short_critical_text?: string;
    styled_by_progress?: boolean;
    segments?: NativelyLiveUpdateSegment[];
    points?: NativelyLiveUpdatePoint[];
    url?: string;
}
export declare class NativelyLiveUpdates {
    private readonly id;
    requestPermission(callback: Function): void;
    start(payload: NativelyLiveUpdatePayload, callback?: Function): void;
    update(payload: NativelyLiveUpdatePayload, callback?: Function): void;
    end(payload: Pick<NativelyLiveUpdatePayload, "id" | "title"> & Partial<NativelyLiveUpdatePayload>, callback?: Function): void;
}
