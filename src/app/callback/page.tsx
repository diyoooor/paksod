"use client"; // For `app` directory or optional in `pages`

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use `next/router` if using `pages/`

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");

        if (!code || !state) {
          throw new Error("Missing authentication parameters");
        }

        // Exchange the code for tokens
        const response = await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          throw new Error("Failed to exchange authentication code");
        }

        const { accessToken } = await response.json();

        // Save token locally (optional)
        localStorage.setItem("access_token", accessToken);

        // Redirect user to a target page
        router.push("/");
      } catch (error) {
        console.error("Authentication callback failed:", error);
        // Redirect to error page or handle error
        router.push("/auth/error");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-lg">Processing authentication...</p>
    </div>
  );
};

export default CallbackPage;
