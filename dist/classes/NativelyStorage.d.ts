export declare class NativelyStorage {
    private readonly id;
    setStorageValue(key: string, value: any): void;
    getStorageValue(key: string, get_storage_value_callback: Function): void;
    removeStorageValue(key: string): void;
    resetStorage(): void;
}
