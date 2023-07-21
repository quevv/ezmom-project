import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const accountApi = {
  getAccounts: async () => {
    const url = `/Account`;
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
  getAccount: (id) => {
    const url = `/Account` + id;
    return axiosClient(token).get(url);
  },
};
