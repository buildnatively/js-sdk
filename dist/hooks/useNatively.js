import globalContext from "../utils/globalThis";
export var useNatively = () => globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively;