import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div className="MyPage">
      <Container>
        <Row>
          <Col md="6">
            <p className="shownPage">마이페이지</p>
          </Col>
          <Col md="2">
            <p className="changeUserInfo">회원정보변경하기</p>
            {/*이 부분은 추후에 추가되야 할 부분 !*/}
          </Col>
          <Col md="2">
            <Link to="/changePassword">
              <Button color="link" size="sm" className="changePassword">
                비밀번호 변경하기
              </Button>
            </Link>
          </Col>
          <Col md="2">
            <Link to="/delete">
              <Button color="danger" size="sm">
                회원탈퇴
              </Button>
            </Link>
          </Col>
        </Row>
        <hr />
        {/* 밑으로는 사용자 개인 정보 보여주기*/}
      </Container>
    </div>
  );
};

export default MyPage;
