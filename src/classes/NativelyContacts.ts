import { generateID } from "../utils/generateID";
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
    addresses?: ContactAddress[],
    contacts_save_callback?: Function,
  ): void {
    const params = {
      firstName,
      lastName: lastName ?? "",
      email: email ?? "",
      phone: phone ?? "",
      addresses: addresses ?? [],
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
