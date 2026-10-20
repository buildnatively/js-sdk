import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyCamera {
    private readonly id: string = generateID();

    requestPermission(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            2,
            callback,
            "camera_permission",
        );
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
        globalContext?.natively.trigger(
            this.id,
            2,
            open_camera_callback,
            "open_camera",
            params,
        );
    }
}
