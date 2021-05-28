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
} from 'reactstrap';
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
import { getProductRanking } from '../../api';
import { useEffect } from 'react/cjs/react.development';

function MainScreen() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
  };
  useEffect(() => {
    updateProductRanking();
  }, []);

  return (
    <div className="mainScreen">
      <Container>
        <Row>
          <Col xs={6} md={12}>
            <img className="showImage" src={showImage} />
          </Col>
        </Row>
        <br />
        <hr />
        <br />
        <Row>
          <Col xs={6} md={3}>
            <Link>
              <img className="icons" src={icon1} />
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link>
              <img className="icons" src={icon2} />
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link>
              {' '}
              <img className="icons" src={icon3} />
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link>
              <img className="icons" src={icon4} />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3}>
            <Link>
              <img className="icons" src={icon5} />
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link>
              {' '}
              <img className="icons" src={icon6} />
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link>
              {' '}
              <img className="icons" src={icon7} />
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link>
              <img className="icons" src={icon8} />
            </Link>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
                      여기에 종류
                    </CardSubtitle>
                  </CardBody>
                  {/* <img
                  width="100%"
                  src="/assets/318x180.svg"
                  alt="Card image cap"
                /> */}
                  <p>여기에 사진</p>
                  <CardBody className="showProps">
                    <CardText>인기 점수: {item.avgRating * 20}</CardText>
                    <br />
                    <br />
                    <Badge href="#" color="dark" className="badgeContent">
                      구매
                    </Badge>
                    <Badge href="#" color="warning" className="badgeContent">
                      이슈확인
                    </Badge>
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
