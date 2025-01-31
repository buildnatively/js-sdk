function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";

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
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  /**
   * Discovers available Bluetooth devices.
   * @param callback Function to handle the response containing list of devices
   * @param uuids Array of service UUIDs to filter devices by
   * @callback {Object} response
   * @callback {Array<{name: string, id: string}>} [response.devices] - List of discovered devices
   * @callback {string} [response.status] - Status of the operation if failed
   * @callback {string} [response.message] - Error message if failed
   */
  discoverDevices(callback, uuids) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, callback, "discover_devices", {
      uuid: uuids || []
    });
  }

  /**
   * Connects to a specified Bluetooth device.
   * @param deviceId The unique identifier of the device to connect
   * @param callback Function to handle the connection response
   * @callback {Object} response
   * @callback {string} response.status - "SUCCESS" or "FAILED"
   * @callback {string} [response.message] - Error message if failed
   */
  connectDevice(deviceId, callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, callback, "connect_device", {
      device_id: deviceId
    });
  }

  /**
   * Disconnects from the currently connected Bluetooth device.
   * @param callback Function to handle the disconnection response
   * @callback {Object} response
   * @callback {string} response.status - "SUCCESS" or "FAILED"
   * @callback {string} [response.message] - Error message if failed
   */
  disconnectDevice(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, callback, "disconnect_device");
  }

  /**
   * Discovers available services and characteristics on the connected device.
   * @param callback Function to handle the service discovery response
   * @callback {Object} response
   * @callback {string} response.status - "SUCCESS" or "FAILED"
   * @callback {Array<{service_id: string, characteristics: string[]}>} [response.services] - List of services and characteristics
   * @callback {string} [response.message] - Additional information or error message
   */
  discoverService(callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, callback, "discover_service");
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
  printData(payload) {
    var serviceId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '18f0';
    var characteristicId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '2af1';
    var linesToAppend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var callback = arguments.length > 4 ? arguments[4] : undefined;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, callback, "print_data", {
      payload,
      service_id: serviceId,
      characteristic_id: characteristicId,
      lines_to_append: linesToAppend
    });
  }

  /**
   * Checks if a specific device is currently connected.
   * @param deviceId The unique identifier of the device to check
   * @param callback Function to handle the connection status response
   * @callback {Object} response
   * @callback {boolean} response.is_connected - Whether the device is connected
   * @callback {string} [response.message] - Additional information if another device is connected
   */
  isDeviceConnected(deviceId, callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 0, callback, "is_device_connected", {
      device_id: deviceId
    });
  }
}