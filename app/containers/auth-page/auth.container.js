"use client";
import React, { useState } from "react";
import Register from "./auth-components/register";
import Login from "./auth-components/login";

const AuthPage = () => {
  const [register, setRegister] = useState(false);
  const HandleLogin = () => {
    setRegister(false)
  }
  const HandleRegister = () => {
    setRegister(true)
  }
  const handleRegistrationComplete = () => {
    setRegister(false);
  };

  return (
    <div className="flex flex-col justify-start items-center py-[16rem] mx-16">
      <div className="rounded-lg border-2 border-gray-400 w-[40%]">
        <div className="w-full grid grid-cols-2 font-bold">
          <button onClick={HandleLogin} className={register?"p-3 rounded-t-lg text-gray-500 active:bg-pink-200" : "p-3 rounded-t-lg bg-pink-200"}> Đăng Nhập </button>
          <button onClick={HandleRegister} className={!register?"p-3 rounded-t-lg text-gray-500 active:bg-pink-200" : "p-3 rounded-t-lg bg-pink-200"}> Đăng ký </button>
        </div>
        <div className="p-4 bg-pink-200">{register? <Register onRegistrationComplete={handleRegistrationComplete}/> : <Login/>}</div>
        
      </div>
    </div>
  );
};

export default AuthPage;
