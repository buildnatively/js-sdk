export declare class NativelyPurchases {
    private readonly id;
    login(login: string, customerEmail?: string, login_callback?: Function): void;
    logout(logout_callback: Function): void;
    customerId(customer_id_callback: Function): void;
    restore(restore_callback: Function): void;
    showPaywall(shouldShowCloseButton?: boolean, offeringId?: string, show_paywall_callback?: Function): void;
    showPaywallIfNeeded(entitlementId: string, shouldShowCloseButton?: boolean, offeringId?: string, show_paywall_if_needed_callback?: Function): void;
    purchasePackage(packageId: string, purchase_callback: Function, oldProductId?: string | null, prorationMode?: string | null): void;
    packagePrice(packageId: string, purchase_callback: Function): void;
}
