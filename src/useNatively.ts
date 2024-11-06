"use client";

import { useEffect, useState } from "react";

// Import just the type
type Natively = import("./natively-frontend").Natively;

export function useNatively() {
  const [natively, setNatively] = useState<Natively | null>(null);

  useEffect(() => {
    // Import the module to initialize window.natively
    import("./natively-frontend").then(() => {
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
