export declare class NativelyNotifications {
    private readonly id;
    getOneSignalId(onesignal_playerid_callback: Function): void;
    requestPermission(fallbackToSettings: boolean, push_register_callback: Function): void;
    getPermissionStatus(push_permission_callback: Function): void;
}
