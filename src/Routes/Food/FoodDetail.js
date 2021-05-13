import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Label, Row, Spinner, Table} from "reactstrap";
import "./FoodDetail.scss"
import ReactStars from "react-rating-stars-component";
import {
    addFavoriteApi,
    adFoodDetailApi,
    checkFavoriteApi, deleteFavoriteApi, deleteReviewApi, editReviewApi,
    foodDetailApi,
    getReviewsByFoodId,
    getReviewsByFoodIdWithLogin,
    postReviewApi, reviewLikeApi
} from "../../api";
import ReactPaginate from 'react-paginate';
import {
    AiFillDelete,
    AiFillEdit,
    AiFillStar,
    AiOutlineStar,
    FcCancel, GiCancel,
    IoMdHeart,
    IoMdHeartEmpty
} from "react-icons/all";


const FoodDetail = (props) => {
        const foodId = props.match.params.id

        const [food, setFood] = useState(null);
        const [review, setReview] = useState({
            foodId: foodId,
            reviewDescription: null,
            reviewRating: 0
        })
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
            reviewRating: 0
        });

        const [isLogin, setIsLogin] = useState(localStorage.getItem('authorization') !== 'null');

        const [isFavorite, setIsFavorite] = useState(null);


        const ratingChanged = (newRating) => {
            setReview({
                ...review,
                reviewRating: newRating
            })
        };

        const editRatingChanged = (newRating) => {
            setEditTargetReview({
                ...editTargetReview,
                reviewRating: newRating
            })
        };


        const onMoveToLink = () => {
            let link =
                `https://search.shopping.naver.com/search/all?query=` + food.foodName;
            window.open(link, "_blank");
        };

        const onMoveToNews = () => {
            let link =
                'https://search.naver.com/search.naver?query=' + food.manufacturerName.split('_')[0] + '&where=news'
            console.log(link);
            window.open(link, "_blank");
        };

        const fetchReview = async () => {
            try {

                setReviewsError(null);
                setReviews(null);
                // loading 상태를 true 로 바꿉니다.
                setReviewsLoading(true);

                console.log("리뷰 불러오기")

                if (isLogin) {
                    console.log('로그인 리뷰')
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


        const onClickPostReview = (e) => {
            console.log(e)
            e.preventDefault();
            if (!isLogin) {
                alert('로그인을 해주세요')
            } else if (review.reviewRating === 0) {
                alert('별점을 입력해주세요');
            } else if (review.reviewDescription === undefined || review.reviewDescription === null || review.reviewDescription.length === 0) {
                alert('후기 내용을 작성해주세요');
            } else if (review.reviewDescription.length >= 500) {
                alert('500자 이하로 작성해주세요.');
            } else {
                postReviewApi.postReview(review).then(async () => {
                        alert('리뷰 작성 완료')
                        e.target.reset();
                        window.location.reload(true);
                    }
                ).catch(e => {

                    console.log(e.response.data['error-message']);
                    alert(e.response.data['error-message']);
                });
            }

        }
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
                                        reviewRating: targetReview.reviewRating
                                    }
                                )
                                : review
                        )
                    )
                    setEditTargetReview({
                        reviewId: -1,
                        reviewDescription: null,
                        reviewRating: 0
                    });
                    alert("리뷰가 수정되었습니다.");
                }).catch(e => {
                    console.log("리뷰 수정 에러", e);
                })
            }

        };

        const onClickEditReview = (review) => {
            setEditTargetReview({
                reviewId: -1,
                reviewDescription: null,
                reviewRating: 0
            });
            setEditTargetReview({
                ...editTargetReview,
                reviewId: review.reviewId,
                reviewDescription: review.reviewDescription
            });
            console.log(editTargetReview);
        }

        const onClickDeleteReview = (review) => {
            console.log(review)
            if (window.confirm('정말 삭제 하시겠습니까?')) {
                deleteReviewApi.deleteReview(review).then(async () => {
                        alert('리뷰 삭제')
                        window.location.reload(true);

                    }
                ).catch(e => {
                    console.log(e.response);
                });
            } else {
            }
        }
        const onClickReviewLikeButton = async (targetReview) => {
            await reviewLikeApi.updateLike(targetReview).then(async () => {
                setReviews(
                    reviews.map(review =>
                        review.reviewId === targetReview.reviewId ? (
                                review.userLikeCheck === false ?
                                    ({...review, userLikeCheck: !review.userLikeCheck, likeCount: review.likeCount + 1})
                                    : {...review, userLikeCheck: !review.userLikeCheck, likeCount: review.likeCount - 1})
                            : review
                    )
                )
            }).catch(e => {
                console.log('좋아요 에러', e);
            });
        }

        const onClickPage = async (pageNum) => {
            console.log('페이징 클릭 ')
            if (isLogin) {
                console.log('페이징 로그인 리뷰')
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
        }

        const onClickFavoriteButton = async () => {
            if (!isFavorite) {
                await addFavoriteApi.addFavorite(foodId).then(async () => {
                        setIsFavorite(!isFavorite);
                    }
                ).catch(e => {
                    alert('즐겨찾기 등록 실패. 다시 시도 해주세요.')
                })
            } else if (isFavorite) {
                await deleteFavoriteApi.deleteFavorite(foodId).then(async () => {
                        setIsFavorite(!isFavorite);
                    }
                ).catch(e => {
                    alert('즐겨찾기 해제 실패. 다시 시도 해주세요.')
                })
            }

        }


        const drawStar = (rating) => {
            switch (rating) {
                case 5:
                    return '★★★★★';
                case 4:
                    return '★★★★☆';
                case 3:
                    return '★★★☆☆';
                case 2:
                    return '★★☆☆☆';
                case 1:
                    return '★☆☆☆☆';

            }
        }

        useEffect(() => {
            setIsLogin(localStorage.getItem('authorization') !== 'null');
            console.log(localStorage.getItem('authorization'))

            const fetchFood = async () => {
                try {
                    setFoodError(null);
                    setFood(null);
                    // loading 상태를 true 로 바꿉니다.
                    setFoodLoading(true);

                    console.log("일반 식품")
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

                    console.log("광고 식품")

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
            <div className="FoodDetail">
                {/*<Container>*/}
                {/* 타이틀 영역 시작*/}
                <Row className="titleArea">
                    <Col md="7">
                        <p className="title">상품정보</p>
                    </Col>
                    <Col md="5">
                        <Button className="linkButton" onClick={onMoveToLink}>
                            상품 구매하러 가기
                        </Button>
                        {food.manufacturerName.split('_')[0] !== '알수없음' ?
                            <Button className="newsButton" onClick={onMoveToNews}>
                                제조사 뉴스
                            </Button> : null}
                        {isLogin ? <Button className="favoriteButton" onClick={onClickFavoriteButton}>
                            {!isFavorite ? <AiOutlineStar size={'1.3em'}/> : <AiFillStar size={'1.3em'}/>}
                        </Button> : null}


                    </Col>
                </Row>

                <hr className="hr"/>
                {/* 타이틀 영역 끝 */}

                <Row>
                    {/*상품 정보 좌측 영역 시작 */}
                    <Col lg="6" className="rightBorderLine">
                        {/*상품 정보 좌측 상단 영역(이미지, 식품 이름 등) 시작 */}
                        <Row className="bottomBorderLine">
                            <img src={food.foodImageAddress} alt="이미지 없음" width="300" height="300"/>
                            <img src={food.foodMeteImageAddress} alt="이미지 없음" width="300" height="300"/>
                            <Table>
                                <tr>
                                    <th>
                                        상품명
                                    </th>
                                    <td>
                                        {food.foodName}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        제조사
                                    </th>
                                    <td>
                                        {food.manufacturerName.split('_')[0]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        카테고리
                                    </th>
                                    <td>
                                        {food.category.split('_')[0]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        알레르기 성분
                                    </th>
                                    <td>
                                        {food.allergyMaterials.split('_')[0]}
                                    </td>
                                </tr>
                            </Table>
                        </Row>
                        {/*상품 정보 좌측 상단 영역 끝 */}

                        {/*상품 정보 좌측 하단 영역 시작 */}
                        <hr className="hr"/>
                        <Row className="foodInfo">
                            <Col sm="6">
                                <p className="subTitle">성분</p>
                                {food.nutrient}
                            </Col>
                            <Col sm="6">
                                <p className="subTitle">원료</p>
                                {food.materials}
                            </Col>
                        </Row>
                        {/*상품 정보 좌측 하단 영역 끝 */}

                    </Col>
                    {/*상품 정보 좌측 영역 끝 */}


                    {/*상품 정보 우측 영역 시작 */}
                    {reviews !== null && reviewSummary !== null ? (
                        <Col lg="6">
                            <Row>
                                <Col>
                                    리뷰 수 <span className="subTitle">{reviewSummary.reviewCount}   </span>
                                    사용자 총 평점 <span className="subTitle">{reviewSummary.avgRating}/5</span>
                                </Col>
                            </Row>

                            <Table className="reviewTable">
                                <thead>
                                <tr>
                                    <th width={"15%"}>별점</th>
                                    <th width={"10%"}>작성자</th>
                                    <th width={"25%"}>내용</th>
                                    <th width={"15%"}>작성일</th>
                                    <th width={"10%"}>좋아요</th>
                                    {isLogin === true ?
                                        <th width={"10%"}/>
                                        : null}
                                </tr>
                                </thead>
                                <tbody>
                                {reviews.map((review, index) => (
                                    review.reviewId === editTargetReview.reviewId ? (
                                        <tr key={index}>
                                            <td colSpan={1}>
                                                <ReactStars
                                                    count={5}
                                                    onChange={editRatingChanged}
                                                    size={15}
                                                    activeColor="#ffd700"
                                                    isHalf={false}
                                                    edit={true}/>
                                            </td>
                                            <td colSpan={4}>
                                                <Input type="textarea" name="text" classname="reviewFrom" rows="4"
                                                       value={editTargetReview.reviewDescription}
                                                       onChange={(e) => {
                                                           setEditTargetReview({
                                                               ...editTargetReview,
                                                               reviewDescription: e.target.value
                                                           });
                                                       }}
                                                />
                                            </td>
                                            <td colSpan={1}>
                                                <Button className={'editButton'}
                                                        onClick={() => onClickPostEditReview(editTargetReview)}>
                                                    <AiFillEdit/>
                                                </Button>
                                                <Button className={'editCancelButton'}
                                                        onClick={() => setEditTargetReview({
                                                            reviewId: -1,
                                                            reviewDescription: null,
                                                            reviewRating: 0
                                                        })}>
                                                    <GiCancel/>
                                                </Button>
                                            </td>
                                        </tr>


                                    ) : (
                                        <tr key={index}>
                                            <td>
                                                {drawStar(review.reviewRating)}
                                            </td>
                                            <td>
                                                {review.userName}
                                            </td>
                                            <td align={"left"}>
                                                {review.reviewDescription}
                                            </td>
                                            <td>
                                                {review.reviewCreatedDate.split('T')[0]}
                                            </td>
                                            <td>
                                                {review.likeCount}
                                            </td>
                                            {isLogin === true ?
                                                (<td>
                                                    {review.userCheck && (
                                                        <Button className={'editButton'}
                                                                onClick={() => onClickEditReview(review)}>
                                                            <AiFillEdit/>
                                                        </Button>)}
                                                    {review.userCheck && (
                                                        <Button className={'deleteButton'}
                                                                onClick={() => onClickDeleteReview(review)}>
                                                            <AiFillDelete/>
                                                        </Button>)}

                                                    {review.userCheck === false && <Button className="likeButton"
                                                                                           onClick={() => onClickReviewLikeButton(review)}>
                                                        {review.userLikeCheck === false && <IoMdHeartEmpty/>}
                                                        {review.userLikeCheck === true && <IoMdHeart/>}
                                                    </Button>}

                                                </td>)
                                                : null}
                                        </tr>
                                    )
                                ))}
                                </tbody>
                            </Table>


                            <Col md={{size: 6, offset: 3}}>
                                {reviewSummary.reviewPageCount > 2 ?
                                    <ReactPaginate pageCount={reviewSummary.reviewPageCount - 1} pageRangeDisplayed={4}
                                                   marginPagesDisplayed={1}
                                                   previousLabel={'이전'} nextLabel={'다음'}
                                                   containerClassName={'reviewPaginate'}
                                                   pageClassName={'reviewPage'}
                                                   activeClassName={'reviewSelectedPage'}
                                                   onPageChange={onClickPage}

                                    /> :
                                    null}

                            </Col>


                            <Form onSubmit={onClickPostReview}>
                                <Label for="reviewFrom" className="reviewLabel">사용자 후기 작성하기</Label>
                                <span className="starRating">
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={20}
                                        activeColor="#ffd700"
                                        isHalf={false}
                                        edit={true}

                                    />
                                </span>

                                <Input type="textarea" name="text" classname="reviewFrom" rows="4"
                                       onChange={(e) => {
                                           setReview({...review, reviewDescription: e.target.value});
                                       }}
                                />
                                <Button type="submit" size="sm">작성</Button>
                            </Form>
                        </Col>
                    ) : (<Spinner color="warning"/>)}
                    {/*상품 정보 우측 영역 끝 */}
                </Row>

                {/*</Container>*/}

            </div>
        );
    }
;

export default FoodDetail;