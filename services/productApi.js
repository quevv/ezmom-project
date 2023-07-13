import { months } from "moment";
import axiosClient from "./axiosClient"

export const productApi = {
    getProducts: (params) => {
        const url = `/Product?page=`+params
        return axiosClient.get(url);
    },
    getProduct: (id) => {
        const url = `/Product/` + id
        return axiosClient.get(url);
    },
    getRecommender: (params) => {
        const url = `/Recomender`
        return axiosClient.get(url, params);
    }
}
