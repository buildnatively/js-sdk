class Natively {
    static version() {
        return '1.2.1';
    }

    static generateID() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);;
    }

    isDebug = false;

    setDebug(isDebug) {
        this.isDebug = isDebug;
    }

    constructor(isDebug) {
        this.natively_injector = {
            injected: false,
            observers: [],
            addObserver: function(fn) {
                if (window.natively_injector.injected) {
                    fn();
                } else {
                    if (window.natively_service.isDebug) {
                        console.log(`[DEBUG] addObserver: ${fn}`);
                    };
                    window.natively_injector.observers.push(fn);
                }
            },
            notify: function() {
                window.natively_injector.injected = true;
                const observers = window.natively_injector.observers;
                if (window.natively_service.isDebug) {
                    console.log("[INFO] Notify observers: ", observers.length);
                };
                while (observers.length > 0) { 
                    const observer = observers.shift(); 
                    observer(); 
                }
            }
        };
        this.natively_service = {
            trigger: function(respId, minVersion, callback, method, body) {
                const isTestVersion = window.natively_service.isDebug;
                if (!window.natively_injector.injected) {
                    window.natively_injector.addObserver(() => {
                        window.natively_service.trigger(respId, minVersion, callback, method, body);
                    });
                    return;
                }
                if (isTestVersion & minVersion > window.natively_service.app_version) {
                    alert(`[ERROR] Please rebuild the app to use this functionality. App Version: ${window.natively_service.app_version}, feature version: ${minVersion}`); 
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
                            console.log(`[DEBUG] Callback method: ${fullMethodName}, body: ${JSON.stringify(resp)}, respId: ${respId}`);
                        };
                        callback(resp);
                    };
                    if (body) {
                        body.response_id = respId;   
                    } else {
                        body = { response_id: respId };
                    }
                };
                if (isTestVersion) {
                    console.log(`[DEBUG] Trigger method: ${method}, body: ${JSON.stringify(body)}`);    
                }
                $agent.trigger(method, body);            
            }
        };
        this.natively_service.isDebug = isDebug;
    }

    start(window) {
        window.natively_service = this.natively_service;
        window.natively_injector = this.natively_injector;
        window.natively_injector.addObserver(() => {
            window.natively_service.trigger(undefined, 0, (resp) => {
                window.natively_service.min_app_version = resp.minSDKVersion;
                window.natively_service.app_version = resp.sdkVersion;
            }, 'app_info');
        });
    }

}

class NativelyNotifications {
    constructor() {
        this.id = Natively.generateID();
    }

    getOneSignalId(onesignal_playerid_callback) {
        window.natively_service.trigger(this.id, 0, onesignal_playerid_callback, 'onesignal_playerid');
    }

    requestPermissionIOS(fallbackToSettings, push_register_callback) {
        window.natively_service.trigger(this.id, 0, push_register_callback, 'push_register', { fallbackToSettings });
    }

    getPermissionStatusIOS(push_permission_callback) {
        window.natively_service.trigger(this.id, 0, push_permission_callback, 'push_permission');
    }
    
}

class NativelyGeolocation {
    constructor() {
        this.id = Natively.generateID();
    }

    getUserGeolocation(distance, geolocation_callback) {
        window.natively_service.trigger(this.id, 0, geolocation_callback, 'geolocation', { distance });
    }

    requestPermission(geo_register_callback) {
        window.natively_service.trigger(this.id, 0, geo_register_callback, 'geo_register');
    }

    getPermissionStatus(geo_permission_callback) {
        window.natively_service.trigger(this.id, 0, geo_permission_callback, 'geo_permission');
    }
}

class NativelyMessage {
    constructor() {
        this.id = Natively.generateID();
    }

    sendSMS(properties, send_sms_callback) {
        const params = {};
        params.body = properties.body ? properties.body : "";
        params.recipient = properties.recipient ? properties.recipient : "";
        window.natively_service.trigger(this.id, 0, send_sms_callback, 'send_sms', params);
    }

    sendEmail(properties, send_email_callback) {
        const params = {};
        params.subject = properties.subject ? properties.subject : "";
        params.body = properties.body ? properties.body : "";
        params.recipient = properties.recipient ? properties.recipient : "";
        window.natively_service.trigger(this.id, 0, send_email_callback, 'send_email', params);
    }
}

class NativelyStorage {
    constructor() {
        this.id = Natively.generateID();
    }

    setStorageValue(properties) {
        window.natively_service.trigger(this.id, 0, undefined, 'set_storage_value', { key: properties.key, value: properties.value });
    }

    getStorageValue(properties, get_storage_value_callback) {
        window.natively_service.trigger(this.id, 0, get_storage_value_callback, 'get_storage_value', { key: properties.key });
    }

    removeStorageValue(properties) {
        window.natively_service.trigger(this.id, 0, undefined, 'remove_storage_value', { key: properties.key });
    }

    resetStorage() {
        window.natively_service.trigger(this.id, 0, undefined, 'reset_storage');
    }
}

class NativelyBiometrics {
    constructor(allowPasscode) {
        this.allowPasscode = allowPasscode
        this.id = Natively.generateID();
    }

    checkBiometricsSupport(biometrics_support_callback) {
        window.natively_service.trigger(this.id, 0, biometrics_support_callback, 'biometrics_support', { allowPass: this.allowPasscode });
    }

    verifyUserIdentify(biometrics_verify_callback) {
        window.natively_service.trigger(this.id, 0, biometrics_verify_callback, 'biometrics_verify', { allowPass: this.allowPasscode });
    }

    getUserCredentials(biometrics_auth_callback) {
        window.natively_service.trigger(this.id, 0, biometrics_auth_callback, 'biometrics_auth', { allowPass: this.allowPasscode });
    }

    removeUserCredentials(biometrics_remove_credentials_callback) {
        window.natively_service.trigger(this.id, 0, biometrics_remove_credentials_callback, 'biometrics_remove_credentials');
    }

    saveUserCredentials(properties, biometrics_auth_callback) {
        window.natively_service.trigger(this.id, 0, biometrics_auth_callback, 'biometrics_auth', { allowPass: this.allowPasscode, login: properties.login, password: properties.password });
    }
}

class NativelyInfo {
    constructor() {
        this.id = Natively.generateID();
    }

    getAppInfo(app_info_callback) {
        window.natively_service.trigger(this.id, 0, app_info_callback, 'app_info');
    }
}

class NativelyDatePicker {
    constructor() {
        this.id = Natively.generateID();
    }

    showDatePicker(properties, datepicker_callback) {
        let params = { type: properties.type, style: properties.style };
        params.title = properties.title || "";
        params.description = properties.description || "";
        window.natively_service.trigger(this.id, 0, datepicker_callback, 'datepicker', params);
    }
}

class NativelyCamera {
    constructor() {
        this.id = Natively.generateID();
    }

    showCamera(properties, open_camera_callback) {
        let params = { type: properties.type };
        params.quality = properties.quality || "high";
        window.natively_service.trigger(this.id, 2, open_camera_callback, 'open_camera', params);
    }
}

class NativelyScanner {
    constructor() {
        this.id = Natively.generateID();
    }

    showScanner(open_scanner_callback) {
        window.natively_service.trigger(this.id, 2, open_scanner_callback, 'open_scanner', {});
    }
}

class NativelyPurchases {
    constructor() {
        this.id = Natively.generateID();
    }

    purchaseIOS(productId, inapp_purchase_callback) {
        window.natively_service.trigger(this.id, 3, inapp_purchase_callback, 'inapp_purchase', { productId });
    }

    purchaseAndroid(properties, inapp_purchase_callback) {
        const productType = properties.product_type === "Subscription" ? "subs" : "inapp";
        let params = { productId: properties.productid, productType };
        if (properties.offer_tag) {
            params.offerTag = properties.offer_tag
        }
        window.natively_service.trigger(this.id, 3, inapp_purchase_callback, 'inapp_purchase', params);
    }
}

class NativelyContacts {
    constructor() {
        this.id = Natively.generateID();
    }

    getAllContacts(contacts_all_callback) {
        window.natively_service.trigger(this.id, 3, contacts_all_callback, 'contacts_all', {});
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
        window.natively_service.trigger(this.id, 3, contacts_save_callback, 'contacts_save', params);
    }
}