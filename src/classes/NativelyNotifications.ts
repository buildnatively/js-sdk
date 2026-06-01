import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export type NativelyCallback<TResponse = unknown> = (
    response: TResponse,
    meta?: unknown,
) => void;

export type NativelyLiveUpdateTemplate =
    | "progress"
    | "score"
    | "scoreboard"
    | "status"
    | "timer";

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
    template?: NativelyLiveUpdateTemplate;
    subtitle?: string;
    body?: string;
    status_text?: string;
    channel_id?: string;
    channel_name?: string;
    channel_description?: string;
    progress?: number;
    max_progress?: number;
    indeterminate?: boolean;
    ongoing?: boolean;
    auto_cancel?: boolean;
    only_alert_once?: boolean;
    silent?: boolean;
    show_when?: boolean;
    when_epoch_ms?: number;
    uses_chronometer?: boolean;
    chronometer_count_down?: boolean;
    short_critical_text?: string;
    styled_by_progress?: boolean;
    segments?: NativelyLiveUpdateSegment[];
    points?: NativelyLiveUpdatePoint[];
    url?: string;
    activity_tag?: string;
    ios_enable_remote_updates?: boolean;
    stale_in_seconds?: number;
    progress_label?: string;
    home_label?: string;
    away_label?: string;
    home_score?: number;
    away_score?: number;
    period?: string;
    clock?: string;
    started_at_epoch_ms?: number;
    home_logo_url?: string;
    away_logo_url?: string;
    teamAName?: string;
    teamBName?: string;
    teamAScore?: number;
    teamBScore?: number;
    teamAImageUrl?: string;
    teamBImageUrl?: string;
    color?: string;
    disable_gradient?: boolean;
}

export interface NativelyLiveUpdateLifecycleResponse {
    status: "SUCCESS" | "FAILED";
    id?: string;
    message?: string;
}

export interface NativelyLiveUpdatePermissionResponse {
    status: "SUCCESS" | "PERMISSION_NOT_ALLOWED";
    notifications_enabled: boolean;
    promoted_supported: boolean;
    promoted_enabled: boolean;
    activities_supported: boolean;
    activities_enabled: boolean;
    opened_settings: boolean;
}

export class NativelyNotifications {
    private readonly id: string = generateID();

    getOneSignalId(onesignal_playerid_callback: NativelyCallback): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            onesignal_playerid_callback,
            "onesignal_playerid",
        );
    }

    requestPermission(
        fallbackToSettings: boolean,
        push_register_callback: NativelyCallback,
    ): void {
        globalContext?.natively.trigger(this.id, 0, push_register_callback, "push_register", {
            fallbackToSettings,
        });
    }

    getPermissionStatus(push_permission_callback: NativelyCallback): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            push_permission_callback,
            "push_permission",
        );
    }

    getExternalId(callback: NativelyCallback): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "onesignal_externalid"
        );
    }

    setExternalId(data: { externalId?: string }, callback: NativelyCallback): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "onesignal_setexternalid",
            data
        );
    }

    removeExternalId(callback: NativelyCallback): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "onesignal_removeexternalid"
        );
    }

    requestLiveUpdatePermission(
        callback: NativelyCallback<NativelyLiveUpdatePermissionResponse>,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "live_update_permission",
        );
    }

    setupLiveUpdate(
        data: NativelyLiveUpdatePayload,
        callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "live_update_setup",
            data,
        );
    }

    startLiveUpdate(
        data: NativelyLiveUpdatePayload,
        callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>,
    ): void {
        this.setupLiveUpdate(data, callback);
    }

    updateLiveUpdate(
        data: NativelyLiveUpdatePayload,
        callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "live_update_update",
            data,
        );
    }

    endLiveUpdate(
        data: Pick<NativelyLiveUpdatePayload, "id" | "title"> & Partial<NativelyLiveUpdatePayload>,
        callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "live_update_end",
            data,
        );
    }
}
