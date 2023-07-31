"use client";
import { accountApi, getCookieData } from "@/services";
import TokenDecode from "@/services/tokenDecode";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

const dataMapping = (data) => {
  const list = [];
  data.map((item) => {
    const orderItem = {
      key: item.accountId,
      accountId: item.accountId,
      address: item.address,
      name: item.name,
      email: item.email,
      phoneNumber: item.phoneNumber,
    };
    list.push(orderItem);
  });
  return list.reverse();
};

export const UserManager = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    GetAccountData();
  }, []);

  const GetAccountData = async () => {
    if (getCookieData("account")) {
      const res = (await accountApi.getAccounts()).data;
      console.log(res);
      if (res.isSuccess) {
        setAccount(dataMapping(res.result));
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[500px]">
      <div className="text-2xl font-bold my-4">Quản Lý Đơn Hàng</div>
      <Table
        pagination={true}
        loading={!account}
        columns={columns}
        dataSource={account}
      />
    </div>
  );
};

const columns = [
  {
    title: "Tên người dùng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
];
