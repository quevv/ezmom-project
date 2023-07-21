import ProductCard from "@/components/ProductCard";
import { Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const CartItems = ({ data, removeProduct }) => {
  const products = data;
  // console.log(removeProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const showModal = (id) => {
    setDeleteProduct(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // console.log(deleteProduct);
    removeProduct(deleteProduct)
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="col-span-2">
      <div className="grid grid-cols-5 font-bold border-y-gray-400 gap-2 py-3 border-y-2 px-2">
        <div className="col-span-3"> Sản Phẩm </div>
        <span> Đơn giá </span>
        <span> Số lượng </span>
      </div>
      <div>
        {products.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-5 gap-2 py-3 px-2 border-b-4 my-4"
          >
            <div className="col-span-3 flex">
              <Image
                className="rounded-lg bg-white"
                src={item.img}
                width={180}
                height={100}
                alt={item.productName}
              />
              <span className="mx-2 text-lg">{item.productName}</span>
            </div>
            <span className="font-bold">
              {item.productPrice.toLocaleString()} đ{" "}
            </span>
            <div className="flex justify-between">
              {item.cartQuantity}
              <button onClick={()=>{showModal(item.productId)}} className="rounded-lg p-2 h-fit bg-red-500 text-white active:bg-red-400">xóa</button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Xóa sản phẩm khỏi giỏ hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
      </Modal>
    </div>
  );
};

export default CartItems;
