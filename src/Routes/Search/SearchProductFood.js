import React, {useEffect, useState} from "react";
import {Spinner} from 'reactstrap';
import {FaBuilding,FaCrown} from 'react-icons/fa';
import {IoIosPaper} from 'react-icons/io';
import "./SearchStyle.scss";import {Link} from "react-router-dom";
import {foodApi,sortApi, getAdvertisementFoodApi} from "../../api";

function SearchProduct() {
    var [enter,setEnter]=useState(1);
    const NUM_OF_SHOW_ROWS = 5;
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("검색어");
    const [isInput, setIsInput] = useState(true);
    const [sortType,setSortType]=useState("");
    const [data, setData] = useState(
       null
    )       // 이전 검색 결과
    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem('keywordsFood') || '[]'),
    )       // 검색 기록을 위한 state
    const [adFoods, setAdFoods] = useState(null);

    useEffect(() => {
        console.log("검색어",searchTerm);
        console.log("기존 검색어", sessionStorage.getItem("searchFood"));
        setSearchTerm(sessionStorage.getItem("searchFood"));
        if (sessionStorage.getItem("searchFood") === "검색어") {
            setIsInput(false);
        }
        getAd();
    }, []);

    useEffect(() => {
        //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
        localStorage.setItem('keywordsFood', JSON.stringify(keywords))
        const beforeData = JSON.parse(sessionStorage.getItem("data"));
        setResults(beforeData);
    }, [keywords,data])


    const handleSubmit = event => {
        event.preventDefault();
        if (searchTerm !== "") {
            sessionStorage.setItem("searchFood", searchTerm);
            searchByTerm(searchTerm);
            getAd();
        }
    }
    const searchByTerm = async (searchTerm) => {
        console.log("searchByTerm", searchTerm);
        setLoading(true);
        try {
            const {data} = await foodApi.search(searchTerm);
            sessionStorage.setItem('data',JSON.stringify(data));
            setData(sessionStorage.getItem('data'));
            setResults(data);
            console.log("검색결과 데이터",data);
            

        } catch (e) {
            setError(e);
            console.log(e);

        } finally {
            setLoading(false);
        }
    };

    const getAd = async () => {
        console.log("getAD 실행");
        setLoading(true);
        try {
            setAdFoods(null);
            const {data} = await getAdvertisementFoodApi.getAdFood();
            setAdFoods(data);

        } catch (e) {
            setError(e);
        } finally {
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
    const handleSort=async(e)=>{
        
        console.log("sort by",e.target.value);
        setLoading(true);
        try{
            const {data:{resultList}}=await sortApi.sortBy(searchTerm,e.target.value);
            console.log("sort 검색어",searchTerm);
            console.log("정렬된 데이터",resultList);
            console.log("개수",resultList);
            setResults(resultList);
            sessionStorage.setItem('data',JSON.stringify(resultList));
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="SearchProduct">
            <nav onSubmit={handleSubmit} className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">제품명 찾기</a>
                <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search" list="searchHistory"
                               placeholder={searchTerm}

                               onChange={(e) => {
                                   setSearchTerm(e.target.value);
                               }}/>
                    <datalist id="searchHistory">
                        {
                            keywords.slice(0, NUM_OF_SHOW_ROWS).map((item, index) => {
                                return <option key={index} value={item.text}/>
                            })
                        }
                    </datalist>
                    <button onClick={handleSubmit} onClick={handleAddKeyword}
                            className="btn btn-outline-danger my-2 my-sm-0" type="submit">🔍
                    </button>

                </form>
            </nav>

            <div className="resultSection">
                  <div className="selectType">
                                           <button className="btnSort"onClick={handleSort} value="ranking"><FaCrown></FaCrown>카티 랭킹순</button>                      
                                           <button className="btnSort"onClick={handleSort} value="reviewCount"><IoIosPaper></IoIosPaper>리뷰순</button>     
                                           <button className="btnSort"onClick={handleSort} value="manufacturer"><FaBuilding></FaBuilding>제조사 별</button>     
                                </div>
                {loading ? (
                    <Spinner color="warning"/>
                ) : (
                    <>
                        {results && results.length > 0 && adFoods ? (
                            <div title="Results" className="results">
                                {/*광고 리스트 시작 */}
                                {adFoods.map((result, index) => (
                                    <div className="list-group" key={index}>
                                        <button type="button" className="list-group-item list-group-item-action">
                                            <Link to={{
                                                pathname: `food/${result.food.foodId}`,
                                                state: {
                                                    adId: result.id,
                                                }
                                            }}>
                                                <div className="searchResult">
                                                    <div><img className="foodImg" src={result.food.foodImageAddress}/>
                                                    </div>
                                                    <div className="foodInfo">
                                                        <div className="foodName">{result.food.foodName}</div>
                                                        <div className="bshName">{result.food.manufacturerName}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="bshName">광고상품</div>
                                        </button>
                                    </div>
                                ))}
                                {/*광고 리스트 끝 */}
                               
                                {results.map((result, index) => (
                                    <div class="list-group" key={index}>
                                        <button type="button" class="list-group-item list-group-item-action">
                                            <Link to={`food/${result.foodId}`}>
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
                        ) : <div>검색결과가 없습니다.</div>}
                        <div className="topButton"></div>

                    </>
                )}
            </div>
        </div>
    );
}

export default SearchProduct;