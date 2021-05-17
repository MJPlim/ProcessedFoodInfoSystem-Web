import React, {useEffect, useState} from "react";
import {Spinner} from 'reactstrap';
import {FaBuilding,FaCrown} from 'react-icons/fa';
import {IoIosPaper} from 'react-icons/io';
import "./SearchStyle.scss";import {Link} from "react-router-dom";
import {foodApi,sortApi,categoryApi,getAdvertisementFoodApi, manufacturerApi} from "../../api";
import NoResult from '../ErrorPage/NoResult';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

function SearchProduct(props) {
    
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const [splitButtonOpen, setSplitButtonOpen] = useState(false);
     const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
     const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
    const [option,setOption]=useState("식품명");

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
        }if(searchTerm===null){
            setData(null);
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
            if(option==="식품명"){
                 const {data:{resultList}} = await foodApi.search(searchTerm);
                 sessionStorage.setItem('data',JSON.stringify(resultList));
                 setData(sessionStorage.getItem('data'));
                 setResults(resultList);
                 console.log("검색결과 데이터",resultList);
            }else{
                 const {data:{resultList}} = await manufacturerApi.search(searchTerm);
                 sessionStorage.setItem('data',JSON.stringify(resultList));
                 setData(sessionStorage.getItem('data'));
                 setResults(resultList);
                 console.log("검색결과 데이터",resultList);
            }
           
           
            

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
         sessionStorage.setItem("searchFood",searchTerm);
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
    const handleCategory=async(e)=>{
        console.log("category",e.target.value);
        setSearchTerm(e.target.value);
        sessionStorage.setItem("searchFood",searchTerm);
        setLoading(true);
        try{
            const {data:{data}}=await categoryApi.category(e.target.value);
            console.log(data);
            setResults(data);
            sessionStorage.setItem('data',JSON.stringify(data));
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="SearchProduct">
          
            
               <InputGroup>
        <InputGroupButtonDropdown addonType="prepend" isOpen={splitButtonOpen} toggle={toggleSplit}>
          <Button className="dropdown" outline>{option}</Button>
          <DropdownToggle className="dropdown dropdownArrow" split  />
          <DropdownMenu className="dropdown">
            <DropdownItem onClick={()=>setOption("식품명")}>식품명</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={()=>setOption("제조사명")}>제조사명</DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input placeholder="검색어를 입력하세요"
        onChange={(e) => {
                                   setSearchTerm(e.target.value);
                               }}
        type="search" list="searchHistory"
        />
         <datalist id="searchHistory">
                        {
                            keywords.slice(0, NUM_OF_SHOW_ROWS).map((item, index) => {
                                return <option key={index} value={item.text}/>
                            })
                        }
                    </datalist>
        <InputGroupAddon  addonType="append"><Button onClick={handleSubmit} >🔍</Button></InputGroupAddon>
      </InputGroup>
            
            <div className="bottomSection">
                    <div className="list-group categoryGroup">
                         <li class="list-group-item category">카테고리</li>
                        <button type="button" value="두부"className="list-group-item list-group-item-action" onClick={handleCategory}>두부</button>
                        <button type="button" value="버터" className="list-group-item list-group-item-action" onClick={handleCategory}>버터</button>
                        <button type="button" value="치즈" className="list-group-item list-group-item-action" onClick={handleCategory}>치즈</button>
                        <button type="button" value="유제품" className="list-group-item list-group-item-action"  onClick={handleCategory}>유제품</button>
                          <button type="button" value="햄/소시지" className="list-group-item list-group-item-action" onClick={handleCategory}>햄/소시지</button>
                        <button type="button" value="육류" className="list-group-item list-group-item-action" onClick={handleCategory}>육류</button>
                        <button type="button" value="라면" className="list-group-item list-group-item-action" onClick={handleCategory}>라면</button>
                        <button type="button" value="국수" className="list-group-item list-group-item-action"  onClick={handleCategory}>국수</button>
                          <button type="button" value="소금" className="list-group-item list-group-item-action" onClick={handleCategory}>소금</button>
                        <button type="button" value="설탕" className="list-group-item list-group-item-action" onClick={handleCategory}>설탕</button>
                        <button type="button" value="장류" className="list-group-item list-group-item-action" onClick={handleCategory}>장류</button>
                        <button type="button" value="소스" className="list-group-item list-group-item-action"  onClick={handleCategory}>소스</button>
                          <button type="button" value="과일/채소" className="list-group-item list-group-item-action" onClick={handleCategory}>과일/채소</button>
                        <button type="button" value="식용유" className="list-group-item list-group-item-action" onClick={handleCategory}>식용유</button>
                        <button type="button" value="과자" className="list-group-item list-group-item-action" onClick={handleCategory}>과자</button>
                        <button type="button" value="떡" className="list-group-item list-group-item-action"  onClick={handleCategory}>떡</button>
                        <button type="button" value="빙과" className="list-group-item list-group-item-action" onClick={handleCategory}>빙과</button>
                        <button type="button" value="사탕/껌/젤리" className="list-group-item list-group-item-action" onClick={handleCategory}>사탕/껌/젤리</button>
                        <button type="button" value="초콜릿" className="list-group-item list-group-item-action" onClick={handleCategory}>초콜릿</button>
                        <button type="button" value="수산물" className="list-group-item list-group-item-action"  onClick={handleCategory}>수산물</button>
                          <button type="button" value="빵" className="list-group-item list-group-item-action" onClick={handleCategory}>빵</button>
                        <button type="button" value="영,유아식" className="list-group-item list-group-item-action" onClick={handleCategory}>영,유아식</button>
                        <button type="button" value="감치" className="list-group-item list-group-item-action" onClick={handleCategory}>김치</button>
                        <button type="button" value="김" className="list-group-item list-group-item-action"  onClick={handleCategory}>김</button>
                          <button type="button" value="계란" className="list-group-item list-group-item-action" onClick={handleCategory}>계란</button>
                        <button type="button" value="견과" className="list-group-item list-group-item-action" onClick={handleCategory}>견과</button>
                        <button type="button" value="주류" className="list-group-item list-group-item-action" onClick={handleCategory}>주류</button>
                        <button type="button" value="곡류" className="list-group-item list-group-item-action"  onClick={handleCategory}>곡류</button>
                          <button type="button" value="젓갈" className="list-group-item list-group-item-action" onClick={handleCategory}>젓갈</button>
                        <button type="button" value="커피/차" className="list-group-item list-group-item-action" onClick={handleCategory}>커피/차</button>
                        <button type="button" value="음료" className="list-group-item list-group-item-action" onClick={handleCategory}>음료</button>
                        <button type="button" value="즉석조리식품" className="list-group-item list-group-item-action"  onClick={handleCategory}>즉석조리식품</button>
                          <button type="button" value="기타가공품" className="list-group-item list-group-item-action" onClick={handleCategory}>기타가공품</button>
                        <button type="button" value="아이스크림" className="list-group-item list-group-item-action" onClick={handleCategory}>아이스크림</button>
                   

                    </div>
                    <div className="resultSection">
                         
                           {loading ? (
                    <Spinner color="warning"/>
                ) : (
                    <>
                    
                        {results && results.length > 0 && adFoods ? (
                            <div title="Results" className="results">
                                {/*광고 리스트 시작 */}
                                {adFoods.map((result, index) => (
                                    <div className="list-group resultPage" key={index}>
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

                                <div className="selectType list-group resultPage">
                                    <button className="list-group-item list-group-item-action "onClick={handleSort} value="ranking"><FaCrown></FaCrown>카티 랭킹순</button>                      
                                    <button className="list-group-item list-group-item-action"onClick={handleSort} value="reviewCount"><IoIosPaper></IoIosPaper>리뷰순</button>     
                                    <button className="list-group-item list-group-item-action"onClick={handleSort} value="manufacturer"><FaBuilding></FaBuilding>제조사 별</button>     
                                </div>
                                <div className="result ">
                                {results.map((result, index) => (
                                    <div class="list-group resultList" key={index}>
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
                            </div>
                            
                        ) : <div className="errorPage"><NoResult></NoResult></div>}
                       
                        
                    </>
                )}
                
                    </div>
                 </div>

            
        </div>
    );
}

export default SearchProduct;