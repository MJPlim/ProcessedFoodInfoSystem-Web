import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/all';

const FoodDetailTitle = ({food,isLogin,isFavorite, onMoveToLink, onMoveToNews,onClickFavoriteButton  }) => {
  return (
    <div>
      <Row className='titleArea'>
        <Col md='5'>
          <p className='title'>{food.foodName}</p>
        </Col>
        <Col lg='7'>
          <Button className='linkButton' onClick={onMoveToLink}>
            상품 구매하러 가기
          </Button>
          {food.manufacturerName.split('_')[0] !== '알수없음' ?
            <Button className='newsButton' onClick={onMoveToNews}>
              제조사 뉴스
            </Button> : null}
          {isLogin ? <Button className='favoriteButton' onClick={onClickFavoriteButton}>
            {!isFavorite ? <AiOutlineStar size={'1.3em'} /> : <AiFillStar size={'1.3em'} />}
          </Button> : null}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(FoodDetailTitle);