"use client";
import React, { useEffect, useState } from "react";
import Banner from "./home-components/banner";
import FlashSale from "./home-components/flash-sale";
import SideBanner from "./home-components/side-banner";
import ProductList from "./home-components/product-list";
import { getCookieData, productApi } from "@/services";
import { milkCateList } from "@/data";
import { Pagination } from "antd";
import TokenDecode from "@/services/tokenDecode";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0)
  const [recommender, setRecommender] = useState([]);
  const router = useRouter()

  useEffect(() => {
    if (getCookieData("account")) {
      if (TokenDecode(getCookieData("account")).role === "admin") {
        router.push(`/admin/orders`);
      }
    }
  }, []);

  const getRecommender = async () => {
    try{
      const res = (await productApi.getRecommender({month:6, page:1})).data
      if(res.isSuccess){
        setRecommender(res.result)
      }
    }
    catch(e) {
      console.error(e);
    }
  }
  const getData = async (page) => {
    try {
      const res = (await productApi.getProducts(page)).data;
      setProducts(res.result);
      setTotal(res.total)
    } catch (e) {
      setProducts(null);
    }
  };
  
  useEffect(() => {
    getData(pageNum);
    getRecommender()
  }, []);

  const onChange = (data) => {
    setPageNum(data);
    getData(data)
  }

  return (
    <div className="min-h-[500px] flex flex-col justify-start items-center py-[10rem] mx-16">
      <Banner />
      <SideBanner />
      <div className="w-[70%] flex justify-center" id="flash_sale">
        <FlashSale data={recommender} />
      </div>
      <div className="w-[70%] flex flex-col items-center" id="powered_milk">
        {products != null ? (
          <>
            <ProductList
              data={products}
              cateList={milkCateList}
              title="Sữa Bột"
            />
            <Pagination
              showQuickJumper
              defaultCurrent={pageNum}
              total={total}
              onChange={onChange}
            />
          </>
        ) : (
          <div className="h-[500px] w-full font-bold flex justify-center items-center">
            Hiện chưa có sản phẩm
          </div>
        )}
      </div>
      <div className="w-[70%]" id="functional_food">
        {/* <ProductList data={dumbDataFF} cateList={ffCateList} title="Thực Phẩm Chức Năng" /> */}
      </div>
    </div>
  );
};

export default HomePage;
