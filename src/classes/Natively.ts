import globalContext from "../utils/globalThis";

export class Natively {
    isDebug: boolean = false;
    min_app_version: number = 0;
    app_version: number = 0;
    injected: boolean = false;
    observers: Function[] = [];
    isIOSApp: boolean =
        globalContext?.navigator?.userAgent?.includes("Natively/iOS") || false;
    isAndroidApp: boolean =
        globalContext?.navigator?.userAgent?.includes("Natively/Android") || false;

    setDebug(isDebug: boolean): void {
        if (globalContext) {
            globalContext.natively.isDebug = isDebug;
        }
    }

    notify(min?: number, current?: number): void {
        if (globalContext) {
            globalContext.natively.injected = true;
            if (min) {
                globalContext.natively.min_app_version = min;
            }
            if (current) {
                globalContext.natively.app_version = current;
            }
        }
        const observers = globalContext?.natively.observers;
        if (globalContext?.natively.isDebug) {
            console.log("[INFO] Notify observers: ", observers.length);
        }
        while (observers.length > 0) {
            const observer = observers.shift();
            observer?.();
        }
    }

    addObserver(fn: Function): void {
        if (globalContext?.natively.injected) {
            fn();
        } else {
            if (globalContext?.natively.isDebug) {
                console.log(`[DEBUG] addObserver: ${fn}`);
            }
            globalContext?.natively.observers.push(fn);
        }
    }

    trigger(
        respId: string | undefined,
        minVersion: number,
        callback: Function | undefined,
        method: string,
        body?: any,
    ): void {
        const isTestVersion = globalContext?.natively.isDebug;
        if (!globalContext?.natively.injected) {
            globalContext?.natively.addObserver(() => {
                globalContext?.natively.trigger(respId, minVersion, callback, method, body);
            });
            return;
        }
        if (minVersion > globalContext?.natively.app_version) {
            if (isTestVersion) {
                alert(
                    `[ERROR] Please rebuild the app to use this functionality. App Version: ${globalContext?.natively.app_version}, feature version: ${minVersion}`,
                );
            }
            return;
        }
        if (callback) {
            let fullMethodName: string;
            if (respId) {
                fullMethodName = method + "_response" + "_" + respId;
            } else {
                fullMethodName = method + "_response";
            }
            if (globalContext) {
                globalContext[fullMethodName] = function (resp: any, err: { message: string }) {
                    globalContext?.$agent.response();
                    if (err.message && isTestVersion) {
                        alert(`[ERROR] Error message: ${err.message}`);
                        return;
                    }
                    if (isTestVersion) {
                        console.log(
                            `[DEBUG] Callback method: ${fullMethodName}, body: ${JSON.stringify(
                                resp,
                            )}, respId: ${respId}`,
                        );
                    }
                    callback(resp);
                };
            }
            if (body) {
                body.response_id = respId;
            } else {
                body = {response_id: respId};
            }
        }
        if (isTestVersion) {
            console.log(
                `[DEBUG] Trigger method: ${method}, body: ${JSON.stringify(body)}`,
            );
        }
        globalContext?.$agent.trigger(method, body);
    }

    openLogger(): void {
        globalContext?.$agent.natively_logger();
    }

    openConsole(): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "app_console");
    }

    closeApp(): void {
        globalContext?.natively.trigger(undefined, 11, undefined, "app_close");
    }

    showProgress(toggle: boolean): void {
        globalContext?.natively.trigger(undefined, 11, undefined, "app_show_progress", {
            toggle,
        });
    }

    shareImage(image_url: string): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "share_image", {
            url: image_url,
        });
    }

    shareText(text: string): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "share_text", {
            text,
        });
    }

    shareTextAndImage(text: string, image_url: string): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "share_text_and_image", {
            url: image_url,
            text,
        });
    }

    shareFile(file_url: string): void {
        globalContext?.natively.trigger(undefined, 2, undefined, "share_file", {
            url: file_url,
        });
    }

    openExternalURL(url?: string, external?: boolean): void {
        const params: { url: string; view: string } = {
            url: typeof url === "undefined" ? "https://buildnatively.com" : url,
            view: typeof external !== "undefined" && external ? "external" : "web",
        };
        globalContext?.natively.trigger(undefined, 18, undefined, "open_link", params);
    }
}
