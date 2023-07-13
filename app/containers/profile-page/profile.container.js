"use client";
import React, { useEffect, useState } from "react";
import { getCookieData, removeCookieData } from "@/services/cookies";
import OrderStatus from "./profile-components/order-status";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { babyApi } from "@/services/babyApi";
import BabyInfo from "./profile-components/baby-info";
import AddBaby from "./profile-components/add-baby";
import TokenDecode from "@/services/tokenDecode";

const ProfileContainer = () => {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [baby, setBaby] = useState([]);
  const [rightSide, setRightSide] = useState("order");

  const HandleRightSide = ({data}) => {
    if (rightSide == "order") {
      return <OrderStatus data={account?account.accountId:0}/>;
    } else if (rightSide == "userInfo") {
      return <div>User info</div>;
    } else return <AddBaby />;
  };

  const HandleAddBaby = () => {
    setRightSide('addBaby')
  }
  const getBaby = async (id) => {
    const res = (await babyApi.getBabyOfMom(id)).data;
    setBaby(res.result);
  };

  useEffect(() => {
    if (getCookieData("account")) {
      setAccount(TokenDecode(getCookieData("account")));
    } else {
      setTimeout(() => {
        router.push(`/`);
      }, 0);
    }
  }, []);
  useEffect(() => {
    if (account) getBaby(account.accountId);
  }, [account]);

  const handleLogOut = () => {
    if (!getCookieData("account") == false) {
      removeCookieData("account");
      localStorage.removeItem("cart");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-[12rem] mx-16">
      <div className="grid grid-cols-5 gap-4 w-[80%]">
        <div className="h-fit col-span-2 border-gray-400 border-2 rounded-lg py-4 px-14 flex flex-col justify-center items-center">
          <Avatar className="my-4" size={100} icon={<UserOutlined />} />
          {account ? (
            <div className="font-bold text-2xl">{account.name}</div>
          ) : (
            <>User</>
          )}
          {account ? (
            <div className="text-lg">
              {/* {account.phoneNumber} */}
            </div>
          ) : (
            <> - Phone Number</>
          )}
          <span className="font-bold my-2">Baby</span>
          {baby.length == 0 ? (
            <span className="text-pink-500 mb-3">
              Người dùng tạm thời chưa nhập thông tin bé nhà. Nếu có thể hãy
              cung cấp cho chúng tôi những thông tin về bé nhà để cùng theo dõi
              sự phát triển của bé nhé.
            </span>
          ) : (
            <BabyInfo data={baby} />
          )}

          <button onClick={HandleAddBaby} className="rounded-lg bg-pink-500 text-white active:bg-pink-400 p-2">
            Thêm Bé
          </button>
        </div>
        <div className="col-span-3 border-2 border-gray-400 rounded-lg h-fit">
          <HandleRightSide />
        </div>
      </div>
      <div className="flex justify-center w-full mt-12">
        <button
          onClick={handleLogOut}
          className="rounded-lg bg-pink-400 hover:bg-pink-700 p-3 text-white"
        >
          Đăng Xuất
        </button>
      </div>
    </div>
  );
};

export default ProfileContainer;
