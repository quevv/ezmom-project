"use client";
import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { getCookieData, orderApi } from "@/services";
import Image from "next/image";

export const OrderDetailsDrawer = ({ record }) => {
  const [openDrawer, SetOpenDrawer] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const GetOrderDetails = async (id) => {
    if (getCookieData("account")) {
      const res = (await orderApi.getOrderDetails(id)).data;
      if (res.isSuccess) {
        console.log(res.result);
        setOrderDetails(res.result);
      }
    }
  };

  const handleCloseDrawer = () => {
    SetOpenDrawer(false);
  };
  const handleOpenDrawer = () => {
    GetOrderDetails(record.orderId);
    SetOpenDrawer(true);
  };
  return (
    <div>
      <div
        onClick={handleOpenDrawer}
        className="w-full flex justify-center hover:bg-pink-400 p-2 rounded-full"
      >
        <EyeOutlined />
      </div>
      <Drawer
        title={"Xem chi tiết đơn hàng"}
        placement={"right"}
        closable={true}
        onClose={handleCloseDrawer}
        open={openDrawer}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="w-[70%]">
            {orderDetails ? (
              orderDetails.map((item) => (
                <div
                  key={item.orderDetailId}
                  className="grid grid-cols-6 gap-4 my-4"
                >
                  <Image
                    className="col-span-2 rounded-lg bg-white"
                    src={item.product.img}
                    width={200}
                    height={250}
                    alt={item.product.name}
                  />
                  <span className='col-span-2 text-lg font-bold'>{item.product.name}</span>
                  <span>{item.product.price.toLocaleString()}đ</span>
                  <span>Số lượng đặt: {item.quantity}</span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};
