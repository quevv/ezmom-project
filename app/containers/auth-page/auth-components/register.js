"use client";
import { authApi } from "@/services/authApi";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";

const Register = ({ onRegistrationComplete }) => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    confirmPassword: false,
    address: false,
    phoneNumber: false,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !account.email ||
      !account.password ||
      !account.name ||
      !account.confirmPassword ||
      !account.address ||
      !account.phoneNumber
    ) {
      setErrors({
        email: !account.email,
        password: !account.password,
        name: !account.name,
        confirmPassword: !account.confirmPassword,
        address: !account.address,
        phoneNumber: !account.phoneNumber,
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
      name: false,
      confirmPassword: false,
      address: false,
      phoneNumber: false,
    });

    const res = await authApi.register(account);
    if (res.status == 200) {
      onRegistrationComplete();
    }
  };
  const textinputcss = "p-2 rounded-lg my-2";
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-[65%] py-4">
        <label> Nhập Tên </label>
        <input
          onChange={handleChange}
          value={account.name}
          className={textinputcss}
          type="text"
          name="name"
          placeholder="Nguyễn Văn A"
        />
        {errors.name && (
          <p className="text-red-500 font-thin text-sm">Vui lòng nhập tên</p>
        )}
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
            Vui lòng nhập mật khẩu
          </p>
        )}
        <label> Xác nhận mật khẩu </label>
        <input
          onChange={handleChange}
          value={account.confirmPassword}
          className={textinputcss}
          type="password"
          name="confirmPassword"
          placeholder="*********"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập đúng mật khẩu
          </p>
        )}
        <label> Nhập địa chỉ </label>
        <input
          onChange={handleChange}
          value={account.address}
          className={textinputcss}
          type="text"
          name="address"
          placeholder="số nhà, đường, phường, quận, thành phố"
        />
        {errors.address && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập địa chỉ
          </p>
        )}
        <label> Nhập số điện thoại </label>
        <input
          onChange={handleChange}
          value={account.phoneNumber}
          className={textinputcss}
          type="text"
          name="phoneNumber"
          placeholder="0123456789"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập số điện thoại
          </p>
        )}
        <div className="flex justify-center items-center">
          <button
            className="rounded-lg active:bg-pink-300 bg-[#FA5A96] text-white w-[50%] p-2 mt-3"
            type="submit"
          >
            Đăng Ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
