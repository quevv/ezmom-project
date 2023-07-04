"use client";
import React, { useEffect, useState } from "react";
import Banner from "./home-components/banner";
import FlashSale from "./home-components/flash-sale";
import SideBanner from "./home-components/side-banner";
import ProductList from "./home-components/product-list";
import { productApi } from "@/services";
import { milkCateList } from "@/data";

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [pagination, setPagination] = useState(1);
  const getData = async () => {
    try {
      const res = (await productApi.getProducts(pagination)).data;
      setProducts(res.result);
    } catch (e) {
      setProducts(null)
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" flex flex-col justify-start items-center py-[10rem] mx-16">
      <Banner />
      <SideBanner />
      <div className="w-[70%] flex justify-center" id="flash_sale">
        {/* <FlashSale /> */}
      </div>
      <div className="w-[70%]" id="powered_milk">
        {products!=null?<ProductList data={products} cateList={milkCateList} title="Sữa Bột" />:<div className="h-[500px] w-full font-bold flex justify-center items-center">Hiện chưa có sản phẩm</div>}
      </div>
      <div className="w-[70%]" id="functional_food">
        {/* <ProductList data={dumbDataFF} cateList={ffCateList} title="Thực Phẩm Chức Năng" /> */}
      </div>
    </div>
  );
};

export default HomePage;
