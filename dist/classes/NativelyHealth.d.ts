export declare class NativelyHealth {
    private readonly id;
    available(available_callback: Function): void;
    requestAuthorization(write_data_types: string[], read_data_types: string[], request_callback: Function): void;
    permissionStatus(data_type: string, callback: Function): void;
    getAllCharacteristics(callback: Function): void;
    getStatisticQuantity(data_type: string, interval: string, start_date?: Date, end_date?: Date, callback?: Function): void;
    getDailySleepAnalysis(start_date?: Date, end_date?: Date, limit?: number, callback?: Function): void;
    getWorkouts(start_date?: Date, end_date?: Date, limit?: number, callback?: Function): void;
    writeWorkout(workout: {
        start_date?: Date;
        end_date?: Date;
        duration?: number;
        activity_type?: string;
        total_energy_burned?: number;
        total_energy_burned_unit?: string;
        total_distance?: number;
        total_distance_unit?: string;
        total_swimming_stroke_count?: number;
        total_swimming_stroke_count_unit?: string;
        total_flights_climbed?: number;
        total_flights_climbed_unit?: string;
        metadata?: any;
        events?: any[];
        uuid?: string;
        identifier?: string;
    }, callback?: Function): void;
    writeNutrition(nutrition: {
        items?: Array<{
            start_date?: Date;
            end_date?: Date;
            [key: string]: any;
        }>;
        start_date?: Date;
        end_date?: Date;
        identifier?: string;
        value?: number;
        unit?: string;
        [key: string]: any;
    }, callback?: Function): void;
    getActivitySummary(start_date?: Date, end_date?: Date, callback?: Function): void;
}
