"use client";
import React, { useEffect, useState } from "react";
import ShoppingPic from "../../../../public/images/cuteShoppingPic.png";
import Image from "next/image";
import Link from "next/link";
import { orderApi } from "@/services/orderApi";
import moment from "moment";
import { Table } from "antd";
import { getCookieData } from "@/services";

const OrderStatus = ({ data }) => {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Pending");

  const orderListMapping = (data) => {
    const list = [];
    data.map((item) => {
      const orderItem = {
        key: item.orderId,
        orderId: item.orderId,
        accountId: item.accountId,
        orderDate: item.orderDate,
        orderDetails: item.orderDetails,
        orderStatus: item.orderStatus,
        prices: item.prices,
        shippingAddress: item.shippingAddress,
        totalQuantity: item.totalQuantity,
        paymentToken: item.payments[0].tokenPayment,
      };
      list.push(orderItem);
    });
    return list;
  };

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
      );
    }

    return (
      <div className="w-full">
        <Table
          pagination={false}
          columns={column}
          dataSource={filteredOrders}
        />
      </div>
    );
  };

  const handleStatusChange = (status) => {
    setOrderStatus(status);
  };

  useEffect(() => {
    if (getCookieData("account")) getOrder(data);
  }, []);

  const getOrder = async (userId) => {
    if (getCookieData("account")) {
      const res = (await orderApi.getOrderOfUser(userId)).data;
      if(res.isSuccess){
        setOrder(orderListMapping(res.result));
      }
    }
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

const column = [
  {
    title: "Mã đơn hàng",
    dataIndex: "paymentToken",
    key: "paymentToken",
  },
  {
    title: "Số lượng",
    dataIndex: "totalQuantity",
    key: "totalQuantity",
  },
  {
    title: "Đơn giá",
    dataIndex: "prices",
    key: "prices",
    render: (text) => <>{text.toLocaleString()}đ</>,
  },
];
