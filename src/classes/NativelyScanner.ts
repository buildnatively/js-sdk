import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyScanner {
    private readonly id: string = generateID();

    showScanner(open_scanner_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            2,
            open_scanner_callback,
            "open_scanner",
            {},
        );
    }
}
