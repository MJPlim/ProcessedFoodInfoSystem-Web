import React, { useEffect, useRef, useState } from 'react';
import { foodDetailApi, getReviewRankingApi } from '../../api';
import {
  Button,
  Card,
  CardText, CardTitle,
  Col,
  Row, Table,
} from 'reactstrap';
import './Ranking.scss';
import { AiFillStar, AiOutlineStar, FaTrophy } from 'react-icons/all';
import { Link } from 'react-router-dom';
import first from '../../image/Ranking/first.png';
import second from '../../image/Ranking/second.png';
import third from '../../image/Ranking/third.png';
const ProductReviewRanking = () => {
  const [rankingList, setRankingList] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchRanking = async () => {

    await getReviewRankingApi.getReviewRanking().then(response => {
      setRankingList(response.data);
      setLoading(false);
    }).catch(e => {
      console.log('랭킹리스트 에러', e.response);
    });

  };

  useEffect(() => {
    fetchRanking();
  }, []);


  return (
    <div className='Ranking'>

          <div className="ranking__img"></div>
         <div className="ranking__title">명 예 의 전 당 </div>
    
      {/* 타이틀 영역 끝 */}
      
     
      {!loading && (
        <div className="ranking__page">
          <Row className={'topRating'}>
            <Col sm={4}>
              <img className="top__frame frame__2" src={second}/>
              <Card body className={'second topRatingCard'}>
                <FaTrophy className={'trophy'} />
                <CardText className={'avgRating'}>{rankingList[1].avgRating}</CardText>
                <div className={'foodNameCard'}>
                  <CardTitle className={'title'}>{rankingList[1].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[1].category}</CardText>
                </div>
                <Link to={{
                  pathname: `searchProduct/food/${rankingList[1].foodId}`,
                }}>
                  <img src={rankingList[1].foodImageAddress} />


                </Link>
              </Card>
            </Col>

            <Col sm={4}>
             <img className="top__frame frame__1" src={first}/>
              <Card body className={'first topRatingCard'}>
                <FaTrophy className={'trophy'} />
                <CardText className={'avgRating'}>{rankingList[0].avgRating}</CardText>
                <div className={'foodNameCard'}>
                  <CardTitle className={'title'}>{rankingList[0].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[0].category}</CardText>
                </div>
                <Link to={{
                  pathname: `searchProduct/food/${rankingList[0].foodId}`,
                }}>
                  <img src={rankingList[0].foodImageAddress} />

                </Link>
              </Card>
            </Col>

            
            <Col sm={4}>
           <img className="top__frame frame__2" src={third}/>
              <Card body className={'third topRatingCard'}>                  
                <FaTrophy className={'trophy'} />
                <CardText className={'avgRating'}>{rankingList[2].avgRating}</CardText>
                <div className={'foodNameCard'}>
                  <CardTitle className={'title'}>{rankingList[2].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[2].category}</CardText>
                </div>
                <Link to={{
                  pathname: `searchProduct/food/${rankingList[2].foodId}`,
                }}>
                  <img src={rankingList[2].foodImageAddress} />

                </Link>
              </Card>
            </Col>
          </Row>

          <Table className={'RankingTable'}>
            <thead>
            <tr>
              <th width={'10%'}>순위</th>
              <th width={'35%'}>제품 명</th>
              <th width={'35%'}>카테고리</th>
              <th width={'15%'}>평균 점수</th>
            </tr>
            </thead>
            <tbody>
            {rankingList.map((item, index) => (
                <>
                  {index === 0 || index === 1 || index === 2 ?
                    null
                    :
                    <tr className={'RankingTableRow'} key={index}>

                      <th scope='row'>{index + 1}</th>
                      <td>
                        <Link to={{
                          pathname: `searchProduct/food/${item.foodId}`,
                        }}>{item.foodName}
                        </Link></td>
                      <td>{item.category}</td>
                      <td><AiFillStar className={'ratingStar'} />{item.avgRating}</td>
                    </tr>

                  }
                </>
              ),
            )}
            </tbody>
          </Table>
        </div>
      )}


    </div>
  );
};


export default ProductReviewRanking;