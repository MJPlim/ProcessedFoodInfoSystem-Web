import React from 'react';
import { Card, CardText, CardTitle, Col, Row } from 'reactstrap';

const FoodInfoDetail = ({ food }) => {
  return (
    <div className={'foodInfoDetail'}>
      <Row className='foodInfo'>
        <Col sm='6'>
          <Card body className={'nutrient'}>
            <CardTitle className={'title'}>성분</CardTitle>
            <CardText className={'foodInfoDesc'}>{food.nutrient}</CardText>
          </Card>
        </Col>
        <Col sm='6'>
          <Card body className={'materials'}>
            <CardTitle className={'title'}>원료</CardTitle>
            <CardText className={'foodInfoDesc'}>  {food.materials}</CardText>
          </Card>
        </Col>



        {/*<Col sm='6'>*/}
        {/*  <p className='subTitle'>성분</p>*/}
        {/*  <span className={'foodInfoDesc'}>*/}
        {/*     {food.nutrient}*/}
        {/*  </span>*/}

        {/*</Col>*/}
        {/*<Col sm='6'>*/}
        {/*  <p className='subTitle'>원료</p>*/}
        {/*  <span className={'foodInfoDesc'}>*/}
        {/*     {food.materials}*/}
        {/*  </span>*/}
        {/*</Col>*/}
      </Row>
    </div>
  );
};

export default FoodInfoDetail;