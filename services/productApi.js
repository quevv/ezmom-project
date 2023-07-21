import { months } from "moment";
import axiosClient from "./axiosClient";
import axiosClientFile from "./axiosClient";
import { getCookieData } from "./cookies";

export const productApi = {
  getProducts: async (params) => {
    const url = `/Product?page=` + params;
    try {
      const response = await axiosClient().get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getAllProducts: async () => {
    const url = `/Product/GetAll`;
    if (getCookieData("account")) {
      const token = getCookieData("account");
      try {
        const response = await axiosClient(token).get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  getProduct: async (id) => {
    const url = `/Product/` + id;
    try {
      const response = await axiosClient().get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  addProduct: async (params) => {
    const url = `/Product`;
    if (getCookieData("account")) {
      const token = getCookieData("account");
      return await axiosClientFile(token)
        .post(url, params)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  getRecommender: async (params) => {
    const url = `/Recomender?month=` + params.month + `&page=` + params.page;
    try {
      const response = await axiosClient().get(url, params);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
