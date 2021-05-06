import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form, Input, Label, Row, Table} from "reactstrap";
import "./FoodDetail.scss"
import ReactStars from "react-rating-stars-component";
import {adFoodDetailApi, foodDetailApi, postReviewApi} from "../../api";


const FoodDetail = (props) => {
        const foodId = props.match.params.id

        const [food, setFood] = useState(null);
        const [review, setReview] = useState({
            foodId: foodId,
            reviewDescription: null,
            reviewRating: 0
        })
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        // const [starRating, setStarRating] = useState(0);
        // const [reviewDescription, setReviewDescription] = useState(null);


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


        const onClickPostReview = (e) => {
            console.log(e)
            e.preventDefault();
            if (review.reviewRating === 0) {
                alert('별점을 입력해주세요');
            } else if (review.reviewDescription === undefined || review.reviewDescription === null) {
                alert('후기 내용을 작성해주세요')
            } else {
                console.log(review)
                postReviewApi.postReview(review).then(() => {
                        alert('리뷰 작성 완료')
                        e.target.reset();

                    }
                ).catch(e => {
                    console.log(e.response);
                })
            }

        }

        useEffect(() => {
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
            if (props.location.state !== undefined) {
                fetchADFood();
            } else {
                fetchFood();
            }

        }, []);

        if (loading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!food) return null;

        return (
            <div className="FoodDetail">
                <Container>
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
                        <Col md="6" className="rightBorderLine">
                            {/*상품 정보 좌측 상단 영역(이미지, 식품 이름 등) 시작 */}
                            <Row className="bottomBorderLine">
                                <Col sm="3">
                                    <img src={food.foodImageAddress} alt="이미지 없음" width="150" height="150"/>
                                </Col>
                                <Col lg="9">
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
                                </Col>
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
                        <Col md="6">
                            <Row>
                                <Col md="10">
                                    리뷰 수 <span className="subTitle">500  </span>
                                    사용자 총 평점 <span className="subTitle">4.8/5</span>
                                </Col>
                                <Col md="1">
                                    <ButtonGroup class="pagingButton">
                                        <Button size="sm">←</Button>
                                        <Button size="sm">→</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                            <Table className="reviewTable">
                                <tr>
                                    <td>
                                        ★★★★☆
                                    </td>
                                    <td>
                                        plim123
                                    </td>
                                    <td>
                                        우에엑
                                    </td>
                                    <td>
                                        2021-04-10
                                    </td>
                                </tr>
                            </Table>

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
                        {/*상품 정보 우측 영역 끝 */}
                    </Row>

                </Container>

            </div>
        );
    }
;

export default FoodDetail;