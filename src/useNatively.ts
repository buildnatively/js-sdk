"use client";
import globalContext from "./globalThis";
import "./natively-frontend";
type Natively = import("./natively-frontend").Natively;

export const useNatively = (): Natively => globalContext?.natively;
export default useNatively;
