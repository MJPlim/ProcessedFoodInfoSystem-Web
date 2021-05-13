import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.124.55.59:8080/',
});

export const foodApi = {
  //해당 url로 가는 함수들
  search: (term) =>
    api.get('/api/v1/food/findFood/foodName', {
      params: {
        foodName: term,
      },
    }),
};

export const bsshApi = {
  //해당 url로 가는 함수들
  search: (term) =>
    api.get('/api/v1/food/findFood/manufacturerName', {
      params: {
        manufacturerName: term,
      },
    }),
};

export const foodDetailApi = {
  //해당 url로 가는 함수들
  search: (term) =>
    api.get('/api/v1/food/findFood/foodDetail', {
      params: {
        foodId: term,
      },
    }),
};

export const adFoodDetailApi = {
  //해당 url로 가는 함수들
  search: (term) =>
    api.get('/api/v1/advertisement/foodDetail', {
      params: {
        adId: term,
      },
    }),
};

export const findPasswordApi = {
  //해당 url로 가는 함수들
  postEmail: (email) =>
    api.post('/find-password', {
      email: email,
    }),
};

export const getAdvertisementFoodApi = {
  getAdFood: () => api.get('/api/v1/advertisement/ads'),
};

export const postReviewApi = {
  //해당 url로 가는 함수들
  postReview: (review) =>
    api.post(
      '/api/v1/user/createReview',
      {
        foodId: review.foodId,
        reviewDescription: review.reviewDescription,
        reviewRating: review.reviewRating,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const editReviewApi = {
  //해당 url로 가는 함수들
  editReview: (review) =>
    api.post(
      '/api/v1/user/updateReview',
      {
        reviewId: review.reviewId,
        reviewDescription: review.reviewDescription,
        reviewRating: review.reviewRating,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const deleteReviewApi = {
  //해당 url로 가는 함수들
  deleteReview: (review) =>
    api.post(
      '/api/v1/user/deleteReview',
      {
        reviewId: review.reviewId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const getReviewsByFoodId = {
  getReviews: (foodId, pageNum) =>
    api.get('/readReview', {
      params: {
        foodId: foodId,
        pageNum: pageNum,
      },
    }),
};
export const getReviewsByFoodIdWithLogin = {
  getReviews: (foodId, pageNum) =>
    api.get('/api/v1/user/readReview', {
      params: {
        foodId: foodId,
        pageNum: pageNum,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const addFavoriteApi = {
  //해당 url로 가는 함수들
  addFavorite: (foodId) =>
    api.post(
      '/api/v1/user/favorite/addFavorite',
      {},
      {
        params: {
          foodId: foodId,
        },
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const deleteFavoriteApi = {
  //해당 url로 가는 함수들
  deleteFavorite: (foodId) =>
    api.delete('/api/v1/user/favorite/deleteFavorite', {
      params: {
        foodId: foodId,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const checkFavoriteApi = {
  checkFavorite: (foodId) =>
    api.get('/api/v1/user/favorite/checkFavorite', {
      params: {
        foodId: foodId,
      },
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const favouriteApi = {
  myFavourite: () =>
    api.get('api/v1/user/favorite/list', {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    }),
};

export const reviewLikeApi = {
  //해당 url로 가는 함수들
  updateLike: (review) =>
    api.post(
      '/api/v1/user/updateReviewLike',
      {
        likeCheck: review.userLikeCheck,
        reviewId: review.reviewId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      },
    ),
};

export const sortApi = {
  sortBy: (foodName, sort) =>
    api.get('api/v1/food/getFoodListBySorting', {
      params: {
        foodName: foodName,
        pageNo: 1,
        size: 10,
        sort: sort,
      },
    }),
};
export const categoryApi = {
  category: (category) =>
    api.get('/api/v1/food/list/category', {
      params: {
        category: category,
        pageNo: 1,
        size: 10,
      },
    }),
};

export const getReviewRankingApi = {
    getReviewRanking: () => api.get('/reviewRanking')
};