import { useEffect } from "react";
import liff from "@line/liff";

const useLiffAuth = () => {
  useEffect(() => {
    const checkLogin = async () => {
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

      if (!liffId) {
        console.error(
          "LIFF ID is not defined. Check your environment variables."
        );
        return;
      }

      try {
        // Initialize LIFF
        await liff.init({ liffId });

        // Check if the user is logged in
        if (!liff.isLoggedIn()) {
          console.log("User is not logged in. Redirecting to LINE login.");
          liff.login({
            redirectUri: window.location.href, // Redirect back to the same page after login
          });
        } else {
          console.log("User is logged in.");
        }
      } catch (error) {
        console.error("Failed to initialize LIFF or check login status", error);
      }
    };

    checkLogin();
  }, []);
};

export default useLiffAuth;
