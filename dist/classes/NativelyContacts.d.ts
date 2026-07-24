export declare class NativelyContacts {
    private readonly id;
    getAllContacts(contacts_all_callback: Function): void;
    createContact(firstName: string, lastName?: string, email?: string, phone?: string, addresses?: ContactAddress[], contacts_save_callback?: Function): void;
}
export type ContactAddressLabel = "home" | "school" | "work" | "other" | "custom";
export interface ContactAddress {
    address?: string;
    formatted?: string;
    label?: ContactAddressLabel;
    customLabel?: string;
    street?: string;
    pobox?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isoCountry?: string;
    subAdminArea?: string;
    subLocality?: string;
}
