import React, { useState,useEffect } from "react";
import {Spinner} from 'reactstrap';
import "./SearchStyle.scss";
import { Link } from "react-router-dom";
import {foodApi} from "../../api";

function SearchProduct(){
    const [results,setResults]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [searchTerm,setSearchTerm]=useState("검색어");
    const [isInput,setIsInput]=useState(true);
    const [a,b]=useState("");
    useEffect(()=>{
       
        console.log("기존 검색어",sessionStorage.getItem("searchFood"));
         setSearchTerm(sessionStorage.getItem("searchFood"));
         if(sessionStorage.getItem("searchFood")==="검색어"){
            setIsInput(false);
        }
        searchByTerm(sessionStorage.getItem("searchFood"));
    },[]);

    const handleSubmit=event=>{
        event.preventDefault();
        if(searchTerm!==""){
            sessionStorage.setItem("searchFood",searchTerm);
            searchByTerm(searchTerm);
        }
    }
    const searchByTerm=async(searchTerm)=>{
        console.log("searchByTerm",searchTerm);
        setLoading(true);
        try{
            const{data}=await foodApi.search(searchTerm);
            
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
                <a className="navbar-brand">제품명 찾기</a>
                <form className="form-inline">
                    {isInput?(<input className="form-control mr-sm-2" type="search"  placeholder={searchTerm}
                      
                       onChange={(e)=>{
                            setSearchTerm(e.target.value);
                       }}/>):(
                           <input className="form-control mr-sm-2" type="search"  placeholder="제품명을 입력하세요"
                      
                       onChange={(e)=>{
                            setSearchTerm(e.target.value);
                       }}/>
                       )}
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
                                                 <Link to={`food/${result.foodId}`} >
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