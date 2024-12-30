import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

/**
 * NativelyBluetoothPrinter class provides methods for Bluetooth device management and printing operations.
 * This class handles device discovery, connection management, service discovery, and data printing.
 * 
 * Usage:
 * 
 * const printer = new NativelyBluetoothPrinter();
 * 
 * // 1. Discover devices
 * printer.discoverDevices((response) => {
 *   if (response.devices) {
 *     // Handle list of devices
 *   }
 * });
 * 
 * // 2. Connect to a device
 * printer.connectDevice("00:11:22:33:AA:BB", (response) => {
 *   if (response.status === "SUCCESS") {
 *     // Connected successfully
 *   }
 * });
 * 
 * // 3. Discover services (optional for bonded printers)
 * printer.discoverService((response) => {
 *   if (response.status === "SUCCESS") {
 *     // Handle services and characteristics
 *   }
 * });
 * 
 * // 4. Print data
 * printer.printData("27,112,0,25,250", "18f0", "2af1", 2, (response) => {
 *   if (response.status === "SUCCESS") {
 *     // Printing successful
 *   }
 * });
 * 
 */
export class NativelyBluetoothPrinter {
    private readonly id: string = generateID();

    /**
     * Discovers available Bluetooth devices.
     * @param callback Function to handle the response containing list of devices
     * @callback {Object} response
     * @callback {Array<{name: string, id: string}>} [response.devices] - List of discovered devices
     * @callback {string} [response.status] - Status of the operation if failed
     * @callback {string} [response.message] - Error message if failed
     */
    discoverDevices(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "discover_devices"
        );
    }

    /**
     * Connects to a specified Bluetooth device.
     * @param deviceId The unique identifier of the device to connect
     * @param callback Function to handle the connection response
     * @callback {Object} response
     * @callback {string} response.status - "SUCCESS" or "FAILED"
     * @callback {string} [response.message] - Error message if failed
     */
    connectDevice(deviceId: string, callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "connect_device",
            {
                device_id: deviceId
            }
        );
    }

    /**
     * Disconnects from the currently connected Bluetooth device.
     * @param callback Function to handle the disconnection response
     * @callback {Object} response
     * @callback {string} response.status - "SUCCESS" or "FAILED"
     * @callback {string} [response.message] - Error message if failed
     */
    disconnectDevice(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "disconnect_device"
        );
    }

    /**
     * Discovers available services and characteristics on the connected device.
     * @param callback Function to handle the service discovery response
     * @callback {Object} response
     * @callback {string} response.status - "SUCCESS" or "FAILED"
     * @callback {Array<{service_id: string, characteristics: string[]}>} [response.services] - List of services and characteristics
     * @callback {string} [response.message] - Additional information or error message
     */
    discoverService(callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "discover_service"
        );
    }

    /**
     * Sends data to the connected printer.
     * @param payload Comma-separated byte values to print
     * @param serviceId UUID of the service to use (default: '18f0')
     * @param characteristicId UUID of the characteristic to use (default: '2af1')
     * @param linesToAppend Number of new lines to append after printing (default: 0)
     * @param callback Function to handle the printing response
     * @callback {Object} response
     * @callback {string} response.status - "SUCCESS" or "FAILED"
     * @callback {string} [response.message] - Error message if failed
     */
    printData(
        payload: string,
        serviceId: string = '18f0',
        characteristicId: string = '2af1',
        linesToAppend: number = 0,
        callback: Function
    ): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "print_data",
            {
                payload,
                service_id: serviceId,
                characteristic_id: characteristicId,
                lines_to_append: linesToAppend
            }
        );
    }

    /**
     * Checks if a specific device is currently connected.
     * @param deviceId The unique identifier of the device to check
     * @param callback Function to handle the connection status response
     * @callback {Object} response
     * @callback {boolean} response.is_connected - Whether the device is connected
     * @callback {string} [response.message] - Additional information if another device is connected
     */
    isDeviceConnected(deviceId: string, callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            0,
            callback,
            "is_device_connected",
            {
                device_id: deviceId
            }
        );
    }
}