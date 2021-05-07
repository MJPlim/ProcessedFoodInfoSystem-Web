import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');

  const setUserInformation = () => {
    console.log('유저 정보 가져오기 메소드');
    axios
      .get('http://13.124.55.59:8080/api/v1/user/user-info', {
        params: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('authorization'),
        },
      })
      .then(function (response) {
        setName(response.data.name);
        console.log('이름 세팅 ㅇㅋ');
        setAddress(response.data.address);
        console.log('주소도 ㅇㅋㅇㅋ');
        setBirth(response.data.birth);
        console.log('생일까지 ㅇㅋㅇㅋ');
      });
  };

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
