import React from "react";
import { dumbDataMilk } from '@/data';
import CartPage from "../containers/cart-page/cart.container";

export const metadata = {
  title: "Giỏ Hàng",
  description: "Generated by create next app",
};

const Cart = () => {
  return (
    <div className="w-full">
      <CartPage data={dumbDataMilk}/>
    </div>
    )
}

export default Cart;
