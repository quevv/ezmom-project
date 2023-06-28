import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "./ProductCard";
import CustomDrawer from "./CustomDrawer";

const CustomSwiper = (params) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 mb-4">
        <p className="text-pink-400 font-[Pony] place-self-start text-3xl">
          {params.title}
        </p>
        {params.drawerData ? (
          <CustomDrawer title={params.title} data={params.drawerData} />
        ) : (
          <></>
        )}
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerGroupAuto={true}
        slidesPerView={3}
        autoplay={true}
      >
        {params.swiperData ? (
          params.swiperData.map((item) => (
            <SwiperSlide key={item.productId}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))
        ) : (
          <></>
        )}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
