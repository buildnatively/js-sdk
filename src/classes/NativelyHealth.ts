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
}
