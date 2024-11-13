import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyStorage {
    private readonly id: string = generateID();

    setStorageValue(key: string, value: any): void {
        globalContext?.natively.trigger(this.id, 0, undefined, "set_storage_value", {
            key,
            value,
        });
    }

    getStorageValue(key: string, get_storage_value_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            get_storage_value_callback,
            "get_storage_value",
            {
                key,
            },
        );
    }

    removeStorageValue(key: string): void {
        globalContext?.natively.trigger(this.id, 0, undefined, "remove_storage_value", {
            key,
        });
    }

    resetStorage(): void {
        globalContext?.natively.trigger(this.id, 0, undefined, "reset_storage");
    }
}
