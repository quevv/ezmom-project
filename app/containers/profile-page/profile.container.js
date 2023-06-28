"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "../../../public/images/avatar.png";
import { getCookieData, removeCookieData } from "@/services/cookies";
import OrderStatus from "./profile-components/order-status";
import { useRouter } from "next/navigation";

const ProfileContainer = () => {
  const [account, setAccount] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!getCookieData("account") == false) {
      setAccount(JSON.parse(getCookieData("account")));
    }
    else{
      setTimeout(() => {
        router.push(`/`);
      }, 0);
    }
  }, []);

  const handleLogOut = () => {
    if (!getCookieData("account") == false) {
      removeCookieData('account');
      router.push('/');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-[12rem] mx-16">
      <div className="grid grid-cols-5 gap-4 w-[70%]">
        <div className="col-span-2 border-gray-400 border-2 rounded-lg py-4 px-14 flex flex-col justify-center items-center">
          <Image
            className="my-2"
            src={Avatar}
            alt="avatar"
            width={150}
            height={150}
          />
          {account ? (
            <div className="font-bold text-2xl">{account.name}</div>
          ) : (
            <>User</>
          )}
          {account ? (
            <div className="text-lg mb-2">{account.phoneNumber}</div>
          ) : (
            <>User</>
          )}
          <span className="font-bold my-4">Baby</span>
          <span className="text-pink-500">
            Người dùng tạm thời chưa nhập thông tin bé nhà. Nếu có thể hãy cung
            cấp cho chúng tôi những thông tin về bé nhà để cùng theo dõi sự phát
            triển của bé nhé.
          </span>
        </div>
        <div className="col-span-3 border-2 border-gray-400 rounded-lg">
          <OrderStatus />
        </div>
      </div>
      <div className="flex justify-center w-full mt-12">
        <button onClick={()=>{
          if (!getCookieData("account") == false) {
            removeCookieData('account');
            window.location.reload();
          }
        }} className="rounded-lg bg-pink-400 hover:bg-pink-700 p-3 text-white">Đăng Xuất</button>
      </div>
    </div>
  );
};

export default ProfileContainer;
