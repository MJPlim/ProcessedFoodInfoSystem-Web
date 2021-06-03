import {Link} from 'react-router-dom';
import './SearchResultStyle.scss';
const SearchResult=({loading,result})=>{

    return(
      <div className="result">
          {loading? <div>Loading...</div>:
          <div className="result__container">
              {result && result.length>0 ?
              result.map((result,index)=>(
                    <div className="card-body">
                        <Link className="card-link" to={`/searchProduct/food/${result.foodId}`}>
                            <img className="foodImg"src={result.foodImageAddress}/>
                            <h5 className="card-title">{result.foodName}</h5>
                            <p className="card-text">{(result.manufacturerName).split('_')[0]}</p>
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