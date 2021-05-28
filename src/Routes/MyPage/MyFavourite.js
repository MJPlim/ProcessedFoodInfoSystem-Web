import React, { useEffect, useState } from 'react';
import { favouriteApi } from '../../api';
import { Link } from 'react-router-dom';
import './MyFavouriteStyle.scss';
import productSet from '../../image/kati.PNG';
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

function MyFavourite() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFavourite = async () => {
    await favouriteApi
      .myFavourite()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(true);
      });
  };

  useEffect(() => {
    getFavourite();
  }, []);

  return (
    <div>
      <Container>
        <div className="myFavourite">
          <br />
          <br />
          <Row>
            <Col md="1">
              <img className="productSet" src={productSet} />
            </Col>
            <Col md="11">
              <p className="titleBar">나의 즐겨찾기 목록</p>
            </Col>
          </Row>
          <hr />
          {!loading && (
            <div className="cardGroup">
              {data.map((food) => (
                <Card className="eachCard">
                  <CardBody className="cardTop">
                    <CardTitle tag="h5">{food.food.foodName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {food.food.category}
                    </CardSubtitle>
                  </CardBody>
                  <Link
                    to={{
                      pathname: `searchProduct/food/${food.food.foodId}`,
                    }}
                  >
                    <img
                      className="rankImage"
                      width="40%"
                      height="40%"
                      src={food.food.foodImageAddress}
                    />
                  </Link>
                  <CardBody className="showProps">
                    <CardText>추천 개수: {food.food.reviewCount}</CardText>

                    <Badge
                      href={
                        `https://search.shopping.naver.com/search/all?query=` +
                        food.food.foodName
                      }
                      target="_blank"
                      color="dark"
                      className="badgeContent"
                    >
                      구매
                    </Badge>
                    <Badge color="warning" className="badgeContent">
                      지우기
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
export default MyFavourite;
