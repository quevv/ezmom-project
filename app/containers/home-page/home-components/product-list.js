import ProductCard from "@/components/ProductCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductList = (Props) => {
  const cateList = Props.cateList;
  const productList = Props.data;
  return (
    <div className="w-full my-8">
      <div className="grid grid-cols-2 mb-4">
        <p className="text-pink-400 font-[Pony] place-self-start text-3xl">
          {Props.title}
        </p>
      </div>
      <div className="border-y-2 border-solid border-gray-300 flex py-3">
        <Swiper spaceBetween={10} slidesPerView={7} autoplay={true}>
          {cateList.map((item) => {
            if (item.status == "Còn hàng") {
              return (
                <SwiperSlide key={item}>
                  <div className="font-bold cursor-pointer rounded-full hover:bg-pink-300 flex justify-center py-2">
                    {item}
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
      <div className="grid grid-cols-3">
        {productList.map((item) => {
          if (item.status == "Còn hàng") {
            return <ProductCard key={item.productId} data={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default ProductList;
