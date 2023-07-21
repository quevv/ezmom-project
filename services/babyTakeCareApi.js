import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const babyTakeCareApi = {
  getPost: async () => {
    const token = getCookieData("account");
    const url = `/BabyTakeCare/`;
    try {
      const response = await axiosClient(token).get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getPostById: async (id) => {
    if (getCookieData("account")) {
      const token = getCookieData("account");
      const url = `/BabyTakeCare/` + id;
      try {
        const response = await axiosClient(token).get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  getPostByMonth: async (month) => {
    const token = getCookieData("account");
    const url = `/BabyTakeCare/GetPostByMonth?month=` + month;
    try {
      const response = await axiosClient(token).get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
