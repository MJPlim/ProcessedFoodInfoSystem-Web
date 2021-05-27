import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import '../../Components/Food/FoodDetail.scss';
import {
  addFavoriteApi,
  adFoodDetailApi,
  checkFavoriteApi,
  deleteFavoriteApi,
  deleteReviewApi,
  editReviewApi,
  foodDetailApi,
  getReviewsByFoodId,
  getReviewsByFoodIdWithLogin,
  postReviewApi,
  reviewLikeApi,
} from '../../api';
import FoodDetailTitle from '../../Components/Food/FoodDetailTitle';
import FoodInfo from '../../Components/Food/FoodInfo';
import FoodReview from '../../Components/Food/FoodReview';

const FoodDetail = (props) => {
    const foodId = props.match.params.id;

    const [food, setFood] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [reviewSummary, setReviewSummary] = useState(null);
    const [foodLoading, setFoodLoading] = useState(false);
    const [foodError, setFoodError] = useState(null);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [favoriteError, setFavoriteError] = useState(null);
    const [editTargetReview, setEditTargetReview] = useState({
      reviewId: -1,
      reviewDescription: null,
      reviewRating: 0,
    });
    const [review, setReview] = useState({
      foodId: foodId,
      reviewDescription: null,
      reviewRating: 0,
    });
    const [isLogin, setIsLogin] = useState(localStorage.getItem('authorization') !== 'null');
    const [isFavorite, setIsFavorite] = useState(null);


    const onMoveToLink = () => {
      let link =
        `https://search.shopping.naver.com/search/all?query=` + food.foodName;
      window.open(link, '_blank');
    };

    const onMoveToNews = () => {
      let link =
        'https://search.naver.com/search.naver?query=' + food.manufacturerName.split('_')[0] + '&where=news';
      console.log(link);
      window.open(link, '_blank');
    };

    const fetchReview = async () => {
      try {

        setReviewsError(null);
        setReviews(null);
        // loading 상태를 true 로 바꿉니다.
        setReviewsLoading(true);

        console.log('리뷰 불러오기');

        if (isLogin) {
          console.log('로그인 리뷰');
          const response = await getReviewsByFoodIdWithLogin.getReviews(foodId, 1);
          setReviews(response.data.readReviewResponse);
          setReviewSummary(response.data.readSummaryResponse);
        } else {
          console.log('비로그인 리뷰');
          const response = await getReviewsByFoodId.getReviews(foodId, 1);
          setReviews(response.data.readReviewResponse);
          setReviewSummary(response.data.readSummaryResponse);
        }


      } catch (e) {
        console.log('리뷰에러', e.response);
        setReviewsError(e);
      }
      setReviewsLoading(false);

    };


    const onClickFavoriteButton = async () => {
      if (!isFavorite) {
        await addFavoriteApi.addFavorite(foodId).then(async () => {
            setIsFavorite(!isFavorite);
          },
        ).catch(e => {
          alert('즐겨찾기 등록 실패. 다시 시도 해주세요.');
        });
      } else if (isFavorite) {
        await deleteFavoriteApi.deleteFavorite(foodId).then(async () => {
            setIsFavorite(!isFavorite);
          },
        ).catch(e => {
          alert('즐겨찾기 해제 실패. 다시 시도 해주세요.');
        });
      }

    };

    const onClickEditReview = (review) => {
      setEditTargetReview({
        reviewId: -1,
        reviewDescription: null,
        reviewRating: 0,
      });
      setEditTargetReview({
        ...editTargetReview,
        reviewId: review.reviewId,
        reviewDescription: review.reviewDescription,
      });
      console.log(editTargetReview);
    };

    const onClickDeleteReview = (review) => {
      console.log(review);
      if (window.confirm('정말 삭제 하시겠습니까?')) {
        deleteReviewApi.deleteReview(review).then(async () => {
            alert('리뷰 삭제');
            window.location.reload(true);

          },
        ).catch(e => {
          console.log(e.response);
        });
      } else {
      }
    };
    const onClickReviewLikeButton = async (targetReview) => {
      await reviewLikeApi.updateLike(targetReview).then(async () => {
        setReviews(
          reviews.map(review =>
            review.reviewId === targetReview.reviewId ? (
                review.userLikeCheck === false ?
                  ({ ...review, userLikeCheck: !review.userLikeCheck, likeCount: review.likeCount + 1 })
                  : { ...review, userLikeCheck: !review.userLikeCheck, likeCount: review.likeCount - 1 })
              : review,
          ),
        );
      }).catch(e => {
        console.log('좋아요 에러', e);
      });
    };

    const onClickPage = async (pageNum) => {
      console.log('페이징 클릭 ');
      if (isLogin) {
        console.log('페이징 로그인 리뷰');
        setReviewsLoading(true);
        const response = await getReviewsByFoodIdWithLogin.getReviews(foodId, pageNum.selected + 1);
        setReviewsLoading(false);
        setReviews(response.data.readReviewResponse);
      } else {
        console.log('페이징 비로그인 리뷰');
        setReviewsLoading(true);
        const response = await getReviewsByFoodId.getReviews(foodId, pageNum.selected + 1);
        setReviewsLoading(false);
        setReviews(response.data.readReviewResponse);
      }
    };


    const onClickPostReview = (e) => {
      console.log(e);
      e.preventDefault();
      if (!isLogin) {
        alert('로그인을 해주세요');
      } else if (review.reviewRating === 0) {
        alert('별점을 입력해주세요');
      } else if (review.reviewDescription === undefined || review.reviewDescription === null || review.reviewDescription.length === 0) {
        alert('후기 내용을 작성해주세요');
      } else if (review.reviewDescription.length >= 500) {
        alert('500자 이하로 작성해주세요.');
      } else {
        postReviewApi.postReview(review).then(async () => {
            alert('리뷰 작성 완료');
            e.target.reset();
            window.location.reload(true);
          },
        ).catch(e => {

          console.log(e.response.data['error-message']);
          alert(e.response.data['error-message']);
        });
      }

    };
    const onClickPostEditReview = (targetReview) => {
      console.log(targetReview);

      if (targetReview.reviewRating === 0) {
        alert('별점을 입력해주세요');
      } else if (targetReview.reviewDescription === undefined || targetReview.reviewDescription === null || targetReview.reviewDescription.length === 0) {
        alert('후기 내용을 작성해주세요');
      } else if (targetReview.reviewDescription.length >= 500) {
        alert('500자 이하로 작성해주세요.');
      } else {
        editReviewApi.editReview(editTargetReview).then(async () => {

          setReviews(
            reviews.map(review =>
              review.reviewId === targetReview.reviewId ? (
                  {
                    ...review,
                    reviewDescription: targetReview.reviewDescription,
                    reviewRating: targetReview.reviewRating,
                  }
                )
                : review,
            ),
          );
          setEditTargetReview({
            reviewId: -1,
            reviewDescription: null,
            reviewRating: 0,
          });
          alert('리뷰가 수정되었습니다.');
        }).catch(e => {
          console.log('리뷰 수정 에러', e);
        });
      }

    };


    const ratingChanged = (newRating) => {
      setReview({
        ...review,
        reviewRating: newRating,
      });
    };

    const editRatingChanged = (newRating) => {
      setEditTargetReview({
        ...editTargetReview,
        reviewRating: newRating,
      });
    };

    const onChangeEditReview = (e) => {
      setEditTargetReview({
        ...editTargetReview,
        reviewDescription: e.target.value,
      });
    };
    const onChangeReview = (e) => {
      setReview({ ...review, reviewDescription: e.target.value });
    };
    const onChangeEditCancel = () => {
      setEditTargetReview({
        reviewId: -1,
        reviewDescription: null,
        reviewRating: 0,
      });
    };


    useEffect(() => {
      setIsLogin(localStorage.getItem('authorization') !== 'null');
      console.log(localStorage.getItem('authorization'));

      const fetchFood = async () => {
        try {
          setFoodError(null);
          setFood(null);
          // loading 상태를 true 로 바꿉니다.
          setFoodLoading(true);

          console.log('일반 식품');
          const response = await foodDetailApi.search(foodId);
          setFood(response.data);
        } catch (e) {
          setFoodError(e);
        }
        setFoodLoading(false);

      };

      const fetchADFood = async () => {
        try {

          setFoodError(null);
          setFood(null);
          // loading 상태를 true 로 바꿉니다.
          setFoodLoading(true);

          console.log('광고 식품');

          const response = await adFoodDetailApi.search(props.location.state.adId);
          setFood(response.data);
        } catch (e) {
          setFoodError(e);
        }
        setFoodLoading(false);

      };

      const checkFavorite = async () => {
        try {

          setFavoriteError(null);
          setIsFavorite(null);
          // loading 상태를 true 로 바꿉니다.
          setFavoriteLoading(true);

          const response = await checkFavoriteApi.checkFavorite(foodId);
          setIsFavorite(response.data);
          console.log('isFavorite', isFavorite);
        } catch (e) {
          setFavoriteError(e);
        }
        setFavoriteLoading(false);

      };
      fetchReview();
      if (isLogin) {
        checkFavorite();
      }


      if (props.location.state !== undefined) {
        fetchADFood();
      } else {
        fetchFood();
      }
      console.log(reviews);

    }, []);

    if (foodLoading) return <div>로딩중..</div>;
    if (foodError) return <div>에러가 발생했습니다</div>;
    if (!food) return null;

    return (
      <div className='FoodDetail'>
        {/* 타이틀 영역 시작*/}
        <FoodDetailTitle food={food} isLogin={isLogin} isFavorite={isFavorite} onMoveToLink={() => onMoveToLink()}
                         onMoveToNews={() => onMoveToNews()} onClickFavoriteButton={() => onClickFavoriteButton()} />

        <hr className='hr' />
        {/* 타이틀 영역 끝 */}
        <Row>
          {/*상품 정보 좌측 영역 시작 */}
          <Col lg='6' className='rightBorderLine'>
            <FoodInfo food={food} />
          </Col>
          {/*상품 정보 좌측 영역 끝 */}


          {/*상품 정보 우측 영역 시작 */}
          <Col lg='6' className='reviewArea'>
            <FoodReview foodId={foodId} isLogin={isLogin} reviews={reviews} reviewSummary={reviewSummary}
                        editTargetReview={editTargetReview} onClickEditReview={(review) => onClickEditReview(review)}
                        onClickDeleteReview={(review) => onClickDeleteReview(review)}
                        onClickReviewLikeButton={(targetReview) => onClickReviewLikeButton(targetReview)}
                        onClickPage={(pageNum) => onClickPage(pageNum)}
                        onClickPostReview={(e) => onClickPostReview(e)}
                        onClickPostEditReview={(editTargetReview) => onClickPostEditReview(editTargetReview)}
                        ratingChanged={(newRating) => ratingChanged(newRating)}
                        editRatingChanged={(newRating) => editRatingChanged(newRating)}
                        onChangeEditReview={(e) => onChangeEditReview(e)}
                        onChangeEditCancel={() => onChangeEditCancel()} onChangeReview={(e) => onChangeReview(e)} />
          </Col>
        </Row>
      </div>
    );
  }
;

export default React.memo(FoodDetail);