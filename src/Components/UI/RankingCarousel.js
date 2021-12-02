import React from 'react'
import {Card,CardImg,CardImgOverlay,CardText,CardTitle} from 'reactstrap'
import rankingImg from '../../Images/ad/mainAd2.jpg'
function RankingCarousel() {
    return (
        <div>
           <div>
  <Card inverse height="300px">
    <CardImg
      alt="Card image cap"
      src={rankingImg}
      width="100%"
      height="50%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5" style={{color:'black',fontWeight:'600',fontSize:'2rem',marginTop:'250px'}}>
        TOP 10!!
      </CardTitle>
      <CardText style={{color:'black',fontWeight:'500',fontSize:'1rem'}}>
        현재 리뷰 랭킹 상위 10개 상품을 공개합니다.
      </CardText>
      <CardText style={{color:'black',fontWeight:'500',fontSize:'1rem'}}>
        가면을 벗어주세요!!
      </CardText>
      <CardText>
        <small className="text-muted">
          *별점 순
        </small>
      </CardText>
    </CardImgOverlay>
  </Card>
</div>
        </div>
    )
}

export default RankingCarousel
