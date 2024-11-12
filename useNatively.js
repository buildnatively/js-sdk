"use client";

import globalContext from "./globalThis";
import "./natively-frontend";
export var useNatively = () => globalContext === null || globalContext === void 0 ? void 0 : globalContext.natively;
export default useNatively;