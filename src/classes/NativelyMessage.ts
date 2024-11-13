import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyMessage {
    private readonly id: string = generateID();

    sendSMS(
        body?: string,
        recipient?: string,
        send_sms_callback?: Function,
    ): void {
        const params = {
            body: body ?? "",
            recipient: recipient ?? "",
        };
        globalContext?.natively.trigger(this.id, 0, send_sms_callback, "send_sms", params);
    }

    sendEmail(
        subject?: string,
        body?: string,
        recipient?: string,
        send_email_callback?: Function,
    ): void {
        const params = {
            subject: subject ?? "",
            body: body ?? "",
            recipient: recipient ?? "",
        };
        globalContext?.natively.trigger(
            this.id,
            0,
            send_email_callback,
            "send_email",
            params,
        );
    }
}
