import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyPurchases {
    private readonly id: string = generateID();

    login(
        login: string,
        customerEmail?: string,
        login_callback?: Function,
    ): void {
        const email = customerEmail ?? "";
        globalContext?.natively.trigger(this.id, 3, login_callback, "purchases_login", {
            login,
            email,
        });
    }

    logout(logout_callback: Function): void {
        globalContext?.natively.trigger(this.id, 3, logout_callback, "purchases_logout", {});
    }

    customerId(customer_id_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            3,
            customer_id_callback,
            "purchases_customerid",
            {},
        );
    }

    restore(restore_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            10,
            restore_callback,
            "purchases_restore",
            {},
        );
    }

    purchasePackage(packageId: string, purchase_callback: Function): void {
        globalContext?.natively.trigger(this.id, 3, purchase_callback, "purchases_package", {
            packageId,
        });
    }

    packagePrice(packageId: string, purchase_callback: Function): void {
        globalContext?.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
            packageId,
        });
    }
}
