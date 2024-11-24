"use client";

import liff from "@line/liff";

const LoginPage = () => {
  const handleLogin = () => {
    liff.login({
      redirectUri: window.location.origin,
    });
  };

  return (
    <div>
      <h1>Please log in with LINE</h1>
      <button onClick={handleLogin}>Login with LINE</button>
    </div>
  );
};

export default LoginPage;
