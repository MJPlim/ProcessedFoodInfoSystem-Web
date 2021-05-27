import React from 'react';
import { Col, Row } from 'reactstrap';

const FoodInfoDetail = ({ food }) => {
  return (
    <div className={'foodInfoDetail'}>
      <hr className='hr' />
      <Row className='foodInfo'>
        <Col sm='6'>
          <p className='subTitle'>성분</p>
          <span className={'foodInfoDesc'}>
             {food.nutrient}
          </span>

        </Col>
        <Col sm='6'>
          <p className='subTitle'>원료</p>
          <span className={'foodInfoDesc'}>
             {food.materials}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default FoodInfoDetail;