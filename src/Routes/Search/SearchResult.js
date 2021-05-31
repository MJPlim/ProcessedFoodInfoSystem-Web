import {Link} from 'react-router-dom';
import './SearchResultStyle.scss';
const SearchResult=({loading,result})=>{

    return(
      <div className="result">
          {loading? <div>Loading...</div>:
          <div className="result__container">
              {result && result.length>0 ?
              result.map((result,index)=>(
                 <div className="card">
              
                    <div className="card-body">
                        <img className="foodImg"src={result.foodImageAddress}/>
                        <h5 className="card-title">{result.foodName}</h5>
                        <p className="card-text">{(result.manufacturerName).substring(0,9)}...</p>
                        <Link className="card-link" to={`/searchProduct/food/${result.foodId}`}>
                        <button className="go__detail">상세보기</button>
                        </Link>
                    </div>
                    
                </div>
                
               )):<div>No result</div>
            }
          </div>
          
          }
      </div>
    );
}
export default SearchResult;