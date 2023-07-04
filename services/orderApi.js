import axiosClient from "./axiosClient"

export const orderApi = {
    getOrders: () => {
        const url = `/Order`
        return axiosClient.get(url);
    },
    getOrder: (id) => {
        const url = `/Order` + id
        return axiosClient.get(url);
    },
    getOrderOfUser: (userId) => {
        const url = "/Order/GetOrderOfUser?userId=" + userId;
        return axiosClient.get(url)
    },
    addOrder: (params) => {
        const url = "/Order"
        return axiosClient.post(url, params)
    },
    addOrderDetails: (params) => {
        const url = "/OrderDetail"
        return axiosClient.post(url, params)
    }
}
