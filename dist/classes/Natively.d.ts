export declare class Natively {
    isDebug: boolean;
    min_app_version: number;
    app_version: number;
    injected: boolean;
    observers: Function[];
    isIOSApp: boolean;
    isAndroidApp: boolean;
    setDebug(isDebug: boolean): void;
    notify(min?: number, current?: number): void;
    addObserver(fn: Function): void;
    trigger(respId: string | undefined, minVersion: number, callback: Function | undefined, method: string, body?: any): void;
    openLogger(): void;
    openConsole(): void;
    closeApp(): void;
    showProgress(toggle: boolean): void;
    shareImage(image_url: string): void;
    shareText(text: string): void;
    shareTextAndImage(text: string, image_url: string): void;
    shareFile(file_url: string): void;
    openExternalURL(url?: string, external?: boolean): void;
    openExternalApp(url: string): void;
    showAppToast(type: string, text?: string): void;
    showAppBanner(type: string, title?: string, description?: string): void;
    requestAppReview(): void;
    setAppBackgroundColor(color: string): void;
    setAppProgressColor(color: string): void;
    setAppSwipeNavigation(toggle: boolean): void;
    setAppPullToRefresh(toggle: boolean): void;
    setAppOrientation(orientation: string): void;
    setAppStatusBarStyle(style: string): void;
    hideLoadingScreen(): void;
    showLoadingScreen(autoHide?: boolean): void;
    openAppSettings(): void;
    hapticPattern(pattern: string, delay: number): void;
    hapticImpact(type: string): void;
    hapticNotification(type: string): void;
    sendPushNotification(appId: string, payload: any, player_ids: string[], isPreview: boolean): Promise<Response>;
}
