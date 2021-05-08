import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ChangeUserInfo = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBrith] = useState('');

  var token = localStorage.getItem('authorization');

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

  const changeInfo = () => {
    console.log('유저 정보 바꾸기 시작!! 보냄보냄');
    axios({
      url: 'http://13.124.55.59:8080/api/v1/user/modify-user-info',
      method: 'POST',
      data: {
        address: address,
        birth: birth,
        name: name,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          alert('성공데스네~ 여기가 유저 정보 바꾸고 보내기까지 ㅇㅋ된 부분');
        }
      })
      .catch((error) => {
        const status = error.response.status;
        alert(status);
      });
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
