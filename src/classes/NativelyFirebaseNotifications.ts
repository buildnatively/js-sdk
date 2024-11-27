import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export default class NativelyFirebaseNotifications {
    private readonly id: string = generateID();

    firebase_get_token(token_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            31,
            token_callback,
            "firebase_get_token",
        );
    }

    firebase_get_apns_token(apns_token_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            31,
            apns_token_callback,
            "firebase_get_apns_token",
        );
    }

    firebase_request_permission(permission_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            31,
            permission_callback,
            "firebase_request_permission",
        );
    }

    firebase_has_permission(permission_status_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            31,
            permission_status_callback,
            "firebase_has_permission",
        );
    }

    firebase_subscribe_to_topic(topic: string, subscribe_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            31,
            subscribe_callback,
            "firebase_subscribe_to_topic",
            { topic },
        );
    }

    firebase_unsubscribe_from_topic(topic: string, unsubscribe_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            31,
            unsubscribe_callback,
            "firebase_unsubscribe_from_topic",
            { topic },
        );
    }
}