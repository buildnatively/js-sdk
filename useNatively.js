"use client";

// Import just the type
// import "./natively-frontend";
export default function useNatively() {
  // const [natively, setNatively] = useState<Natively | null>(null);
  // useEffect(() => {
  //   import("./natively-frontend").then(() => {
  //     if (typeof window !== "undefined" && window.natively) {
  //       console.log("Natively is available");
  //       setNatively(window.natively);
  //     } else {
  //       console.log("Natively is not available");
  //     }
  //   });
  //   // Initialize the Natively type and classes
  // }, []);

  return self.natively;
}