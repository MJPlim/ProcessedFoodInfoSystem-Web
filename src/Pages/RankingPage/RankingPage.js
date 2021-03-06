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
                      <div style={{fontSize:'1.5rem'}}>π</div>
                      <div style={{fontSize:'1.5rem', fontWeight:'600',display:'flex',marginBottom:'10px'}}>μ€λμ TOP 10 λκ³΅κ°</div>
                  </div>
                  <div>μΈκΈ°μλ μμ 10κ°μ  μ νλ€ μλλ€.</div>
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
