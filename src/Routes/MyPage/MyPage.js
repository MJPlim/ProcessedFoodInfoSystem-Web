import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div className="MyPage">
      {/* IIFE 즉시 실행 함수
      <div>{setUserInformation})</div> */}
      <Container>
        <Row>
          <Col md="6">
            <p className="shownPage">마이페이지</p>
          </Col>
          <Col md="2">
            <Link to="/changeUserInfo">
              <Button color="link" size="sm" className="changeUserInfo">
                내 정보변경하기
              </Button>
            </Link>
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
        <Row>
          <Col md="2">
            <p className="userName">이름 : </p>
          </Col>
          <Col md="10">
            <p>{localStorage.getItem('name')}</p>
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <p className="userName">주소 : </p>
          </Col>
          <Col md="10">
            <p>{localStorage.getItem('address')}</p>
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <p className="userName">생일 : </p>
          </Col>
          <Col md="10">
            <p>{localStorage.getItem('birth')}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyPage;
