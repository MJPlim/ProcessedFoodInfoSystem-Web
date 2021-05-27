import {Link} from 'react-router-dom';
import './SearchResultStyle.scss';
const SearchResult=({loading,result})=>{

    return(
      <div className="result">
          {loading? <div>Loading...</div>:
          <div>
              {result && result.length>0 ?
              result.map((result,index)=>(
                 <div class="card">
                <Link class="card-link" to={`food/${result.foodId}`}>
                    <div class="card-body">
                        <img className="foodImg"src={result.foodImageAddress}/>
                        <h5 class="card-title">{result.foodName}</h5>
                        <p class="card-text">{(result.manufacturerName).substring(0,9)}...</p>
                    </div>
                    </Link>
                </div>
                
               )):<div>No result</div>
            }
          </div>
          
          }
      </div>
    );
}
export default SearchResult;