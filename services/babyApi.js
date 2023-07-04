import axiosClient from "./axiosClient"

export const babyApi = {
    getBaby: () => {
        const url = `/Baby`
        return axiosClient.get(url);
    },
    getBabyById: (id) => {
        const url = `/Baby/` + id;
        return axiosClient.get(url);
    },
    getBabyOfMom: (id) => {
        const url = `/Baby/GetBabyOfMom?momId=`+id;
        return axiosClient.get(url)
    },
    addBaby: (params) => {
        const url = '/Baby'
        return axiosClient.post(url, params)
    }
}
