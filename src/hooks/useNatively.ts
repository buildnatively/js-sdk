import globalContext from "../utils/globalThis";
import {Natively} from "../classes/Natively";

export const useNatively = (): Natively => globalContext?.natively;
