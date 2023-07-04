"use client";
import { babyApi } from "@/services/babyApi";
import { getCookieData } from "@/services/cookies";
import TokenDecode from "@/services/tokenDecode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserBabies from "./baby-components/user-babies";
import TakeCarePost from "./baby-components/take-care-post";
import moment from "moment";

const BabyContainer = () => {
  const [selectBaby, setSelectBaby] = useState();

  const handleSelectData = (data) => {
    setSelectBaby(data)
  }
  return (
    <div className="flex flex-col justify-start items-center py-[12rem] mx-16">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <div className="w-full grid grid-cols-6 gap-5">
          <UserBabies onSelectBaby={handleSelectData}  />
          <TakeCarePost data={selectBaby}/>
        </div>
      </div>
    </div>
  );
};

export default BabyContainer;


  // const [babies, setBabies] = useState(null);
  // const [account, setAccount] = useState();
  // const router = useRouter();
  // const AgeCalculate = ({ data }) => {
  //   const now = new Date();
  //   const yearAge =
  //     moment(now).utc().format("YYYY") - moment(data.dob).utc().format("YYYY");
  //   const monthAge =
  //     moment(now).utc().format("MM") -
  //     moment(data.dob).utc().format("MM") +
  //     12 * yearAge;
  //   // console.log(monthAge);
  //   return monthAge;
  // };
  // useEffect(() => {
  //   if (getCookieData("account")) {
  //     setAccount(TokenDecode(getCookieData("account")));
  //   } else {
  //     router.back();
  //   }
  // }, []);
  // const getBabies = async () => {
  //   if (account) {
  //     const res = (await babyApi.getBabyOfMom(account.accountId)).data;
  //     setBabies(res.result);
  //   }
  // };

  // useEffect(() => {
  //   getBabies();
  // }, [account]);

