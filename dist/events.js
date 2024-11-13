import globalContext from "./utils/globalThis";
globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively.addObserver(() => globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively.trigger(undefined, 0, resp => {
  if (globalContext) {
    globalContext.natively.min_app_version = resp.minSDKVersion;
    globalContext.natively.app_version = resp.sdkVersion;
  }
}, "app_info", {}));