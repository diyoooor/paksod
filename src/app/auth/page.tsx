"use client";

import liff from "@line/liff";

const LoginPage = () => {
  const handleLogin = async () => {
    liff.login({ redirectUri: window.location.href });
  };

  return (
    <div>
      <h1>Please log in with LINE</h1>
      <button onClick={handleLogin}>Login with LINE</button>
    </div>
  );
};

export default LoginPage;
