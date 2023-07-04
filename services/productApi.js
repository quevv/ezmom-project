import axiosClient from "./axiosClient"

export const productApi = {
    getProducts: (params) => {
        const url = `/Product`
        return axiosClient.get(url,params);
    },
    getProduct: (id) => {
        const url = `/Product/` + id
        return axiosClient.get(url);
    },
}
