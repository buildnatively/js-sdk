"use client";

export default class NativelyInfo {
  private id: string;

  constructor() {
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  browserInfo(): {
    isNativeApp: boolean;
    isIOSApp: boolean;
    isAndroidApp: boolean;
  } {
    const isNativeApp = typeof window.$agent !== "undefined";
    const isIOSApp =
      window.navigator.userAgent.includes("Natively/iOS") ?? false;
    const isAndroidApp =
      window.navigator.userAgent.includes("Natively/Android") ?? false;
    return { isNativeApp, isIOSApp, isAndroidApp };
  }

  getAppInfo(app_info_callback: Function): void {
    if (!window.natively) return;
    window.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }

  connectivity(connectivity_callback: Function): void {
    if (!window.natively) return;
    window.natively.trigger(
      undefined,
      0,
      connectivity_callback,
      "connectivity",
    );
  }

  app_state(app_state_callback: Function): void {
    if (!window.natively) return;
    window.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}
