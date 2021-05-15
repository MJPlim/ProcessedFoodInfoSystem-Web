import React, { useEffect, useState, useAsync } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getUserAllergyInfo } from '../../api';

const MyPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('여기그거임 사용자 알러지확인하는거');
    try {
      setError(null);
      setLoading(true);
      console.log('사용자 알러지 반환');
      const { data } = getUserAllergyInfo.userAllergies();

      setData(data);
      console.log('알러지 결과 반환', data);
    } catch (e) {
      setError(e);
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          {data == null ? (
            <Col md="12">알러지 데이터 없음 </Col>
          ) : (
            <Row>
              {data.map((result, index) => (
                <Col md="2" key={index}>
                  <Col md="10">{result.data}</Col>
                </Col>
              ))}
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MyPage;
