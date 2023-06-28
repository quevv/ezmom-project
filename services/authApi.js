import axiosClient from "./axiosClient"

export const authApi = {
    login: (params) => {
        const url = `/Auth/Login`
        return axiosClient.post(url, params);
    },
    register: (params) => {
        const url = `/Auth/Register`
        return axiosClient.post(url, params);
    }
}
