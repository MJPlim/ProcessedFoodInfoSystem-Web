import axios from "axios";
const api = axios.create({
    baseURL: "http://13.124.55.59:8080/",
});

export const foodApi = {//해당 url로 가는 함수들
    search: (term,no) =>
        api.get("api/v1/food/findFood/foodName", {
            params: {
                foodName:term,
                pageNo:no
            }
        })
};

export const bsshApi = {//해당 url로 가는 함수들
    search: (term,no) =>
        api.get("api/v1/food/findFood/bsshName", {
            params: {
                bsshName: term,
                pageNo:no
            }
        })
};