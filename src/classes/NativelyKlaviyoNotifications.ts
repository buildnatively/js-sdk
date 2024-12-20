import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyKlaviyoNotifications {
    private readonly id: string = generateID();

    setProfile(data: { external_id?: string, email?: string, first_name?: string, last_name?: string, phone_number?: string }, callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            32,
            callback,
            "klaviyo_set_profile",
            data
        );
    }

    getExternalId(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            32,
            callback,
            "klaviyo_external_id"
        );
    }

    resetProfile(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            32,
            callback,
            "klaviyo_reset_profile"
        );
    }

    pushPermission(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            32,
            callback,
            "klaviyo_push_permission"
        );
    }

    pushRegister(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            32,
            callback,
            "klaviyo_push_register"
        );
    }
}