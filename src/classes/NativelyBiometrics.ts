import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyBiometrics {
    private readonly id: string = generateID();
    private readonly allowPass: boolean;

    constructor(allowPass: boolean) {
        this.allowPass = allowPass;
    }

    checkBiometricsSupport(biometrics_support_callback: Function): void {
        globalContext?.natively.trigger(
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
        globalContext?.natively.trigger(
            this.id,
            0,
            biometrics_has_credentials_callback,
            "biometrics_has_credentials",
        );
    }

    verifyUserIdentify(biometrics_verify_callback: Function): void {
        globalContext?.natively.trigger(
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
        globalContext?.natively.trigger(
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
        globalContext?.natively.trigger(
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
        globalContext?.natively.trigger(
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
