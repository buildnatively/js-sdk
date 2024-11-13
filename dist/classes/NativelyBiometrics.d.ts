export declare class NativelyBiometrics {
    private readonly id;
    private readonly allowPass;
    constructor(allowPass: boolean);
    checkBiometricsSupport(biometrics_support_callback: Function): void;
    checkCredentials(biometrics_has_credentials_callback: Function): void;
    verifyUserIdentify(biometrics_verify_callback: Function): void;
    getUserCredentials(biometrics_auth_callback: Function): void;
    removeUserCredentials(biometrics_remove_credentials_callback: Function): void;
    saveUserCredentials(login: string, password: string, biometrics_auth_callback: Function): void;
}
