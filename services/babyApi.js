import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const babyApi = {
  getBaby: async () => {
    const url = `/Baby`;
    try {
      const response = await axiosClient().get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getBabyById: async (id) => {
    const url = `/Baby/` + id;
    try {
      const response = await axiosClient().get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getBabyOfMom: async (id) => {
    if (getCookieData("account")) {
      const tToken = getCookieData("account");
      const url = `/Baby/GetBabyOfMom?momId=` + id;

      return await axiosClient(tToken)
        .get(url)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  addBaby: async (params) => {
    const url = "/Baby";
    if (getCookieData("account")) {
      const tToken = getCookieData("account");
      try {
        const response = await axiosClient(tToken)
          .post(url, params)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.error(error);
          });
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },

  deleteBaby: async (params) => {
    const url = "/Baby";
    console.log(params);
    // if (getCookieData("account")) {
    //   const tToken = getCookieData("account");
    //   try {
    //     const response = await axiosClient(tToken)
    //       .delete(url, params.id)
    //       .then((response) => {
    //         return response;
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //     return response;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  },
};
