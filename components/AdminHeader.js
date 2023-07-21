"use client";
import { getCookieData, removeCookieData } from "@/services";
import TokenDecode from "@/services/tokenDecode";
import { Avatar, Dropdown } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EzMomLogo from "@/public/images/ezmom_logo.svg";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const [account, setAccount] = useState(null);
  const router = useRouter();
  const [page, setPage] = useState('');

  useEffect(() => {
    if (getCookieData("account")) {
      setAccount(TokenDecode(getCookieData("account")));
      if (TokenDecode(getCookieData("account")).role !== "admin") {
        router.push(`/`);
      }
    } else {
      router.push(`/`);
    }
  }, []);

  const handleLogOut = () => {
    if (!getCookieData("account") == false) {
      removeCookieData("account");
      localStorage.removeItem("cart");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  const handleSwitchPage = (page) => {
    switch (page) {
      case 'users':
          setPage('users')
          router.push('/admin/users')
        break;
      case 'products':
          setPage('products')
          router.push('/admin/products')
        break;
      case 'orders':
        setPage('orders')
        router.push('/admin/orders')
      break;
      default:
        break;
    }
  }

  const btnCss =
    "py-3 hover:bg-pink-400 active:bg-pink-500 rounded-lg my-3 border-2 w-[90%]";
    const btnActiveCss =
    "py-3 bg-pink-400 hover:bg-pink-400 active:bg-pink-500 rounded-lg my-3 border-2 w-[90%]";

  return (
    <header className="flex justify-center fixed bg-white w-[15%] h-full z-50 font-bold">
      <div className="my-4 justify-center h-fit flex flex-col items-center w-full">
        <Image width={100} height={40} src={EzMomLogo} alt="EzMom Baby Logo" />
        {account ? (
          <button
            onClick={handleLogOut}
            className="rounded-lg bg-[#808080] py-1 px-2 hover:bg-gray-500 active:bg-gray-400"
          >
            Đăng xuất
          </button>
        ) : (
          <></>
        )}
        <div className="my-4 flex flex-col items-center justify-center border-t-4 w-full py-3">
          <div className="w-full border-b-4 text-2xl pb-3 flex justify-center mb-3">
            {" "}
            Quản lý hệ thống{" "}
          </div>
          <button onClick={()=>{handleSwitchPage('orders')}} className={page=='orders'?btnActiveCss : btnCss}>Quản lý đơn hàng</button>
          <button onClick={()=>{handleSwitchPage('products')}} className={page=='products'?btnActiveCss : btnCss}>Quản lý sản phẩm</button>
          <button onClick={()=>{handleSwitchPage('users')}} className={page=='users'?btnActiveCss : btnCss}>Quản lý người dùng</button>
          <button></button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
