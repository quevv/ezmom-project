import axios from "axios";

const axiosClient = (token) => {
  const client = axios.create({ baseURL: "https://baby-milk-api.azurewebsites.net/api" });
  client.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return client;
};

export default axiosClient;

export const axiosClientFile = (token) => {
  const client = axios.create({ baseURL: "https://baby-milk-api.azurewebsites.net/api" });
  client.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  });

  return client;
};
