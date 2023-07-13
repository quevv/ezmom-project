"use client";
import React, { useEffect, useState } from "react";
import UserBabies from "./baby-components/user-babies";
import TakeCarePost from "./baby-components/take-care-post";
import moment from "moment";
import { productApi } from "@/services";
import CustomSwiper from "@/components/CustomSwiper";

const BabyContainer = () => {
  const [selectBaby, setSelectBaby] = useState();

  const [recommender, setRecommender] = useState([]);
  const getRecommender = async () => {
    if (selectBaby) {
      try {
        const res = (
          await productApi.getRecommender({
            month: ageCalculate(selectBaby),
            page: 1,
          })
        ).data;
        if (res.isSuccess) {
          setRecommender(res.result);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const ageCalculate = (data) => {
    const now = new Date();
    const yearAge =
      moment(now).utc().format("YYYY") - moment(data.dob).utc().format("YYYY");
    const monthAge =
      moment(now).utc().format("MM") -
      moment(data.dob).utc().format("MM") +
      12 * yearAge;
    return monthAge;
  };

  useEffect(() => {
    getRecommender();
  });

  const handleSelectData = (data) => {
    setSelectBaby(data);
  };
  return (
    <div className="flex flex-col justify-start items-center py-[12rem] mx-16">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <div className="w-full grid grid-cols-6 gap-5 border-b-4 pb-8 mb-8">
          <UserBabies onSelectBaby={handleSelectData} />
          <TakeCarePost data={selectBaby} />
        </div>
        {selectBaby ? (
          <CustomSwiper
            title={"Sản phẩm cho bé " + ageCalculate(selectBaby) + " tháng tuổi"}
            swiperData={recommender}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BabyContainer;
