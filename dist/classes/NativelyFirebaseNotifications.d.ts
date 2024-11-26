export declare class NativelyFirebaseNotifications {
    private readonly id;
    firebase_get_token(token_callback: Function): void;
    firebase_get_apns_token(apns_token_callback: Function): void;
    firebase_request_permission(permission_callback: Function): void;
    firebase_has_permission(permission_status_callback: Function): void;
    firebase_subscribe_to_topic(topic: string, subscribe_callback: Function): void;
    firebase_unsubscribe_from_topic(topic: string, unsubscribe_callback: Function): void;
}
