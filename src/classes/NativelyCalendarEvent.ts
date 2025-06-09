import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyCalendarEvent {
    private readonly id: string = generateID();

    createEvent(
       title: string,
        startDate: Date,
        endDate?: Date,
        timezone?: string,
        description?: string,
        create_calendar_event_callback?: Function,
    ): void {
        const params = {
            title: title,
            timezone: timezone,
            description: description,
            endDate: endDate?.toISOString(),
            startDate: startDate.toISOString(),
        };
        globalContext?.natively.trigger(this.id, 37, create_calendar_event_callback, "calendar_event", params);
    }
}
