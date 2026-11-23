import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export type PaywallCustomVariable = string | number | boolean;
export type PaywallCustomVariables = Record<string, PaywallCustomVariable>;

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

    /**
     * @deprecated Use appUserId() instead.
     * Kept as-is so existing integrations don't break. Despite the name, it returns
     * RevenueCat's originalAppUserId, which stays the anonymous ID after login().
     */
    customerId(customer_id_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            3,
            customer_id_callback,
            "purchases_customerid",
            {},
        );
    }

    // Current RevenueCat App User ID (reflects login()); customerId() returns originalAppUserId.
    appUserId(app_user_id_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            46,
            app_user_id_callback,
            "purchases_appuserid",
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

    showPaywall(
        shouldShowCloseButton?: boolean,
        offeringId?: string,
        show_paywall_callback?: Function,
    ): void;
    showPaywall(
        shouldShowCloseButton?: boolean,
        offeringId?: string,
        customVariables?: PaywallCustomVariables,
        show_paywall_callback?: Function,
    ): void;
    
    showPaywall(
        shouldShowCloseButton?: boolean,
        offeringId?: string,
        customVariablesOrCallback?: PaywallCustomVariables | Function,
        show_paywall_callback?: Function,
    ): void {
        const customVariables = typeof customVariablesOrCallback === "function"
            ? undefined
            : customVariablesOrCallback;
        const callback = typeof customVariablesOrCallback === "function"
            ? customVariablesOrCallback
            : show_paywall_callback;
        const params = {
            offeringId,
            shouldShowCloseButton,
            customVariables,
        };

        globalContext?.natively.trigger(
            this.id,
            38,
            callback,
            "purchases_show_paywall",
            params,
        );
    }

    showPaywallIfNeeded(
        entitlementId: string,
        shouldShowCloseButton?: boolean,
        offeringId?: string,
        show_paywall_if_needed_callback?: Function,
    ): void;
    showPaywallIfNeeded(
        entitlementId: string,
        shouldShowCloseButton?: boolean,
        offeringId?: string,
        customVariables?: PaywallCustomVariables,
        show_paywall_if_needed_callback?: Function,
    ): void;
    showPaywallIfNeeded(
        entitlementId: string,
        shouldShowCloseButton?: boolean,
        offeringId?: string,
        customVariablesOrCallback?: PaywallCustomVariables | Function,
        show_paywall_if_needed_callback?: Function,
    ): void {
        const customVariables = typeof customVariablesOrCallback === "function"
            ? undefined
            : customVariablesOrCallback;
        const callback = typeof customVariablesOrCallback === "function"
            ? customVariablesOrCallback
            : show_paywall_if_needed_callback;
        const params = {
            offeringId,
            entitlementId,
            shouldShowCloseButton,
            customVariables,
        };

        globalContext?.natively.trigger(
            this.id,
            38,
            callback,
            "purchases_show_paywall_if_needed",
            params,
        );
    }

    purchasePackage(
        packageId: string,
        purchase_callback: Function,
        oldProductId?: string | null,
        prorationMode?: string | null,
        offeringId?: string | null,
        subscriptionOptionId?: string | null,
    ): void {
        globalContext?.natively.trigger(
            this.id,
            3,
            purchase_callback,
            "purchases_package",
            {
                packageId,
                oldProductId: oldProductId ?? null,
                prorationMode: prorationMode ?? null,
                offeringId: offeringId ?? null,
                subscriptionOptionId: subscriptionOptionId ?? null,
            },
        );
    }

    packagePrice(
        packageId: string,
        purchase_callback: Function,
        offeringId?: string | null,
    ): void {
        globalContext?.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
            packageId,
            offeringId: offeringId ?? null,
        });
    }
    
    showCustomerCenter(show_customer_center_callback: Function): void {
        globalContext?.natively.trigger(this.id, 42, show_customer_center_callback, "purchases_show_customer_center", {});
    }    


    getOfferings(get_offerings_callback: Function): void {
        globalContext?.natively.trigger(this.id, 44, get_offerings_callback, "purchases_get_offerings", {});
    }

    presentOfferCodeRedemptionSheet(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            45,
            callback,
            "purchases_present_code_redemption_sheet",
            {},
        );
    }
}
