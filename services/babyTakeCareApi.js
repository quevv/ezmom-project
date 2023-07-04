import axiosClient from "./axiosClient"

export const babyTakeCareApi = {
    getPost: () => {
        const url = `/BabyTakeCare/`
        return axiosClient.get(url);
    },
    getPostById: (id) => {
        const url = `/BabyTakeCare/` + id;
        return axiosClient.get(url);
    },
    getPostByMonth: (month) => {
        const url = `/BabyTakeCare/GetPostByMonth?month=` + month;
        return axiosClient.get(url);
    },
}