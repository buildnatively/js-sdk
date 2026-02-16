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

    showPaywall(shouldShowCloseButton?: boolean, offeringId?: string, show_paywall_callback?: Function): void {
            const params = {
                offeringId: offeringId,
                shouldShowCloseButton: shouldShowCloseButton,
            };

            globalContext?.natively.trigger(
            this.id,
            38,
            show_paywall_callback,
            "purchases_show_paywall",
            params
        );
    }

        showPaywallIfNeeded(entitlementId: string, shouldShowCloseButton?: boolean, offeringId?: string, show_paywall_if_needed_callback?: Function): void {
            const params = {
                offeringName: offeringId,
                entitlementId: entitlementId,
                shouldShowCloseButton: shouldShowCloseButton,
            };

            globalContext?.natively.trigger(
            this.id,
            38,
            show_paywall_if_needed_callback,
            "purchases_show_paywall_if_needed",
            params,
        );
    }

    purchasePackage(packageId: string, purchase_callback: Function, oldProductId?: string | null, prorationMode?: string | null ): void {
        globalContext?.natively.trigger(this.id, 3, purchase_callback, "purchases_package", {
            packageId,
            oldProductId: oldProductId ?? null,
            prorationMode: prorationMode ?? null,
        });
    }

    packagePrice(packageId: string, purchase_callback: Function): void {
        globalContext?.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
            packageId,
        });
    }

    invalidateRestoreCache(packageId: string, invalidate_restore_cache_callback: Function): void {
        globalContext?.natively.trigger(this.id, 40, invalidate_restore_cache_callback, "purchases_invalidate_restore_cache", {
            packageId,
        });
    }
}
