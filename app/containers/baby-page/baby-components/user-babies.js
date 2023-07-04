"use client";
import { babyApi } from "@/services/babyApi";
import { getCookieData } from "@/services/cookies";
import TokenDecode from "@/services/tokenDecode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BoyAvatar from "@/public/images/baby/boy_baby.png";
import GirlAvatar from "@/public/images/baby/girl_baby.png";
import moment from "moment";

const UserBabies = ({ onSelectBaby }) => {
  const [babies, setBabies] = useState();
  const [account, setAccount] = useState();
  const router = useRouter();

  const getBabies = async () => {
    if (account) {
      const res = (await babyApi.getBabyOfMom(account.accountId)).data;
      setBabies(res.result);
      onSelectBaby(res.result[0])
    }
  };
  useEffect(() => {
    getBabies();
  }, [account]);

  const handleSelectBaby = (data) => {onSelectBaby(data);};

  useEffect(() => {
    if (getCookieData("account")) {
      setAccount(TokenDecode(getCookieData("account")));
    } else {
      router.back();
    }
  }, []);

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
  return (
    <div className="col-span-2 ">
      {babies ? (
        <div className="rounded-lg bg-white shadow-md flex flex-col justify-center items-center p-3">
          <p className="text-2xl font-bold py-3">{account.name}</p>
          <Link
            className="bg-gray-300 py-1 px-3 rounded-lg hover:bg-gray-400 font-bold text-xs"
            href={`/profile`}
          >
            Thông tin tài khoản
          </Link>
          <p className="font-bold py-3">Thông tin bé nhà</p>
          <div className="w-full flex flex-col justify-center items-center">
            {babies.map((item) => (
              <div
                onClick={()=>{handleSelectBaby(item)}}
                key={item.babyId}
                className="flex justify-evenly items-center rounded-lg my-2 bg-pink-300 py-3 w-full hover:bg-pink-500 hover:text-white cursor-pointer active:bg-pink-400"
              >
                <div>
                  {item.gender == "female" ? (
                    <Image
                      className="rounded-full bg-white p-1"
                      src={GirlAvatar}
                      width={50}
                      height={50}
                      alt="Baby Avatar"
                    />
                  ) : (
                    <Image
                      className="rounded-full bg-white p-1"
                      src={BoyAvatar}
                      width={50}
                      height={50}
                      alt="Baby Avatar"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  <span>{ageCalculate(item)} Tháng tuổi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserBabies;
