"use client";
import { getCookieData, productApi } from "@/services";
import { Table } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductForm } from "./product-form";

const dataMapping = (data) => {
  const list = [];
  data.map((item) => {
    const productItem = {
      key: item.productId,
      productId: item.productId,
      name: item.name,
      bran: item.brand,
      brandName: item.brand.brandName,
      description: item.description,
      status: item.status,
      price: item.price,
      img: item.img,
      quantity: item.quantity,
    };
    list.push(productItem);
  });
  return list.reverse();
};

export const ProductManager = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (getCookieData("account")) GetProductsData();
  }, []);

  const GetProductsData = async () => {
    const res = (await productApi.getAllProducts()).data;
    if (res.isSuccess) {
      setProducts(dataMapping(res.result));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl font-bold my-4">Quản Lý Sản Phẩm</div>
      <ProductForm title="Thêm sản phẩm mới"/>
      <Table pagination={true} columns={columns} dataSource={products} />
    </div>
  );
};

const columns = [
  {
    title: "",
    dataIndex: "img",
    key: "img",
    render: (text) => (
      <>
        <Image src={text} width={200} height={230} alt={text} />
      </>
    ),
  },
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Hãng",
    dataIndex: "brandName",
    key: "brandName",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (text) => <>{text.toLocaleString()}đ</>,
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    render: (text) => <>{text}</>,
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <>{text}</>,
  },
  {
    title: "Mô tả sản phẩm",
    dataIndex: "description",
    key: "description",
    render: (text) => <>{text}</>,
  },
  {
    title: "Quản lý",
    dataIndex: "",
    key: "10",
    render: (text) => <div><ProductForm title="Sửa"/> <button className="bg-red-500 hover:bg-red-500 active:bg-red-300 m-1 rounded-lg px-2 py-1 text-white">Xóa</button></div>,
  },
];
