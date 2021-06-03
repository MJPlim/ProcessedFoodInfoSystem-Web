import React, { useState } from 'react';
import './MainScreenStyle.scss';
import {
  Row,
  Container,
  Col,
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Button,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Fade,
  Popover,
  PopoverHeader,
  PopoverBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import showImage from '../../image/needcomment.PNG';
import productSet from '../../image/kati.PNG';
import icon1 from '../../image/icon2.PNG';
import icon2 from '../../image/icon3.PNG';
import icon3 from '../../image/icon4.PNG';
import icon4 from '../../image/icon5.PNG';
import icon5 from '../../image/icon6.PNG';
import icon6 from '../../image/icon7.PNG';
import icon7 from '../../image/icon8.PNG';
import icon8 from '../../image/icon9.PNG';
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

  return (
    <div className="mainScreen">
      <br />
      <br />
      <Container>
        <div className="categoryIcons">
          <Row>
            <Col xs={6} md={3}>
              <Link to="/category/snack">
                <img className="icons" src={icon1} />
                간식
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to="/category/tea">
                <img className="icons" src={icon2} />
                차/음료
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to="/category/milk">
                {' '}
                <img className="icons" src={icon3} />
                유제품
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to="/category/kimchi">
                <img className="icons" src={icon4} />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={3}>
              <Link to="/category/food">
                <img className="icons" src={icon5} />
                농수산물
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to="/category/mealKit">
                {' '}
                <img className="icons" src={icon6} />
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to="/category/con">
                {' '}
                <img className="icons" src={icon7} />
                조미료
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to="/category/etc">
                <img className="icons" src={icon8} />
                기타
              </Link>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col md="1">
              <img className="productSet" src={productSet} />
            </Col>
            <Col md="11">
              <p className="titleBar">광고 상품</p>
            </Col>
          </Row>
          <hr />
          {!adLoad && (
            // <div className="setUp">
            <div>
              <div className="cardGroup">
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
                        <Card className="eachAdCard">
                          <CardBody className="adcardTop">
                            <CardTitle tag="h5">
                              {result.food.foodName}
                            </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
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
                              className="adImage"
                              width="40%"
                              height="40%"
                              src={result.food.foodImageAddress}
                            />
                          </Link>
                          <CardBody className="showProps">
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

        <br />
        <hr />
        <br />

        <div>
          <Row>
            <Col md="1">
              <img className="productSet" src={productSet} />
            </Col>
            <Col md="11">
              <p className="titleBar">인기 상품</p>
            </Col>
          </Row>
          <hr />
          {!loading && (
            <div className="cardGroup">
              {product.map((item) => (
                <Card className="eachCard">
                  <CardBody className="cardTop">
                    <CardTitle tag="h5">{item.foodName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {item.category}
                    </CardSubtitle>
                  </CardBody>
                  <Link
                    to={{
                      pathname: `searchProduct/food/${item.foodId}`,
                    }}
                  >
                    <img
                      className="rankImage"
                      width="40%"
                      height="40%"
                      src={item.foodImageAddress}
                    />
                  </Link>
                  <CardBody className="showRankProps">
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
