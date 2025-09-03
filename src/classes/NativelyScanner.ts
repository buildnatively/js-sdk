import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

export class NativelyScanner {
    private readonly id: string = generateID();

    showScanner(open_scanner_callback: Function): void {
        globalContext?.natively.trigger(
            this.id,
            2,
            open_scanner_callback,
            "open_scanner",
            {},
        );
    }

    showDocumentScanner(
        jpegQuality: number | null,
        foregroundColor: string | null,
        backgroundColor: string | null,
        highlightColor: string | null,
        menuColor: string | null,
        defaultFlashMode: string | null,
        defaultScanOrientation: string | null,
        defaultFilter: string | null,
        availableFilters: string[] | null,
        source: string | null,
        ocrLanguage: string | null,
        pageMode: string | null,
        resultCallback: Function,
      ): void {
        const params: Record<string, any> = {};

        if (source) params.source = source;
        if (menuColor) params.menuColor = menuColor;
        if (pageMode) params.pageMode = pageMode;
        if (jpegQuality != null && !isNaN(jpegQuality)) params.jpegQuality = jpegQuality;
        if (highlightColor) params.highlightColor = highlightColor;
        if (foregroundColor) params.foregroundColor = foregroundColor;
        if (backgroundColor) params.backgroundColor = backgroundColor;
        if (defaultFlashMode) params.defaultFlashMode = defaultFlashMode;
        if (defaultScanOrientation) params.defaultScanOrientation = defaultScanOrientation;
        if (defaultFilter) params.defaultFilter = defaultFilter;
        if (availableFilters) params.availableFilters = availableFilters;

        if (ocrLanguage) {
          params.ocrConfiguration = {
            languages: [ocrLanguage],
          };
        }
      
        globalContext?.natively.trigger(this.id, 21, resultCallback, "open_document_scanner", params);
      }
}
