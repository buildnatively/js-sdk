import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyMediaPicker {
    private readonly id: string = generateID();

    showMediaPicker(mediapicker_callback: Function): void {
        globalContext?.natively.trigger(this.id, 8, mediapicker_callback, "mediapicker", {});
    }
}
