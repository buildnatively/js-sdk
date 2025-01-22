import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyWakelock {
    private readonly id: string = generateID();

    enable_wakelock(wakelock_callback: Function): void {
        if (!globalContext?.natively) return;
        globalContext?.natively.trigger(this.id, 34, wakelock_callback, "wakelock_enable");
    }

    disable_wakelock(wakelock_callback: Function): void {
        if (!globalContext?.natively) return;
        globalContext?.natively.trigger(this.id, 34, wakelock_callback, "wakelock_disable");
    }
}
