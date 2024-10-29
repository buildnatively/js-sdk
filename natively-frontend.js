function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
export var natively = {
  isDebug: false,
  min_app_version: 0,
  app_version: 0,
  injected: false,
  observers: [],
  isIOSApp: window.navigator.userAgent.includes("Natively/iOS"),
  isAndroidApp: window.navigator.userAgent.includes("Natively/Android"),
  setDebug(isDebug) {
    window.natively.isDebug = isDebug;
  },
  notify(min, current) {
    window.natively.injected = true;
    if (min) {
      window.natively.min_app_version = min;
    }
    if (current) {
      window.natively.app_version = current;
    }
    var observers = window.natively.observers;
    if (window.natively.isDebug) {
      console.log("[INFO] Notify observers: ", observers.length);
    }
    while (observers.length > 0) {
      var observer = observers.shift();
      observer === null || observer === void 0 || observer();
    }
  },
  addObserver(fn) {
    if (window.natively.injected) {
      fn();
    } else {
      if (window.natively.isDebug) {
        console.log("[DEBUG] addObserver: ".concat(fn));
      }
      window.natively.observers.push(fn);
    }
  },
  trigger(respId, minVersion, callback, method, body) {
    var isTestVersion = window.natively.isDebug;
    if (!window.natively.injected) {
      window.natively.addObserver(() => {
        window.natively.trigger(respId, minVersion, callback, method, body);
      });
      return;
    }
    if (minVersion > window.natively.app_version) {
      if (isTestVersion) {
        alert("[ERROR] Please rebuild the app to use this functionality. App Version: ".concat(window.natively.app_version, ", feature version: ").concat(minVersion));
      }
      return;
    }
    if (callback) {
      var fullMethodName;
      if (respId) {
        fullMethodName = method + "_response" + "_" + respId;
      } else {
        fullMethodName = method + "_response";
      }
      window[fullMethodName] = function (resp, err) {
        window.$agent.response();
        if (err.message && isTestVersion) {
          alert("[ERROR] Error message: ".concat(err.message));
          return;
        }
        if (isTestVersion) {
          console.log("[DEBUG] Callback method: ".concat(fullMethodName, ", body: ").concat(JSON.stringify(resp), ", respId: ").concat(respId));
        }
        callback(resp);
      };
      if (body) {
        body.response_id = respId;
      } else {
        body = {
          response_id: respId
        };
      }
    }
    if (isTestVersion) {
      console.log("[DEBUG] Trigger method: ".concat(method, ", body: ").concat(JSON.stringify(body)));
    }
    window.$agent.trigger(method, body);
  },
  openLogger() {
    window.$agent.natively_logger();
  },
  openConsole() {
    window.natively.trigger(undefined, 22, undefined, "app_console");
  },
  closeApp() {
    window.natively.trigger(undefined, 11, undefined, "app_close");
  },
  showProgress(toggle) {
    window.natively.trigger(undefined, 11, undefined, "app_show_progress", {
      toggle
    });
  },
  shareImage(image_url) {
    window.natively.trigger(undefined, 0, undefined, "share_image", {
      url: image_url
    });
  },
  shareText(text) {
    window.natively.trigger(undefined, 0, undefined, "share_text", {
      text
    });
  },
  shareTextAndImage(text, image_url) {
    window.natively.trigger(undefined, 0, undefined, "share_text_and_image", {
      url: image_url,
      text
    });
  },
  shareFile(file_url) {
    window.natively.trigger(undefined, 2, undefined, "share_file", {
      url: file_url
    });
  },
  openExternalURL(url, external) {
    var params = {
      url: typeof url === "undefined" ? "https://buildnatively.com" : url,
      view: typeof external !== "undefined" && external ? "external" : "web"
    };
    window.natively.trigger(undefined, 18, undefined, "open_link", params);
  }
};
// Initial Setup
if (typeof window !== "undefined") {
  window.natively.addObserver(() => window.natively.trigger(undefined, 0, resp => {
    window.natively.min_app_version = resp.minSDKVersion;
    window.natively.app_version = resp.sdkVersion;
  }, "app_info", {}));
}
export class NativelyInfo {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  browserInfo() {
    var isNativeApp = typeof window.$agent !== "undefined";
    var isIOSApp = window.navigator.userAgent.includes("Natively/iOS");
    var isAndroidApp = window.navigator.userAgent.includes("Natively/Android");
    return {
      isNativeApp,
      isIOSApp,
      isAndroidApp
    };
  }
  getAppInfo(app_info_callback) {
    window.natively.trigger(this.id, 0, app_info_callback, "app_info");
  }
  connectivity(connectivity_callback) {
    window.natively.trigger(undefined, 0, connectivity_callback, "connectivity");
  }
  app_state(app_state_callback) {
    window.natively.trigger(undefined, 19, app_state_callback, "app_state");
  }
}
export class NativelyClipboard {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  copy(text) {
    window.natively.trigger(undefined, 11, undefined, "clipboard_copy", {
      text
    });
  }
  paste(paste_callback) {
    window.natively.trigger(this.id, 11, paste_callback, "clipboard_paste");
  }
}
export class NativelyNotifications {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  getOneSignalId(onesignal_playerid_callback) {
    window.natively.trigger(this.id, 0, onesignal_playerid_callback, "onesignal_playerid");
  }
  requestPermission(fallbackToSettings, push_register_callback) {
    window.natively.trigger(this.id, 0, push_register_callback, "push_register", {
      fallbackToSettings
    });
  }
  getPermissionStatus(push_permission_callback) {
    window.natively.trigger(this.id, 0, push_permission_callback, "push_permission");
  }
}

// Legacy use Natively Location
export class NativelyGeolocation {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  getUserGeolocation(distance, geolocation_callback) {
    window.natively.trigger(this.id, 0, geolocation_callback, "geolocation", {
      distance
    });
  }
  requestPermission(geo_register_callback) {
    window.natively.trigger(this.id, 0, geo_register_callback, "geo_register");
  }
  getPermissionStatus(geo_permission_callback) {
    window.natively.trigger(this.id, 0, geo_permission_callback, "geo_permission");
  }
}
export class NativelyLocation {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  current(minAccuracyIOS, accuracyTypeIOS, priority_android, location_callback) {
    window.natively.trigger(this.id, 12, location_callback, "location_current", {
      minAccuracy: minAccuracyIOS,
      accuracyType: accuracyTypeIOS,
      priority: priority_android
    });
  }
  permission(location_permission_callback) {
    window.natively.trigger(this.id, 6, location_permission_callback, "location_permission");
  }
  start(interval, minAccuracyIOS, accuracyTypeIOS, priority_android, location_callback) {
    window.natively.trigger(this.id, 12, location_callback, "location_start", {
      minAccuracy: minAccuracyIOS,
      accuracyType: accuracyTypeIOS,
      priority: priority_android,
      interval
    });
  }
  stop() {
    window.natively.trigger(this.id, 3, undefined, "location_stop", {});
  }
  startBackground(interval, minAccuracyIOS, accuracyTypeIOS, priority_android, responseIdentifier, location_bg_callback) {
    var params = {
      identifier: responseIdentifier !== null && responseIdentifier !== void 0 ? responseIdentifier : "empty",
      interval: interval !== null && interval !== void 0 ? interval : 1000 * 60,
      minAccuracy: minAccuracyIOS !== null && minAccuracyIOS !== void 0 ? minAccuracyIOS : 50,
      accuracyType: accuracyTypeIOS !== null && accuracyTypeIOS !== void 0 ? accuracyTypeIOS : "Best",
      priority: priority_android !== null && priority_android !== void 0 ? priority_android : "BALANCED"
    };
    window.natively.trigger(this.id, 12, location_bg_callback, "location_start_bg", params);
  }
  statusBackground(location_bg_status_callback) {
    window.natively.trigger(this.id, 20, location_bg_status_callback, "location_status_bg", {});
  }
  stopBackground(location_bg_callback) {
    window.natively.trigger(this.id, 4, location_bg_callback, "location_stop_bg", {});
  }
}
export class NativelyMessage {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  sendSMS(body, recipient, send_sms_callback) {
    var params = {
      body: body !== null && body !== void 0 ? body : "",
      recipient: recipient !== null && recipient !== void 0 ? recipient : ""
    };
    window.natively.trigger(this.id, 0, send_sms_callback, "send_sms", params);
  }
  sendEmail(subject, body, recipient, send_email_callback) {
    var params = {
      subject: subject !== null && subject !== void 0 ? subject : "",
      body: body !== null && body !== void 0 ? body : "",
      recipient: recipient !== null && recipient !== void 0 ? recipient : ""
    };
    window.natively.trigger(this.id, 0, send_email_callback, "send_email", params);
  }
}
export class NativelyStorage {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  setStorageValue(key, value) {
    window.natively.trigger(this.id, 0, undefined, "set_storage_value", {
      key,
      value
    });
  }
  getStorageValue(key, get_storage_value_callback) {
    window.natively.trigger(this.id, 0, get_storage_value_callback, "get_storage_value", {
      key
    });
  }
  removeStorageValue(key) {
    window.natively.trigger(this.id, 0, undefined, "remove_storage_value", {
      key
    });
  }
  resetStorage() {
    window.natively.trigger(this.id, 0, undefined, "reset_storage");
  }
}
export class NativelyBiometrics {
  constructor(allowPass) {
    _defineProperty(this, "allowPass", void 0);
    _defineProperty(this, "id", void 0);
    this.allowPass = allowPass;
    this.id = generateID();
  }
  checkBiometricsSupport(biometrics_support_callback) {
    window.natively.trigger(this.id, 0, biometrics_support_callback, "biometrics_support", {
      allowPass: this.allowPass
    });
  }
  checkCredentials(biometrics_has_credentials_callback) {
    window.natively.trigger(this.id, 0, biometrics_has_credentials_callback, "biometrics_has_credentials");
  }
  verifyUserIdentify(biometrics_verify_callback) {
    window.natively.trigger(this.id, 0, biometrics_verify_callback, "biometrics_verify", {
      allowPass: this.allowPass
    });
  }
  getUserCredentials(biometrics_auth_callback) {
    window.natively.trigger(this.id, 0, biometrics_auth_callback, "biometrics_auth", {
      allowPass: this.allowPass
    });
  }
  removeUserCredentials(biometrics_remove_credentials_callback) {
    window.natively.trigger(this.id, 0, biometrics_remove_credentials_callback, "biometrics_remove_credentials");
  }
  saveUserCredentials(login, password, biometrics_auth_callback) {
    window.natively.trigger(this.id, 0, biometrics_auth_callback, "biometrics_auth", {
      allowPass: this.allowPass,
      login,
      password
    });
  }
}
export class NativelyDatePicker {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  showDatePicker(title, description, type, style, datepicker_callback) {
    var params = {
      type: type !== null && type !== void 0 ? type : "DATE",
      style: style !== null && style !== void 0 ? style : "LIGHT",
      title: title !== null && title !== void 0 ? title : "",
      description: description !== null && description !== void 0 ? description : ""
    };
    window.natively.trigger(this.id, 0, datepicker_callback, "datepicker", params);
  }
}
export class NativelyCamera {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  showCamera(type, quality, camera, open_camera_callback) {
    var params = {
      type: type !== null && type !== void 0 ? type : "photo",
      quality: quality !== null && quality !== void 0 ? quality : "high",
      camera: camera !== null && camera !== void 0 ? camera : "BACK"
    };
    window.natively.trigger(this.id, 2, open_camera_callback, "open_camera", params);
  }
}
export class NativelyHealth {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  available(available_callback) {
    window.natively.trigger(this.id, 10, available_callback, "health_available", {});
  }
  requestAuthorization(write_data_types, read_data_types, request_callback) {
    window.natively.trigger(this.id, 10, request_callback, "health_register", {
      write_data_types,
      read_data_types
    });
  }
  permissionStatus(data_type, callback) {
    window.natively.trigger(this.id, 10, callback, "health_permission", {
      data_type
    });
  }
  getAllCharacteristics(callback) {
    window.natively.trigger(this.id, 10, callback, "health_get_all_characteristics", {});
  }
  getStatisticQuantity(data_type, interval, start_date, end_date, callback) {
    var obj = {
      data_type,
      interval
    };
    if (start_date) {
      obj.start_date = start_date.getTime();
    }
    if (end_date) {
      obj.end_date = end_date.getTime();
    }
    window.natively.trigger(this.id, 10, callback, "health_get_statistic_quantity", obj);
  }
}
export class NativelyScanner {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  showScanner(open_scanner_callback) {
    window.natively.trigger(this.id, 2, open_scanner_callback, "open_scanner", {});
  }
}
export class NativelyPurchases {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  login(login, customerEmail, login_callback) {
    var email = customerEmail !== null && customerEmail !== void 0 ? customerEmail : "";
    window.natively.trigger(this.id, 3, login_callback, "purchases_login", {
      login,
      email
    });
  }
  logout(logout_callback) {
    window.natively.trigger(this.id, 3, logout_callback, "purchases_logout", {});
  }
  customerId(customer_id_callback) {
    window.natively.trigger(this.id, 3, customer_id_callback, "purchases_customerid", {});
  }
  restore(restore_callback) {
    window.natively.trigger(this.id, 10, restore_callback, "purchases_restore", {});
  }
  purchasePackage(packageId, purchase_callback) {
    window.natively.trigger(this.id, 3, purchase_callback, "purchases_package", {
      packageId
    });
  }
  packagePrice(packageId, purchase_callback) {
    window.natively.trigger(this.id, 8, purchase_callback, "purchases_price", {
      packageId
    });
  }
}
export class NativelyContacts {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  getAllContacts(contacts_all_callback) {
    window.natively.trigger(this.id, 3, contacts_all_callback, "contacts_all", {});
  }
  createContact(firstName, lastName, email, phone, contacts_save_callback) {
    var params = {
      firstName,
      lastName: lastName !== null && lastName !== void 0 ? lastName : "",
      email: email !== null && email !== void 0 ? email : "",
      phone: phone !== null && phone !== void 0 ? phone : ""
    };
    window.natively.trigger(this.id, 3, contacts_save_callback, "contacts_save", params);
  }
}
export class NativelyMediaPicker {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  showMediaPicker(mediapicker_callback) {
    window.natively.trigger(this.id, 8, mediapicker_callback, "mediapicker", {});
  }
}
export class NativelyAudioRecorder {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  showRecorder(max_duration, record_callback) {
    var params = {
      max_duration: max_duration !== null && max_duration !== void 0 ? max_duration : 0
    };
    window.natively.trigger(this.id, 13, record_callback, "record_start", params);
  }
}
export class NativelyAdmobBanner {
  constructor(config, setup_callback) {
    var _config$position, _config$sizeType, _config$custom_width, _config$custom_height;
    var preload_ad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var preload_callback = arguments.length > 3 ? arguments[3] : undefined;
    var show_ad = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var show_callback = arguments.length > 5 ? arguments[5] : undefined;
    _defineProperty(this, "id", void 0);
    this.id = generateID();
    var params = {};
    if (window.natively.isAndroidApp) {
      var _config$androidUnitId;
      params.unitId = (_config$androidUnitId = config.androidUnitId) !== null && _config$androidUnitId !== void 0 ? _config$androidUnitId : "ca-app-pub-3940256099942544/6300978111";
    } else if (window.natively.isIOSApp) {
      var _config$iOSUnitId;
      params.unitId = (_config$iOSUnitId = config.iOSUnitId) !== null && _config$iOSUnitId !== void 0 ? _config$iOSUnitId : "ca-app-pub-3940256099942544/2934735716";
    }
    params.position = (_config$position = config.position) !== null && _config$position !== void 0 ? _config$position : "BOTTOM";
    params.sizeType = (_config$sizeType = config.sizeType) !== null && _config$sizeType !== void 0 ? _config$sizeType : "AUTO";
    params.width = (_config$custom_width = config.custom_width) !== null && _config$custom_width !== void 0 ? _config$custom_width : 320;
    params.height = (_config$custom_height = config.custom_height) !== null && _config$custom_height !== void 0 ? _config$custom_height : 50;
    window.natively.trigger(this.id, 14, resp => {
      setup_callback === null || setup_callback === void 0 || setup_callback(resp);
      if (preload_ad) {
        window.natively.trigger(this.id, 14, resp => {
          preload_callback === null || preload_callback === void 0 || preload_callback(resp);
          if (show_ad) {
            window.natively.trigger(this.id, 14, show_callback, "bannerad_show", {});
          }
        }, "bannerad_load", {});
      }
    }, "bannerad_setup", params);
  }
  loadAd(callback) {
    window.natively.trigger(this.id, 14, callback, "bannerad_load", {});
  }
  showBanner(callback) {
    window.natively.trigger(this.id, 14, callback, "bannerad_show", {});
  }
  hideBanner(callback) {
    window.natively.trigger(this.id, 14, callback, "bannerad_hide", {});
  }
  bannerIsReady(callback) {
    window.natively.trigger(this.id, 14, callback, "bannerad_ready", {});
  }
  bannerIsVisible(callback) {
    window.natively.trigger(this.id, 14, callback, "bannerad_visible", {});
  }
}

// >=2.9.0
// Can be only one instance of NativelyAdmobInterstitial per page
// Make sure to use this an not reload page a lot
export class NativelyAdmobInterstitial {
  constructor() {
    var iOSUnitId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ca-app-pub-3940256099942544/4411468910";
    var androidUnitId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ca-app-pub-3940256099942544/1033173712";
    var setup_callback = arguments.length > 2 ? arguments[2] : undefined;
    var auto_ad_reload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var auto_ad_reload_callback = arguments.length > 4 ? arguments[4] : undefined;
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "auto_ad_reload", void 0);
    _defineProperty(this, "auto_ad_reload_callback", void 0);
    _defineProperty(this, "unitId", void 0);
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
  loadAd(callback) {
    var _this$unitId;
    var params = {
      unitId: (_this$unitId = this.unitId) !== null && _this$unitId !== void 0 ? _this$unitId : "ca-app-pub-3940256099942544/4411468910"
    };
    window.natively.trigger(this.id, 14, callback, "interstitialad_setup", params);
  }
  showInterstitialAd(callback) {
    window.natively.trigger(this.id, 14, resp => {
      callback(resp);
      if (resp.event === "DID_DISMISS_AD" && this.auto_ad_reload) {
        setTimeout(() => {
          this.loadAd(this.auto_ad_reload_callback);
        }, 500);
      }
    }, "interstitialad_show", {});
  }
  interstitialIsReady(callback) {
    window.natively.trigger(this.id, 14, callback, "interstitialad_ready", {});
  }
}
export class NativelyNFCService {
  constructor(readAlertMessage, writeAlertMessage, readDetectedMessage, writeDetectedMessage) {
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "readAlertMessage", void 0);
    _defineProperty(this, "writeAlertMessage", void 0);
    _defineProperty(this, "readDetectedMessage", void 0);
    _defineProperty(this, "writeDetectedMessage", void 0);
    this.id = generateID();
    this.readAlertMessage = readAlertMessage;
    this.writeAlertMessage = writeAlertMessage;
    this.readDetectedMessage = readDetectedMessage;
    this.writeDetectedMessage = writeDetectedMessage;
  }
  read(callback) {
    var _this$readAlertMessag, _this$readDetectedMes;
    var params = {
      alertMessage: (_this$readAlertMessag = this.readAlertMessage) !== null && _this$readAlertMessag !== void 0 ? _this$readAlertMessag : "please set readAlertMessage",
      detectedMessage: (_this$readDetectedMes = this.readDetectedMessage) !== null && _this$readDetectedMes !== void 0 ? _this$readDetectedMes : "readDetectedMessage"
    };
    window.natively.trigger(this.id, 15, callback, "nfc_read", params);
  }
  write(recordId, recordData, callback) {
    var _this$writeAlertMessa, _this$writeDetectedMe;
    var params = {
      alertMessage: (_this$writeAlertMessa = this.writeAlertMessage) !== null && _this$writeAlertMessa !== void 0 ? _this$writeAlertMessa : "please set writeAlertMessage",
      detectedMessage: (_this$writeDetectedMe = this.writeDetectedMessage) !== null && _this$writeDetectedMe !== void 0 ? _this$writeDetectedMe : "please set writeDetectedMessage",
      recordData: recordData !== null && recordData !== void 0 ? recordData : "please set recordData",
      recordId: recordId !== null && recordId !== void 0 ? recordId : "please set recordId"
    };
    window.natively.trigger(this.id, 15, callback, "nfc_write", params);
  }
  available(callback) {
    window.natively.trigger(this.id, 15, callback, "nfc_available", {});
  }
}
export class NativelyAppleSignInService {
  constructor() {
    _defineProperty(this, "id", void 0);
    this.id = generateID();
  }
  signin(callback) {
    window.natively.trigger(this.id, 16, callback, "apple_signin", {});
  }
}