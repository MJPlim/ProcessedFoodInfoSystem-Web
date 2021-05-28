import React, { useEffect, useRef, useState } from 'react';
import { foodDetailApi, getReviewRankingApi } from '../../api';
import {
  Button,
  Card,
  CardText, CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from 'reactstrap';
import './Ranking.scss';
import { AiFillStar, AiOutlineStar, FaTrophy } from 'react-icons/all';
import { Link } from 'react-router-dom';

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
      <Row className='titleArea'>
        <Col md='7'>
          <p className='title'>제품 랭킹</p>
        </Col>
      </Row>
      <hr className='hr' />
      {/* 타이틀 영역 끝 */}

      {!loading && (
        <div>

          <Row className={'topRating'}>
            <Col sm={4}>
              <Card body className={'second topRatingCard'}>
                <FaTrophy className={'trophy'} />
                <CardText className={'avgRating'}>{rankingList[1].avgRating}</CardText>
                <Link to={{
                  pathname: `searchProduct/food/${rankingList[1].foodId}`,
                }}>
                  <img src={rankingList[1].foodImageAddress} />
                  <CardTitle className={'title'}>{rankingList[1].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[1].category}</CardText>
                </Link>
              </Card>
            </Col>
            <Col sm={4}>
              <Card body className={'first topRatingCard'}>
                <FaTrophy className={'trophy'} />
                <CardText className={'avgRating'}>{rankingList[0].avgRating}</CardText>
                <Link to={{
                  pathname: `searchProduct/food/${rankingList[0].foodId}`,
                }}>
                  <img src={rankingList[0].foodImageAddress} />
                  <CardTitle className={'title'}>{rankingList[0].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[0].category}</CardText>
                </Link>
              </Card>
            </Col>
            <Col sm={4}>
              <Card body className={'third topRatingCard'}>
                <FaTrophy className={'trophy'} />
                <CardText className={'avgRating'}>{rankingList[2].avgRating}</CardText>
                <Link to={{
                  pathname: `searchProduct/food/${rankingList[2].foodId}`,
                }}>
                  <img src={rankingList[2].foodImageAddress} />
                  <CardTitle className={'title'}>{rankingList[2].foodName}</CardTitle>
                  <CardText className={'category'}> {rankingList[2].category}</CardText>
                </Link>
              </Card>
            </Col>
          </Row>

          <ListGroup className={'RankingList'}>
            {rankingList.map((item, index) => (
                <div>
                  {index === 0 || index === 1 || index === 2 ?
                    null
                    :
                    <ListGroupItem className={'RankingListItem'} key={index}>
                      <Link to={{
                        pathname: `searchProduct/food/${item.foodId}`,
                      }}>


                        <text className={'rankNum'}>{index + 1}</text>

                        <text className={'foodName'}> {item.foodName}</text>
                      </Link>
                      <text className={'avgRating'}>{item.avgRating}</text>
                      <AiFillStar className={'ratingStar'} />
                    </ListGroupItem>
                  }

                </div>
              ),
            )}
          </ListGroup>
        </div>
      )}


    </div>
  );
};


export default ProductReviewRanking;