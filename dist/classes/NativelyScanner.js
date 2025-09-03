function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyScanner {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  showScanner(open_scanner_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 2, open_scanner_callback, "open_scanner", {});
  }
  showDocumentScanner(jpegQuality, foregroundColor, backgroundColor, highlightColor, menuColor, defaultFlashMode, defaultScanOrientation, source, ocrLanguage, pageMode, defaultFilter, availableFilters, resultCallback) {
    var params = {};
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
        languages: [ocrLanguage]
      };
    }
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 21, resultCallback, "open_document_scanner", params);
  }
}