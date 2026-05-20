import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

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

export class NativelyLiveUpdates {
    private readonly id: string = generateID();

    requestPermission(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            45,
            callback,
            "live_update_permission",
            {},
        );
    }

    start(payload: NativelyLiveUpdatePayload, callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            45,
            callback,
            "live_update_setup",
            payload,
        );
    }

    update(payload: NativelyLiveUpdatePayload, callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            45,
            callback,
            "live_update_update",
            payload,
        );
    }

    end(
        payload: Pick<NativelyLiveUpdatePayload, "id" | "title"> &
            Partial<NativelyLiveUpdatePayload>,
        callback?: Function,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            45,
            callback,
            "live_update_end",
            payload,
        );
    }
}
