import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyClipboard {
    private readonly id: string = generateID();

    copy(text: string): void {
        globalContext?.natively.trigger(undefined, 11, undefined, "clipboard_copy", {
            text,
        });
    }

    paste(paste_callback: Function): void {
        globalContext?.natively.trigger(this.id, 11, paste_callback, "clipboard_paste");
    }
}
