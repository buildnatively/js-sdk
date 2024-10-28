export function initNatively() {
  if (typeof window !== "undefined") {
    return window.natively;
  }
  return null;
}

// Export classes for direct usage
export {
  NativelyInfo,
  NativelyNotifications,
  NativelyCamera,
  // other class exports
} from "./index";
