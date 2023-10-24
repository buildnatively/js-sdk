window.natively = {
  isDebug: false,
  min_app_version: 0,
  app_version: 0,
  injected: false,
  observers: [],
  isIOSApp: window.navigator.userAgent.includes("Natively/iOS"),
  isAndroidApp: window.navigator.userAgent.includes("Natively/Android"),

  setDebug: function (isDebug) {
    window.natively.isDebug = isDebug;
  },

  notify: function (min, current) {
    window.natively.injected = true;
    // Remove legacy min/current support later
    if (min) {
      window.natively.min_app_version = min;
    }
    if (current) {
      window.natively.app_version = current;
    }
    const observers = window.natively.observers;
    if (natively.isDebug) {
      console.log("[INFO] Notify observers: ", observers.length);
    }
    while (observers.length > 0) {
      const observer = observers.shift();
      observer();
    }
  },

  addObserver: function (fn) {
    if (window.natively.injected) {
      fn();
    } else {
      if (window.natively.isDebug) {
        console.log(`[DEBUG] addObserver: ${fn}`);
      }
      window.natively.observers.push(fn);
    }
  },

  trigger: function (respId, minVersion, callback, method, body) {
    const isTestVersion = window.natively.isDebug;
    if (!window.natively.injected) {
      window.natively.addObserver(() => {
        window.natively.trigger(respId, minVersion, callback, method, body);
      });
      return;
    }
    if (minVersion > window.natively.app_version) {
      if (isTestVersion) {
        alert(
          `[ERROR] Please rebuild the app to use this functionality. App Version: ${window.natively.app_version}, feature version: ${minVersion}`
        );
      }
      return;
    }
    if (callback) {
      let fullMethodName;
      if (respId) {
        fullMethodName = method + "_response" + "_" + respId;
      } else {
        fullMethodName = method + "_response";
      }
      window[fullMethodName] = function (resp, err) {
        $agent.response();
        if (err.message && isTestVersion) {
          alert(`[ERROR] Error message: ${err.message}`);
          return;
        }
        if (isTestVersion) {
          console.log(
            `[DEBUG] Callback method: ${fullMethodName}, body: ${JSON.stringify(
              resp
            )}, respId: ${respId}`
          );
        }
        callback(resp);
      };
      if (body) {
        body.response_id = respId;
      } else {
        body = { response_id: respId };
      }
    }
    if (isTestVersion) {
      console.log(
        `[DEBUG] Trigger method: ${method}, body: ${JSON.stringify(body)}`
      );
    }
    $agent.trigger(method, body);
  },

  openLogger: function () {
    $agent.natively_logger();
  },

  closeApp: function () {
    window.natively.trigger(undefined, 11, undefined, "app_close");
  },

  showProgress: function (toggle) {
    window.natively.trigger(undefined, 11, undefined, "app_show_progress", { toggle });
  },

  shareImage(image_url) {
    window.natively.trigger(undefined, 0, undefined, "share_image", {
      url: image_url,
    });
  },

  shareText(text) {
    window.natively.trigger(undefined, 0, undefined, "share_text", {
      text,
    });
  },

  shareTextAndImage(text, image_url) {
    window.natively.trigger(undefined, 0, undefined, "share_text_and_image", {
      url: image_url,
      text,
    });
  },

  shareFile(file_url) {
    window.natively.trigger(undefined, 2, undefined, "share_file", {
      url: file_url,
    });
  },

  openExternalURL(url, external) {
    const params = {};
    params.url = typeof url === "undefined" ? "https://buildnatively.com" : url;
    const isExternal = typeof external === "undefined" ? false : external;
    params.view = isExternal ? "external" : "web";
    window.natively.trigger(undefined, 18, undefined, "open_link", params);
  },

  openExternalAppIOS(url) {
    window.natively.trigger(undefined, 0, undefined, "open_app", {
      url,
    });
  },

  openAppSettings() {
    window.natively.trigger(undefined, 0, undefined, "open_appsettings");
  },

  hapticPatternIOS(pattern, delay) {
    window.natively.trigger(undefined, 7, undefined, "haptic_pattern", {
      pattern,
      delay
    });
  },

  hapticImpactIOS(type) {
    window.natively.trigger(undefined, 7, undefined, "haptic_impact", {
      type,
    });
  },

  hapticNotificationIOS(type) {
    window.natively.trigger(undefined, 7, undefined, "haptic_notification", {
      type,
    });
  },

  showAppToast(type, text) {
    const params = {};
    params.text = typeof text === "undefined" ? "" : text;
    params.type = typeof type === "undefined" ? "DEFAULT" : type;
    window.natively.trigger(undefined, 0, undefined, "show_toast", params);
  },

  showAppBanner(type, title, description) {
    const params = {};
    params.type = typeof type === "undefined" ? "INFO" : type;
    params.title = typeof title === "undefined" ? "" : title;
    params.description = typeof description === "undefined" ? "" : description;
    window.natively.trigger(undefined, 0, undefined, "show_banner", params);
  },

  requestAppReview() {
    window.natively.trigger(undefined, 0, undefined, "request_review");
  },

  setAppBackgroundColor(color) {
    const params = { color };
    window.natively.trigger(undefined, 1, undefined, "app_background", params);
  },

  setAppProgressColor(color) {
    const params = { color };
    window.natively.trigger(undefined, 1, undefined, "app_progress", params);
  },

  setAppSwipeNavigationIOS(toggle) {
    const params = { toggle };
    window.natively.trigger(undefined, 1, undefined, "app_navigation", params);
  },

  setAppPullToRefresh(toggle) {
    const params = { toggle };
    window.natively.trigger(undefined, 1, undefined, "app_pull", params);
  },

  setAppOrientation(orientation) {
    const params = { orientation };
    window.natively.trigger(undefined, 3, undefined, "app_orientation", params);
  },

  setAppStatusBarStyleIOS(style) {
    const params = { style };
    window.natively.trigger(
      undefined,
      2,
      undefined,
      "status_bar_style",
      params
    );
  },

  hideLoadingScreen() {
    const show_loader = false;
    const auto_hide = true;
    const params = { show_loader, auto_hide };
    window.natively.trigger(
      undefined,
      17,
      undefined,
      "loading_screen",
      params
    );
  },

  showLoadingScreen(autoHide) {
    const show_loader = true;
    const auto_hide = typeof autoHide === "undefined" ? false : autoHide;
    const params = { show_loader, auto_hide };
    window.natively.trigger(
      undefined,
      17,
      undefined,
      "loading_screen",
      params
    );
  },

  async sendPushNotification(appId, payload, player_ids, isPreview) {
    const filtered = player_ids.filter((id) => id.length > 0);
    const include_player_ids = [...new Set(filtered)];
    let notification = {
      app_id: isPreview
        ? // Natively Preview App ID
        "be83022a-1d08-45d0-a07a-0c3655666e17"
        : appId,
      include_player_ids,
    };
    if (payload.template_id) {
      notification.template_id = payload.template_id;
    } else {
      notification.headings = {};
      notification.headings.en = payload.title || "Empty Title";
      notification.contents = {};
      notification.contents.en = payload.message || "Empty Message";
      if (payload.subtitle) {
        notification.subtitle = {};
        notification.subtitle.en = payload.subtitle;
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
  },
};

// Initial Setup
// Remove legacy min/current support later
window.natively.addObserver(() =>
  window.natively.trigger(
    undefined,
    0,
    (resp) => {
      window.natively.min_app_version = resp.minSDKVersion;
      window.natively.app_version = resp.sdkVersion;
    },
    "app_info",
    {}
  )
);

class NativelyInfo {
  constructor() {
    const id = generateID();
    this.browserInfo = function () {
      const isNativeApp = typeof $agent !== "undefined";
      const isIOSApp = window.navigator.userAgent.includes("Natively/iOS");
      const isAndroidApp = window.navigator.userAgent.includes("Natively/Android");
      return { isNativeApp, isIOSApp, isAndroidApp };
    };
    this.getAppInfo = function (app_info_callback) {
      window.natively.trigger(id, 0, app_info_callback, "app_info");
    };
    this.connectivity = function (connectivity_callback) {
      window.natively.trigger(
        undefined,
        0,
        connectivity_callback,
        "connectivity"
      );
    };
    // app_state_callback responsible for app state changes. 
    // e.g. app is in background or foreground (available >= 2.12.2)
    this.app_state = function (app_state_callback) {
      window.natively.trigger(undefined, 19, app_state_callback, "app_state");
    };
  }
}

class NativelyClipboard {
  constructor() {
    const id = generateID();
    this.copy = function (text) {
      window.natively.trigger(undefined, 11, undefined, "clipboard_copy", { text });
    }
    this.paste = function (paste_callback) {
      window.natively.trigger(id, 11, paste_callback, "clipboard_paste");
    }
  }
}

// WebPage Caching Not Available
class NativelyPagesCache {
  constructor() {
    const id = generateID();
    this.currentPageCached = function (current_page_cached_callback) {
      window.natively.trigger(id, 4, current_page_cached_callback, "current_page_cached");
    };
    this.storeCurrentPage = function (store_current_page_callback) {
      window.natively.trigger(id, 4, store_current_page_callback, "store_current_page");
    };
    this.resetCurrentPage = function (reset_current_page_callback) {
      window.natively.trigger(id, 4, reset_current_page_callback, "reset_current_page");
    };
    this.resetAll = function (reset_all_callback) {
      window.natively.trigger(id, 4, reset_all_callback, "reset_all");
    };
  }
}

class NativelyNotifications {
  constructor() {
    const id = generateID();
    this.getOneSignalId = function (onesignal_playerid_callback) {
      window.natively.trigger(
        id,
        0,
        onesignal_playerid_callback,
        "onesignal_playerid"
      );
    };
    this.requestPermission = function (
      fallbackToSettings,
      push_register_callback
    ) {
      window.natively.trigger(id, 0, push_register_callback, "push_register", {
        fallbackToSettings,
      });
    };
    this.getPermissionStatus = function (push_permission_callback) {
      window.natively.trigger(
        id,
        0,
        push_permission_callback,
        "push_permission"
      );
    };
  }
}

// Legacy use Natively Location
class NativelyGeolocation {
  constructor() {
    const id = generateID();
    this.getUserGeolocation = function (distance, geolocation_callback) {
      window.natively.trigger(id, 0, geolocation_callback, "geolocation", {
        distance,
      });
    };
    this.requestPermission = function (geo_register_callback) {
      window.natively.trigger(id, 0, geo_register_callback, "geo_register");
    };
    this.getPermissionStatus = function (geo_permission_callback) {
      window.natively.trigger(id, 0, geo_permission_callback, "geo_permission");
    };
  }
}

class NativelyLocation {
  constructor() {
    const id = generateID();
    // minAccuracyIOS = 0 - 5000 m
    // accuracyTypeIOS = BestForNavigation,Best,NearestTenMeters,HundredMeters,Kilometer,ThreeKilometers
    // priority_android = HIGH or BALANCED
    this.current = function (minAccuracyIOS, accuracyTypeIOS, priority_android, location_callback) {
      window.natively.trigger(id, 12, location_callback, "location_current", {
        minAccuracy: minAccuracyIOS,
        accuracyType: accuracyTypeIOS,
        priority: priority_android
      });
    };
    // "AWLAYS" - background
    // "IN_USE" - foreground
    // "DENIED" - not determined or denied
    this.permission = function (location_permission_callback) {
      window.natively.trigger(id, 6, location_permission_callback, "location_permission");
    };
    this.start = function (interval, minAccuracyIOS, accuracyTypeIOS, priority_android, location_callback) {
      window.natively.trigger(id, 12, location_callback, "location_start", {
        minAccuracy: minAccuracyIOS,
        accuracyType: accuracyTypeIOS,
        priority: priority_android,
        interval
      });
    };
    this.stop = function () {
      window.natively.trigger(id, 3, undefined, "location_stop", {});
    };
    // minAccuracyIOS = 0 - 5000 m
    // accuracyTypeIOS = BestForNavigation,Best,NearestTenMeters,HundredMeters,Kilometer,ThreeKilometers
    // priority_android = HIGH or BALANCED
    // interval = in seconds e.g. 60 = 1 minute
    this.startBackground = function (interval, minAccuracyIOS, accuracyTypeIOS, priority_android, responseIdentifier, location_bg_callback) {
      const params = {};
      params.identifier = typeof responseIdentifier === "undefined" ? "empty" : responseIdentifier;
      params.interval = typeof interval === "undefined" ? 1000 * 60 : interval;
      params.minAccuracy = typeof minAccuracyIOS === "undefined" ? 50 : minAccuracyIOS;
      params.accuracyType = typeof accuracyTypeIOS === "undefined" ? "Best" : accuracyTypeIOS;
      params.priority = typeof priority_android === "undefined" ? "BALANCED" : priority_android;
      window.natively.trigger(id, 12, location_bg_callback, "location_start_bg", params);
    };
    this.stopBackground = function (location_bg_callback) {
      window.natively.trigger(id, 4, location_bg_callback, "location_stop_bg", {});
    };
  }
}

class NativelyMessage {
  constructor() {
    const id = generateID();
    this.sendSMS = function (body, recipient, send_sms_callback) {
      const params = {};
      params.body = typeof body === "undefined" ? "" : body;
      params.recipient = typeof recipient === "undefined" ? "" : recipient;
      window.natively.trigger(id, 0, send_sms_callback, "send_sms", params);
    };
    this.sendEmail = function (subject, body, recipient, send_email_callback) {
      const params = {};
      params.subject = typeof subject === "undefined" ? "" : subject;
      params.body = typeof body === "undefined" ? "" : body;
      params.recipient = typeof recipient === "undefined" ? "" : recipient;
      window.natively.trigger(id, 0, send_email_callback, "send_email", params);
    };
  }
}

class NativelyStorage {
  constructor() {
    const id = generateID();
    this.setStorageValue = function (key, value) {
      window.natively.trigger(id, 0, undefined, "set_storage_value", {
        key,
        value,
      });
    };
    this.getStorageValue = function (key, get_storage_value_callback) {
      window.natively.trigger(
        id,
        0,
        get_storage_value_callback,
        "get_storage_value",
        { key }
      );
    };
    this.removeStorageValue = function (key) {
      window.natively.trigger(id, 0, undefined, "remove_storage_value", {
        key,
      });
    };
    this.resetStorage = function () {
      window.natively.trigger(id, 0, undefined, "reset_storage");
    };
  }
}

class NativelyBiometrics {
  constructor(allowPass) {
    this.allowPass = allowPass;
    const id = generateID();
    this.checkBiometricsSupport = function (biometrics_support_callback) {
      window.natively.trigger(
        id,
        0,
        biometrics_support_callback,
        "biometrics_support",
        { allowPass }
      );
    };
    this.checkCredentials = function (biometrics_has_credentials_callback) {
      window.natively.trigger(
        id,
        0,
        biometrics_has_credentials_callback,
        "biometrics_has_credentials"
      );
    };
    this.verifyUserIdentify = function (biometrics_verify_callback) {
      window.natively.trigger(
        id,
        0,
        biometrics_verify_callback,
        "biometrics_verify",
        { allowPass }
      );
    };
    this.getUserCredentials = function (biometrics_auth_callback) {
      window.natively.trigger(
        id,
        0,
        biometrics_auth_callback,
        "biometrics_auth",
        { allowPass }
      );
    };
    this.removeUserCredentials = function (
      biometrics_remove_credentials_callback
    ) {
      window.natively.trigger(
        id,
        0,
        biometrics_remove_credentials_callback,
        "biometrics_remove_credentials"
      );
    };
    this.saveUserCredentials = function (
      login,
      password,
      biometrics_auth_callback
    ) {
      window.natively.trigger(
        id,
        0,
        biometrics_auth_callback,
        "biometrics_auth",
        {
          allowPass,
          login,
          password,
        }
      );
    };
  }
}

class NativelyDatePicker {
  constructor() {
    const id = generateID();
    this.showDatePicker = function (
      title,
      description,
      type,
      style,
      datepicker_callback
    ) {
      let params = {};
      params.type = typeof type === "undefined" ? "DATE" : type;
      params.style = typeof style === "undefined" ? "LIGHT" : style;
      params.title = typeof title === "undefined" ? "" : title;
      params.description = typeof description === "undefined" ? "" : description;
      window.natively.trigger(id, 0, datepicker_callback, "datepicker", params);
    };
  }
}

class NativelyCamera {
  constructor() {
    const id = generateID();
    this.showCamera = function (type, quality, camera, open_camera_callback) {
      let params = {};
      params.type = typeof type === "undefined" ? "photo" : type;
      params.quality = typeof quality === "undefined" ? "high" : quality;
      params.camera = typeof camera === "undefined" ? "BACK" : camera;
      window.natively.trigger(
        id,
        2,
        open_camera_callback,
        "open_camera",
        params
      );
    };
  }
}

class NativelyHealth {
  constructor() {
    const id = generateID();
    this.available = function (available_callback) {
      window.natively.trigger(id, 10, available_callback, "health_available", {});
    };
    this.requestAuthorization = function (write_data_types, read_data_types, request_callback) {
      window.natively.trigger(id, 10, request_callback, "health_register", {
        write_data_types,
        read_data_types
      });
    }
    // Write only
    this.permissionStatus = function (data_type, callback) {
      window.natively.trigger(id, 10, callback, "health_permission", {
        data_type
      });
    }
    this.getAllCharacteristics = function (callback) {
      window.natively.trigger(id, 10, callback, "health_get_all_characteristics", {});
    }
    this.getStatisticQuantity = function (data_type, interval, start_date, end_date, callback) {
      const obj = {
        data_type,
        interval
      };
      if (typeof start_date !== "undefined") {
        obj.start_date = start_date.getTime();
      }
      if (typeof end_date !== "undefined") {
        obj.end_date = end_date.getTime();
      }
      window.natively.trigger(id, 10, callback, "health_get_statistic_quantity", obj);
    }
    this.getDailySleepAnalysis = function (start_date, end_date, limit, callback) {
      const obj = { limit: limit || 100 };
      if (typeof start_date !== "undefined") {
        obj.start_date = start_date.getTime();
      }
      if (typeof end_date !== "undefined") {
        obj.end_date = end_date.getTime();
      }
      window.natively.trigger(id, 10, callback, "health_get_daily_sleep_analysis", obj);
    }
    this.getActivitySummary = function (start_date, end_date, callback) {
      const obj = {};
      if (typeof start_date !== "undefined") {
        obj.start_date = start_date.getTime();
      }
      if (typeof end_date !== "undefined") {
        obj.end_date = end_date.getTime();
      }
      window.natively.trigger(id, 10, callback, "health_get_activity_summary", obj);
    }
  }
}

class NativelyScanner {
  constructor() {
    const id = generateID();
    this.showScanner = function (open_scanner_callback) {
      window.natively.trigger(id, 2, open_scanner_callback, "open_scanner", {});
    };
  }
}

class NativelyPurchases {
  constructor() {
    const id = generateID();
    this.login = function (login, customerEmail, login_callback) {
      const email = typeof customerEmail === "undefined" ? "" : customerEmail;
      window.natively.trigger(id, 3, login_callback, "purchases_login", {
        login,
        email
      });
    };
    this.logout = function (logout_callback) {
      window.natively.trigger(id, 3, logout_callback, "purchases_logout", {});
    };
    this.customerId = function (customer_id_callback) {
      window.natively.trigger(
        id,
        3,
        customer_id_callback,
        "purchases_customerid",
        {}
      );
    };
    this.restore = function (restore_callback) {
      window.natively.trigger(id, 10, restore_callback, "purchases_restore", {});
    };
    this.purchasePackage = function (packageId, purchase_callback) {
      window.natively.trigger(id, 3, purchase_callback, "purchases_package", {
        packageId,
      });
    };
    this.packagePrice = function (packageId, purchase_callback) {
      window.natively.trigger(id, 8, purchase_callback, "purchases_price", {
        packageId,
      });
    };
  }
}

class NativelyContacts {
  constructor() {
    const id = generateID();
    this.getAllContacts = function (contacts_all_callback) {
      window.natively.trigger(id, 3, contacts_all_callback, "contacts_all", {});
    };
    this.createContact = function (
      firstName,
      lastName,
      email,
      phone,
      contacts_save_callback
    ) {
      let params = { firstName };
      params.lastName = typeof lastName === "undefined" ? "" : lastName;
      params.email = typeof email === "undefined" ? "" : email;
      params.phone = typeof phone === "undefined" ? "" : phone;
      window.natively.trigger(
        id,
        3,
        contacts_save_callback,
        "contacts_save",
        params
      );
    };
  }
}

class NativelyMediaPicker {
  constructor() {
    const id = generateID();
    this.showMediaPicker = function (
      mediapicker_callback
    ) {
      window.natively.trigger(id, 8, mediapicker_callback, "mediapicker", {});
    };
  }
}

class NativelyAudioRecorder {
  constructor() {
    const id = generateID();
    this.showRecorder = function (
      max_duration,
      record_callback
    ) {
      let params = {}
      params.max_duration = typeof max_duration === "undefined" ? 0 : max_duration;
      window.natively.trigger(id, 13, record_callback, "record_start", params);
    };
  }
}

// >=2.9.0
// Can be only one instance of NativelyAdmobBanner per page
// Make sure to use this an not reload page a lot 
class NativelyAdmobBanner {
  constructor(
    config = {
      iOSUnitId: "ca-app-pub-3940256099942544/2934735716",
      androidUnitId: "ca-app-pub-3940256099942544/6300978111",
      position: "BOTTOM",
      sizeType: "AUTO",
      custom_width: 320,
      custom_height: 50
    },
    setup_callback = undefined, // function(resp) { console.log(resp) }
    preload_ad = false, // Load ad on init
    preload_callback = undefined, // function(resp) { console.log(resp) }
    show_ad = false, // Show ad on init
    show_callback = undefined, // function(resp) { console.log(resp) }
  ) {
    const id = generateID();
    const params = {};
    if (window.natively.isAndroidApp) {
      params.unitId = (typeof config.androidUnitId === "undefined") ? "ca-app-pub-3940256099942544/6300978111" : config.androidUnitId;
    } else if (window.natively.isIOSApp) {
      params.unitId = (typeof config.iOSUnitId === "undefined") ? "ca-app-pub-3940256099942544/2934735716" : config.iOSUnitId;
    }

    params.position = (typeof config.position === "undefined") ? "BOTTOM" : config.position;
    params.sizeType = (typeof config.sizeType === "undefined") ? "AUTO" : config.sizeType;
    params.width = (typeof config.custom_width === "undefined") ? 320 : config.width;
    params.height = (typeof config.custom_height === "undefined") ? 50 : config.height;
    window.natively.trigger(id, 14, function (resp) {
      if (typeof setup_callback !== "undefined") {
        setup_callback(resp);
      }
      if (preload_ad) {
        window.natively.trigger(id, 14, function (resp) {
          if (typeof preload_callback !== "undefined") {
            preload_callback(resp);
          }
          if (show_ad) {
            window.natively.trigger(id, 14, show_callback, "bannerad_show", {});
          }
        }, "bannerad_load", {});
      }
    }, "bannerad_setup", params);

    this.loadAd = function (callback) {
      window.natively.trigger(id, 14, callback, "bannerad_load", {});
    };
    this.showBanner = function (callback) {
      window.natively.trigger(id, 14, callback, "bannerad_show", {});
    };
    this.hideBanner = function (callback) {
      window.natively.trigger(id, 14, callback, "bannerad_hide", {});
    };
    this.bannerIsReady = function (callback) {
      window.natively.trigger(id, 14, callback, "bannerad_ready", {});
    };
    this.bannerIsVisible = function (callback) {
      window.natively.trigger(id, 14, callback, "bannerad_visible", {});
    };
  }
}

// >=2.9.0
// Can be only one instance of NativelyAdmobInterstitial per page
// Make sure to use this an not reload page a lot 
class NativelyAdmobInterstitial {
  constructor(
    iOSUnitId = "ca-app-pub-3940256099942544/4411468910",
    androidUnitId = "ca-app-pub-3940256099942544/1033173712",
    setup_callback = undefined, // function(resp) { console.log(resp) }
    auto_ad_reload = false, // Reload ad after showing
    auto_ad_reload_callback = undefined, // function(resp) { console.log(resp) }
  ) {
    const id = generateID();
    let unitId;
    if (window.natively.isAndroidApp) {
      unitId = (typeof androidUnitId === "undefined") ? "ca-app-pub-3940256099942544/1033173712" : androidUnitId;
    } else if (window.natively.isIOSApp) {
      unitId = (typeof iOSUnitId === "undefined") ? "ca-app-pub-3940256099942544/4411468910" : iOSUnitId;
    }

    this.loadAd = function (callback) {
      const params = {};
      params.unitId = (typeof unitId === "undefined") ? "ca-app-pub-3940256099942544/4411468910" : unitId;
      window.natively.trigger(id, 14, callback, "interstitialad_setup", params);
    };
    this.showInterstitialAd = function (callback) {
      window.natively.trigger(id, 14, function (resp) {
        callback(resp);
        if (resp.event === "DID_DISMISS_AD" && auto_ad_reload) {
          const params = {};
          params.unitId = unitId;
          setTimeout(() => {
            window.natively.trigger(id, 14, auto_ad_reload_callback, "interstitialad_setup", params);
          }, 500);
        }
      }, "interstitialad_show", {});
    };
    this.interstitialIsReady = function (callback) {
      window.natively.trigger(id, 14, callback, "interstitialad_ready", {});
    };
    this.loadAd(setup_callback);
  }
}

// >=2.10.0
class NativelyNFCService {
  constructor(
    readAlertMessage,
    writeAlertMessage,
    readDetectedMessage,
    writeDetectedMessage
  ) {
    const id = generateID();
    this.readAlertMessage = readAlertMessage;
    this.writeAlertMessage = writeAlertMessage;
    this.readDetectedMessage = readDetectedMessage;
    this.writeDetectedMessage = writeDetectedMessage;
    this.read = function (callback) {
      let params = {}
      params.alertMessage = typeof this.readAlertMessage === "undefined" ? "please set readAlertMessage" : this.readAlertMessage;
      params.detectedMessage = typeof this.readDetectedMessage === "undefined" ? "readDetectedMessage" : this.readDetectedMessage;
      window.natively.trigger(id, 15, callback, "nfc_read", params);
    };
    this.write = function (recordId, recordData, callback) {
      let params = {}
      params.alertMessage = typeof this.writeAlertMessage === "undefined" ? "please set writeAlertMessage" : this.writeAlertMessage;
      params.detectedMessage = typeof this.writeDetectedMessage === "undefined" ? "please set writeDetectedMessage" : this.writeDetectedMessage;
      params.recordData = typeof recordData === "undefined" ? "please set recordData" : recordData;
      params.recordId = typeof recordId === "undefined" ? "please set recordId" : recordId;
      window.natively.trigger(id, 15, callback, "nfc_write", params);
    };
    this.available = function (callback) {
      let params = {}
      window.natively.trigger(id, 15, callback, "nfc_available", params);
    };
  }
}

// >=2.11.0
class NativelyAppleSignInService {
  constructor() {
    const id = generateID();
    this.signin = function (callback) {
      let params = {}
      window.natively.trigger(id, 16, callback, "apple_signin", params);
    };
  }
}



function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

