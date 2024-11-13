export declare class NativelyGeolocation {
    private readonly id;
    getUserGeolocation(distance: number, geolocation_callback: Function): void;
    requestPermission(geo_register_callback: Function): void;
    getPermissionStatus(geo_permission_callback: Function): void;
}
