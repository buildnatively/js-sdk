import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyContacts {
    private readonly id: string = generateID();

    getAllContacts(contacts_all_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            3,
            contacts_all_callback,
            "contacts_all",
            {},
        );
    }

    createContact(
        firstName: string,
        lastName?: string,
        email?: string,
        phone?: string,
        contacts_save_callback?: Function,
    ): void {
        const params = {
            firstName,
            lastName: lastName ?? "",
            email: email ?? "",
            phone: phone ?? "",
        };
        globalContext?.natively.trigger(
            this.id,
            3,
            contacts_save_callback,
            "contacts_save",
            params,
        );
    }
}
