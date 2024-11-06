type Natively = import("../natively-frontend").Natively;
import NativelyInfo from "./NativelyInfo";
type NativelyClasses = {
    NativelyInfo: typeof NativelyInfo;
};
export default function useNatively(): {
    natively: Natively;
    features: NativelyClasses;
} | null;
export {};
