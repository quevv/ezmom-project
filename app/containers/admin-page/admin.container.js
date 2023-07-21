"use client";
import React, { useEffect } from "react";
import { UserManager } from "./admin-components/user-manager";
import { ProductManager } from "./admin-components/product-manager";
import { useRouter } from "next/navigation";
import { OrderManager } from "./admin-components/order-manager";
import TokenDecode from "@/services/tokenDecode";
import { getCookieData } from "@/services";

export const AdminContainer = ({ task }) => {
  const router = useRouter();

  useEffect(() => {
    if (getCookieData("account")) {
      if (TokenDecode(getCookieData("account")).role !== "admin") {
        router.push(`/`);
      }
    } else {
      router.push(`/`);
    }
  }, []);

  const renderTaskComponent = () => {
    switch (task) {
      case "users":
        return <UserManager />;
      case "products":
        return <ProductManager />;
      case "orders":
        return <OrderManager />;
      default:
        return <div className="text-2xl font-bold">Task not found</div>;
    }
  };

  return (
    <div className="flex flex-col justify-end py-10 ml-[17rem] mr-5">
      {renderTaskComponent()}
    </div>
  );
};
