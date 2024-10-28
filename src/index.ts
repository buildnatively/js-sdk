declare global {
  interface Window {
    [key: string]: any;
    natively: {
      isDebug: boolean;
      min_app_version: number;
      app_version: number;
      injected: boolean;
      observers: Function[];
      isIOSApp: boolean;
      isAndroidApp: boolean;
      setDebug(isDebug: boolean): void;
      notify(min?: number, current?: number): void;
      addObserver(fn: Function): void;
      trigger(
        respId: string | undefined,
        minVersion: number,
        callback: Function | undefined,
        method: string,
        body?: any,
      ): void;
      openLogger(): void;
      openConsole(): void;
      closeApp(): void;
      showProgress(toggle: boolean): void;
      shareImage(image_url: string): void;
      shareText(text: string): void;
      shareTextAndImage(text: string, image_url: string): void;
      shareFile(file_url: string): void;
      openExternalURL(url?: string, external?: boolean): void;
    };
    $agent: any;
  }
}

function generateID(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

window.natively = {
  isDebug: false,
  min_app_version: 0,
  app_version: 0,
  injected: false,
  observers: [] as Function[],
  isIOSApp: window.navigator.userAgent.includes("Natively/iOS"),
  isAndroidApp: window.navigator.userAgent.includes("Natively/Android"),

  setDebug(isDebug: boolean): void {
    window.natively.isDebug = isDebug;
  },

  notify(min?: number, current?: number): void {
    window.natively.injected = true;
    if (min) {
      window.natively.min_app_version = min;
    }
    if (current) {
      window.natively.app_version = current;
    }
    const observers = window.natively.observers;
    if (window.natively.isDebug) {
      console.log("[INFO] Notify observers: ", observers.length);
    }
    while (observers.length > 0) {
      const observer = observers.shift();
      observer?.();
    }
  },

  addObserver(fn: Function): void {
    if (window.natively.injected) {
      fn();
    } else {
      if (window.natively.isDebug) {
        console.log(`[DEBUG] addObserver: ${fn}`);
      }
      window.natively.observers.push(fn);
    }
  },

  trigger(
    respId: string | undefined,
    minVersion: number,
    callback: Function | undefined,
    method: string,
    body?: any,
  ): void {
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
          `[ERROR] Please rebuild the app to use this functionality. App Version: ${window.natively.app_version}, feature version: ${minVersion}`,
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
      window[fullMethodName] = function (resp: any, err: { message: string }) {
        window.$agent.response();
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
    window.$agent.trigger(method, body);
  },

  openLogger(): void {
    window.$agent.natively_logger();
  },

  openConsole(): void {
    window.natively.trigger(undefined, 22, undefined, "app_console");
  },

  closeApp(): void {
    window.natively.trigger(undefined, 11, undefined, "app_close");
  },

  showProgress(toggle: boolean): void {
    window.natively.trigger(undefined, 11, undefined, "app_show_progress", {
      toggle,
    });
  },

  shareImage(image_url: string): void {
    window.natively.trigger(undefined, 0, undefined, "share_image", {
      url: image_url,
    });
  },

  shareText(text: string): void {
    window.natively.trigger(undefined, 0, undefined, "share_text", {
      text,
    });
  },

  shareTextAndImage(text: string, image_url: string): void {
    window.natively.trigger(undefined, 0, undefined, "share_text_and_image", {
      url: image_url,
      text,
    });
  },

  shareFile(file_url: string): void {
    window.natively.trigger(undefined, 2, undefined, "share_file", {
      url: file_url,
    });
  },

  openExternalURL(url?: string, external?: boolean): void {
    const params: { url: string; view: string } = {
      url: typeof url === "undefined" ? "https://buildnatively.com" : url,
      view: typeof external !== "undefined" && external ? "external" : "web",
    };
    window.natively.trigger(undefined, 18, undefined, "open_link", params);
  },
};
// Initial Setup
window.natively.addObserver(() =>
  window.natively.trigger(
    undefined,
    0,
    (resp: { minSDKVersion: number; sdkVersion: number }) => {
      window.natively.min_app_version = resp.minSDKVersion;
      window.natively.app_version = resp.sdkVersion;
    },
    "app_info",
    {},
  ),
);

export class NativelyInfo {
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

export class NativelyClipboard {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  copy(text: string): void {
    window.natively.trigger(undefined, 11, undefined, "clipboard_copy", {
      text,
    });
  }

  paste(paste_callback: Function): void {
    window.natively.trigger(this.id, 11, paste_callback, "clipboard_paste");
  }
}

export class NativelyNotifications {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  getOneSignalId(onesignal_playerid_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      onesignal_playerid_callback,
      "onesignal_playerid",
    );
  }

  requestPermission(
    fallbackToSettings: boolean,
    push_register_callback: Function,
  ): void {
    window.natively.trigger(
      this.id,
      0,
      push_register_callback,
      "push_register",
      {
        fallbackToSettings,
      },
    );
  }

  getPermissionStatus(push_permission_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      push_permission_callback,
      "push_permission",
    );
  }
}

// Legacy use Natively Location
export class NativelyGeolocation {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  getUserGeolocation(distance: number, geolocation_callback: Function): void {
    window.natively.trigger(this.id, 0, geolocation_callback, "geolocation", {
      distance,
    });
  }

  requestPermission(geo_register_callback: Function): void {
    window.natively.trigger(this.id, 0, geo_register_callback, "geo_register");
  }

  getPermissionStatus(geo_permission_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      geo_permission_callback,
      "geo_permission",
    );
  }
}

export class NativelyLocation {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  current(
    minAccuracyIOS: number,
    accuracyTypeIOS: string,
    priority_android: string,
    location_callback: Function,
  ): void {
    window.natively.trigger(
      this.id,
      12,
      location_callback,
      "location_current",
      {
        minAccuracy: minAccuracyIOS,
        accuracyType: accuracyTypeIOS,
        priority: priority_android,
      },
    );
  }

  permission(location_permission_callback: Function): void {
    window.natively.trigger(
      this.id,
      6,
      location_permission_callback,
      "location_permission",
    );
  }

  start(
    interval: number,
    minAccuracyIOS: number,
    accuracyTypeIOS: string,
    priority_android: string,
    location_callback: Function,
  ): void {
    window.natively.trigger(this.id, 12, location_callback, "location_start", {
      minAccuracy: minAccuracyIOS,
      accuracyType: accuracyTypeIOS,
      priority: priority_android,
      interval,
    });
  }

  stop(): void {
    window.natively.trigger(this.id, 3, undefined, "location_stop", {});
  }

  startBackground(
    interval?: number,
    minAccuracyIOS?: number,
    accuracyTypeIOS?: string,
    priority_android?: string,
    responseIdentifier?: string,
    location_bg_callback?: Function,
  ): void {
    const params = {
      identifier: responseIdentifier ?? "empty",
      interval: interval ?? 1000 * 60,
      minAccuracy: minAccuracyIOS ?? 50,
      accuracyType: accuracyTypeIOS ?? "Best",
      priority: priority_android ?? "BALANCED",
    };
    window.natively.trigger(
      this.id,
      12,
      location_bg_callback,
      "location_start_bg",
      params,
    );
  }

  statusBackground(location_bg_status_callback: Function): void {
    window.natively.trigger(
      this.id,
      20,
      location_bg_status_callback,
      "location_status_bg",
      {},
    );
  }

  stopBackground(location_bg_callback: Function): void {
    window.natively.trigger(
      this.id,
      4,
      location_bg_callback,
      "location_stop_bg",
      {},
    );
  }
}

export class NativelyMessage {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  sendSMS(
    body?: string,
    recipient?: string,
    send_sms_callback?: Function,
  ): void {
    const params = {
      body: body ?? "",
      recipient: recipient ?? "",
    };
    window.natively.trigger(this.id, 0, send_sms_callback, "send_sms", params);
  }

  sendEmail(
    subject?: string,
    body?: string,
    recipient?: string,
    send_email_callback?: Function,
  ): void {
    const params = {
      subject: subject ?? "",
      body: body ?? "",
      recipient: recipient ?? "",
    };
    window.natively.trigger(
      this.id,
      0,
      send_email_callback,
      "send_email",
      params,
    );
  }
}

export class NativelyStorage {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  setStorageValue(key: string, value: any): void {
    window.natively.trigger(this.id, 0, undefined, "set_storage_value", {
      key,
      value,
    });
  }

  getStorageValue(key: string, get_storage_value_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      get_storage_value_callback,
      "get_storage_value",
      {
        key,
      },
    );
  }

  removeStorageValue(key: string): void {
    window.natively.trigger(this.id, 0, undefined, "remove_storage_value", {
      key,
    });
  }

  resetStorage(): void {
    window.natively.trigger(this.id, 0, undefined, "reset_storage");
  }
}

export class NativelyBiometrics {
  private allowPass: boolean;
  private id: string;

  constructor(allowPass: boolean) {
    this.allowPass = allowPass;
    this.id = generateID();
  }

  checkBiometricsSupport(biometrics_support_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      biometrics_support_callback,
      "biometrics_support",
      {
        allowPass: this.allowPass,
      },
    );
  }

  checkCredentials(biometrics_has_credentials_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      biometrics_has_credentials_callback,
      "biometrics_has_credentials",
    );
  }

  verifyUserIdentify(biometrics_verify_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      biometrics_verify_callback,
      "biometrics_verify",
      {
        allowPass: this.allowPass,
      },
    );
  }

  getUserCredentials(biometrics_auth_callback: Function): void {
    window.natively.trigger(
      this.id,
      0,
      biometrics_auth_callback,
      "biometrics_auth",
      {
        allowPass: this.allowPass,
      },
    );
  }

  removeUserCredentials(
    biometrics_remove_credentials_callback: Function,
  ): void {
    window.natively.trigger(
      this.id,
      0,
      biometrics_remove_credentials_callback,
      "biometrics_remove_credentials",
    );
  }

  saveUserCredentials(
    login: string,
    password: string,
    biometrics_auth_callback: Function,
  ): void {
    window.natively.trigger(
      this.id,
      0,
      biometrics_auth_callback,
      "biometrics_auth",
      {
        allowPass: this.allowPass,
        login,
        password,
      },
    );
  }
}

export class NativelyDatePicker {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  showDatePicker(
    title?: string,
    description?: string,
    type?: string,
    style?: string,
    datepicker_callback?: Function,
  ): void {
    const params = {
      type: type ?? "DATE",
      style: style ?? "LIGHT",
      title: title ?? "",
      description: description ?? "",
    };
    window.natively.trigger(
      this.id,
      0,
      datepicker_callback,
      "datepicker",
      params,
    );
  }
}

export class NativelyCamera {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  showCamera(
    type?: string,
    quality?: string,
    camera?: string,
    open_camera_callback?: Function,
  ): void {
    const params = {
      type: type ?? "photo",
      quality: quality ?? "high",
      camera: camera ?? "BACK",
    };
    window.natively.trigger(
      this.id,
      2,
      open_camera_callback,
      "open_camera",
      params,
    );
  }
}

export class NativelyHealth {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  available(available_callback: Function): void {
    window.natively.trigger(
      this.id,
      10,
      available_callback,
      "health_available",
      {},
    );
  }

  requestAuthorization(
    write_data_types: string[],
    read_data_types: string[],
    request_callback: Function,
  ): void {
    window.natively.trigger(this.id, 10, request_callback, "health_register", {
      write_data_types,
      read_data_types,
    });
  }

  permissionStatus(data_type: string, callback: Function): void {
    window.natively.trigger(this.id, 10, callback, "health_permission", {
      data_type,
    });
  }

  getAllCharacteristics(callback: Function): void {
    window.natively.trigger(
      this.id,
      10,
      callback,
      "health_get_all_characteristics",
      {},
    );
  }

  getStatisticQuantity(
    data_type: string,
    interval: string,
    start_date?: Date,
    end_date?: Date,
    callback?: Function,
  ): void {
    const obj: any = {
      data_type,
      interval,
    };
    if (start_date) {
      obj.start_date = start_date.getTime();
    }
    if (end_date) {
      obj.end_date = end_date.getTime();
    }
    window.natively.trigger(
      this.id,
      10,
      callback,
      "health_get_statistic_quantity",
      obj,
    );
  }
}

export class NativelyScanner {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  showScanner(open_scanner_callback: Function): void {
    window.natively.trigger(
      this.id,
      2,
      open_scanner_callback,
      "open_scanner",
      {},
    );
  }
}

export class NativelyPurchases {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  login(
    login: string,
    customerEmail?: string,
    login_callback?: Function,
  ): void {
    const email = customerEmail ?? "";
    window.natively.trigger(this.id, 3, login_callback, "purchases_login", {
      login,
      email,
    });
  }

  logout(logout_callback: Function): void {
    window.natively.trigger(
      this.id,
      3,
      logout_callback,
      "purchases_logout",
      {},
    );
  }

  customerId(customer_id_callback: Function): void {
    window.natively.trigger(
      this.id,
      3,
      customer_id_callback,
      "purchases_customerid",
      {},
    );
  }

  restore(restore_callback: Function): void {
    window.natively.trigger(
      this.id,
      10,
      restore_callback,
      "purchases_restore",
      {},
    );
  }

  purchasePackage(packageId: string, purchase_callback: Function): void {
    window.natively.trigger(
      this.id,
      3,
      purchase_callback,
      "purchases_package",
      {
        packageId,
      },
    );
  }

  packagePrice(packageId: string, purchase_callback: Function): void {
    window.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
      packageId,
    });
  }
}

export class NativelyContacts {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  getAllContacts(contacts_all_callback: Function): void {
    window.natively.trigger(
      this.id,
      3,
      contacts_all_callback,
      "contacts_all",
      {},
    );
  }

  createContact(
    firstName: string,
    lastName?: string,
    email?: string,
    phone?: string,
    contacts_save_callback?: Function,
  ): void {
    const params = {
      firstName,
      lastName: lastName ?? "",
      email: email ?? "",
      phone: phone ?? "",
    };
    window.natively.trigger(
      this.id,
      3,
      contacts_save_callback,
      "contacts_save",
      params,
    );
  }
}

export class NativelyMediaPicker {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  showMediaPicker(mediapicker_callback: Function): void {
    window.natively.trigger(
      this.id,
      8,
      mediapicker_callback,
      "mediapicker",
      {},
    );
  }
}

export class NativelyAudioRecorder {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  showRecorder(max_duration?: number, record_callback?: Function): void {
    const params = {
      max_duration: max_duration ?? 0,
    };
    window.natively.trigger(
      this.id,
      13,
      record_callback,
      "record_start",
      params,
    );
  }
}

export class NativelyAdmobBanner {
  private id: string;

  constructor(
    config: {
      androidUnitId?: string;
      iOSUnitId?: string;
      position?: string;
      sizeType?: string;
      custom_width?: number;
      custom_height?: number;
    },
    setup_callback?: Function,
    preload_ad: boolean = false,
    preload_callback?: Function,
    show_ad: boolean = false,
    show_callback?: Function,
  ) {
    this.id = generateID();
    const params: any = {};

    if (window.natively.isAndroidApp) {
      params.unitId =
        config.androidUnitId ?? "ca-app-pub-3940256099942544/6300978111";
    } else if (window.natively.isIOSApp) {
      params.unitId =
        config.iOSUnitId ?? "ca-app-pub-3940256099942544/2934735716";
    }

    params.position = config.position ?? "BOTTOM";
    params.sizeType = config.sizeType ?? "AUTO";
    params.width = config.custom_width ?? 320;
    params.height = config.custom_height ?? 50;

    window.natively.trigger(
      this.id,
      14,
      (resp: any) => {
        setup_callback?.(resp);
        if (preload_ad) {
          window.natively.trigger(
            this.id,
            14,
            (resp: any) => {
              preload_callback?.(resp);
              if (show_ad) {
                window.natively.trigger(
                  this.id,
                  14,
                  show_callback,
                  "bannerad_show",
                  {},
                );
              }
            },
            "bannerad_load",
            {},
          );
        }
      },
      "bannerad_setup",
      params,
    );
  }

  loadAd(callback?: Function): void {
    window.natively.trigger(this.id, 14, callback, "bannerad_load", {});
  }

  showBanner(callback?: Function): void {
    window.natively.trigger(this.id, 14, callback, "bannerad_show", {});
  }

  hideBanner(callback?: Function): void {
    window.natively.trigger(this.id, 14, callback, "bannerad_hide", {});
  }

  bannerIsReady(callback: Function): void {
    window.natively.trigger(this.id, 14, callback, "bannerad_ready", {});
  }

  bannerIsVisible(callback: Function): void {
    window.natively.trigger(this.id, 14, callback, "bannerad_visible", {});
  }
}

// >=2.9.0
// Can be only one instance of NativelyAdmobInterstitial per page
// Make sure to use this an not reload page a lot
export class NativelyAdmobInterstitial {
  private id: string;
  private auto_ad_reload: boolean;
  private auto_ad_reload_callback: Function | undefined;
  private unitId: string | undefined;

  constructor(
    iOSUnitId: string = "ca-app-pub-3940256099942544/4411468910",
    androidUnitId: string = "ca-app-pub-3940256099942544/1033173712",
    setup_callback?: Function,
    auto_ad_reload: boolean = false,
    auto_ad_reload_callback?: Function,
  ) {
    this.id = generateID();

    if (window.natively.isAndroidApp) {
      this.unitId = androidUnitId;
    } else if (window.natively.isIOSApp) {
      this.unitId = iOSUnitId;
    }
    this.auto_ad_reload = auto_ad_reload;
    this.auto_ad_reload_callback = auto_ad_reload_callback;
    this.loadAd(setup_callback);
  }

  loadAd(callback?: Function): void {
    const params = {
      unitId: this.unitId ?? "ca-app-pub-3940256099942544/4411468910",
    };
    window.natively.trigger(
      this.id,
      14,
      callback,
      "interstitialad_setup",
      params,
    );
  }

  showInterstitialAd(callback: Function): void {
    window.natively.trigger(
      this.id,
      14,
      (resp: any) => {
        callback(resp);
        if (resp.event === "DID_DISMISS_AD" && this.auto_ad_reload) {
          setTimeout(() => {
            this.loadAd(this.auto_ad_reload_callback);
          }, 500);
        }
      },
      "interstitialad_show",
      {},
    );
  }

  interstitialIsReady(callback: Function): void {
    window.natively.trigger(this.id, 14, callback, "interstitialad_ready", {});
  }
}

export class NativelyNFCService {
  private id: string;
  private readAlertMessage: string;
  private writeAlertMessage: string;
  private readDetectedMessage: string;
  private writeDetectedMessage: string;

  constructor(
    readAlertMessage: string,
    writeAlertMessage: string,
    readDetectedMessage: string,
    writeDetectedMessage: string,
  ) {
    this.id = generateID();
    this.readAlertMessage = readAlertMessage;
    this.writeAlertMessage = writeAlertMessage;
    this.readDetectedMessage = readDetectedMessage;
    this.writeDetectedMessage = writeDetectedMessage;
  }

  read(callback: Function): void {
    const params = {
      alertMessage: this.readAlertMessage ?? "please set readAlertMessage",
      detectedMessage: this.readDetectedMessage ?? "readDetectedMessage",
    };
    window.natively.trigger(this.id, 15, callback, "nfc_read", params);
  }

  write(recordId: string, recordData: string, callback: Function): void {
    const params = {
      alertMessage: this.writeAlertMessage ?? "please set writeAlertMessage",
      detectedMessage:
        this.writeDetectedMessage ?? "please set writeDetectedMessage",
      recordData: recordData ?? "please set recordData",
      recordId: recordId ?? "please set recordId",
    };
    window.natively.trigger(this.id, 15, callback, "nfc_write", params);
  }

  available(callback: Function): void {
    window.natively.trigger(this.id, 15, callback, "nfc_available", {});
  }
}

export class NativelyAppleSignInService {
  private id: string;

  constructor() {
    this.id = generateID();
  }

  signin(callback: Function): void {
    window.natively.trigger(this.id, 16, callback, "apple_signin", {});
  }
}

export const natively = window.natively;