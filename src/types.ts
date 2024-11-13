import {Natively} from "./classes/Natively";

interface NativelyProps {
    natively: Natively;
    $agent: never;
}

declare global {
    const natively: Natively;
    const $agent: never;

    interface Window extends NativelyProps {}
}
