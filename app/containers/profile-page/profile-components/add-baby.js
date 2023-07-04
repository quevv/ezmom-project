"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { babyApi } from "@/services/babyApi";
import { getCookieData } from "@/services/cookies";
import TokenDecode from "@/services/tokenDecode";

const AddBaby = () => {
  const [account, setAccount] = useState();
  useEffect(() => {
    if (getCookieData("account")) {
      setAccount(TokenDecode(getCookieData("account")));
      if (account) {
        setNewBaby((prevInfor) => ({
          ...prevInfor,
          accountId: account.accountId,
        }));
      }
    }
  }, []);
  const now = moment(new Date()).utc().format("YYYY-MM-DD");
  const [newBaby, setNewBaby] = useState({
    name: "",
    dob: now,
    gender: "",
    weight: "",
    height: "",
    accountId: account ? account.accountId : null,
  });
  const [errors, setErrors] = useState({
    name: false,
    gender: false,
    weight: false,
    height: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!newBaby.accountId) {
      setNewBaby((prevInfor) => ({
        ...prevInfor,
        accountId: account.accountId,
      }));
    }
    setNewBaby((prevInfor) => ({
      ...prevInfor,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newBaby.name ||
      !newBaby.gender ||
      !newBaby.weight ||
      !newBaby.height
    ) {
      setErrors({
        name: true,
        gender: true,
        weight: true,
        height: true,
      });
      return;
    }
    if (!newBaby.accountId) {
      setNewBaby((prevInfor) => ({
        ...prevInfor,
        accountId: account.accountId,
      }));
      return;
    }

    setErrors({
      name: false,
      gender: false,
      weight: false,
      height: false,
    });
    try {
      if (errors.accountId) {
        setNewBaby((prevInfor) => ({
          ...prevInfor,
          accountId: account.accountId,
        }));
      }
      const res = await babyApi.addBaby(newBaby);
      if (res.status == 200) {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    } catch (e) {
      setErrors(() => ({
        name: true,
        dob: true,
        gender: true,
        weight: true,
        height: true,
      }));
    }
  };
  const inputCss =
    "w-full rounded-lg p-1 border-2 border-gray-200 hover:border-pink-400 my-1";
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-2xl font-bold text-pink-500 my-4">
        Thêm Thông Tin Của Bé
      </span>
      <form onSubmit={handleSubmit} className="w-[60%]">
        <label>Họ và Tên Bé</label>
        <br />
        <input
          onChange={handleChange}
          name="name"
          value={newBaby.name}
          className={inputCss}
          type="text"
          placeholder="Nhập họ và tên bé"
        />
        {errors.name && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập họ và tên của bé
          </p>
        )}
        <label>Ngày sinh của Bé</label>
        <br />
        <input
          onChange={handleChange}
          name="dob"
          value={newBaby.dob}
          className={inputCss}
          max={newBaby.dob}
          type="date"
        />
        <br />
        <label>Cân nặng của Bé -kg-</label>
        <br />
        <input
          onChange={handleChange}
          name="weight"
          value={newBaby.weight}
          className={inputCss}
          type="number"
          placeholder="Nhập cân nặng của bé"
          min={0}
          max={100}
        />
        {errors.weight && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập cân nặng của bé
          </p>
        )}
        <label>Chiều cao của Bé -cm-</label>
        <br />
        <input
          onChange={handleChange}
          name="height"
          value={newBaby.height}
          className={inputCss}
          type="number"
          placeholder="Nhập chiều cao của bé"
          min={0}
          max={200}
        />
        {errors.height && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng nhập chiều cao của bé
          </p>
        )}
        <div className="flex my-1">
          <input
            onChange={handleChange}
            type="radio"
            id="female"
            name="gender"
            value="female"
          />
            <label>Bé gái</label>
          <input
            onChange={handleChange}
            className="ml-4"
            type="radio"
            id="male"
            name="gender"
            value="male"
          />
            <label>Bé trai</label>
        </div>
        {errors.gender && (
          <p className="text-red-500 font-thin text-sm">
            Vui lòng chọn giới tính của bé
          </p>
        )}
        <div className="w-full flex justify-center my-2">
          <button
            className="rounded-lg active:bg-pink-300 bg-[#FA5A96] text-white w-[50%] p-2 mt-3"
            type="submit"
          >
            Thêm Thông Tin Bé
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBaby;
