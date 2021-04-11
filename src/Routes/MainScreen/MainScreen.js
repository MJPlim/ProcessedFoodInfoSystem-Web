import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import './MainScreenStyle.scss';

function MainScreen(){
    const [results,setResults]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const getFoodList=async()=>{
            try{
                setError(null);
                setResults(null);
                setLoading(true);
                const{data:{C002:{row}}}=await axios.get("http://openapi.foodsafetykorea.go.kr/api/eaac3b4e7dc04339b011/C002/json/1/400");
                setResults(row);
            }catch(e){
                setError(e);
            }
            setLoading(false);
        };
        getFoodList();
    },[]);
    if(loading) return   <Spinner color="warning" />
    if(error) return <div>Error!!</div>
    if(!results) return null;
    return(
        <div className="resultSection">
        <div>
            {results.map(result=>(
                <div key={result.PRDLST_REPORT_NO}>
                    {result.PRDLST_NM}{result.PRDLST_NM}
                    ===================
                </div>
            ))}
        </div>
        </div>
    )
}
export default MainScreen;