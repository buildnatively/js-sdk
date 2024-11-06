"use client";

import { useEffect, useState } from "react";

// Import just the type
type Natively = import("../natively-frontend").Natively;
import NativelyInfo from "./NativelyInfo";
type NativelyClasses = {
  NativelyInfo: typeof NativelyInfo;
  // Add other classes as needed
};

export function useNatively(): {
  natively: Natively;
  features: NativelyClasses;
} | null {
  const [natively, setNatively] = useState<{
    natively: Natively;
    features: NativelyClasses;
  } | null>(null);

  useEffect(() => {
    import("../natively-frontend").then(() => {
      if (typeof window !== "undefined" && window.natively) {
        console.log("Natively is available");
        setNatively({
          natively: window.natively,
          features: {
            NativelyInfo,
          },
        });
      } else {
        console.log("Natively is not available");
      }
    });
    // Initialize the Natively type and classes
  }, []);

  return natively;
}
