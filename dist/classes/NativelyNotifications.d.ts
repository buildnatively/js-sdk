export type NativelyCallback<TResponse = unknown> = (response: TResponse, meta?: unknown) => void;
export type NativelyLiveUpdateTemplate = "progress" | "score" | "scoreboard" | "status" | "timer";
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
export declare class NativelyNotifications {
    private readonly id;
    getOneSignalId(onesignal_playerid_callback: NativelyCallback): void;
    requestPermission(fallbackToSettings: boolean, push_register_callback: NativelyCallback): void;
    getPermissionStatus(push_permission_callback: NativelyCallback): void;
    getExternalId(callback: NativelyCallback): void;
    setExternalId(data: {
        externalId?: string;
    }, callback: NativelyCallback): void;
    removeExternalId(callback: NativelyCallback): void;
    requestLiveUpdatePermission(callback: NativelyCallback<NativelyLiveUpdatePermissionResponse>): void;
    setupLiveUpdate(data: NativelyLiveUpdatePayload, callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>): void;
    startLiveUpdate(data: NativelyLiveUpdatePayload, callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>): void;
    updateLiveUpdate(data: NativelyLiveUpdatePayload, callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>): void;
    endLiveUpdate(data: Pick<NativelyLiveUpdatePayload, "id" | "title"> & Partial<NativelyLiveUpdatePayload>, callback: NativelyCallback<NativelyLiveUpdateLifecycleResponse>): void;
}
