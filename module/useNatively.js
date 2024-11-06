"use client";

import { useEffect, useState } from "react";

// Import just the type

export default function useNatively() {
  var [natively, setNatively] = useState(null);
  useEffect(() => {
    // Import the module to initialize window.natively
    import("../natively-frontend").then(() => {
      if (typeof window !== "undefined" && window.natively) {
        console.log("Natively is available");
        setNatively(window.natively);
      } else {
        console.log("Natively is not available");
      }
    });
  }, []);
  return natively;
}