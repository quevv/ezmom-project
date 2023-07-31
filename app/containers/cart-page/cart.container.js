'use client'
import React, { useEffect, useState } from "react";
import CartItems from "./cart-components/cart-item";
import PaymentInfo from "./cart-components/payment-info";

const CartPage = () => {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCartItem(JSON.parse(localStorage.getItem("cart")));
    }
  },[]);
  return (
    <div className="flex flex-col justify-start items-center py-[12rem] mx-16">
      <div className="w-[70%] grid grid-cols-3 gap-4">
        {cartItem?<CartItems data={cartItem} setCartItem={setCartItem}/>: <div className="col-span-2 w-full flex justify-center items-center"> Chưa có sản phẩm nào </div>}
        <PaymentInfo data={cartItem} setCartItem={setCartItem}/>
      </div>
    </div>
  );
};

export default CartPage;
