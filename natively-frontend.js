class Natively {
  isDebug = false;
  min_app_version;
  app_version;
  injected = false;
  observers = [];

  constructor(isDebug) {
    this.isDebug = typeof isDebug !== "undefined" ? isDebug : false;
    const initialCallback = (resp) => {
      this.min_app_version = resp.minSDKVersion;
      this.app_version = resp.sdkVersion;
    };
    const initial = () =>
      this.trigger(undefined, 0, initialCallback, "app_info", {});
    this.addObserver(initial);
  }

  notify() {
    this.injected = true;
    const observers = this.observers;
    if (this.isDebug) {
      console.log("[INFO] Notify observers: ", observers.length);
    }
    while (observers.length > 0) {
      const observer = observers.shift();
      observer();
    }
  }

  addObserver(fn) {
    if (this.injected) {
      fn();
    } else {
      if (this.isDebug) {
        console.log(`[DEBUG] addObserver: ${fn}`);
      }
      this.observers.push(fn);
    }
  }

  trigger(respId, minVersion, callback, method, body) {
    const isTestVersion = this.isDebug;
    if (!this.injected) {
      this.addObserver(() => {
        this.trigger(respId, minVersion, callback, method, body);
      });
      return;
    }
    if (isTestVersion && minVersion > this.app_version) {
      alert(
        `[ERROR] Please rebuild the app to use this functionality. App Version: ${this.app_version}, feature version: ${minVersion}`
      );
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
  }
}

class NativelyNotifications {
  constructor() {
    this.id = Natively.generateID();
  }

  getOneSignalId(onesignal_playerid_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      onesignal_playerid_callback,
      "onesignal_playerid"
    );
  }

  requestPermissionIOS(fallbackToSettings, push_register_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      push_register_callback,
      "push_register",
      { fallbackToSettings }
    );
  }

  getPermissionStatusIOS(push_permission_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      push_permission_callback,
      "push_permission"
    );
  }
}

class NativelyGeolocation {
  constructor() {
    this.id = Natively.generateID();
  }

  getUserGeolocation(distance, geolocation_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      geolocation_callback,
      "geolocation",
      { distance }
    );
  }

  requestPermission(geo_register_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      geo_register_callback,
      "geo_register"
    );
  }

  getPermissionStatus(geo_permission_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      geo_permission_callback,
      "geo_permission"
    );
  }
}

class NativelyMessage {
  constructor() {
    this.id = Natively.generateID();
  }

  sendSMS(properties, send_sms_callback) {
    const params = {};
    params.body = (typeof properties.body === undefined) ? "" : properties.body;
    params.recipient = (typeof properties.recipient === undefined) ? "" : properties.recipient;
    window.natively_injector.trigger(
      this.id,
      0,
      send_sms_callback,
      "send_sms",
      params
    );
  }

  sendEmail(properties, send_email_callback) {
    const params = {};
    params.subject = typeof properties.subject === undefined ? "" : properties.subject;
    params.body = typeof properties.body === undefined ? "" : properties.body;
    params.recipient = typeof properties.recipient === undefined ? "" : properties.recipient;
    window.natively_injector.trigger(
      this.id,
      0,
      send_email_callback,
      "send_email",
      params
    );
  }
}

class NativelyStorage {
  constructor() {
    this.id = Natively.generateID();
  }

  setStorageValue(properties) {
    window.natively_injector.trigger(
      this.id,
      0,
      undefined,
      "set_storage_value",
      { key: properties.key, value: properties.value }
    );
  }

  getStorageValue(properties, get_storage_value_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      get_storage_value_callback,
      "get_storage_value",
      { key: properties.key }
    );
  }

  removeStorageValue(properties) {
    window.natively_injector.trigger(
      this.id,
      0,
      undefined,
      "remove_storage_value",
      { key: properties.key }
    );
  }

  resetStorage() {
    window.natively_injector.trigger(this.id, 0, undefined, "reset_storage");
  }
}

class NativelyBiometrics {
  constructor(allowPasscode) {
    this.allowPasscode = allowPasscode;
    this.id = Natively.generateID();
  }

  checkBiometricsSupport(biometrics_support_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      biometrics_support_callback,
      "biometrics_support",
      { allowPass: this.allowPasscode }
    );
  }

  verifyUserIdentify(biometrics_verify_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      biometrics_verify_callback,
      "biometrics_verify",
      { allowPass: this.allowPasscode }
    );
  }

  getUserCredentials(biometrics_auth_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      biometrics_auth_callback,
      "biometrics_auth",
      { allowPass: this.allowPasscode }
    );
  }

  removeUserCredentials(biometrics_remove_credentials_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      biometrics_remove_credentials_callback,
      "biometrics_remove_credentials"
    );
  }

  saveUserCredentials(properties, biometrics_auth_callback) {
    window.natively_injector.trigger(
      this.id,
      0,
      biometrics_auth_callback,
      "biometrics_auth",
      {
        allowPass: this.allowPasscode,
        login: properties.login,
        password: properties.password,
      }
    );
  }
}

class NativelyInfo {
  constructor() {
    this.id = Natively.generateID();
  }

  getAppInfo(app_info_callback) {
    window.natively_injector.trigger(this.id, 0, app_info_callback, "app_info");
  }
}

class NativelyDatePicker {
  constructor() {
    this.id = Natively.generateID();
  }

  showDatePicker(properties, datepicker_callback) {
    let params = { };
    params.type = typeof params.type === undefined ? "DATE" : params.type;
    params.style = typeof params.style === undefined ? "LIGHT" : params.style;
    params.title = typeof properties.title === undefined ? "" : properties.title;
    params.description = typeof properties.description === undefined ? "" : properties.description;
    window.natively_injector.trigger(
      this.id,
      0,
      datepicker_callback,
      "datepicker",
      params
    );
  }
}

class NativelyCamera {
  constructor() {
    this.id = Natively.generateID();
  }

  showCamera(properties, open_camera_callback) {
    let params = {};
    params.type = typeof params.type === undefined ? "photo" : params.type;
    params.quality = typeof properties.quality === undefined ? "high" : properties.quality;
    window.natively_injector.trigger(
      this.id,
      2,
      open_camera_callback,
      "open_camera",
      params
    );
  }
}

class NativelyScanner {
  constructor() {
    this.id = Natively.generateID();
  }

  showScanner(open_scanner_callback) {
    window.natively_injector.trigger(
      this.id,
      2,
      open_scanner_callback,
      "open_scanner",
      {}
    );
  }
}

class NativelyPurchases {
  constructor() {
    this.id = Natively.generateID();
  }

  purchaseIOS(productId, inapp_purchase_callback) {
    window.natively_injector.trigger(
      this.id,
      3,
      inapp_purchase_callback,
      "inapp_purchase",
      { productId }
    );
  }

  purchaseAndroid(properties, inapp_purchase_callback) {
    const productType =
      properties.product_type === "Subscription" ? "subs" : "inapp";
    let params = { productId: properties.productid, productType };
    if (properties.offer_tag) {
      params.offerTag = properties.offer_tag;
    }
    window.natively_injector.trigger(
      this.id,
      3,
      inapp_purchase_callback,
      "inapp_purchase",
      params
    );
  }
}

class NativelyContacts {
  constructor() {
    this.id = Natively.generateID();
  }

  getAllContacts(contacts_all_callback) {
    window.natively_injector.trigger(
      this.id,
      3,
      contacts_all_callback,
      "contacts_all",
      {}
    );
  }

  createContact(properties, contacts_save_callback) {
    let params = { firstName: properties.first_name };
    if (properties.last_name) {
      params.lastName = properties.last_name;
    }
    if (properties.phone) {
      params.phone = properties.phone;
    }
    if (properties.email) {
      params.email = properties.email;
    }
    window.natively_injector.trigger(
      this.id,
      3,
      contacts_save_callback,
      "contacts_save",
      params
    );
  }
}

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function shareImage(image_url) {
  window.natively_injector(undefined, 0, undefined, "share_image", {
    url: image_url,
  });
}

function shareText(text) {
  window.natively_injector(undefined, 0, undefined, "share_text", {
    text,
  });
}

function shareTextAndImage(text, image_url) {
  window.natively_injector(undefined, 0, undefined, "share_text_and_image", {
    url: image_url,
    text,
  });
}

function shareFile(file_url) {
  window.natively_injector(undefined, 2, undefined, "share_file", {
    url: file_url,
  });
}

function openExternalURL(url) {
  window.natively_injector(undefined, 0, undefined, "open_link", {
    url,
  });
}

function openExternalAppIOS(url) {
  window.natively_injector(undefined, 0, undefined, "open_app", {
    url,
  });
}

function openAppSettings() {
  window.natively_injector(undefined, 0, undefined, "open_appsettings");
}

function showAppToast(type, text) {
  const params = { type, text };
  window.natively_injector(undefined, 0, undefined, "show_toast", params);
}

function showAppBanner(type, title, description) {
  const params = { type, title, description };
  window.natively_injector(undefined, 0, undefined, "show_banner", params);
}

function requestAppReview() {
  window.natively_injector(undefined, 0, undefined, "request_review");
}

function setAppBackgroundColor(color) {
  const params = { color };
  window.natively_injector(undefined, 1, undefined, "app_background", params);
}

function setAppProgressColor(color) {
  const params = { color };
  window.natively_injector(undefined, 1, undefined, "app_progress", params);
}

function setAppSwipeNavigationIOS(toggle) {
  const params = { toggle };
  window.natively_injector(undefined, 1, undefined, "app_navigation", params);
}

function setAppPullToRefresh(toggle) {
  const params = { toggle };
  window.natively_injector(undefined, 1, undefined, "app_pull", params);
}

function setAppStatusBarStyleIOS(style) {
  const params = { style };
  window.natively_injector(undefined, 2, undefined, "status_bar_style", params);
}

module.exports = {
  NativelyBiometrics: NativelyBiometrics,
  NativelyCamera: NativelyCamera,
  NativelyContacts: NativelyContacts,
  NativelyDatePicker: NativelyDatePicker,
  NativelyInfo: NativelyInfo,
  NativelyPurchases: NativelyPurchases,
  NativelyScanner: NativelyScanner,
  NativelyStorage: NativelyStorage,
  NativelyMessage: NativelyMessage,
  NativelyNotifications: NativelyNotifications,
  NativelyGeolocation: NativelyGeolocation,
  Natively: Natively,
  shareImage: shareImage,
  shareText: shareText,
  shareTextAndImage: shareTextAndImage,
  shareFile: shareFile,
  openExternalURL: openExternalURL,
  openExternalAppIOS: openExternalAppIOS,
  openAppSettings: openAppSettings,
  showAppToast: showAppToast,
  showAppBanner: showAppBanner,
  requestAppReview: requestAppReview,
  setAppBackgroundColor: setAppBackgroundColor,
  setAppProgressColor: setAppProgressColor,
  setAppSwipeNavigationIOS: setAppSwipeNavigationIOS,
  setAppPullToRefresh: setAppPullToRefresh,
  setAppStatusBarStyleIOS: setAppStatusBarStyleIOS,
};
