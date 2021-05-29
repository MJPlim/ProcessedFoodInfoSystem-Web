import React, { useState } from 'react';
import classnames from 'classnames';
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

function About() {
  const [activeTab, setActiveTab] = useState('1');
  const [fadeIn, setFadeIn] = useState(true);
  const [popoverOpen1, setPopoverOpen1] = useState(false);
  const [popoverOpen2, setPopoverOpen2] = useState(false);
  const [popoverOpen3, setPopoverOpen3] = useState(false);
  const [popoverOpen4, setPopoverOpen4] = useState(false);
  const [popoverOpen5, setPopoverOpen5] = useState(false);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const togglePop1 = () => setPopoverOpen1(!popoverOpen1);
  const togglePop2 = () => setPopoverOpen2(!popoverOpen2);
  const togglePop3 = () => setPopoverOpen3(!popoverOpen3);
  const togglePop4 = () => setPopoverOpen4(!popoverOpen4);
  const togglePop5 = () => setPopoverOpen5(!popoverOpen5);
  return (
    <div className="about">
      <br />
      <br />
      <br />
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
          <Table borderless>
            <thead>
              <tr className="tableTop">
                <th>사진</th>
                <th>학번</th>
                <th>이름</th>
                <th>학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
              <tr>
                <th></th>
                <th>60150068</th>
                <th>박정훈</th>
                <th>중어중문학과</th>
              </tr>
            </thead>
          </Table>
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
                  className="popGroup"
                >
                  <PopoverHeader>조직 구성원</PopoverHeader>
                  <PopoverBody>
                    PM: 정상현, 박정욱
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
                  className="popGroup"
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
                  className="popGroup"
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
                  className="popGroup"
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
                  className="popGroup"
                >
                  <PopoverHeader className="popGroup">
                    조직 구성원
                  </PopoverHeader>
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
  );
}

export default About;
