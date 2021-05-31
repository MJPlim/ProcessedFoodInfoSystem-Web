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
import { getProductRanking } from '../../api';
import { useEffect } from 'react/cjs/react.development';

function MainScreen() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [fadeIn, setFadeIn] = useState(true);
  const [popoverOpen1, setPopoverOpen1] = useState(false);
  const [popoverOpen2, setPopoverOpen2] = useState(false);
  const [popoverOpen3, setPopoverOpen3] = useState(false);
  const [popoverOpen4, setPopoverOpen4] = useState(false);
  const [popoverOpen5, setPopoverOpen5] = useState(false);

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

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleFade = () => setFadeIn(!fadeIn);

  const togglePop1 = () => setPopoverOpen1(!popoverOpen1);
  const togglePop2 = () => setPopoverOpen2(!popoverOpen2);
  const togglePop3 = () => setPopoverOpen3(!popoverOpen3);
  const togglePop4 = () => setPopoverOpen4(!popoverOpen4);
  const togglePop5 = () => setPopoverOpen5(!popoverOpen5);

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
        {/**유제품
커피/차
과자
견과
초콜릿
떡
과일/채소
기타가공품 */}
        <Row>
          <Col xs={6} md={3}>

            <Link to="/category/snack">
              <img className='icons' src={icon1} />
              간식
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link to="/category/tea">
              <img className='icons' src={icon2} />
              차/음료
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link to="/category/milk">
              {' '}

              <img className='icons' src={icon3} />
              유제품
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link to="/category/kimchi">
              <img className='icons' src={icon4} />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3}>

            <Link to="/category/food">
              <img className='icons' src={icon5} />
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

              <img className='icons' src={icon7} />
              조미료
            </Link>
          </Col>
          <Col xs={6} md={3}>
            <Link to="/category/etc">
              <img className='icons' src={icon8} />
              기타
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="description">
          <div>
            <Nav tabs className="menuTabs">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  개발자
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  조직 구성
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="shownDescription">
              <TabPane tabId="1" className="marginSet">
                <br />
                <br />
                {/* <Table borderless>
                  <thead>
                    <tr className="tableTop">
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>60150068</th>
                      <th>박정훈</th>
                      <th>중어중문학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                    <tr>
                      <th>학번</th>
                      <th>이름</th>
                      <th>학과</th>
                    </tr>
                  </thead>
                </Table> */}
                <p>뭘넣지</p>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="4">
                    <Card body>
                      <CardTitle>PM, QA</CardTitle>
                      <CardText>
                        프로젝트 관리 책임, 품질 관리자 및 환경 세팅 담당
                      </CardText>
                      <Button
                        outline
                        color="secondary"
                        size="sm"
                        id="Popover1"
                        type="button"
                      >
                        더 보기
                      </Button>
                      <Popover
                        placement="bottom"
                        isOpen={popoverOpen1}
                        target="Popover1"
                        toggle={togglePop1}
                      >
                        <PopoverHeader>조직 구성원</PopoverHeader>
                        <PopoverBody>
                          PM: 정상현
                          <br />
                          QA: 김송은, 박정욱
                        </PopoverBody>
                      </Popover>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card body>
                      <CardTitle>Server 개발팀</CardTitle>
                      <CardText>비즈니스 로직 개발 및 통합 담당</CardText>
                      <Button
                        outline
                        color="secondary"
                        size="sm"
                        id="Popover2"
                        type="button"
                      >
                        더 보기
                      </Button>
                      <Popover
                        placement="bottom"
                        isOpen={popoverOpen2}
                        target="Popover2"
                        toggle={togglePop2}
                      >
                        <PopoverHeader>조직 구성원</PopoverHeader>
                        <PopoverBody>
                          팀장: 박정욱
                          <br />
                          팀원: 이서현, 정찬호
                        </PopoverBody>
                      </Popover>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card body>
                      <CardTitle>DB 개발팀</CardTitle>
                      <CardText>DB 설계 및 통합 담당</CardText>
                      <Button
                        outline
                        color="secondary"
                        size="sm"
                        id="Popover3"
                        type="button"
                      >
                        더 보기
                      </Button>
                      <Popover
                        placement="bottom"
                        isOpen={popoverOpen3}
                        target="Popover3"
                        toggle={togglePop3}
                      >
                        <PopoverHeader>조직 구성원</PopoverHeader>
                        <PopoverBody>
                          팀장: 박이건
                          <br />
                          팀원: 윤예은, 정찬호
                        </PopoverBody>
                      </Popover>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Web 개발팀</CardTitle>
                      <CardText>Web 설계 및 통합 담당</CardText>
                      <Button
                        outline
                        color="secondary"
                        size="sm"
                        id="Popover4"
                        type="button"
                      >
                        더 보기
                      </Button>
                      <Popover
                        placement="bottom"
                        isOpen={popoverOpen4}
                        target="Popover4"
                        toggle={togglePop4}
                      >
                        <PopoverHeader>조직 구성원</PopoverHeader>
                        <PopoverBody>
                          팀장: 박정훈
                          <br />
                          팀원: 박이건, 홍은서
                        </PopoverBody>
                      </Popover>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>App 개발팀</CardTitle>
                      <CardText>App 설계 및 통합 담당</CardText>
                      <Button
                        outline
                        color="secondary"
                        size="sm"
                        id="Popover5"
                        type="button"
                      >
                        더 보기
                      </Button>
                      <Popover
                        placement="bottom"
                        isOpen={popoverOpen5}
                        target="Popover5"
                        toggle={togglePop5}
                      >
                        <PopoverHeader>조직 구성원</PopoverHeader>
                        <PopoverBody>
                          팀장: 윤예은
                          <br />
                          팀원: 김송은, 신동욱, 정상현
                        </PopoverBody>
                      </Popover>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
        <br />
        <br />
        <div className="copyright">
          <p>Copyright ⓒ 2021 명지대학교 PLIM. All Rights Reserved.</p>
        </div>
      </Container>
    </div>
  );
}

export default MainScreen;
