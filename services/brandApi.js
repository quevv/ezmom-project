import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const brandApi = {
  getBrands: async () => {
    const url = "/Brand";
    if (getCookieData("account")) {
      const token = getCookieData("account");
      return await axiosClient(token)
        .get(url)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  getMilestones: async () => {
    const url = "/MilestonesByMonth";
    if (getCookieData("account")) {
      const token = getCookieData("account");
      return await axiosClient(token)
        .get(url)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
};
