import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, FormGroup, Input, Label, Row, Table} from "reactstrap";
import "./FoodDetail.scss"
import ReactStars from "react-rating-stars-component";
import axios from "axios";


const FoodDetail = ({match}) => {
        const [food, setFood] = useState(null);

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [starRating, setStarRating] = useState(0);
        const {id} = match.params;

        const config = {
            headers: {"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QgdG9rZW4iLCJleHAiOjE2MTc5ODg3NDEsInVzZXJuYW1lIjoid2VidGVzdEBnbWFpbC5jb20ifQ.ih46Onu-VrvIGmUiUpG2dTUz7JlNns1TSgmXVxt5VsblqTuzCf13ObFtGipIghH7TZn8TbjOpDT_Y_jFLNYcvA"},
        }
        const ratingChanged = (newRating) => {
            setStarRating(newRating);
            console.log(starRating)
        };


        // useEffect(() => {
        //     const fetchFood = async () => {
        //         try {
        //             setError(null);
        //             setFood(null);
        //             // loading 상태를 true 로 바꿉니다.
        //             setLoading(true);
        //             const response = await axios.get(
        //                 'http://13.124.55.59:8080/api/v1/food/findFood/foodName?foodName=' + id + '&pageNo=1', config
        //             );
        //             setFood(response.data);
        //         } catch (e) {
        //             setError(e);
        //         }
        //         setLoading(false);
        //
        //     };
        //
        //     fetchFood();
        // }, []);
        // if (loading) return <div>로딩중..</div>;
        // if (error) return <div>에러가 발생했습니다</div>;
        // if (!food) return null;


        return (
            <div>
                <Container>
                    {/* 타이틀 영역 시작*/}
                    <Row>
                        <Col md="10">
                            <p className="title">상품정보</p>
                        </Col>
                        <Col md="2">
                            <p className="offline">오프라인 구매처 찾기</p>
                        </Col>
                    </Row>

                    <hr className="hr"/>
                    {/* 타이틀 영역 끝 */}

                    <Row>
                        {/*상품 정보 좌측 영역 시작 */}
                        <Col md="6" className="rightBorderLine">
                            {/*상품 정보 좌측 상단 영역(이미지, 식품 이름 등) 시작 */}
                            <Row className="bottomBorderLine">
                                <Col sm="6">
                                    <img src="/image/no-image.png" alt="이미지 없음" width="200px" height="200px"/>
                                </Col>
                                <Col lg="6">
                                    <Table>
                                        <tr>
                                            <th>
                                                상품명
                                            </th>
                                            <td>
                                                새우깡
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                제조사
                                            </th>
                                            <td>
                                                농협
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                바코드
                                            </th>
                                            <td>
                                                13123123123
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
                                </Col>
                                <Col sm="6">
                                    <p className="subTitle">원료</p>
                                    ㅁㄴㅁ아하ㅓㄹㅇ노하ㅗ하러옿ㄴㄹ아ㅓㅗㅎ아러놓아ㅓㅗ호ㅗㄴㅁㅇㅁㄴㅇㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴ
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

                            <FormGroup>
                                <Label for="reviewFrom" className="reviewLabel">사용자 후기 작성하기</Label>
                                <span className="starRating">
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={20}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                    />
                                </span>

                                <Input type="textarea" name="text" id="reviewFrom" rows="4"/>
                            </FormGroup>
                            <Button size="sm">작성</Button>

                        </Col>
                        {/*상품 정보 우측 영역 끝 */}
                    </Row>

                </Container>

            </div>
        );
    }
;

export default FoodDetail;