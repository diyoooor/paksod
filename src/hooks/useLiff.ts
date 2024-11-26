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
        await liff.init({ liffId });

        if (!liff.isLoggedIn()) {
          console.log("User is not logged in. Redirecting to LINE login.");
          liff.login({
            redirectUri: window.location.href,
          });
        } else {
          const profile = await liff.getProfile();
          const idToken = await liff.getAccessToken();

          localStorage.setItem("id_token", idToken);

          await saveUserToDatabase({
            lineUserId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
          });
        }
      } catch (error) {
        console.error("Failed to initialize LIFF or check login status", error);
      }
    };

    checkLogin();
  }, []);
};

const saveUserToDatabase = async (user: {
  lineUserId: string;
  displayName: string;
  pictureUrl: string;
}) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to save user to the database");
    }

    console.log("User saved or updated successfully");
  } catch (error) {
    console.error("Error saving user to the database:", error);
  }
};

export default useLiffAuth;
