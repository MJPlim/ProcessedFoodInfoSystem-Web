import React, { useState } from "react";
import {Spinner} from 'reactstrap';
import "./SearchStyle.scss";
import { Link } from "react-router-dom";
import {bsshApi} from "../../api";
function SearchProduct(){
    const [results,setResults]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [searchTerm,setSearchTerm]=useState(null);
    const [currentPage, setCurrentPage]=useState(1);

    const plus=()=> {
        setCurrentPage(currentPage+1);
        searchByTerm();
    }
     const minus=()=> {
         if(currentPage===1){
            alert("🔔 마지막 페이지 입니다");
         }else{
            setCurrentPage(currentPage-1);
         searchByTerm();
         }
         
    }

    const handleSubmit=event=>{
        event.preventDefault();
        //const {searchTerm}=this.state;
        if(searchTerm!==""){
            searchByTerm();
        }
    }
    const updateTerm=(event)=>{
        setSearchTerm(event.target.value);
    };

    const searchByTerm=async()=>{
        setLoading(true);
        try{
            const{data}=await bsshApi.search(searchTerm);
            for(var i=0;i<data.length;i++){
                console.log(data[i]);
            }
        setResults(data);

        }catch(e){
            setError(e);
            console.log(e);

        }finally{
            setLoading(false);
        }
    };
    return(
        <div className="SearchProduct">

            <nav onSubmit={handleSubmit} className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">회사명 찾기</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search"  placeholder="회사명을 입력하세요"
                       value={searchTerm}
                       onChange={updateTerm}/>
                    <button onClick={handleSubmit} className="btn btn-outline-danger my-2 my-sm-0" type="submit">🔍</button>  
                </form>
            </nav>
           
            <div className="resultSection">
                {loading ? (
                    <Spinner color="warning" />
                ) : (
                    <>
                        {results && results.length > 0 ? (
                            <div title="Results" className="results">
                                {results.map((result,index) => (

                                  
                                        <div class="list-group"key={index}>
                                            <button type="button" class="list-group-item list-group-item-action">
                                                 <Link to={`food/${result.foodName}`}>
                                                 <div className="searchResult">
                                                     <div><img className="foodImg" src={result.foodImageAddress}/></div>
                                                     <div className="foodInfo">
                                                           <div className="foodName">{result.foodName}</div>
                                                           <div className="bshName">{result.manufacturerName}</div>
                                                     </div>
                                                   
                                                 </div>
                                            
                                                
                                                </Link>
                                            </button>
                                        </div> 
            
                                ))}
                                <div className="pageArrow">
                                <button onClick={minus} className="leftArrow arrow">⬅</button>
                                <span className="currentPage">{currentPage}</span>
                                <button onClick={plus}className="rightArrow arrow">➡</button>
                                </div>
                            </div>
                        ):<div>검색결과가 없습니다.</div>}
                        <div className="topButton"></div>

                    </>
                )}
            </div>
        </div>
    );
}
export default SearchProduct;