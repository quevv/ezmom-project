"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MomoPay from "../../../../public/images/MoMo_Logo.png";
import CashPay from "../../../../public/images/cashPay.png";
import { getCookieData } from "@/services/cookies";
import { useRouter } from "next/navigation";
import CartItems from "./cart-item";
import { notification } from "antd";
import TokenDecode from "@/services/tokenDecode";
import { orderApi } from "@/services/orderApi";

const PaymentInfo = ({ data }) => {
  const router = useRouter();
  const [payment, setPayment] = useState("cash");
  let countProduct;
  let totalBill = 0;
  const [account, setAccount] = useState(null);
  const [errors, setErrors] = useState({
    orderErr: false,
    orderDetailErr: false,
  });
  const [noti, setNoti] = useState({
    msg: "",
    descript: "",
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.info({
      message: noti.msg,
      description: noti.descript,
      duration: 0,
    });
  };
  const [order, setOrder] = useState({
    accountId: null,
    shippingAddress: null,
    prices: null,
    totalQuantity: null,
  });

  useEffect(() => {
    if (getCookieData("account")) {
      setAccount(TokenDecode(getCookieData("account")));
    }
  }, []);

  if (data) {
    countProduct = data.length;
    data.map((item) => {
      totalBill = totalBill + item.productPrice * item.cartQuantity;
    });
  }

  useEffect(() => {
    if (account) {
      setOrder({
        accountId: account.accountId,
        shippingAddress: account.address,
        prices: totalBill,
        totalQuantity: countProduct,
      });
    }
  }, [data]);

  const handleOrderDetails = async (data) => {
    try {
      (await orderApi.addOrderDetails(data)).data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleOrder = async () => {
    if (!data.length) {
      setNoti({
        msg: "Giỏ hàng chưa có sản phẩm nào!",
        descript: "Bạn vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng",
      });
      openNotification();
    } else if (!account) {
      router.push(`/auth`);
    } else if (order.accountId && order.shippingAddress) {
      try {
        const res = (await orderApi.addOrder(order)).data;
        if (res.isSuccess) {
          {
            data.map((item) => {
              const orderDetail = {
                orderId: res.result.orderId,
                productId: item.productId,
                quantity: item.cartQuantity,
                unitPrice: item.productPrice,
              };
              handleOrderDetails(orderDetail);
            });
          }
          localStorage.removeItem("cart");
        } else {
          if (!res.isSuccess) {
            setNoti({
              msg: "Lỗi đặt hàng!",
              descript:
                "Chúng tôi gặp chút trục trặc trong quá trình xác nhận đơn hàng của bạn. Vui lòng load lại trang và đặt hàng lại",
            });
            openNotification();
          }
          return;
        }
        setNoti({
          msg: "Đặt hàng thành công!",
          descript:
            "Bạn đã đặt hàng thành công, bạn có thể theo dõi đơn hàng ở trang hồ sơ cá nhân.",
        });
        openNotification();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCashPayment = () => {
    setPayment("cash");
  };

  const handleMomoPayment = () => {
    setPayment("momo");
  };

  return (
    <div>
      {contextHolder}
      <div className="rounded-lg bg-gray-200 w-full p-6 mb-4">
        <div className="mt-2 font-bold">Địa chỉ ship: </div>
        {account ? <>{account.address}</> : <>Chưa có địa chỉ</>}
        <p className="my-2 font-bold">Người nhận: </p>
        {account ? (
          <>
            {account.name} - {account.phoneNumber}
          </>
        ) : (
          <>Chưa đăng nhập</>
        )}
      </div>
      <div className="rounded-lg border-2 border-gray-400 w-full flex flex-col items-center justify-center">
        <div className="border-b-2 flex justify-center p-4">
          <span className="font-bold text-2xl">Thông tin đơn hàng</span>
        </div>
        <div className="grid grid-cols-2 px-6 py-4">
          <div>Số sản phẩm: </div>
          <span>{countProduct ? <>{countProduct}</> : <></>}</span>
          <span>Phí vận chuyển: </span>
          <span> {(30000).toLocaleString()}đ </span>
          <span className="font-bold">Thành tiền: </span>
          <span className="font-bold text-pink-400">
            {totalBill ? <>{totalBill.toLocaleString()}</> : <></>}đ
          </span>
        </div>
        <div className="border-t-2 flex flex-col items-center justify-center px-6 py-4">
          <span className="font-bold"> Chọn phương thức thanh toán </span>
          <div className="flex justify-evenly w-full my-6">
            <button
              onClick={handleMomoPayment}
              className={
                payment == "momo"
                  ? "px-2 rounded-lg border-2 border-pink-500"
                  : "m-4 "
              }
            >
              <Image
                className="rounded-lg"
                src={MomoPay}
                width={50}
                height={50}
                alt={"Momo Payment"}
              />
            </button>

            <button
              onClick={handleCashPayment}
              className={
                payment == "cash"
                  ? "px-2 rounded-lg border-2 border-pink-500"
                  : "m-4"
              }
            >
              <Image
                className="rounded-lg"
                src={CashPay}
                width={50}
                height={50}
                alt={"Momo Payment"}
              />
            </button>
          </div>
        </div>
        <button
          onClick={handleOrder}
          className="py-2 px-6 my-3 rounded-lg text-white bg-pink-500 active:bg-pink-400"
        >
          Đặt Hàng
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
