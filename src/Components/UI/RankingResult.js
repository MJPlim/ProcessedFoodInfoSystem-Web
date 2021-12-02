import React, {useEffect,useState} from 'react'
import RankingCarousel from './RankingCarousel';
import {FaAward} from 'react-icons/fa'
import { Link } from 'react-router-dom';
function RankingResult({items,loading}) {
    const [rankingItems,setRankingItems] = useState(null);
    useEffect(() => {
        console.log("ranking resultpage",items);
        setRankingItems(items);
    }, [])
    return (
        <div style={{display:'grid',gridTemplateColumns:'3fr 1fr'}}>
           <div style={{display:'flex',flewWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          {loading ? <div>Loading...</div> :
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',}}>
              {items && items.length>0 ? 
              items.map((item,idx) => (

                idx < 4 ? <Link to ={{pathname:`search/${item.foodId}`}}>
                      <div className="item_card" id={idx} style={{display:'grid',width:'350px',height:'320px',gridTemplateRows:'0.2fr 1fr 0.5fr',
                                borderRadius:'5px',marginRight:'1rem',marginBottom:'1.5rem'}}>
                            <div><FaAward className="item_heart" size="60" color="#FE6F6E"/></div>
                           
                            <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                            <img src = {item.foodImageAddress} width="200px" height="160px" style={{borderBottom:"1px solid gray"}}/>
                              <div style={{marginTop:'10px', fontWeight:'600',color:'black'}}>{item.foodName}</div>
                              <div style={{ marginTop:'10px',color:'black'}}> {item.foodId} {item.category}</div>
                          </div>
                      </div>
                </Link> : <div></div> 
         
              )): <div>No Result</div>}
          </div>
          }
            
        </div>
            </div>
        
            <div>
               <RankingCarousel/>
           </div>
           
        </div>
    )
}

export default RankingResult
