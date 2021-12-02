import React, { useState,useEffect } from 'react';
import { getReviewRankingApi } from '../../api';
import ResultCard from '../../Components/UI/ResultCard'
import {Row,Col} from 'reactstrap'
import { Link } from 'react-router-dom';
function RankingPage() {
    const [ranking,setRanking] = useState(null);

    const getRankingItems = async ()=>{
        await getReviewRankingApi.getReviewRanking()
        .then((response) => {
          setRanking(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
      }
    useEffect(() => {
        getRankingItems()
      }, []);

    return (
        <Row className="big__name">
            <Col md='11'>
                  <div style={{display:'flex',alignItems:'center'}}>
                      <div style={{fontSize:'1.5rem'}}>🎉</div>
                      <div style={{fontSize:'1.5rem', fontWeight:'600',display:'flex',marginBottom:'10px'}}>오늘의 TOP 10 대공개</div>
                  </div>
                  <div>인기있는 상위 10개의  제품들 입니다.</div>
            </Col>
            <hr/>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
              {ranking && ranking.length>0 ? 
              ranking.map((item,idx) => (
                <ResultCard 
                id={idx} foodId={item.foodId} foodImg={item.foodImageAddress}
                foodName={item.foodName} foodCategory={item.category} />
                
              )): <div>No Result</div>}
          
          </div>
        </div>
        </Row>
    )
}

export default RankingPage
