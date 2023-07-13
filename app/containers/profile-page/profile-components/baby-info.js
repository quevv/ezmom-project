import React from "react";
import BoyAvatar from "@/public/images/baby/boy_baby.png";
import GirlAvatar from "@/public/images/baby/girl_baby.png";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const BabyInfo = ({ data }) => {
  const AgeCalculate = ({ data }) => {
    const now = new Date();
    const yearAge =
      moment(now).utc().format("YYYY") - moment(data.dob).utc().format("YYYY");
    const monthAge =
      moment(now).utc().format("MM") -
      moment(data.dob).utc().format("MM") +
      12 * yearAge;
    // console.log(monthAge);
    return yearAge + " Tuổi" + " (" + monthAge + " Tháng)";
  };
  if (data) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        {data.map((item) => (
          <Link
            href={`/baby`}
            key={item.babyId}
            className="flex justify-start items-center rounded-lg my-2 bg-pink-300 py-3 w-full hover:bg-pink-500 hover:text-white cursor-pointer active:bg-pink-400"
          >
            <div>
              {item.gender == "female" ? (
                <Image
                  className="rounded-full bg-white p-1 mx-6"
                  src={GirlAvatar}
                  width={50}
                  height={50}
                  alt="Baby Avatar"
                />
              ) : (
                <Image
                  className="rounded-full bg-white p-1 mx-6"
                  src={BoyAvatar}
                  width={50}
                  height={50}
                  alt="Baby Avatar"
                />
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-bold">{item.name}</span>
              <span>
                <AgeCalculate data={item} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default BabyInfo;
