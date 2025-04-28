import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyNFCService {
    private readonly id: string = generateID();
    private readAlertMessage: string;
    private writeAlertMessage: string;
    private readDetectedMessage: string;
    private writeDetectedMessage: string;

    constructor(
        readAlertMessage: string,
        writeAlertMessage: string,
        readDetectedMessage: string,
        writeDetectedMessage: string,
    ) {
        this.readAlertMessage = readAlertMessage;
        this.writeAlertMessage = writeAlertMessage;
        this.readDetectedMessage = readDetectedMessage;
        this.writeDetectedMessage = writeDetectedMessage;
    }

    read(callback: Function): void {
        const params = {
            alertMessage: this.readAlertMessage ?? "please set readAlertMessage",
            detectedMessage: this.readDetectedMessage ?? "readDetectedMessage",
        };
        globalContext?.natively.trigger(this.id, 15, callback, "nfc_read", params);
    }

    write(recordId: string, recordData: string, recordDataType: string, callback: Function): void {
        const params = {
            alertMessage: this.writeAlertMessage ?? "please set writeAlertMessage",
            detectedMessage:
                this.writeDetectedMessage ?? "please set writeDetectedMessage",
            recordData: recordData ?? "please set recordData",
            recordId: recordId ?? "please set recordId",
            recordDataType: recordDataType ?? "please set recordDataType",
        };
        globalContext?.natively.trigger(this.id, 15, callback, "nfc_write", params);
    }

    available(callback: Function): void {
        globalContext?.natively.trigger(this.id, 15, callback, "nfc_available", {});
    }
}
