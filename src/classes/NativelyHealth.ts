import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyHealth {
    private readonly id: string = generateID();

    available(available_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            10,
            available_callback,
            "health_available",
            {},
        );
    }

    requestAuthorization(
        write_data_types: string[],
        read_data_types: string[],
        request_callback: Function,
    ): void {
        globalContext?.natively.trigger(this.id, 10, request_callback, "health_register", {
            write_data_types,
            read_data_types,
        });
    }

    permissionStatus(data_type: string, callback: Function): void {
        globalContext?.natively.trigger(this.id, 10, callback, "health_permission", {
            data_type,
        });
    }

    getAllCharacteristics(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            10,
            callback,
            "health_get_all_characteristics",
            {},
        );
    }

    getStatisticQuantity(
        data_type: string,
        interval: string,
        start_date?: Date,
        end_date?: Date,
        callback?: Function,
    ): void {
        const obj: any = {
            data_type,
            interval,
        };
        if (start_date) {
            obj.start_date = start_date.getTime();
        }
        if (end_date) {
            obj.end_date = end_date.getTime();
        }
        globalContext?.natively.trigger(
            this.id,
            10,
            callback,
            "health_get_statistic_quantity",
            obj,
        );
    }


    getDailySleepAnalysis(
        start_date?: Date,
        end_date?: Date,
        limit?: number,
        callback?: Function
    ): void {
        const obj: any = { limit: limit || 100 };
        if (start_date) {
            obj.start_date = start_date.getTime();
        }
        if (end_date) {
            obj.end_date = end_date.getTime();
        }
        globalContext?.natively.trigger(
            this.id,
            10,
            callback,
            "health_get_daily_sleep_analysis",
            obj
        );
    }
    
    getWorkouts(
        start_date?: Date,
        end_date?: Date,
        limit?: number,
        callback?: Function
    ): void {
        const obj: any = { limit: limit || 100 };
        if (start_date) {
            obj.start_date = start_date.getTime();
        }
        if (end_date) {
            obj.end_date = end_date.getTime();
        }
        globalContext?.natively.trigger(
            this.id,
            21,
            callback,
            "health_get_workouts",
            obj
        );
    }

    getHealthConnectStatus(callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            40,
            callback,
            "health_connect_status",
            {},
        );
    }

    installHealthConnect(callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            40,
            callback,
            "health_connect_install",
            {},
        );
    }

    writeWorkout(
        workout: {
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
        },
        callback?: Function
    ): void {
        const obj: any = {
            ...workout,
        };

        if (workout?.start_date instanceof Date) {
            obj.start_date = workout.start_date.getTime();
        }
        if (workout?.end_date instanceof Date) {
            obj.end_date = workout.end_date.getTime();
        }

        globalContext?.natively.trigger(
            this.id,
            39,
            callback,
            "health_write_workout",
            obj
        );
    }

    writeNutrition(
        nutrition: {
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
        },
        callback?: Function
    ): void {
        const obj: any = { ...nutrition };

        if (nutrition?.start_date instanceof Date) {
            obj.start_date = nutrition.start_date.getTime();
        }
        if (nutrition?.end_date instanceof Date) {
            obj.end_date = nutrition.end_date.getTime();
        }

        if (Array.isArray(nutrition?.items)) {
            obj.items = nutrition.items.map((item) => {
                const mappedItem: any = { ...item };
                if (item?.start_date instanceof Date) {
                    mappedItem.start_date = item.start_date.getTime();
                }
                if (item?.end_date instanceof Date) {
                    mappedItem.end_date = item.end_date.getTime();
                }
                return mappedItem;
            });
        }

        globalContext?.natively.trigger(
            this.id,
            39,
            callback,
            "health_write_nutrition",
            obj
        );
    }
    
    getActivitySummary(
        start_date?: Date,
        end_date?: Date,
        callback?: Function
    ): void {
        const obj: any = {};
        if (start_date) {
            obj.start_date = start_date.getTime();
        }
        if (end_date) {
            obj.end_date = end_date.getTime();
        }
        globalContext?.natively.trigger(
            this.id,
            10,
            callback,
            "health_get_activity_summary",
            obj
        );
    }
}
