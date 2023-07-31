"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MomoPay from "../../../../public/images/MoMo_Logo.png";
import CashPay from "../../../../public/images/cashPay.png";
import { getCookieData } from "@/services/cookies";
import { useRouter } from "next/navigation";
import MomoPayInfo from "@/public/images/momoPayInfo.jpg";
import { Drawer, notification } from "antd";
import TokenDecode from "@/services/tokenDecode";
import { orderApi } from "@/services/orderApi";

const PaymentInfo = ({ data, setCartItem }) => {
  const router = useRouter();
  const [payment, setPayment] = useState("momo");
  const [paymentToken, setPaymentToken] = useState(null);
  let token = null;
  let countProduct = 0;
  let totalBill = 30000;
  const [orderBill, setOrderBill] = useState(0);
  const [account, setAccount] = useState(null);
  const [openDrawer, SetOpenDrawer] = useState(false);
  const [noti, setNoti] = useState({
    successMsg: {
      msg: "Đặt hàng thành công!",
      descript:
        "Bạn đã đặt hàng thành công, vui lòng chờ cuộc gọi xác nhận đơn hàng của shop. Bạn có thể theo dõi đơn hàng ở trang hồ sơ cá nhân. Chúc bạn mua sắm vui vẻ!",
    },
    emptyCartMsg: {
      msg: "Giỏ hàng chưa có sản phẩm nào!",
      descript:
        "Bạn vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng nhé.",
    },
    errorOrderMsg: {
      msg: "Lỗi đặt hàng!",
      descript:
        "Chúng tôi gặp chút trục trặc trong quá trình xác nhận đơn hàng của bạn. Vui lòng load lại trang và đặt hàng lại. Shop vô cùng xin lỗi vì sự bất tiện này!",
    },
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (notiMsg) => {
    api.info({
      message: notiMsg.msg,
      description: notiMsg.descript,
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
    data.map((item) => {
      totalBill = totalBill + item.productPrice * item.cartQuantity;
      countProduct += item.cartQuantity;
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

  const handleCloseDrawer = () => {
    SetOpenDrawer(false);
  };
  const handleOpenDrawer = () => {
    SetOpenDrawer(true);
  };

  const handleOrder = async () => {
    if (!JSON.parse(localStorage.getItem("cart")) || !data || !data.length) {
      openNotification(noti.emptyCartMsg);
    } else if (!account) {
      router.push(`/auth`);
    } else if (order.accountId && order.shippingAddress) {
      try {
        const res = (await orderApi.addOrder(order)).data;
        if (res) {
          token = res.result.token;
          setPaymentToken(res.result.token);
          setOrderBill(res.result.prices);
          let count = 0;
          {
            data.map(async (item) => {
              const orderDetail = {
                orderId: res.result.oderId,
                productId: item.productId,
                quantity: item.cartQuantity,
                unitPrice: item.productPrice,
              };
              try {
                const orderDetailRes = (
                  await orderApi.addOrderDetails(orderDetail)
                ).data;
                if (orderDetailRes.isSuccess) {
                  count++;
                }
              } catch (e) {
                console.error(e);
              }

              if (count === data.length) {
                localStorage.removeItem("cart");
                setCartItem([]);
              }
              if (count === data.length && orderBill !== 0) {
                if (payment == "momo" && token) {
                  localStorage.removeItem("cart");
                  setCartItem([]);
                  handleOpenDrawer();
                } else {
                  openNotification(noti.successMsg);
                }
              }
            });
          }
        } else {
          if (!res.isSuccess) {
            openNotification(noti.errorOrderMsg);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePayment = (payment) => {
    setPayment(payment);
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
        <div className="grid grid-cols-2 gap-2 px-6 py-4">
          <div>Số sản phẩm: </div>
          <span>{countProduct ? <>{countProduct}</> : <>0</>}</span>
          <span>Phí vận chuyển: </span>
          <span> {(30000).toLocaleString()}đ </span>
          <span className="font-bold">Thành tiền: </span>
          <span className="font-bold text-pink-400">
            {data ? <>{totalBill.toLocaleString()}</> : <>0</>}đ
          </span>
        </div>
        <div className="border-t-2 flex flex-col items-center justify-center px-6 py-4">
          <span className="font-bold"> Chọn phương thức thanh toán </span>
          <div className="flex justify-evenly w-full my-6">
            <button
              onClick={() => {
                handlePayment("momo");
              }}
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
              onClick={() => {
                handlePayment("cash");
              }}
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
      <Drawer
        title={"Thanh Toán bằng Momo"}
        placement={"right"}
        closable={true}
        onClose={handleCloseDrawer}
        open={openDrawer}
      >
        <div className="flex flex-col justify-center items-center px-4">
          <div className="flex flex-col justify-center items-center my-4">
            <p className="my-2">Thông tin thanh toán</p>
            <p className="my-2">
              Số tiền cần chuyển:{" "}
              <span className="rounded-full p-2 bg-pink-400 my-2">
                {orderBill}
              </span>
            </p>
            <p className="my-2">
              Nội dung giao dịch:{" "}
              <span className="rounded-full p-2 bg-pink-400 my-2">
                {paymentToken}
              </span>
            </p>
            <i>
              Hãy quét mã và chuyển tiền bằng ứng dụng Momo với{" "}
              <b className="underline">lời nhắn</b> là{" "}
              <b className="underline">Nội dung giao dịch</b> ở trên
            </i>
          </div>
          <Image
            className="mb-4"
            alt="Momo Payment"
            src={MomoPayInfo}
            width={300}
            height={500}
          />
          <i>
            Sau khi giao dịch chuyển tiền, quý khách vui lòng chờ cuộc gọi xác
            nhận đơn hàng.
          </i>
          <b>Chân thành cảm ơn bạn đã mua hàng của Ezmom!</b>
          <button
            onClick={handleCloseDrawer}
            className="my-8 rounded-lg bg-pink-400 hover:bg-pink-500 text-lg font-bold p-3"
          >
            {" "}
            Hoàn thành giao dịch{" "}
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default PaymentInfo;
