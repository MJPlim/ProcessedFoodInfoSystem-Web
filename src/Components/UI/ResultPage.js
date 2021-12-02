import React, {useEffect,useState} from 'react'
import ResultCard from './ResultCard';
function ResultPage({items,loading}) {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          {loading ? <div>Loading...</div> :
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
              {items && items.length>0 ? 
              items.map((item,idx) => (

                <ResultCard 
                id={idx} foodId={item.food.foodId} foodImg={item.food.foodImageAddress}
                foodName={item.food.foodName} foodCategory={item.food.category} foodManufac={ item.food.manufacturerName}/>
        
              )): <div>No Result</div>}
          </div>
          }
            
        </div>
    )
}

export default ResultPage
