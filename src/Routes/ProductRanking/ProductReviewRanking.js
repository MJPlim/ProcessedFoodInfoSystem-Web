import React, {useEffect, useRef, useState} from 'react';
import {foodDetailApi, getReviewRankingApi} from "../../api";
import {Button, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row} from "reactstrap";
import "./Ranking.scss"
import {AiFillStar, AiOutlineStar, FaTrophy} from "react-icons/all";
import {Link} from "react-router-dom";

const ProductReviewRanking = () => {
    const [rankingList, setRankingList] = useState(null);
    const [rankingDetail, setRankingDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const detailInfo = useRef();
    let detailArray = [];


    const fetchRanking = async () => {

        await getReviewRankingApi.getReviewRanking().then(response => {
            setRankingList(response.data);
            setLoading(false);

            // response.data.forEach(async (res, i) => {
            //    await foodDetailApi.search(res.foodId).then(detailResponse => {
            //         detailArray.push(detailResponse.data);
            //         // detailArray[i]['avgRating'] = res.avgRating
            //
            //         console.log(detailArray);
            //     }).catch(e => {
            //        console.log('랭킹 상품 상세 정보 에러', e);
            //    })
            // })

        }).catch(e => {
            console.log('랭킹리스트 에러', e);
        });

    }

    useEffect(() => {
        fetchRanking();
    }, []);


    return (
        <div className="Ranking">
            <Row className="titleArea">
                <Col md="7">
                    <p className="title">제품 랭킹</p>
                </Col>
            </Row>
            <hr className="hr"/>
            {/* 타이틀 영역 끝 */}

            {!loading && (
                <ListGroup className={"RankingList"}>
                    {rankingList.map((item, index) => (

                            <ListGroupItem className={"RankingListItem"}>


                                <Link to={{
                                    pathname: `searchProduct/food/${item.foodId}`
                                }}>

                                    {index === 0 && (<FaTrophy className={"rankNum first"}/>)}
                                    {index === 1 && (<FaTrophy className={"rankNum second"}/>)}
                                    {index === 2 && (<FaTrophy className={"rankNum third"}/>)}
                                    {index > 2 && (<text className={"rankNum"}>{index + 1}</text>)}

                                    <text className={"foodName"}> {item.foodName}</text>
                                </Link>


                                <text className={"avgRating"}>{item.avgRating}</text>
                                <AiFillStar className={"ratingStar"}/>


                            </ListGroupItem>

                        )
                    )}
                </ListGroup>
            )}


        </div>
    );
};


export default ProductReviewRanking;