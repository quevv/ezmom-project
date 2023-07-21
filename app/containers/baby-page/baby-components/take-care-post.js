"use client";
import { babyTakeCareApi } from "@/services/babyTakeCareApi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

const TakeCarePost = ({ data }) => {
  const [takeCarePost, setTakeCarePost] = useState("");

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

  const getPost = async () => {
    if (data) {
      const res = (await babyTakeCareApi.getPostByMonth(ageCalculate(data)))
        .data;
      setTakeCarePost(ReactHtmlParser(res.result));
    }
  };

  useEffect(() => {
    getPost();
  }, [data]);
  // console.log(data);
  return (
    <div className="col-span-4 px-3">
      {data ? (
        <div className=" flex flex-col justify-center items-center">
          <h4 className="font-bold">Bé: {data.name}</h4>
          <p className="text-2xl font-bold">Tư vấn chăm sóc cho bé</p>
          <div>{takeCarePost}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TakeCarePost;
