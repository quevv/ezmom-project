import axiosClient from "./axiosClient";

export const authApi = {
  jwtLogin: async (params) => {
    const url = `/AuthJWT/Login`;
    try {
      const response = await axiosClient()
        .post(url, params);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  jwtRegister: async (params) => {
    const url = `/AuthJWT/Register`;
    try {
      const response = await axiosClient()
        .post(url, params);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
