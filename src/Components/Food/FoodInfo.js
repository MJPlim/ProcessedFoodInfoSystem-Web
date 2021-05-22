import React from 'react';
import FoodImageCarousel from './FoodImageCarousel';
import { Col, Row, Table } from 'reactstrap';

const FoodInfo = ({food}) => {
  return (
    <div>
      <Row className='bottomBorderLine'>
        <FoodImageCarousel image={food.foodImageAddress} metaImage={food.foodMeteImageAddress} />
        <Table>
          <tr>
            <th>
              상품명
            </th>
            <td>
              {food.foodName}
            </td>
          </tr>
          <tr>
            <th>
              제조사
            </th>
            <td>
              {food.manufacturerName.split('_')[0]}
            </td>
          </tr>
          <tr>
            <th>
              카테고리
            </th>
            <td>
              {food.category.split('_')[0]}
            </td>
          </tr>
          <tr>
            <th>
              알레르기 성분
            </th>
            <td>
              {food.allergyMaterials.split('_')[0]}
            </td>
          </tr>
        </Table>
      </Row>
      {/*상품 정보 좌측 하단 영역 시작 */}
      <hr className='hr' />
      <Row className='foodInfo'>
        <Col sm='6'>
          <p className='subTitle'>성분</p>
          {food.nutrient}
        </Col>
        <Col sm='6'>
          <p className='subTitle'>원료</p>
          {food.materials}
        </Col>
      </Row>
      {/*상품 정보 좌측 하단 영역 끝 */}
    </div>
  );
};

export default React.memo(FoodInfo);