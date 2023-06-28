import React from "react";
import AuthPage from "../containers/auth-page/auth.container";

export const metadata = {
  title: "Tài Khoản",
  description: "Generated by create next app",
};

const Auth = () => {
  return (
    <div className="w-full">
      <AuthPage />
    </div>
  );
};

export default Auth;