import React, { useState,useEffect } from "react";
import {Spinner} from 'reactstrap';
import "./SearchStyle.scss";
import { Link } from "react-router-dom";
import {bsshApi} from "../../api";
function SearchProduct(){
    const NUM_OF_SHOW_ROWS = 5;
    const [results,setResults]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [searchTerm,setSearchTerm]=useState("검색어");
    const [isInput,setIsInput]=useState(false);
    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem('keywordsBssh') || '[]'),
    )       // 검색 기록을 위한 state

    useEffect(()=>{      
        console.log("기존 검색어",sessionStorage.getItem("searchWord"));
        setSearchTerm(sessionStorage.getItem("searchWord"));
        
        if(sessionStorage.getItem("searchWord")!=="검색어"){
            setIsInput(true);
        }
        searchByTerm(sessionStorage.getItem("searchWord"));
    },[]);
    useEffect(() => {
        //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
        localStorage.setItem('keywordsBssh', JSON.stringify(keywords))
    }, [keywords])



    const handleSubmit=event=>{
        event.preventDefault();
        if(searchTerm!==""){
            sessionStorage.setItem("searchWord",searchTerm);
            searchByTerm(searchTerm);
        }
    }

     const searchByTerm=async(searchTerm)=>{
       
        setLoading(true);
        try{
            const{data}=await bsshApi.search(searchTerm);
           
            setResults(data);
        }catch(e){
            setError(e);
            console.log(e);

        }finally{
            setLoading(false);
        }
    };

    // 검색어 입력시 keywords에 추가
    const handleAddKeyword = () => {
        for (let i = 0; i < Math.min(keywords.length, NUM_OF_SHOW_ROWS); i++) {       // 중복 저장 방지 (보여지는 부분 만큼만 처리)
            if (keywords[i].text === searchTerm) {
                return;
            }
        }
        const newKeyword = {
            id: Date.now(),
            text: searchTerm,
        }
        if (keywords.length > 100) {        // 최대 100건만 저장
            keywords.length = 100;
        }
        setKeywords([newKeyword, ...keywords]);
    }


    return(
        <div className="SearchProduct">

            <nav onSubmit={handleSubmit} className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">제품명 찾기</a>
                <form className="form-inline">
                    {isInput?(<input className="form-control mr-sm-2" type="search"  placeholder={searchTerm} list="searchHistory"
                      
                       onChange={(e)=>{
                            setSearchTerm(e.target.value);
                       }}/>):(
                           <input className="form-control mr-sm-2" type="search"  placeholder="제품명을 입력하세요" list="searchHistory"
                      
                       onChange={(e)=>{
                            setSearchTerm(e.target.value);
                       }}/>
                       )}
                    <datalist id="searchHistory">
                        {
                            keywords.slice(0, NUM_OF_SHOW_ROWS).map((item, index) => {
                                return <option key={index} value={item.text}/>
                            })
                        }
                    </datalist>
                    <button onClick={handleSubmit} onClick={handleAddKeyword} className="btn btn-outline-danger my-2 my-sm-0" type="submit">🔍</button>
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