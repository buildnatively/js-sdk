import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyAudioRecorder {
    private readonly id: string = generateID();

    showRecorder(max_duration?: number, record_callback?: Function): void {
        const params = {
            max_duration: max_duration ?? 0,
        };
        globalContext?.natively.trigger(this.id, 13, record_callback, "record_start", params);
    }
}
