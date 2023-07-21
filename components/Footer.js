'use client'
import { getCookieData } from "@/services";
import TokenDecode from "@/services/tokenDecode";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (getCookieData("account")) {
      setAccount(TokenDecode(getCookieData("account")));
    }
  }, []);

  if (account && account.role == "admin") {
    return <> </>;
  }
  return (
    <footer className="w-full grid grid-cols-3 gap-3 bg-[#FA5A96] py-10 px-20 text-white">
      <div>
        <div className="text-4xl font-[Pony] py-2">
          <a href="/">EZMOM Baby</a>
        </div>
        <div>Email: ezmombaby@gmail.com</div>
        <div>Điện thoại: 028 7699 8989</div>
      </div>
      <div>
        <div className="text-3xl font-[Pony] py-2">
          Về EZMOM Baby
        </div>
        <ul className="text-sm">
          <li>
            <a href="/#">Giới thiệu về Ezmom Baby</a>
          </li>
        </ul>
      </div>
      <div>
        <div className="text-3xl font-[Pony] py-2">
          Hỗ trợ khách hàng
        </div>
        <ul className="text-sm">
          <li>
            <a href="/#">Hình thức thanh toán</a>
          </li>
          <li>
            <a href="/#">Đổi trả và hoàn tiền</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
