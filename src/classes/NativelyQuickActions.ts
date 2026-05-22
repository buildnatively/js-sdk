import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export interface NativelyQuickActionPayload {
    type: string;
    url: string;
    title?: string;
    subtitle?: string;
    is_enabled?: boolean;
    icon?: string;
    ios_icon?: string;
    android_icon?: string;
}

export interface NativelyQuickActionState {
    type: string;
    url: string;
    title: string;
    subtitle?: string;
    is_enabled: boolean;
    icon?: string;
    ios_icon?: string;
    android_icon?: string;
}

export interface NativelyQuickActionsResponse {
    status: string;
    actions: NativelyQuickActionState[];
}

export class NativelyQuickActions {
    private readonly id: string = generateID();

    setActions(
        actions: NativelyQuickActionPayload[],
        callback?: (response: NativelyQuickActionsResponse) => void,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            46,
            callback,
            "quick_actions",
            {
                actions: actions.map((action) => this.normalizeAction(action)),
            },
        );
    }

    clear(
        callback?: (response: NativelyQuickActionsResponse) => void,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            46,
            callback,
            "clear_quick_actions",
            {},
        );
    }

    private normalizeAction(action: NativelyQuickActionPayload): Record<string, any> {
        const normalizedAction: Record<string, any> = {
            type: action.type,
            url: action.url,
        };

        if (typeof action.title !== "undefined") {
            normalizedAction.title = action.title;
        }

        if (typeof action.subtitle !== "undefined") {
            normalizedAction.subtitle = action.subtitle;
        }

        if (typeof action.is_enabled !== "undefined") {
            normalizedAction.is_enabled = action.is_enabled;
        }

        if (typeof action.icon !== "undefined") {
            normalizedAction.icon = action.icon;
        }

        if (typeof action.ios_icon !== "undefined") {
            normalizedAction.ios_icon = action.ios_icon;
        }

        if (typeof action.android_icon !== "undefined") {
            normalizedAction.android_icon = action.android_icon;
        }

        return normalizedAction;
    }
}
