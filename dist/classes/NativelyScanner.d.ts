export declare class NativelyScanner {
    private readonly id;
    showScanner(open_scanner_callback: Function): void;
    showDocumentScanner(jpegQuality: number | null, foregroundColor: string | null, backgroundColor: string | null, highlightColor: string | null, menuColor: string | null, defaultFlashMode: string | null, defaultScanOrientation: string | null, defaultFilter: string | null, availableFilters: string[] | null, source: string | null, ocrLanguage: string | null, pageMode: string | null, resultCallback: Function): void;
}
