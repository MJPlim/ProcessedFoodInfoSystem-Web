import axios from "axios";
const api = axios.create({
    baseURL: "http://13.124.55.59:8080/",
});

export const foodApi = {//해당 url로 가는 함수들
    search: (term) =>
        api.get("/api/v1/food/findFood/foodName", {
            params: {
                foodName:term
            }
        })
};

export const bsshApi = {//해당 url로 가는 함수들
    search: (term) =>
        api.get("/api/v1/food/findFood/manufacturerName", {
            params: {
                manufacturerName: term
            }
        })
};

export const foodDetailApi = {//해당 url로 가는 함수들
    search: (term) =>
        api.get("/api/v1/food/findFood/foodDetail", {
            params: {
                foodId: term
            }
        })
};

export const findPasswordApi = {//해당 url로 가는 함수들
    postEmail: (email) =>
        api.post("/find-password", {
              email:email
        })
};

export const getAdvertisementFoodApi = {
    getAdFood: () =>
        api.get("/api/v1/advertisement/ads")

}