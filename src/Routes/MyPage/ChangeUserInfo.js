import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { changeUserInfoApi } from 'api';

const ChangeUserInfo = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBrith] = useState('');

  var userInfoname = localStorage.getItem('name');
  var userInfoaddress = localStorage.getItem('address');
  var userInfobirth = localStorage.getItem('birth');

  const setUserName = (e) => {
    if (e.target.value === null || e.target.value === 'null') {
      setName(userInfoname);
    } else {
      setName(e.target.value);
    }
  };

  const setUserAddress = (e) => {
    if (e.target.value === null || e.target.value === 'null') {
      setAddress(userInfoaddress);
    } else {
      setAddress(e.target.value);
    }
  };

  const setUserBirth = (e) => {
    if (e.target.value === null || e.target.value === 'null') {
      setBrith(userInfobirth);
    } else {
      setBrith(e.target.value);
    }
  };

  const changeInfo = async () => {
    try {
      const response = await changeUserInfoApi.changeUserInfo(
        address,
        birth,
        name,
      );
      if (response.status == 200) {
        alert(
          name +
            '님' +
            '  생일: ' +
            birth +
            '  주소:  ' +
            address +
            '로 변경되었습니다',
        );
      }
    } catch (e) {
      alert('실패하였습니다');
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md="10">
            <p className="shownChange">내 정보 변경하기</p>
          </Col>
          <Col md="2">
            <Link to="myPage">
              <Button color="link" size="sm">
                취소
              </Button>
            </Link>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="2">
            <label for="inputName">이름</label>
          </Col>
          <Col md="10">
            <input
              type="text"
              id="inputName"
              placeholder={localStorage.getItem('name')}
              onChange={setUserName}
            />
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <label for="inputAddress">주소</label>
          </Col>
          <Col md="10">
            <input
              type="text"
              id="inputAddress"
              placeholder={localStorage.getItem('address')}
              onChange={setUserAddress}
            />
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <label for="inputBirth">생일</label>
          </Col>
          <Col md="10">
            <input
              type="text"
              placeholder={localStorage.getItem('birth')}
              onChange={setUserBirth}
            />
          </Col>
        </Row>
        <Button onClick={changeInfo}>바꾸기</Button>
      </Container>
    </div>
  );
};

export default ChangeUserInfo;
