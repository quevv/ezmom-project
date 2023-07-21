import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const orderApi = {
  getOrders: async () => {
    if (getCookieData("account")) {
      const tToken = getCookieData("account");
      const url = `/Order`;
      try {
        const response = await axiosClient(tToken).get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  getOrder: (id) => {
    const url = `/Order` + id;
    return axiosClient.get(url);
  },
  getOrderOfUser: async (userId) => {
    if (getCookieData("account")) {
      const tToken = getCookieData("account");
      const url = "/Order/GetOrderOfUser?userId=" + userId;
      try {
        const response = await axiosClient(tToken).get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  addOrder: async (params) => {
    const url = "/Order";
    if (getCookieData("account")) {
      const tToken = getCookieData("account");
      try {
        const response = await axiosClient(tToken).post(url, params);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  modifyOrder: async (params) => {
    if (getCookieData("account")) {
      const token = getCookieData("account");
      const url = "/Order/" + params.orderId;
      try {
        const response = await axiosClient(token).put(url, params.data);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  addOrderDetails: async (params) => {
    const url = "/OrderDetail";
    if (getCookieData("account")) {
      const token = getCookieData("account");
      try {
        const response = await axiosClient(token).post(url, params);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  getOrderDetails: async (id) => {
    const url = "/OrderDetail/GetByOrderId?orderId=" + id;
    if (getCookieData("account")) {
      const token = getCookieData("account");
      try {
        const response = await axiosClient(token)
          .get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
