import axiosClient from "./axiosClient"

export const productApi = {
    getProducts: () => {
        const url = `/Product`
        return axiosClient.get(url);
    },
    getProduct: (id) => {
        const url = `/Product/` + id
        return axiosClient.get(url);
    },
}
