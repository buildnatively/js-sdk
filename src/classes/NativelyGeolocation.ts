import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

// Legacy use Natively Location
export class NativelyGeolocation {
    private readonly id: string = generateID();

    getUserGeolocation(distance: number, geolocation_callback: Function): void {
        globalContext?.natively.trigger(this.id, 0, geolocation_callback, "geolocation", {
            distance,
        });
    }

    requestPermission(geo_register_callback: Function): void {
        globalContext?.natively.trigger(this.id, 0, geo_register_callback, "geo_register");
    }

    getPermissionStatus(geo_permission_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            geo_permission_callback,
            "geo_permission",
        );
    }
}
