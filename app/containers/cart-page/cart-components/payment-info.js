"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MomoPay from "../../../../public/images/MoMo_Logo.png";
import CashPay from "../../../../public/images/cashPay.png";
import { getCookieData } from "@/services/cookies";
import { useRouter } from "next/navigation";

const PaymentInfo = ({ data }) => {
  const router = useRouter();
  const [payment, setPayment] = useState();
  let countProduct;
  let totalBill = 0;
  const [account, setAccount] = useState(null);
  useEffect(()=>{
    if(!getCookieData("account")==false){
      setAccount(JSON.parse(getCookieData('account')));
    }
  }, []);

  if (data) {
    countProduct= data.length;
    data.map((item) => {
      totalBill = totalBill + (item.productPrice * item.cartQuantity);
    });
    
  }

  const handleCashPayment = () => {
    setPayment("cash");
  };

  const handleMomoPayment = () => {
    setPayment("momo");
  };

  return (
    <div>
      <div className="rounded-lg bg-gray-200 w-full p-6 mb-4">
        <p className="mt-2 font-bold">Địa chỉ ship: </p>{account? <>{account.address}</> : <>Chưa có địa chỉ</>}
        <p className="my-2 font-bold">Người nhận: </p>{account? <>{account.name} - {account.phoneNumber}</> : <>Nhập thông tin</>}
      </div>
      <div className="rounded-lg border-2 border-gray-400">
        <div className="border-b-2 flex justify-center p-4">
          <span className="font-bold text-2xl">Thông tin đơn hàng</span>
        </div>
        <div className="grid grid-cols-2 px-6 py-4">
          <div>Số sản phẩm: </div>
          <span>{countProduct? <>{countProduct}</>: <></>}</span>
          <span>Phí vận chuyển: </span>
          <span> {(30000).toLocaleString()}đ </span>
          <span className="font-bold">Thành tiền: </span>
          <span className="font-bold text-pink-400">
            {totalBill?<>{totalBill.toLocaleString()}</>: <></>}đ
          </span>
        </div>
        <div className="border-t-2 flex flex-col items-center justify-center px-6 py-4">
          <span className="font-bold"> Chọn phương thức thanh toán </span>
          <div className="flex justify-evenly w-full my-6">
            <button
              disabled
              onClick={handleMomoPayment}
              className={
                payment == "momo"
                  ? "px-2 rounded-lg border-2 border-pink-500"
                  : "m-4  opacity-50"
              }
            >
              <Image
                className="rounded-lg"
                src={MomoPay}
                width={50}
                height={50}
                alt={"Momo Payment"}
              />
            </button>

            <button
              onClick={handleCashPayment}
              className={
                payment == "cash"
                  ? "px-2 rounded-lg border-2 border-pink-500"
                  : "m-4"
              }
            >
              <Image
                className="rounded-lg"
                src={CashPay}
                width={50}
                height={50}
                alt={"Momo Payment"}
              />
            </button>
          </div>
          <button
            onClick={() => {
              if(account==null){
                router.push(`/auth`)
              }
            }}
          className="py-2 px-6 rounded-lg text-white bg-pink-500 active:bg-pink-400">
            Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
