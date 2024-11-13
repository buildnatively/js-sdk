import globalContext from "./utils/globalThis";
import {Natively} from "./classes/Natively";

// Assign natively to the global object
if (globalContext) {
    globalContext.natively = new Natively();
}
