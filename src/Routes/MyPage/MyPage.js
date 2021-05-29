import React, { useEffect, useState } from 'react';
import { Button, Card, CardText, Col, Container, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getUserAllergyInfo, getUserSummary } from '../../api';
import './MyPageStyle.scss';

const MyPage = () => {
  const [data, setData] = useState([]);
  const [writtenData, setWrittenData] = useState(null);
  const [allergyLoading, setAllergyLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState(null);

  const [favouriteCount, setFavouriteCount] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const gogogetAllergy = async () => {
      setAllergyLoading(false);
      getUserAllergyInfo
        .userAllergies()
        .then((response) => {
          const result = response.data.userAllergyMaterials;
          setData(result);
          setAllergyLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const gogogetSummary = async () => {
      setUserLoading(false);
      getUserSummary
        .userSummary()
        .then((response) => {
          setUserLoading(true);
          setFavouriteCount(response.data.favorite_count);
          setReviewCount(response.data.review_count);
          setUserName(response.data.user_name);
          const { userSummary } = [favouriteCount, reviewCount, userName];
          setWrittenData({ userSummary });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    gogogetAllergy();
    gogogetSummary();
  }, []);

  if (!userLoading || !allergyLoading) return null;

  return (
    <div className='MyPage'>
      {/* IIFE 즉시 실행 함수
      <div>{setUserInformation})</div> */}
      <Container>
        <Col md='12'>
          <p className='shownPage'>마이페이지</p>
        </Col>


        <Row className={'myPageMenu'}>
          <Col sm='3'>
            <Link to='/changeUserInfo'>
              <Button color='link' size='sm' className='changeUserInfo'>
                내 정보변경하기
              </Button>
            </Link>
          </Col>
          <Col sm='3'>
            <Link to='/userAllergyInfo'>
              <Button color='link' size='sm' className='changeUserAllergyInfo'>
                알러지 정보 변경하기
              </Button>
            </Link>
          </Col>
          <Col sm='3'>
            <Link to='/changePassword'>
              <Button color='link' size='sm' className='changePassword'>
                비밀번호 변경하기
              </Button>
            </Link>
          </Col>
          <Col sm='3'>
            <Link to='/secondEmail'>
              <Button color='link' size='sm' className='setSecondEmail'>
                2차 보안 설정하기
              </Button>
            </Link>
          </Col>
        </Row>
        {/* 밑으로는 사용자 개인 정보 보여주기*/}
        <div className={'userInfoArea'}>
          <Table>
            <tr>
              <th width={'20%'}>이메일</th>
              <td width={'80%'}>{localStorage.getItem('userLoginEmail')}</td>
            </tr>
            <tr>
              <th width={'20%'}>이름</th>
              <td width={'80%'}>{localStorage.getItem('name')}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{localStorage.getItem('address')}</td>
            </tr>
            <tr>
              <th>생일</th>
              <td>{localStorage.getItem('birth')}</td>
            </tr>
            <tr>
              <th width={'20%'}>즐겨찾기 개수</th>
              <td width={'80%'}>
                <Link to='/myFavourite'>
                  {favouriteCount}
                </Link></td>
            </tr>
            <tr>
              <th width={'20%'}>리뷰 개수</th>
              <td width={'80%'}>{reviewCount}</td>
            </tr>
          </Table>

          <hr />
        </div>
        <br />
        <br />
        <div className={'userAllergyArea'}>
          <p className={'title'}>알러지 정보</p>
          {data === [] ? (
            <Col md='12'>알러지 데이터 없음 </Col>
          ) : (
            <div>
              {data.map((item, index) => (
                <Card body key={index} className={'allergyItem'}>
                  <CardText>{item}</CardText>
                </Card>
              ))}
            </div>
          )}
        </div>


        <div className={'deleteArea'}>
          <Link to='/delete'>
            <Button color='danger' size='sm'>
              회원탈퇴
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default MyPage;
