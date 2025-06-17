export declare class NativelyCalendar {
    private readonly id;
    createCalendarEvent(title: string, endDate: Date, startDate: Date, timezone: string, calendarId: string, description?: string, create_calendar_event_callback?: Function): void;
    retrieveCalendars(retrieve_calendars_callback?: Function): void;
}
