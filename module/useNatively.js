"use client";

import { useEffect, useState } from "react";

// Import just the type

import NativelyInfo from "./NativelyInfo";
export default function useNatively() {
  var [natively, setNatively] = useState(null);
  useEffect(() => {
    import("../natively-frontend").then(() => {
      if (typeof window !== "undefined" && window.natively) {
        console.log("Natively is available");
        setNatively({
          natively: window.natively,
          features: {
            NativelyInfo
          }
        });
      } else {
        console.log("Natively is not available");
      }
    });
    // Initialize the Natively type and classes
  }, []);
  return natively;
}