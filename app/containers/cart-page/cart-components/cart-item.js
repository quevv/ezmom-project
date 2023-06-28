import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import React from "react";

const CartItems = (data) => {
  const products = data.data;
  // console.log(products);
  return (
    <div className="col-span-2">
      <div className="grid grid-cols-5 font-bold border-y-gray-400 gap-2 py-3 border-y-2 px-2">
        <div className="col-span-3"> Sản Phẩm </div>
        <span> Đơn giá </span>
        <span> Số lượng </span>
      </div>
      <div>
        {products.map((item) => (
          <div key={item.productId} className="grid grid-cols-5 gap-2 py-3 px-2 border-b-4 my-4">
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
              {" "}
              {item.productPrice.toLocaleString()} đ{" "}
            </span>
            <span>{item.cartQuantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;
