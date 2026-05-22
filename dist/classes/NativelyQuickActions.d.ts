export interface NativelyQuickActionPayload {
    type: string;
    url: string;
    title?: string;
    subtitle?: string;
    isEnabled?: boolean;
    is_enabled?: boolean;
    icon?: string;
    iosIcon?: string;
    ios_icon?: string;
    androidIcon?: string;
    android_icon?: string;
}
export interface NativelyQuickActionState {
    type: string;
    url: string;
    title: string;
    subtitle?: string;
    is_enabled: boolean;
    icon?: string;
    ios_icon?: string;
    android_icon?: string;
}
export interface NativelyQuickActionsResponse {
    status: string;
    actions: NativelyQuickActionState[];
}
export declare class NativelyQuickActions {
    private readonly id;
    setActions(actions: NativelyQuickActionPayload[], callback?: (response: NativelyQuickActionsResponse) => void): void;
    clear(callback?: (response: NativelyQuickActionsResponse) => void): void;
    private normalizeAction;
}
