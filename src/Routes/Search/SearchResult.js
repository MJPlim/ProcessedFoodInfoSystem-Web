import {Link} from 'react-router-dom';
import './SearchResultStyle.scss';
const SearchResult=({loading,result})=>{

    return(
      <div className="result">
          {loading? <div>Loading...</div>:
          <div>
              {result? 
              result.map((result,index)=>(
                 <div class="card">
                    <div class="card-body">
                        <img className="foodImg"src={result.foodImageAddress}/>
                        <h5 class="card-title">{result.foodName}</h5>
                        <p class="card-text">{(result.manufacturerName).substring(0,9)}...</p>
                       <Link class="card-link" to={`food/${result.foodId}`}>
                           <button className="go-detail">상세보기</button>
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