"use client";

import { useEffect, useState } from "react";

// Import just the type
type Natively = import("./natively-frontend").Natively;

export default function useNatively(): Natively | null {
  const [natively, setNatively] = useState<Natively | null>(null);
  useEffect(() => {
    import("./natively-frontend").then(() => {
      if (typeof window !== "undefined" && window.natively) {
        console.log("Natively is available");
        setNatively(window.natively);
      } else {
        console.log("Natively is not available");
      }
    });
    // Initialize the Natively type and classes
  }, []);

  return natively;
}
