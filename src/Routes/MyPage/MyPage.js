import React, { useEffect, useState, useAsync } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getUserAllergyInfo, getWrittenReport } from '../../api';
import axios from 'axios';

const MyPage = () => {
  const [data, setData] = useState();
  const [writtenData, setWrittenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [favouriteCount, setFavouriteCount] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(async() => {
    console.log('MyPage 에서 알아서 알러지 가져오는 부분임');
    axios
      .get('http://13.124.55.59:8080/api/v1/user/readUserAllergy', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('authorization'),
        },
      })
      .then((response) => {
       const result=response.data.userAllergyMaterials;
       setData(result);
       console.log("데이터: ",result);
       console.log("데이터 개수: ",result.length);
      })
      .then((error) => {
        console.log(error);
        console.log('없으면 unde');
      });
  }, []);
  // useEffect(async () => {
  //   try{
  //     setLoading(true);
  //       const { data:{allergyList} } = await getUserAllergyInfo.userAllergies();
  //       console.log("알러지",allergyList);
  //       sessionStorage.setItem('userAllergy', JSON.stringify(allergyList));
    
  //       console.log(sessionStorage.getItem('userAllergy'));
  //   }catch(e){
  //     setError(e);
  //   }
  
  
    //const userAllergyInfo = JSON.parse(sessionStorage.getItem('userAllergy'));
   // setUserAllergyMaterials(allergyList);
    //console.log('여기 알러지 담긴 데이터 부분 출력함');
    //console.log("알러지",allergyList);
    //console.log('여기서 끊김');
  //}, []);

  useEffect(() => {
    console.log('여기는 사용자 자신 흔적 확인하는거');
    axios
      .get('http://13.124.55.59:8080/api/v1/user/summary', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('authorization'),
        },
      })
      .then((response) => {
        console.log(response.data.favorite_count);
        setFavouriteCount(response.data.favorite_count);
        console.log(response.data.review_count);
        setReviewCount(response.data.review_count);
        console.log(response.data.user_name);
        setUserName(response.data.user_name);
        const { userSummary } = [favouriteCount, reviewCount, userName];
        setWrittenData({ userSummary });
      })
      .then((error) => {
        console.log('에러부분');
        console.log(error);
        console.log('----에러없으면 undefined임');
      });
  }, []);

  return (
    <div className="MyPage">
      {/* IIFE 즉시 실행 함수
      <div>{setUserInformation})</div> */}
      <Container>
        <Row>
          <Col md="2">
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
            <Link to="/userAllergyInfo">
              <Button color="link" size="sm" className="changeUserAllergyInfo">
                알러지 정보 변경하기
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
            <Link to="/secondEmail">
              <Button color="link" size="sm" className="setSecondEmail">
                2차 보안 설정하기
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
        <hr />
        <br />
        <br />
        <Row>
          {data === null ?(
            <Col md="12">알러지 데이터 없음 </Col>
          ) : (
            <Row>
              <Col md="12">{data.map((allergy,index)=>(
                <div>
                  {allergy}
                </div>
              ))}</Col>
              <Col md="12"></Col>
            </Row>
          )}
        </Row>
        <hr />
        <br />
        <br />
        <Row>
          {writtenData == null ? (
            <Col md="12">사용자 개인 데이터 없음 </Col>
          ) : (
            <Row>
              <Col md="4">
                <div>사용자 즐겨찾기 개수</div>
              </Col>
              <Col md="8">
                <div>{favouriteCount}</div>
              </Col>
              <Col md="4">
                <div>사용자 리뷰 개수</div>
              </Col>
              <Col md="8">
                <div>{reviewCount}</div>
              </Col>
              <Col md="4">
                <div>사용자 이름</div>
              </Col>
              <Col md="8">
                <div>{userName}</div>
              </Col>
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MyPage;
