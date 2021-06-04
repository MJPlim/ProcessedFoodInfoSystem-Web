import React, { useState } from 'react';
import './MainScreenStyle.scss';

import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import productSet from '../../image/kati.PNG';
import 간식 from '../../image/bigCategoryImg/간식.png';
import 기타 from '../../image/bigCategoryImg/기타.jpg';
import 김치 from '../../image/bigCategoryImg/김치.png';
import 농수산물 from '../../image/bigCategoryImg/농수산물.png';
import 유제품 from '../../image/bigCategoryImg/유제품.png';
import 조미료 from '../../image/bigCategoryImg/조미료.png';
import 즉석조리식품 from '../../image/bigCategoryImg/즉석조리식품.jpg';
import 차음료 from '../../image/bigCategoryImg/차음료.png';

import { getProductRanking, getAd } from '../../api';
import { useEffect } from 'react/cjs/react.development';

function MainScreen() {
  const [product, setProduct] = useState(null);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adLoad, setAdLoad] = useState(true);

  const updateProductRanking = async () => {
    await getProductRanking
      .mainPage()
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    await getAd
      .atMainPage()
      .then((response) => {
        setAd(response.data);
        setAdLoad(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    updateProductRanking();
  }, []);

  const drawStar = (rating) => {
    switch (rating) {
      case '5.00':
        return '★★★★★';
      case '4.00':
        return '★★★★☆';
      case '3.00':
        return '★★★☆☆';
      case '2.00':
        return '★★☆☆☆';
      case '1.00':
        return '★☆☆☆☆';
    }
  };

  const onClickCategory = e => {
    sessionStorage.removeItem('categoryName');
    sessionStorage.removeItem('selectedPage');
    sessionStorage.removeItem('selectedSort');

  };

  return (
    <div className='mainScreen'>
      <br />
      <br />
      <Container>
        <Row>
          <Col md='1'>
            <img className='productSet' src={productSet} />
          </Col>
          <Col md='11'>
            <p className='titleBar'>카테고리</p>
          </Col>
        </Row>
        <hr />
        <div className='category__items'>
          <div className='item'>
            <Link to='/category/snack'>
              <img className='item__img' onClick={onClickCategory} src={간식} />
            </Link>
            <p className='category__name'>간식</p>
          </div>
          <div className='item'>
            <Link to='/category/tea' name={'차음료'}>
              <img className='item__img' onClick={onClickCategory} src={차음료} />
            </Link>
            <p className='category__name'>차/음료</p>
          </div>
          <div className='item'>
            <Link to='/category/milk' name={'유제품'}>
              <img className='item__img' onClick={onClickCategory} src={유제품} />
            </Link>
            <p className='category__name'>유제품</p>
          </div>
          <div className='item'>
            <Link to='/category/food' name={'농수산물'}>
              <img className='item__img' onClick={onClickCategory} src={농수산물} />
            </Link>
            <p className='category__name'>농수산물</p>
          </div>
          <div className='item'>
            <Link to='/category/condi' name={'조미료'}>
              <img className='item__img' onClick={onClickCategory} src={조미료} />
            </Link>
            <p className='category__name'>조미료</p>
          </div>
          <div className='item'>
            <Link to='/category/kimchi' name={'김치'}>
              <img className='item__img' onClick={onClickCategory} src={김치} />
            </Link>
            <p className='category__name'>김치</p>
          </div>
          <div className='item'>
            <Link to='/category/mealKit' name={'즉석조리식품'}>
              이미지못구함
              <p className='category__name' onClick={onClickCategory}>즉석조리식품</p>
            </Link>
          </div>
          <div className='item'>
            <Link to='/category/etc' name={'기타가공품'}>이미지못구함</Link>
            <p className='category__name' onClick={onClickCategory}>기타가공품</p>
          </div>
        </div>
        <div>
          <Row>
            <Col md='1'>
              <img className='productSet' src={productSet} />
            </Col>
            <Col md='11'>
              <p className='titleBar'>광고 상품</p>
            </Col>
          </Row>
          <hr />
          {!adLoad && (
            // <div className="setUp">
            <div>
              <div className='cardGroup'>
                <Row>
                  {ad.map((result) => (
                    <Col xs={'4'}>
                      <Link
                        to={{
                          pathname: `searchProduct/food/${result.food.foodId}`,
                          state: {
                            adId: result.id,
                          },
                        }}
                      >
                        <Card className='eachAdCard'>
                          <CardBody className='adcardTop'>
                            <CardTitle tag='h5'>
                              {result.food.foodName}
                            </CardTitle>
                            <CardSubtitle tag='h6' className='mb-2 text-muted'>
                              {result.food.category.split('_')[0]}
                            </CardSubtitle>
                          </CardBody>
                          <Link
                            to={{
                              pathname: `searchProduct/food/${result.food.foodId}`,
                              state: {
                                adId: result.id,
                              },
                            }}
                          >
                            <img
                              className='adImage'
                              width='40%'
                              height='40%'
                              src={result.food.foodImageAddress}
                            />
                          </Link>
                          <CardBody className='showProps'>
                            <CardText>
                              {result.food.manufacturerName.split('_')[0]}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}
        </div>

        <div>
          <Row>
            <Col md='1'>
              <img className='productSet' src={productSet} />
            </Col>
            <Col md='11'>
              <p className='titleBar'>인기 상품</p>
            </Col>
          </Row>
          <hr />
          {!loading && (
            <div className='cardGroup'>
              {product.map((item) => (
                <Card className='eachCard'>
                  <CardBody className='cardTop'>
                    <CardTitle tag='h5'>{item.foodName}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-2 text-muted'>
                      {item.category}
                    </CardSubtitle>
                  </CardBody>
                  <Link
                    to={{
                      pathname: `searchProduct/food/${item.foodId}`,
                    }}
                  >
                    <img
                      className='rankImage'
                      width='40%'
                      height='40%'
                      src={item.foodImageAddress}
                    />
                  </Link>
                  <CardBody className='showRankProps'>
                    <CardText>별점: {drawStar(item.avgRating)}</CardText>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MainScreen;
