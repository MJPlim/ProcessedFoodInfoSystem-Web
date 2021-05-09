import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form, Input, Label, Row, Spinner, Table} from "reactstrap";
import "./FoodDetail.scss"
import ReactStars from "react-rating-stars-component";
import {
    adFoodDetailApi,
    foodDetailApi,
    getReviewsByFoodId,
    getReviewsByFoodIdWithLogin,
    postReviewApi
} from "../../api";
import ReactPaginate from 'react-paginate';
import {IoMdHeart, IoMdHeartEmpty, RiDeleteBinLine} from "react-icons/all";


const FoodDetail = (props) => {
        const foodId = props.match.params.id

        const [food, setFood] = useState(null);
        const [review, setReview] = useState({
            foodId: foodId,
            reviewDescription: null,
            reviewRating: 0
        })
        const [reviews, setReviews] = useState(null);
        const [reviewCount, setReviewCount] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [isLogin, setIsLogin] = useState(localStorage.getItem('authorization') !== 'null');


        const ratingChanged = (newRating) => {
            setReview({
                ...review,
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

                setError(null);
                setFood(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                console.log("리뷰 불러오기")
                console.log(localStorage.getItem('authorization'))


                if (isLogin) {
                    console.log('로그인 리뷰')
                    const response = await getReviewsByFoodIdWithLogin.getReviews(foodId, 1);
                    setReviews(response.data.readReviewResponse);
                    setReviewCount(response.data.reviewCount);
                } else {
                    console.log('비로그인 리뷰');
                    const response = await getReviewsByFoodId.getReviews(foodId, 1);
                    setReviews(response.data.readReviewResponse);
                    setReviewCount(response.data.reviewCount);
                }


            } catch (e) {
                setError(e);
            }
            setLoading(false);

        };


        const onClickPostReview = (e) => {
            console.log(e)
            e.preventDefault();
            if (!isLogin) {
                alert('로그인을 해주세요')
            } else if (review.reviewRating === 0) {
                alert('별점을 입력해주세요');
            } else if (review.reviewDescription === undefined || review.reviewDescription === null) {
                alert('후기 내용을 작성해주세요');
            } else {
                postReviewApi.postReview(review).then(async () => {
                        alert('리뷰 작성 완료')
                        e.target.reset();
                        window.location.reload(false);
                    }
                ).catch(e => {
                    console.log(e.response);
                });
            }

        }

        const onClickPage = async (pageNum) => {
            const response = await getReviewsByFoodId.getReviews(foodId, pageNum.selected + 1);
            setReviews(response.data.readReviewResponse);
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

            console.log(localStorage.getItem('authorization'))

            const fetchFood = async () => {
                try {
                    setError(null);
                    setFood(null);
                    // loading 상태를 true 로 바꿉니다.
                    setLoading(true);

                    console.log("일반 식품")
                    const response = await foodDetailApi.search(foodId);
                    setFood(response.data);

                } catch (e) {
                    setError(e);
                }
                setLoading(false);

            };

            const fetchADFood = async () => {
                try {

                    setError(null);
                    setFood(null);
                    // loading 상태를 true 로 바꿉니다.
                    setLoading(true);

                    console.log("광고 식품")

                    const response = await adFoodDetailApi.search(props.location.state.adId);
                    setFood(response.data);
                } catch (e) {
                    setError(e);
                }
                setLoading(false);

            };

            fetchReview();

            if (props.location.state !== undefined) {
                fetchADFood();
            } else {
                fetchFood();
            }

            console.log(reviews);

        }, []);

        if (loading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
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
                    {reviews !== null && reviewCount !== null ? (
                        <Col lg="6">
                            <Row>
                                <Col>
                                    리뷰 수 <span className="subTitle">{reviewCount.findReviewCount}   </span>
                                    사용자 총 평점 <span className="subTitle">4.8/5</span>
                                </Col>
                            </Row>

                            <Table className="reviewTable">
                                <th>별점</th>
                                <th>작성자</th>
                                <th>내용</th>
                                <th>작성일</th>
                                <th>좋아요</th>
                                {isLogin === true ?
                                    <th/>
                                    : null}


                                {reviews.map((review, index) => (
                                    <tr key={index}>
                                        <td>
                                            {drawStar(review.reviewRating)}
                                        </td>
                                        <td>
                                            {review.userName}
                                        </td>
                                        <td>
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
                                                {review.userLikeCheck === false ? (
                                                        <Button className={'likeButton'}>
                                                            <IoMdHeartEmpty/>
                                                        </Button>)
                                                    : <Button className={'likeButton'}>
                                                        <IoMdHeart/>
                                                    </Button>}
                                            </td>)
                                            : null}

                                    </tr>
                                ))}

                            </Table>


                            <Col>
                                <ReactPaginate pageCount={reviewCount.findReviewPageCount - 1} pageRangeDisplayed={4}
                                               marginPagesDisplayed={1}
                                               previousLabel={'이전'} nextLabel={'다음'}
                                               initialPage={0} onPageChange={onClickPage}
                                />
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