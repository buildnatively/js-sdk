import {Natively} from "./natively-frontend";

interface NativelyProps {
    natively: Natively;
    $agent: never;
}

declare global {
    const natively: Natively;
    const $agent: never;

    interface Window extends NativelyProps {}
}
