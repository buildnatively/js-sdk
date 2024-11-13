export declare class NativelyContacts {
    private readonly id;
    getAllContacts(contacts_all_callback: Function): void;
    createContact(firstName: string, lastName?: string, email?: string, phone?: string, contacts_save_callback?: Function): void;
}
