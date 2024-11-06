type Natively = import("../natively-frontend").Natively;
import NativelyInfo from "./NativelyInfo";
type NativelyClasses = {
    NativelyInfo: typeof NativelyInfo;
};
export declare function useNatively(): {
    natively: Natively;
    features: NativelyClasses;
} | null;
export {};
