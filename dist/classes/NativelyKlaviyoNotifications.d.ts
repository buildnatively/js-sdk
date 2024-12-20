export declare class NativelyKlaviyoNotifications {
    private readonly id;
    setProfile(data: {
        external_id?: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        phone_number?: string;
    }, callback: Function): void;
    getExternalId(callback: Function): void;
    resetProfile(callback: Function): void;
    pushPermission(callback: Function): void;
    pushRegister(callback: Function): void;
}
