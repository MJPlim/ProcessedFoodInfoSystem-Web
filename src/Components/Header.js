import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './HeaderStyle.scss';
import axios from 'axios';
import {
  Row,
  Container,
  Navbar,
  Nav,
  Form,
  Button,
  FormGroup,
  Dropdown,
  DropdownItem,
  NavLink,
} from 'reactstrap';
import logo from '../image/logo.png';
function LoginState(props) {
  const checkLogin = props.auli;
  console.log(checkLogin);
  console.log('main main ');

  var uN, uA, uB, userA, token;

  const setUserInformation = () => {
    console.log('유저 정보 가져오기 메소드');
    axios
      .get('http://13.124.55.59:8080/api/v1/user/user-info', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: checkLogin,
        },
      })
      .then((response) => {
        console.log('데이터 받아서 넣는거 시작 ㅇ-ㅇ');

        uN = response.data.name;
        localStorage.setItem('name', uN);
        console.log('이름 세팅 ㅇㅋ');

        uA = response.data.address;
        localStorage.setItem('address', uA);
        console.log('주소도 ㅇㅋㅇㅋ');

        uB = response.data.birth;
        localStorage.setItem('birth', uB);
        console.log('생일까지 ㅇㅋㅇㅋ');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (checkLogin !== 'null') {
    return (
      <div className="buttons">
        <Link
          className="logoutBtn, buttonGroup"
          onClick={() => {
            localStorage.setItem('authorization', null);
            localStorage.setItem('userLoginEmail', null);
            localStorage.setItem('userLoginPassword', null);
            localStorage.setItem('userBEmail', null);
            localStorage.setItem('userBPassword', null);
            alert('로그아웃!');
          }}
        >
          로그아웃
        </Link>
        <Link
          to="/mypage"
          className="myPageBtn, buttonGroup"
          onClick={setUserInformation}
        >
          마이페이지
        </Link>
        <Link to="/myFavourite" className="myFavouriteBtn, buttonGroup">
          즐겨찾기
        </Link>
      </div>
    );
  } else if (checkLogin === 'null') {
    return (
      <div className="buttons">
        <Link to="/login" className="loginBtn, buttonGroup">
          로그인
        </Link>
        <Link to="/join" className="joinBtn, buttonGroup">
          회원가입
        </Link>
      </div>
    );
  }
}

const Item = styled.li`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 80px;
  height: 30px;
  text-align: center;
  text-decoration: none;
  border-bottom: 4px solid
    ${(props) => (props.current ? ' #ED2F3B' : 'transparent')};
  transition: border-bottom 0.3s ease-in-out;
`;

//컴포넌트에서 라우터에 접근 현재 어떤 컴포넌트인지 라우터도 알수 있음!
export default withRouter(({ location: { pathname } }) => (
  <header>
    <div className="headerJS">
      <Container>
        <Row>
          <div className="topsection">
            <LoginState auli={localStorage.getItem('authorization')} />
          </div>
        </Row>

        <Navbar className="mainNav" bg="light" variant="light"></Navbar>
        <Row>
          <div className="serviceName">
            <Link className="logo" to="/">
             <img src={logo}/>
            </Link>
          </div>
        </Row>
      </Container>

      <Navbar className="mainNav" bg="light" variant="light"></Navbar>

      <div className="navMom">
        <Navbar bg="light" expand="lg" className="navigationGroup">
          <Nav className="mainLink">
            <NavLink className="links">
              <Link to="/searchProduct/food">상품찾기</Link>
            </NavLink>
            <NavLink className="links">
              <Link to="/productRanking">제품랭킹</Link>
            </NavLink>
            <NavLink className="links">
              <Link to="/about">KATI 개발팀</Link>
            </NavLink>
          </Nav>
        </Navbar>
      </div>
    </div>
  </header>
));
