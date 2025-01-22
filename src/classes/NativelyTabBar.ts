import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyTabBar {
    private readonly id: string = generateID();

    showTabBar(): void {
        globalContext?.natively.trigger(
            this.id,
            33,
            undefined,
            "show_tab_bar",
        );
    }

    hideTabBar(): void {
        globalContext?.natively.trigger(
            this.id,
            33,
            undefined,
            "hide_tab_bar",
        );
    }
}
