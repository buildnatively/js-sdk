const getGlobalObject = () => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof global !== "undefined") return global;
  if (typeof window !== "undefined") return window;
  return {} as typeof window;
};

export default class NativelyInfo {
  private id: string;
  private globalObj: typeof window;

  constructor() {
    this.globalObj = getGlobalObject() as Window & typeof globalThis;
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  browserInfo(): {
    isNativeApp: boolean;
    isIOSApp: boolean;
    isAndroidApp: boolean;
  } {
    const isNativeApp = typeof this.globalObj.$agent !== "undefined";
    const isIOSApp =
      this.globalObj.navigator?.userAgent.includes("Natively/iOS") ?? false;
    const isAndroidApp =
      this.globalObj.navigator?.userAgent.includes("Natively/Android") ?? false;
    return { isNativeApp, isIOSApp, isAndroidApp };
  }

  getAppInfo(app_info_callback: Function): void {
    if (!this.globalObj.natively) return;
    this.globalObj.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }

  connectivity(connectivity_callback: Function): void {
    if (!this.globalObj.natively) return;
    this.globalObj.natively.trigger(
      undefined,
      0,
      connectivity_callback,
      "connectivity",
    );
  }

  app_state(app_state_callback: Function): void {
    if (!this.globalObj.natively) return;
    this.globalObj.natively.trigger(
      undefined,
      19,
      app_state_callback,
      "app_state",
    );
  }
}
