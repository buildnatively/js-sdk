export declare class NativelyNFCService {
    private readonly id;
    private readAlertMessage;
    private writeAlertMessage;
    private readDetectedMessage;
    private writeDetectedMessage;
    constructor(readAlertMessage: string, writeAlertMessage: string, readDetectedMessage: string, writeDetectedMessage: string);
    read(callback: Function): void;
    write(recordId: string, recordData: string, callback: Function): void;
    available(callback: Function): void;
}
