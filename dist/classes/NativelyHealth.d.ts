export declare class NativelyHealth {
    private readonly id;
    available(available_callback: Function): void;
    requestAuthorization(write_data_types: string[], read_data_types: string[], request_callback: Function): void;
    permissionStatus(data_type: string, callback: Function): void;
    getAllCharacteristics(callback: Function): void;
    getStatisticQuantity(data_type: string, interval: string, start_date?: Date, end_date?: Date, callback?: Function): void;
    getDailySleepAnalysis(start_date?: Date, end_date?: Date, limit?: number, callback?: Function): void;
    getWorkouts(start_date?: Date, end_date?: Date, limit?: number, callback?: Function): void;
    getActivitySummary(start_date?: Date, end_date?: Date, callback?: Function): void;
}
