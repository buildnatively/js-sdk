import { generateID } from "./utils";

export default class NativelyInfo {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  browserInfo(): {
    isNativeApp: boolean;
    isIOSApp: boolean;
    isAndroidApp: boolean;
  } {
    const isNativeApp = typeof window.$agent !== "undefined";
    const isIOSApp = window.navigator.userAgent.includes("Natively/iOS");
    const isAndroidApp =
      window.navigator.userAgent.includes("Natively/Android");
    return { isNativeApp, isIOSApp, isAndroidApp };
  }

  getAppInfo(app_info_callback: Function): void {
    window.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }

  connectivity(connectivity_callback: Function): void {
    window.natively.trigger(
      undefined,
      0,
      connectivity_callback,
      "connectivity",
    );
  }

  app_state(app_state_callback: Function): void {
    window.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}
