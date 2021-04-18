import React, { useState } from "react";
import {Spinner} from 'reactstrap';
import "./SearchStyle.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
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
            const{data}=await bsshApi.search(searchTerm,1);
            for(var i=0;i<data.length;i++){
                console.log(data[i]);
            }
            setResults(data);

        }catch{
            setError("검색결과가 없습니다.");
        }finally{
            setLoading(false);
        }
    };
    return(
        <div className="SearchProduct">
            <form onSubmit={handleSubmit} className="form">
                <input className="searchTab"
                       placeholder="제품명 또는 회사명을 입력하세요"
                       value={searchTerm}
                       onChange={updateTerm}
                />
                <button className="searchBtn"onClick={handleSubmit}>🔍</button>
            </form>
            <div className="resultSection">
                {loading ? (
                    <Spinner color="warning" />
                ) : (
                    <>
                        {results && results.length > 0 ? (
                            <div title="Results" className="results">
                                {results.map((result,index) => (

                                    <div className="item" key={index}>
                                        <Link to={`food/${result.prdlstReportNo}`} className="prdName">{result.prdlstName}</Link>
                                        <div><img className="img" src="image/no-image.png"/></div>
                                        <div className="bshName">{result.bsshName}</div>
                                        <div className="rowMaterial">{result.rawMaterialName}</div>
                                        <div className="prdNum">{result.lcnsNo}</div>
                                        <hr></hr>
                                    </div>
                                ))}
                                    <div className="pageArrow">
                                <button onClick={minus} className="leftArrow arrow">⬅</button>
                                <span className="currentPage">{currentPage}</span>
                                <button onClick={plus}className="rightArrow arrow">➡</button>
                                </div>
                            </div>
                        ):<div>검색결과가 없습니다.</div>}

                    </>
                )}
            </div>
        </div>
    );
}
export default SearchProduct;