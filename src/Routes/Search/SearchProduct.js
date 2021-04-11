import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import axios from 'axios';
function SearchProduct(){
  const [results,setResults]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [searchTerm,setSearchTerm]=useState(null);

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
            const{data:{C002:{row}}}=await axios.get("http://openapi.foodsafetykorea.go.kr/api/eaac3b4e7dc04339b011/C002/json/1/400");
            const newResults=[];
            for(var i=0;i<row.length;i++){
              if(row[i].PRDLST_NM.includes(searchTerm) || row[i].BSSH_NM.includes(searchTerm)){
                newResults.push(row[i]);
              }
            }
            setResults(newResults);
          
       }catch{
           setError("검색결과가 없습니다.");
       }finally{
            setLoading(false);
        }
       };
        return( 
        <SearchPresenter
        results={results}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
        updateTerm={updateTerm}
        />);
}
export default SearchProduct;