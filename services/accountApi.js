import axiosClient from "./axiosClient"

export const accountApi = {
    getAccounts: () => {
        const url = `/Account`
        return axiosClient.get(url);
    },
    getAccount: (id) => {
        const url = `/Account` + id
        return axiosClient.get(url);
    }
}
