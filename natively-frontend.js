window.natively = {
  isDebug: false,
  min_app_version: 0,
  app_version: 0,
  injected: false,
  observers: [],

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

  openExternalURL(url) {
    window.natively.trigger(undefined, 0, undefined, "open_link", {
      url,
    });
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
    // priority_android = HIGH or BALANCED
    // accuracy_ios = 0 - 5000 m
    this.current = function (accuracy_ios, priority_android, location_callback) {
      window.natively.trigger(id, 3, location_callback, "location_current", {
        accuracy: accuracy_ios,
        priority: priority_android
      });
    };
    // "AWLAYS" - background
    // "IN_USE" - foreground
    // "DENIED" - not determined or denied
    this.permission = function (location_permission_callback) {
      window.natively.trigger(id, 6, location_permission_callback, "location_permission");
    };
    this.start = function (interval, accuracy_ios, priority_android, location_callback) {
      window.natively.trigger(id, 3, location_callback, "location_start", {
        accuracy: accuracy_ios,
        priority: priority_android,
        interval
      });
    };
    this.stop = function () {
      window.natively.trigger(id, 3, undefined, "location_stop", {});
    };
    this.startBackground = function (interval, accuracy_ios, priority_android, responseIdentifier, location_bg_callback) {
      const params = {};
      params.identifier = typeof responseIdentifier === "undefined" ? "empty" : responseIdentifier;
      params.interval = typeof interval === "undefined" ? 1000 * 60 : interval;
      params.accuracy = typeof accuracy_ios === "undefined" ? 50 : accuracy_ios;
      params.priority = typeof priority_android === "undefined" ? "BALANCED" : priority_android;
      window.natively.trigger(id, 4, location_bg_callback, "location_start_bg", params);
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
    this.login = function (login, login_callback) {
      window.natively.trigger(id, 3, login_callback, "purchases_login", {
        login,
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
    this.purchasePackage = function (packageId, purchase_callback) {
      window.natively.trigger(id, 3, purchase_callback, "purchases_package", {
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

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
