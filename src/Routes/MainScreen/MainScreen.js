import React, { useState } from 'react';
import './MainScreenStyle.scss';

import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import productSet from '../../image/kati.PNG';
import 간식 from '../../image/bigCategoryImg/간식.jpg';
import 기타 from '../../image/bigCategoryImg/기타.jpg';
import 김치 from '../../image/bigCategoryImg/김치.jpg';
import 농수산물 from '../../image/bigCategoryImg/농수산물.jpg';
import 유제품 from '../../image/bigCategoryImg/유제품.jpg';
import 조미료 from '../../image/bigCategoryImg/조미료.jpg';
import 즉석조리식품 from '../../image/bigCategoryImg/즉석조리식품.jpg';
import 차음료 from '../../image/bigCategoryImg/차음료.jpg';
import 육류 from '../../image/bigCategoryImg/육류.jpg';
import 식재료 from '../../image/bigCategoryImg/식재료.jpg';

import { getProductRanking, getAd } from '../../api';
import { useEffect } from 'react/cjs/react.development';
import ResultPage from './ResultPage';
import {FiArrowRightCircle} from 'react-icons/fi';

function MainScreen() {
  const [result, setResult] = useState(null);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adLoad, setAdLoad] = useState(true);

  const [snack,setSnack]=useState(false);
  const [tea,setTea]=useState(false);

  const updateProductRanking = async () => {
    await getProductRanking
      .mainPage()
      .then((response) => {
        setResult(response.data);
        setLoading(false);
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    await getAd
      .atMainPage()
      .then((response) => {
        setAd(response.data);
        setAdLoad(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    updateProductRanking();
  }, []);


  const onClickCategory = e => {
    // 새로운 메뉴 진입시 검색 관련 세션 초기화
    sessionStorage.removeItem('categoryName');
    sessionStorage.removeItem('selectedPage');
    sessionStorage.removeItem('selectedSort');
    sessionStorage.removeItem('selectedOption');
    sessionStorage.removeItem('allergyList')
    sessionStorage.removeItem('allergyCheck')


  };
  const handleCategoryImg=(e)=>{
    console.log("value: ",e);
    switch(e){
      case "간식": setSnack(true); setTea(false);
                    break;
      case "차음료":setSnack(false); setTea(true);
                    break;
    }
  }

  return (
    <div className='mainScreen'>
      <br />
      <br />
      <Container>
        <Row>
          <Col md='1'>
            <img className='productSet' src={productSet} />
          </Col>
          <Col md='11'>
            <p className='titleBar'>카테고리</p>
          </Col>
        </Row>
        <hr />
        <div className='category__items'>
          <div className='item' >
            <Link to='/category/snack'>
            <figure class="snip1384">
                  <img src={간식} alt="sample83" />
                  <figcaption>
                    <h3>간식</h3>
                    <p>과자/떡/빵/사탕.껌.젤리/아이스크림/초콜릿</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          </div>

           <div className='item' >
            <Link to='/category/snack'>
               <figure class="snip1384">
                  <img src={차음료} alt="sample83" />
                  <figcaption>
                    <h3>차/음료</h3>
                    <p>음료/커피/커피.차 </p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
         
          </div>

          <div className='item'>
            <Link to='/category/milk' name={'유제품'}>
               <figure class="snip1384">
                  <img src={유제품} alt="sample83" />
                  <figcaption>
                    <h3>유제품</h3>
                    <p>유제품</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          
          </div>
          <div className='item'>
            <Link to='/category/milk' name={'육류'}>
               <figure class="snip1384">
                  <img src={육류} alt="sample83" />
                  <figcaption>
                    <h3>육류</h3>
                    <p>육류/햄.소시지</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
        
          </div>
          <div className='item'>
            <Link to='/category/milk' name={'식재료'}>
               <figure class="snip1384">
                  <img src={식재료} alt="sample83" />
                  <figcaption>
                    <h3>식재료</h3>
                    <p>국수/두부/식용유/어묵</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          
          </div>
          <div className='item'>
            <Link to='/category/food' name={'농수산물'}>
             <figure class="snip1384">
                  <img src={농수산물} alt="sample83" />
                  <figcaption>
                    <h3>농수산물</h3>
                    <p>계란/과일.채소/김/수산물/견과/곡류</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
            
          </div>
          <div className='item'>
            <Link to='/category/condi' name={'조미료'}>
              <figure class="snip1384">
                  <img src={조미료} alt="sample83" />
                  <figcaption>
                    <h3>조미료</h3>
                    <p>설탕/소금/소스/장류</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
          
          </div>
          <div className='item'>
            <Link to='/category/kimchi' name={'김치'}>
              <figure class="snip1384">
                  <img src={김치} alt="sample83" />
                  <figcaption>
                    <h3>김치</h3>
                    <p>김치/젓갈</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
        
          </div>
          <div className='item'>
            <Link to='/category/mealKit' name={'즉석조리식품'}>
                <figure class="snip1384">
                  <img src={즉석조리식품} alt="sample83" />
                  <figcaption>
                    <h3>즉석조리식품</h3>
                    <p>즉석조리식품</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>

            </Link>
          </div>
          <div className='item'>
            <Link to='/category/etc' name={'기타가공품'}>
                <figure class="snip1384">
                  <img src={기타} alt="sample83" />
                  <figcaption>
                    <h3>기타가공품</h3>
                    <p>기타가공품</p>
                    <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                  </figcaption>
           
                </figure>
            </Link>
     
          </div>
        </div>
        <div>
          <Row>
            <Col md='1'>
              <img className='productSet' src={productSet} />
            </Col>
            <Col md='11'>
              <p className='titleBar'>광고 상품</p>
            </Col>
          </Row>
          <hr />
          {!adLoad && (
            // <div className="setUp">
            <div>
              <div className='cardGroup'>
                <Row>
                  {ad.map((result) => (
                    <Col xs={'4'}>
                      <Link
                        to={{
                          pathname: `searchProduct/food/${result.food.foodId}`,
                          state: {
                            adId: result.id,
                          },
                        }}
                      >
                        <Card className='eachAdCard'>
                          <CardBody className='adcardTop'>
                            <CardTitle tag='h5'>
                              {result.food.foodName}
                            </CardTitle>
                            <CardSubtitle tag='h6' className='mb-2 text-muted'>
                              {result.food.category.split('_')[0]}
                            </CardSubtitle>
                          </CardBody>
                          <Link
                            to={{
                              pathname: `searchProduct/food/${result.food.foodId}`,
                              state: {
                                adId: result.id,
                              },
                            }}
                          >
                            <img
                              className='adImage'
                              width='40%'
                              height='40%'
                              src={result.food.foodImageAddress}
                            />
                          </Link>
                          <CardBody className='showProps'>
                            <CardText>
                              {result.food.manufacturerName.split('_')[0]}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}
        </div>

        <div>
          <Row>
            <Col md='1'>
              <img className='productSet' src={productSet} />
            </Col>
            <Col md='11'>
              <p className='titleBar'>인기 상품</p>
            </Col>
          </Row>
          <hr />
       <ResultPage loading={loading} result={result}/>
        </div>
      </Container>
    </div>
  );
}

export default MainScreen;
