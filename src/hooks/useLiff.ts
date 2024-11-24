import { useEffect } from "react";
import liff from "@line/liff";
import jwt from "jsonwebtoken";

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

export const issueToken = (lineUserId: string) => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  const token = jwt.sign(
    {
      lineUserId,
    },
    secret,
    { expiresIn: "1h" }
  );

  return token;
};

export const verifyLineToken = (idToken: string) => {
  const LINE_ISSUER = "https://access.line.me";
  const LINE_CLIENT_ID = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;

  const decoded = jwt.verify(idToken, LINE_CLIENT_ID, {
    issuer: LINE_ISSUER,
  });

  if (!decoded) throw new Error("Invalid ID token");

  return decoded.sub;
};

export const authenticateToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token" + error);
  }
};
