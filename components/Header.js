"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EzMomLogo from "../public/images/ezmom_logo.svg";
import CateLogo from "../public/images/category_logo.svg";
import HeartLogo from "../public/images/heart_logo.svg";
import ChatLogo from "../public/images/chat_logo.svg";
import CartLogo from "../public/images/shopping_cart_logo.svg";
import UserLogo from "../public/images/user_logo.svg";
import EzmomIcon from "../public/images/takeCareLogo.png";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getCookieData } from "@/services/cookies";

const Header = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    if (!getCookieData("account") == false) {
      setAccount(JSON.parse(getCookieData("account")));
      if(account != null) {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    }
  }, []);
  const handleScroll = () => {
    if (window.scrollY >= 150) {
      setIsScrollDown(true);
    } else setIsScrollDown(false);
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }
  return (
    <header className="flex justify-center fixed w-full z-50 font-bold">
      {isScrollDown ? (
        <ScrolledHeader />
      ) : (
        <div>
          <div className="block mt-3 ">
            <ul className=" grid grid-cols-5 gap-4">
              <li className="hover:text-pink-500">
                <Link rel="preload" className="flex items-center" href="/">
                  <Image src={CateLogo} alt="category" /> <p>Danh Mục</p>
                </Link>
              </li>
              <li className="hover:text-pink-500">
                <Link rel="preload" className="flex items-center" href="/">
                  <Image
                    src={EzmomIcon}
                    width={40}
                    height={40}
                    alt="Grow path"
                  />{" "}
                  <p className="ml-1">Lộ Trình</p>
                </Link>
              </li>
              <li className="hover:text-pink-500">
                <Link rel="preload" className="flex items-center" href="/">
                  <Image src={ChatLogo} alt="Feedback" /> <p>Phản Hồi</p>
                </Link>
              </li>
              <li className="hover:text-pink-500">
                <Link rel="preload" className="flex items-center" href="/cart">
                  <Image src={CartLogo} alt="cart" /> <p>Giỏ hàng</p>
                </Link>
              </li>
              <li className="hover:text-pink-500">
                {account ? (
                  <Link
                    rel="preload"
                    className="flex items-center"
                    href="/profile"
                  >
                    <Image src={UserLogo} alt="account" /> <p>{account.name}</p>
                  </Link>
                ) : (
                  <Link
                    rel="preload"
                    className="flex items-center"
                    href="/auth"
                  >
                    <Image src={UserLogo} alt="account" /> <p>Đăng nhập</p>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className={"flex items-center"}>
            <Link rel="preload" href="/">
              <Image
                width={120}
                height={40}
                src={EzMomLogo}
                alt="EzMom Baby Logo"
              />
            </Link>
            <div className="flex rounded-full bg-white border-black border-2 hover:border-pink-500 w-full px-2 items-center mr-5">
              <input
                className=" w-full h-[3rem] p-4 rounded-full focus:outline-none"
                type="text"
                placeholder="Ba mẹ muốn tìm những sản phẩm nào cho bé nhà?"
              />
              <div className="m-4 flex items-center">
                <SearchOutlined style={{ fontSize: "24px" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
const ScrolledHeader = () => {
  const [account, setAccount] = useState(null);
  useEffect(() => {
    if (!getCookieData("account") == false) {
      setAccount(JSON.parse(getCookieData("account")));
    }
  }, []);
  return (
    <header className="w-full grid grid-cols-3  bg-white">
      <Link href="/">
        <Image className=" h-[6rem]" src={EzMomLogo} alt="EzMom Baby Logo" />
      </Link>
      <div className="flex justify-center">
        <ul className=" grid grid-cols-5 gap-10 place-items-center ">
          <li className="rounded-full hover:bg-pink-300 p-2">
            <Link className="flex items-center" href="/">
              <Image src={CateLogo} alt="category" />
            </Link>
          </li>
          <li className="rounded-full hover:bg-pink-300 p-2">
            <Link className="flex items-center" href="/">
              <Image src={EzmomIcon} width={40} height={40} alt="Grow path" />
            </Link>
          </li>
          <li className="rounded-full hover:bg-pink-300 p-2">
            <Link className="flex items-center" href="/">
              <Image src={ChatLogo} alt="Feedback" />
            </Link>
          </li>
          <li className="rounded-full hover:bg-pink-300 p-2">
            <Link className="flex items-center" href="/cart">
              <Image src={CartLogo} alt="cart" />
            </Link>
          </li>
          <li className="rounded-full hover:bg-pink-300 p-2">
            {account ? (
              <Link className="flex items-center" href="/profile">
                <Image src={UserLogo} alt="account" />
              </Link>
            ) : (
              <Link className="flex items-center" href="/auth">
                <Image src={UserLogo} alt="account" />
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="flex items-center w-full justify-end pr-10">
        <div className="flex rounded-full border-black border-2 hover:border-pink-500 px-1 items-center">
          <input
            className="h-[1rem] p-4 rounded-full focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm"
          />
          <div className="m-4 flex items-center">
            <SearchOutlined style={{ fontSize: "24px" }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
