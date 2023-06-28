"use client";
import CustomSwiper from "@/components/CustomSwiper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { productApi } from "@/services";
import { notification } from "antd";

const getLocalStorageCart = () => {
  if (typeof window !== "undefined")
    return JSON.parse(localStorage.getItem("cart")) || [];
};

const ProductDetails = ({ data }) => {
  const [productItem, setProductItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(getLocalStorageCart());
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.info({
      message: "Đã cho vào giỏ hàng!",
      description:
        "Sản phẩm đã được cho vào giỏ hàng. Tiếp tục mua sắm nhé!",
      duration: 0,
    });
  };

  const getProduct = async () => {
    try {
      const res = await productApi.getProduct(data);
      const productData = res.data.result;
      setProductItem(productData);
    } catch (error) {
      setProductItem(null);
    }
  };
  const getData = async () => {
    const res = (await productApi.getProducts()).data;
    setProducts(res.result);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    getProduct();
    getData();
  }, []);

  const handleAddToCart = () => {
    try {
      setCart((preCart) => [
        ...preCart,
        {
          productName: productItem.name,
          productId: productItem.productId,
          img: productItem.img,
          productPrice: productItem.price,
          cartQuantity: quantity,
        },
      ]);
      openNotification();
    } catch (e) {
      console.log(e);
    }
  };
  const handleIncrease = () => {
    if (quantity == productItem.quantity) {
    } else setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity == 1) {
    } else setQuantity(quantity - 1);
  };

  const selectquantityBtnCss =
    "rounded-lg px-3 text-pink-500 border-pink-500 cursor-pointer border-2 active:bg-pink-500 active:text-white";
  return (
    <div className="flex flex-col justify-start items-center py-[12rem] mx-16">
      {contextHolder}
      <div className="w-[70%]">
        {productItem != null ? (
          <>
            <div>
              <Link className="hover:underline" href="/">
                Trang chủ
              </Link>{" "}
              -{" "}
              <Link className="hover:underline" href="/#powered_milk">
                Sữa Bột
              </Link>{" "}
              -<span> {productItem.name}</span>
            </div>
            <div className="flex my-16">
              <Image
                className="rounded-lg"
                alt={productItem.name}
                src={productItem.img}
                width={350}
                height={400}
              />
              <div className="pl-5 flex flex-col">
                <span className="font-bold text-2xl">{productItem.name}</span>
                <span className="font-bold text-lg py-3">
                  {productItem.price.toLocaleString()} đ
                </span>
                <div className=" my-4">
                  <span className="font-bold">Tình Trạng: </span>
                  {productItem.status}
                </div>
                <div>
                  <span className="font-bold">Mô Tả: </span>
                  {productItem.description}
                </div>
                <div className="flex my-5" id="quantity_selecter">
                  <button
                    onClick={handleDecrease}
                    className={selectquantityBtnCss}
                  >
                    -
                  </button>
                  <div className="px-3">{quantity}</div>
                  <button
                    onClick={handleIncrease}
                    className={selectquantityBtnCss}
                  >
                    +
                  </button>
                </div>
                <div className="my-4 grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="border-2 border-pink-500 text-pink-500 rounded-lg font-bold hover:bg-pink-300 active:bg-pink-400 active:text-white"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={() => {
                      console.log(cart);
                    }}
                    className="bg-pink-500 text-white rounded-lg py-3 font-bold hover:bg-pink-400 active:bg-pink-300"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[500px] font-bold text-gray-600 flex justify-center items-center">
            Không tìm thấy sản phẩm
          </div>
        )}

        <div className="w-full h-2 bg-gray-300 my-6 rounded-lg"></div>
        <CustomSwiper title="Sản Phẩm Tương Tự" swiperData={products} />
        {/* <div className="w-full h-2 bg-gray-300 my-6"></div>
        <CustomSwiper title="Sản Phẩm Bán Chạy" swiperData={dumbDataMilk}/> */}
      </div>
    </div>
  );
};

export default ProductDetails;
