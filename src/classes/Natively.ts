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
                body = { response_id: respId };
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
    openExternalApp(url: string): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "open_app", { url });
    }

    showAppToast(type: string, text?: string): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "show_toast", {
            text: text || "",
            type: type || "DEFAULT",
        });
    }

    showAppBanner(type: string, title?: string, description?: string): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "show_banner", {
            type: type || "INFO",
            title: title || "",
            description: description || "",
        });
    }

    analyticsTrackEvent(name: string, data?: Map<string, any>): void {
        const params: { name: string; data?: Map<string, any> } = {
            name,
        };
        if (data) {
            params.data = data;
        }
        globalContext?.natively.trigger(undefined, 37, undefined, "analytics_log_event", params);
    }

    requestAppReview(): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "request_review");
    }

    getInsets(callback: Function): void {
        globalContext?.natively.trigger(undefined, 36, callback, "get_insets");
    }

    setAppBackgroundColor(color: string): void {
        globalContext?.natively.trigger(undefined, 1, undefined, "app_background", { color });
    }

    setAppProgressColor(color: string): void {
        globalContext?.natively.trigger(undefined, 1, undefined, "app_progress", { color });
    }

    setAppSwipeNavigation(toggle: boolean): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "app_navigation", { toggle });
    }

    setAppPullToRefresh(toggle: boolean): void {
        globalContext?.natively.trigger(undefined, 1, undefined, "app_pull", { toggle });
    }

    setAppOrientation(orientation: string): void {
        globalContext?.natively.trigger(undefined, 3, undefined, "app_orientation", { orientation });
    }

    setAppStatusBarStyle(style: string): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "status_bar_style", { style });
    }

    hideLoadingScreen(): void {
        globalContext?.natively.trigger(undefined, 17, undefined, "loading_screen", {
            show_loader: false,
            auto_hide: true,
        });
    }

    showLoadingScreen(autoHide?: boolean): void {
        globalContext?.natively.trigger(undefined, 17, undefined, "loading_screen", {
            show_loader: true,
            auto_hide: autoHide || false,
        });
    }

    openAppSettings(): void {
        globalContext?.natively.trigger(undefined, 0, undefined, "open_appsettings");
    }

    showTabBar(): void {
        globalContext?.natively.trigger(
          undefined,
          33,
          undefined,
          "show_tab_bar"
        );
    }

    enableWakelock(): void {
        globalContext?.natively.trigger(undefined, 34, undefined, "wakelock_enable");
    }

    disableWakelock(): void {
        globalContext?.natively.trigger(undefined, 34, undefined, "wakelock_disable");
    }

    hideTabBar(): void {
        globalContext?.natively.trigger(
          undefined,
          33,
          undefined,
          "hide_tab_bar"
        );
    }

    reloadWebview(): void {
        globalContext?.natively.trigger(undefined, 35, undefined, "reset_webview");
    }

    hapticPattern(pattern: string, delay: number): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "haptic_pattern", {
            pattern,
            delay,
        });
    }

    hapticImpact(type: string): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "haptic_impact", { type });
    }

    hapticNotification(type: string): void {
        globalContext?.natively.trigger(undefined, 22, undefined, "haptic_notification", { type });
    }

    async sendPushNotification(
        appId: string,
        payload: any,
        player_ids: string[],
        isPreview: boolean,
    ): Promise<Response> {
        const filtered = player_ids.filter((id) => id.length > 0);
        const include_player_ids = [...new Set(filtered)];
        const notification: any = {
            app_id: isPreview
                ? "be83022a-1d08-45d0-a07a-0c3655666e17" // Preview App ID
                : appId,
            include_player_ids,
        };

        if (payload.template_id) {
            notification.template_id = payload.template_id;
        } else {
            notification.headings = { en: payload.title || "Empty Title" };
            notification.contents = { en: payload.message || "Empty Message" };
            if (payload.subtitle) {
                notification.subtitle = { en: payload.subtitle };
            }
            if (payload.redirect_url) {
                notification.url = payload.redirect_url;
            }
        }

        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(notification),
        };

        return await fetch("https://onesignal.com/api/v1/notifications", options);
    }

    createCalendarEvent(
       title: string,
       endDate: Date,
       startDate: Date,
       timezone: string,
       calendarId: string,
        description?: string,
        create_calendar_event_callback?: Function,
    ): void {
        const params = {
            title: title,
            timezone: timezone,
            calendarId: calendarId,
            description: description,
            endDate: endDate?.toISOString(),
            startDate: startDate.toISOString(),
        };
        globalContext?.natively.trigger(undefined, 37, create_calendar_event_callback, "calendar_event", params);
    }

    retrieveCalendars( 
        retrieve_calendars_callback?: Function,
    ): void {
        globalContext?.natively.trigger(undefined, 37, retrieve_calendars_callback, "retrieve_calendars", {});
    }
}
