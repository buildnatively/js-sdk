import globalContext from "../utils/globalThis.js";
export var useNatively = () => globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively;