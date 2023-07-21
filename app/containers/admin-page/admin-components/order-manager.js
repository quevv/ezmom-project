"use client";
import { getCookieData, orderApi } from "@/services";
import { Modal, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { EyeOutlined } from '@ant-design/icons'
import { OrderDetailsDrawer } from "./order-details-drawer";

const dataMapping = (data) => {
  const list = [];
  data.map((item) => {
    const orderItem = {
      key: item.orderId,
      orderId: item.orderId,
      accountId: item.accountId,
      accountName: item.account.name,
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

export const OrderManager = () => {
  const [orders, setOrders] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderChange, setOrderChange] = useState(null);

  useEffect(() => {
    GetOrderData();
  }, []);

  const GetOrderData = async () => {
    if (getCookieData("account")) {
      const res = (await orderApi.getOrders()).data;
      if (res.isSuccess) {
        setOrders(dataMapping(res.result));
      }
    }
  };

  const ModifyOrderStatus = async () => {
    if (getCookieData("account")) {
      if (orderChange) {
        const orderId = orderChange.order.orderId;
        const data = { orderStatus: orderChange.statusChange };
        const res = (await orderApi.modifyOrder({ orderId, data })).data;
        console.log(res);
        if (res.isSuccess) {
          GetOrderData();
        }
      }
    }
  };

  const showModal = (record, statusChange) => {
    setOrderChange({ order: record, statusChange: statusChange });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    ModifyOrderStatus();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeStatus = async (value, record) => {
    if (record.orderStatus != value) {
      showModal(record, value);
    }
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "paymentToken",
      key: "paymentToken",
    },
    {
      title: "Khách hàng",
      dataIndex: "accountName",
      key: "accountName",
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
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => <>{moment(text).utc().format("DD/MM/YYYY")}</>,
    },
    {
      title: "Địa chỉ ship",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (text) => <>{text}</>,
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text, record) => {
        return (
          <Select
            defaultValue={text}
            style={{
              width: 120,
            }}
            onChange={(value) => handleChangeStatus(value, record)}
            options={statusItems.map((item) => ({
              value: item.label,
              label: item.label,
            }))}
          />
        );
      },
    },
    {
      title: "Xem chi tiết",
      key: 123,
      render: (record) => <OrderDetailsDrawer record={record}/>,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-[500px]">
      <div className="text-2xl font-bold my-4">Quản Lý Đơn Hàng</div>
      <Table
        className="min-h-[500px]"
        pagination={true}
        loading={!orders}
        columns={columns}
        dataSource={orders}
      />
      <Modal
        title="Thay đổi trạng thái đơn hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thay đổi"
        cancelText="Hủy"
      >
        <p>
          {orderChange ? (
            "Bạn có muốn thay đổi trạng thái đơn hàng mã số: " +
            orderChange.order.paymentToken +
            " từ " +
            orderChange.order.orderStatus +
            " sang " +
            orderChange.statusChange +
            " không?"
          ) : (
            <></>
          )}
        </p>
      </Modal>
    </div>
  );
};

const statusItems = [
  {
    label: "Pending",
    key: "0",
  },
  {
    label: "Shipping",
    key: "1",
  },
  {
    label: "Done",
    key: "2",
  },
  {
    label: "Cancel",
    key: "3",
  },
];
