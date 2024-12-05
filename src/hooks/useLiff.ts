import { useEffect } from "react";
import liff from "@line/liff";
import axiosInstance from "@/lib/axiosInstance";

const useLiffAuth = () => {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

        if (!liffId) {
          throw new Error(
            "LIFF ID is not defined. Check your environment variables."
          );
        }

        // Initialize LIFF
        await liff.init({ liffId });

        const [profile, idToken] = await Promise.all([
          liff.getProfile(),
          liff.getAccessToken(),
        ]);

        // Store token locally
        localStorage.setItem("id_token", idToken);

        if (!idToken && !!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href })
        }

        // Save user to the database
        await saveUserToDatabase({
          lineUserId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
        });
      } catch (error) {
        console.error(
          "Error during LIFF initialization or login process:",
          error
        );
      }
    };

    checkLogin();
  }, []);
};

// Separate function to handle saving user to the database
const saveUserToDatabase = async (user: {
  lineUserId: string;
  displayName: string;
  pictureUrl: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/users", user);

    if (response.status === 200) {
      console.log("User saved or updated successfully");
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error saving user to the database:", error);
  }
};

export default useLiffAuth;
