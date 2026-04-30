import globalContext from "./utils/globalThis";
import {Natively} from "./classes/Natively";
import {NativelyAdmobBanner} from "./classes/NativelyAdmobBanner";
import {NativelyAdmobInterstitial} from "./classes/NativelyAdmobInterstitial";
import {NativelyAppleSignInService} from "./classes/NativelyAppleSignInService";
import {NativelyAudioRecorder} from "./classes/NativelyAudioRecorder";
import {NativelyAudioPlayer} from "./classes/NativelyAudioPlayer";
import {NativelyBiometrics} from "./classes/NativelyBiometrics";
import {NativelyCamera} from "./classes/NativelyCamera";
import {NativelyClipboard} from "./classes/NativelyClipboard";
import {NativelyContacts} from "./classes/NativelyContacts";
import {NativelyDatePicker} from "./classes/NativelyDatePicker";
import {NativelyGeolocation} from "./classes/NativelyGeolocation";
import {NativelyHealth} from "./classes/NativelyHealth";
import {NativelyInfo} from "./classes/NativelyInfo";
import {NativelyLocation} from "./classes/NativelyLocation";
import {NativelyMediaPicker} from "./classes/NativelyMediaPicker";
import {NativelyMessage} from "./classes/NativelyMessage";
import {NativelyNFCService} from "./classes/NativelyNFCService";
import {NativelyNotifications} from "./classes/NativelyNotifications";
import {NativelyPurchases} from "./classes/NativelyPurchases";
import {NativelyScanner} from "./classes/NativelyScanner";
import {NativelyStorage} from "./classes/NativelyStorage";
import {NativelyFirebaseNotifications} from "./classes/NativelyFirebaseNotifications";
import {NativelyKlaviyoNotifications} from './classes/NativelyKlaviyoNotifications';
import {NativelyCalendar} from "./classes/NativelyCalendar";
import {SDK_VERSION} from "./sdkVersion";

const HANDLER_NAME = "💙";
const WEB_NAVIGATION_PROGRESS_EVENT = "web_navigation_progress";
const WEB_SDK_VERSION_EVENT = "web_sdk_version";

const isIframe = (context: any): boolean => {
    try {
        return context.self !== context.top;
    } catch {
        return true;
    }
};

const installAgent = (context: any): boolean => {
    if (typeof context.$agent?.trigger === "function") return true;

    const runningInIframe = isIframe(context);
    const hasNativeHandler = typeof context.flutter_inappwebview?.callHandler === "function";
    if (!runningInIframe && !hasNativeHandler) return false;

    const agent = {
        __nativelyAgent: true,
        trigger(eventName: string, eventData?: any): void {
            const serializedArgs = JSON.stringify({
                trigger: {
                    name: eventName,
                    data: eventData,
                },
            });

            if (typeof context.flutter_inappwebview?.callHandler === "function") {
                context.flutter_inappwebview.callHandler(HANDLER_NAME, serializedArgs);
                return;
            }

            if (runningInIframe && typeof context.parent?.postMessage === "function") {
                context.parent.postMessage(
                    {
                        source: "natively-webview",
                        handlerName: HANDLER_NAME,
                        args: [serializedArgs],
                    },
                    "*",
                );
            }
        },
        response(): void {},
        natively_logger(): void {
            this.trigger("natively_logger");
        },
    };

    context.$agent = agent;
    context.natively = context.natively || agent;

    if (runningInIframe && typeof context.addEventListener === "function") {
        context.addEventListener("message", (event: MessageEvent) => {
            const data = event.data || {};
            if (data.source !== "natively-flutter" || data.type !== "evaluate") return;

            if (typeof data.script === "string") {
                context.eval(data.script);
            }
        });
    }

    return true;
};

const installNavigationProgressTracking = (context: any): void => {
    if (context.__nativelyNavigationProgressInstalled) return;
    context.__nativelyNavigationProgressInstalled = true;

    let completionTimer: ReturnType<typeof setTimeout> | null = null;
    let maxTimer: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver | null = null;

    const emit = (phase: "start" | "done", reason: string): void => {
        context.natively?.trigger(undefined, 0, undefined, WEB_NAVIGATION_PROGRESS_EVENT, {
            phase,
            reason,
            href: context.location?.href,
        });
    };

    const cancelTimers = (): void => {
        if (completionTimer) {
            clearTimeout(completionTimer);
            completionTimer = null;
        }
        if (maxTimer) {
            clearTimeout(maxTimer);
            maxTimer = null;
        }
    };

    const disconnectObserver = (): void => {
        observer?.disconnect();
        observer = null;
    };

    const finish = (reason: string): void => {
        cancelTimers();
        disconnectObserver();
        emit("done", reason);
    };

    const scheduleSettle = (): void => {
        if (completionTimer) {
            clearTimeout(completionTimer);
        }
        completionTimer = setTimeout(() => finish("settled"), 250);
    };

    const observeDom = (): void => {
        disconnectObserver();
        const root = context.document?.documentElement;
        if (!root || typeof context.MutationObserver !== "function") {
            scheduleSettle();
            return;
        }

        const mutationObserver = new context.MutationObserver(() => scheduleSettle());
        mutationObserver.observe(root, {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true,
        });
        observer = mutationObserver;

        scheduleSettle();
    };

    const start = (reason: string, maxDuration = 3000): void => {
        cancelTimers();
        emit("start", reason);
        observeDom();
        maxTimer = setTimeout(() => finish("timeout"), maxDuration);
    };

    const wrapHistoryMethod = (methodName: "pushState" | "replaceState"): void => {
        const original = context.history?.[methodName];
        if (typeof original !== "function") return;

        context.history[methodName] = function (...args: any[]) {
            start(methodName, 1500);
            return original.apply(this, args);
        };
    };

    wrapHistoryMethod("pushState");
    wrapHistoryMethod("replaceState");

    context.addEventListener?.("popstate", () => start("popstate", 1500));
    context.addEventListener?.("hashchange", () => start("hashchange", 800));

    context.document?.addEventListener(
        "click",
        (event: MouseEvent) => {
            const target = event.target as Element | null;
            if (!target || typeof target.closest !== "function") return;

            const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
            if (!anchor) return;

            const href = anchor.getAttribute("href") || "";
            if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

            const targetAttr = anchor.getAttribute("target");
            if (targetAttr && targetAttr !== "_self") return;

            start("anchor", 4000);
        },
        true,
    );

    if (context.document?.readyState === "complete") {
        finish("ready");
    } else {
        context.addEventListener?.(
            "load",
            () => finish("load"),
            { once: true },
        );
    }
};


// Assign natively to the global object
if (globalContext) {
    const agentInstalled = installAgent(globalContext);

    if (!globalContext.natively || globalContext.natively.__nativelyAgent) {
        globalContext.natively = new Natively();
    }
    globalContext.natively.injected = agentInstalled;
    if (agentInstalled && !globalContext.natively.app_version) {
        globalContext.natively.app_version = Number.MAX_SAFE_INTEGER;
    }
    globalContext.natively.sdkVersion = SDK_VERSION;
    if (agentInstalled) {
        globalContext.natively.trigger(
            undefined,
            0,
            undefined,
            WEB_SDK_VERSION_EVENT,
            { version: SDK_VERSION },
        );
        installNavigationProgressTracking(globalContext);
    }

    // All other classes must be global to make a possibility to create any number of their instances
    globalContext.NativelyAdmobBanner = NativelyAdmobBanner;
    globalContext.NativelyAdmobInterstitial = NativelyAdmobInterstitial;
    globalContext.NativelyAppleSignInService = NativelyAppleSignInService;
    globalContext.NativelyAudioRecorder = NativelyAudioRecorder;
    globalContext.NativelyAudioPlayer = NativelyAudioPlayer;
    globalContext.NativelyBiometrics = NativelyBiometrics;
    globalContext.NativelyCamera = NativelyCamera;
    globalContext.NativelyClipboard = NativelyClipboard;
    globalContext.NativelyContacts = NativelyContacts;
    globalContext.NativelyDatePicker = NativelyDatePicker;
    globalContext.NativelyGeolocation = NativelyGeolocation;
    globalContext.NativelyHealth = NativelyHealth;
    globalContext.NativelyInfo = NativelyInfo;
    globalContext.NativelyLocation = NativelyLocation;
    globalContext.NativelyMediaPicker = NativelyMediaPicker;
    globalContext.NativelyMessage = NativelyMessage;
    globalContext.NativelyNFCService = NativelyNFCService;
    globalContext.NativelyNotifications = NativelyNotifications;
    globalContext.NativelyPurchases = NativelyPurchases;
    globalContext.NativelyScanner = NativelyScanner;
    globalContext.NativelyStorage = NativelyStorage;
    globalContext.NativelyCalendar = NativelyCalendar;
    globalContext.NativelyFirebaseNotifications = NativelyFirebaseNotifications;
    globalContext.NativelyKlaviyoNotifications = NativelyKlaviyoNotifications;
}
