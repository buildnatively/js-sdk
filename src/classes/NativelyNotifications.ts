import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyNotifications {
    private readonly id: string = generateID();

    getOneSignalId(onesignal_playerid_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            onesignal_playerid_callback,
            "onesignal_playerid",
        );
    }

    requestPermission(
        fallbackToSettings: boolean,
        push_register_callback: Function,
    ): void {
        globalContext?.natively.trigger(this.id, 0, push_register_callback, "push_register", {
            fallbackToSettings,
        });
    }

    getPermissionStatus(push_permission_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            push_permission_callback,
            "push_permission",
        );
    }

    getExternalId(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "onesignal_externalid"
        );
    }

    setExternalId(data: { externalId?: string }, callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "onesignal_setexternalid",
            data
        );
    }

    removeExternalId(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "onesignal_removeexternalid"
        );
    }
}
