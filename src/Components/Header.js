import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './HeaderStyle.scss';

function LoginState(props) {
  const checkLogin = props.auli;
  console.log(checkLogin);
  console.log('main main ');
  if (checkLogin !== 'null') {
    return (
      <div className="buttons">
        <Link to="/logout" className="logoutBtn">
          로그아웃
        </Link>
        <Link to="/mypage" className="myPageBtn">
          마이페이지
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
            <li className="logoPosition" current={pathname === "/"}>
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
      <Item current={pathname.includes('/searchProduct')}>
        <Link to="/searchProduct">상품찾기</Link>
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
