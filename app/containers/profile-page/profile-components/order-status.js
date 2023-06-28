import React from "react";
import ShoppingPic from "../../../../public/images/cuteShoppingPic.png";
import Image from "next/image";
import Link from "next/link";

const OrderStatus = () => {
  const orderStatusBtnCss =
    "rounded-t-lg hover:bg-pink-300 active:bg-pink-400 py-6 w-full";
  return (
    <div className="w-full items-center">
      <div className=" flex justify-evenly text-lg font-bold border-gray-400 border-b-2 ">
        <button className={orderStatusBtnCss}>Đang Xử lý</button>
        <button className={orderStatusBtnCss}>Đang giao</button>
        <button className={orderStatusBtnCss}>Đánh giá</button>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <Image src={ShoppingPic} alt="Chưa có đơn hàng" className="my-6"/>
        <p>Chưa có đơn hàng</p>
        <Link className="text-white bg-pink-500 active:bg-pink-400 p-2 rounded-lg my-4" href={`/`}>Tiếp tục mua sắm</Link>

      </div>
    </div>
  );
};

export default OrderStatus;
