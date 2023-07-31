"use client";
import React, { useEffect, useState } from "react";
import ShoppingPic from "../../../../public/images/cuteShoppingPic.png";
import Image from "next/image";
import Link from "next/link";
import { orderApi } from "@/services/orderApi";
import { Modal, Table } from "antd";
import { getCookieData } from "@/services";
import { OrderDetailsDrawer } from "@/components/OrderDetailsDrawer";
import { useRouter } from "next/navigation";

const OrderStatus = ({ data }) => {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
    return list.reverse();
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
      if (res.isSuccess) {
        setOrder(orderListMapping(res.result));
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (typeof window !== "undefined") {
      window.open("https://www.facebook.com/ezmombb/", "_blank");
    }
    
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    {
      title: "Xem chi tiết",
      key: 123,
      render: (record) => <OrderDetailsDrawer record={record} />,
    },
    {
      title: "Hủy đơn hàng",
      key: 123,
      render: ((record) => {
        if(record.orderStatus !== "Done"){
          return <button className="bg-red-500 hover:bg-red-400 rounded-lg p-2" onClick={() => showModal()}>Hủy</button>
        }else return <button disabled className="text-gray-400 bg-red-300 rounded-lg p-2" onClick={() => showModal()}>Hủy</button>
      }),
    },
  ];

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
      <Modal
        title="Thay đổi trạng thái đơn hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Truy cập"
        cancelText="Hủy"
      >
        <p>
          Bạn muốn hủy đơn hàng này? <br/> Vui lòng liên hệ với Fanpage EZMOM BABY
          và cung cấp mã đơn hàng bạn muốn hủy cho Fanpage. Nhân viên sẽ kiểm
          tra và xử lý giúp bạn. <br />
          Bạn có muốn truy cập và Fanpage EZMOM BABY không?
        </p>
      </Modal>
    </div>
  );
};

export default OrderStatus;
