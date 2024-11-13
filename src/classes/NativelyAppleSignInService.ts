import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyAppleSignInService {
    private readonly id: string = generateID();

    signin(callback: Function): void {
        globalContext?.natively.trigger(this.id, 16, callback, "apple_signin", {});
    }
}
