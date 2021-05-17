import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './HeaderStyle.scss';
import axios from 'axios';

function LoginState(props) {
  const checkLogin = props.auli;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  //이거 사용안했음 혹시 몰라서 일단 내둠
  const getUserAllergies = () => {
    console.log('유저 알러지 가져오기 메소드');
    axios
      .get('http://13.124.55.59:8080/api/b1/user/readUserAllergy', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: checkLogin,
        },
      })
      .then((response) => {
        console.log('데이터 받아서 넣는거 시작 ㅇ-ㅇ');

        uN = response.data.userA;
        localStorage.setItem('allergy', userA);
        console.log('이름 세팅 ㅇㅋ');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loginAgain = () => {
    console.log(
      '메인에서 로그인 토큰 값이 들어가있으면 어차피 다시 받아야 하기에 다시해서 토큰 값 받아옴',
    );

    setEmail(localStorage.getItem('userLoginEmail'));
    setPassword(localStorage.getItem('userLoginPassword'));

    axios({
      url: 'http://13.124.55.59:8080/login',
      method: 'POST',
      data: {
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('새롭게 토큰 받아오기 ------------------');
        token = response.headers.authorization;
        console.log(token);
        localStorage.setItem('authorization', token);
        alert('새로운 토큰 잘 받아왔슴 땡큐 베리 머치');
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          //console.log("fail");
          alert(
            '입력된 정보가 잘못되었음 여기 헤더에서 하는 부분이니까 다시 살펴봐주셈.',
          );
        }
      });
  };

  if (checkLogin !== 'null') {
    return (
      <div className="buttons">
        <Link
          className="logoutBtn"
          onClick={() => {
            localStorage.setItem('authorization', null);
            localStorage.set('userLoginEmail', null);
            localStorage.set('userLoginPassword', null);
            alert('로그아웃!');
          }}
        >
          로그아웃
        </Link>
        <Link to="/mypage" className="myPageBtn" onClick={setUserInformation}>
          마이페이지
        </Link>
        <Link to="/myFavourite" className="myFavouriteBtn">
          즐겨찾기
        </Link>
      </div>
    );
  } else if (checkLogin === 'null') {
    return (
      <div className="buttons">
        <Link to="/login" className="loginBtn">
          로그인
        </Link>
        <Link to="/join" className="joinBtn">
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
    <div className="topsection">
      <li className="logoPosition" current={pathname === '/'}>
        <Link className="logo" to="/">
          kati
        </Link>
      </li>
      <div className="searchTab">
        {/* <input className="searchInput" placeholder="제품명 또는 회사명을 입력하세요"/>
        <button className="searchBtn">🔍</button> */}
      </div>
      <LoginState auli={localStorage.getItem('authorization')} />
    </div>

    <ul>
      <Item current={pathname === '/'}>
        <Link to="/">메인</Link>
      </Item>
      <Item current={pathname === '/commercialProduct'}>
        <Link to="/commercialProduct">광고상품</Link>
      </Item>
      <Item current={pathname === '/recommendedProduct'}>
        <Link to="/recommendedProduct">추천상품</Link>
      </Item>
      <Item current={pathname.includes('/searchProduct/food')}>
        <Link to="/searchProduct/food">상품찾기</Link>
      </Item>
      <Item current={pathname === '/community'}>
        <Link to="/community">커뮤니티</Link>
      </Item>
      <Item current={pathname === '/userRanking'}>
        <Link to="/userRanking">유저랭킹</Link>
      </Item>
      <Item current={pathname === '/productRanking'}>
        <Link to="/productRanking">제품랭킹</Link>
      </Item>
      <Item current={pathname === '/reviews'}>
        <Link to="/reviews">리뷰</Link>
      </Item>
      <Item current={pathname === '/whatsKati'}>
        <Link to="/whatsKati">카티란?</Link>
      </Item>
      <Item current={pathname === '/howToUse'}>
        <Link to="/howToUse">카티사용법</Link>
      </Item>
    </ul>
  </header>
));
