import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyDatePicker {
    private readonly id: string = generateID();

    showDatePicker(
        title?: string,
        description?: string,
        type?: string,
        style?: string,
        datepicker_callback?: Function,
    ): void {
        const params = {
            type: type ?? "DATE",
            style: style ?? "LIGHT",
            title: title ?? "",
            description: description ?? "",
        };
        globalContext?.natively.trigger(
            this.id,
            0,
            datepicker_callback,
            "datepicker",
            params,
        );
    }
}
