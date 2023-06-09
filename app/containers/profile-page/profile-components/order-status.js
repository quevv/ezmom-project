"use client";
import React, { useEffect, useState } from "react";
import ShoppingPic from "../../../../public/images/cuteShoppingPic.png";
import Image from "next/image";
import Link from "next/link";
import { orderApi } from "@/services/orderApi";

const OrderStatus = ({ data }) => {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Pending");

  const OrderSpace = () => {
    if (order.length == 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={ShoppingPic} alt="Chưa có đơn hàng" className="my-6" />
          <p>Chưa có đơn hàng</p>
          <Link
            className="text-white bg-pink-500 active:bg-pink-400 p-2 rounded-lg my-4"
            href={`/`}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      );
    }
    const filteredOrders = order.filter(
      (item) => item.orderStatus === orderStatus
    );

    if (filteredOrders.length === 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={ShoppingPic} alt="Chưa có đơn hàng" className="my-6" />
          <p>Chưa có đơn hàng</p>
          <Link
            className="text-white bg-pink-500 active:bg-pink-400 p-2 rounded-lg my-4"
            href={`/`}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      )
    }

    return (
      <>
        {filteredOrders.map((item) => (
          <div key={item.orderId}>{orderStatus}</div>
        ))}
      </>
    );
  };

  const handleStatusChange = (status) => {
    setOrderStatus(status);
  };

  useEffect(() => {
    getOrder(data);
  }, []);

  const getOrder = async (userId) => {
    const res = (await orderApi.getOrderOfUser(userId)).data;
    setOrder(res.result);
  };

  const orderStatusBtnCss = "rounded-t-lg active:bg-pink-400 py-6 w-full";
  const orderStatusBtnCssActive = "rounded-t-lg bg-pink-300 py-6 w-full";
  return (
    <div className="w-full items-center h-full">
      <div className=" flex justify-evenly text-lg font-bold border-gray-400 border-b-2 ">
        <button
          onClick={() => {
            handleStatusChange("Pending");
          }}
          className={
            orderStatus == "Pending"
              ? orderStatusBtnCssActive
              : orderStatusBtnCss
          }
        >
          Đang xử lý
        </button>
        <button
          onClick={() => {
            handleStatusChange("Shipping");
          }}
          className={
            orderStatus == "Shipping"
              ? orderStatusBtnCssActive
              : orderStatusBtnCss
          }
        >
          Đang giao
        </button>
        <button
          onClick={() => {
            handleStatusChange("Done");
          }}
          className={
            orderStatus == "Done" ? orderStatusBtnCssActive : orderStatusBtnCss
          }
        >
          Đã giao
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <OrderSpace />
      </div>
    </div>
  );
};

export default OrderStatus;
