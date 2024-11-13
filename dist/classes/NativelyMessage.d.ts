export declare class NativelyMessage {
    private readonly id;
    sendSMS(body?: string, recipient?: string, send_sms_callback?: Function): void;
    sendEmail(subject?: string, body?: string, recipient?: string, send_email_callback?: Function): void;
}
