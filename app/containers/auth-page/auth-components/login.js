"use client";
import { authApi } from "@/services/authApi";
import { getCookieData, setCookieData } from "@/services/cookies";
import TokenDecode from "@/services/tokenDecode";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.info({
      message: "Đăng Nhập thành công!",
      description: "Bạn đã đăng nhập thành công. Chúc bạn mua sắm vui vẻ!",
      duration: 0,
    });
  };

  useEffect(() => {
    if (getCookieData("account")) {
      console.log(TokenDecode(getCookieData("account")));
      const decodedToken = TokenDecode(getCookieData("account"));
      if (decodedToken.role === "admin") {
        setTimeout(() => {
          router.push(`/admin/orders`);
        }, 0);
      } else {
        setTimeout(() => {
          router.push(`/`);
        }, 0);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account.email || !account.password) {
      setErrors({
        email: !account.email,
        password: !account.password,
      });
    }
    if (!emailRegex.test(account.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      return;
    }
    setErrors({
      email: false,
      password: false,
    });
    try {
      const res = await authApi.jwtLogin(account);
      console.log(res.status);
      if (res.status == 200) {
        openNotification();
        setCookieData("account", res.data.Token);
        console.log(TokenDecode(res.data.Token));
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        // if (TokenDecode(res.data.Token).role === "admin") {
        //   router.push("/admin/users");
        // } else if (TokenDecode(res.data.Token).role === "customer") {
        //   router.push("/");
        // }
      }
    } catch (e) {
      setErrors(() => ({
        email: true,
        password: true,
      }));
    }
  };

  const textinputcss = "p-2 rounded-lg my-2";

  return (
    <div className="flex justify-center">
      {contextHolder}
      <form onSubmit={handleSubmit} className="flex flex-col w-[65%] py-4">
        <label> Nhập email </label>
        <input
          onChange={handleChange}
          value={account.email}
          className={textinputcss}
          type="text"
          name="email"
          placeholder="nguyenvana@gmail.com"
        />
        {errors.email && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập đúng Email
          </p>
        )}
        <label> Nhập mật khẩu </label>
        <input
          onChange={handleChange}
          value={account.password}
          className={textinputcss}
          type="password"
          name="password"
          placeholder="*********"
        />
        {errors.password && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập đúng mật khẩu
          </p>
        )}
        <div className="flex justify-center items-center">
          <button
            className="rounded-lg active:bg-pink-300 bg-[#FA5A96] text-white w-[50%] p-2 mt-3"
            type="submit"
          >
            Đăng Nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
