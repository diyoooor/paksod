import { useEffect, useState } from "react";
import { initializeLiff } from "../utils/liffHelper";

export const useLiff = (liffId: string) => {
  const [isLiffInitialized, setLiffInitialized] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await initializeLiff(liffId);
        setLiffInitialized(true);
      } catch (error) {
        console.error("Error initializing LIFF", error);
      }
    };

    initLiff();
  }, [liffId]);

  return { isLiffInitialized };
};
