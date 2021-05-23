import React,{useEffect,useState} from 'react';
import './SearchTabStyle.scss';
import {
  InputGroup,
  Input,
 Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import SearchResult from'./SearchResult';
import {
  foodApi,
  sortApi,
  categoryApi,
  getAdvertisementFoodApi,
  manufacturerApi,
  allergyApi
} from '../../api';
import { FaBuilding, FaCrown } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
const SearchTab=(props)=>{
   // console.log("searchTab: ",searchTerm);
    
    //드롭다운 부분
      const [dropdownOpen, setDropdownOpen] = useState(false);

      const toggle = () => setDropdownOpen(prevState => !prevState);
      const [lastClicked, setLastClicked] = useState(null);


    //옵션 선택
    const [option, setOption] = useState('null');
    //초기 설정 부분
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    //검색어부분
    const [searchTerm,setSearchTerm]=useState(null);
    //검색결과 데이터
    const [result,setResult]=useState(null);
    //이전 검색 결과
     const [data, setData] = useState(null); 

    //마운팅 될 때
    useEffect(()=>{
      if(sessionStorage.getItem('searchTerm') && sessionStorage.getItem('data')){
        setSearchTerm(sessionStorage.getItem('searchTerm'));
        console.log('이전 검색어: ',searchTerm);
        setResult(JSON.parse(sessionStorage.getItem('data')));
        console.log('이전 검색 결과',result);
      }
    },[data]);
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm !== null&& searchTerm.length!==0) {
      sessionStorage.setItem('searchTerm', searchTerm);
      try{
        setLoading(true);
        if(option==="식품명"){
             const {data: { resultList }}=await foodApi.search(searchTerm);
              sessionStorage.setItem('data', JSON.stringify(resultList));
              
              setResult(resultList);
              console.log('검색결과 데이터', resultList);
        }else{
             const {data: { resultList }}=await manufacturerApi.search(searchTerm);
             setResult(resultList);
              sessionStorage.setItem('data', JSON.stringify(resultList));
        }
      }catch(e){
        setError(e);
      }finally{
        setLoading(false);
      }
      //getAd();
    }else{
        setError("검색결과가 없습니다!");
    }
  };
    const handleCategory = async (e) => {
    console.log('category', e.target.value);
    setSearchTerm(e.target.value);
    sessionStorage.setItem('searchFood', searchTerm);
    setLoading(true);
    try {
      const {
        data: { data },
      } = await categoryApi.category(e.target.value);
      console.log(data);
      setResult(data);
      sessionStorage.setItem('data', JSON.stringify(data));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
   const handleSort=async(e)=>{
     console.log("정렬방법: ",e.target.value);
     console.log("검색어:",searchTerm);
     try{
      setLoading(true);
      const {data:{resultList}}=await  sortApi.sortBy(searchTerm,e.target.value);
      console.log(resultList);
      setResult(resultList);
      sessionStorage.setItem('data', JSON.stringify(resultList));
     }catch(e){
      setError(e);
     }finally{
       setLoading(false);
     }
     sortApi.sortBy(searchTerm,e.target.value);

   }
    return(
        <div className="tabResult">

         <div className="inputGroup">
          <div class="form-check form-check-inline">
            <input onClick={()=>setOption("식품명")} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
            <label className="form-check-label" for="inlineRadio1">식품명</label>
          </div>
          <div  className="form-check form-check-inline">
            <input onClick={()=>setOption("제조사명")} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
            <label className="form-check-label" for="inlineRadio2">제조사명</label>
          </div>
          <InputGroup className="inputGroup">
            <Input className="input"
              placeholder="검색어를 입력하세요"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="search"
              list="searchHistory"
                 />
            <button  onClick={handleSubmit} >🔍</button>
          </InputGroup>
        </div>

      <div className="downSection">
          <div className="list-group categoryGroup">
           <li class="list-group-item category">간식</li>
               <button
            type="button"
            value="과자"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            과자
          </button>
          <button
            type="button"
            value="떡"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            떡
          </button>
          <button
            type="button"
            value="빵"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            빵
          </button>
          <button
            type="button"
            value="사탕/껌/젤리"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            사탕/껌/젤리
          </button>
          <button
            type="button"
            value="아이스크림"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            아이스크림
          </button>
            <button
            type="button"
            value="초콜릿"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            초콜릿
          </button>

           <li class="list-group-item category">음료/차</li>
                 <button
            type="button"
            value="음료"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            음료
          </button>
            <button
            type="button"
            value="커피"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            커피
          </button>

                 <button
            type="button"
            value="커피/차"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            커피/차
          </button>
          <li class="list-group-item category">유제품</li>
           <button
            type="button"
            value="계란"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            유제품
          </button>
           <li class="list-group-item category">농수산물</li>
          <button
            type="button"
            value="계란"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            계란
          </button>
          <button
            type="button"
            value="과일/채소"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            과일/채소
          </button>
          <button
            type="button"
            value="김"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            김
          </button>
          <button
            type="button"
            value="수산물"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            수산물
          </button>
          <button
            type="button"
            value="견과"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            견과
          </button>
          <button
            type="button"
            value="곡류"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            곡류
          </button>
           <li class="list-group-item category">김치</li>
          <button
            type="button"
            value="김치"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            김치
          </button>
          <button
            type="button"
            value="젓갈"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            젓갈
          </button>
          
           <li class="list-group-item category">조미료</li>
            <button
            type="button"
            value="설탕"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            설탕
          </button>
           <button
            type="button"
            value="소금"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            소금
          </button>
           <button
            type="button"
            value="소스"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            소스
          </button>
           <button
            type="button"
            value="장류"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            장류
          </button>
           <li class="list-group-item category">즉석조리식품</li>
          <button
            type="button"
            value="즉석조리식품"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            즉석조리식품
          </button>
          <button
            type="button"
            value="국수"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            국수
          </button>
          <button
            type="button"
            value="두부"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            두부
          </button>
          <button
            type="button"
            value="식용유"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            식용유
          </button>
          <button
            type="button"
            value="어묵"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            어묵
          </button>
           <li class="list-group-item category">기타</li>
          <button
            type="button"
            value="기타가공품"
            className="list-group-item list-group-item-action"
            onClick={handleCategory}
          >
            기타가공품
          </button>
        
        </div>
          <div className="foodResult">
            <div className="selectType list-group resultPage sortBy">
                    <button
                      className="list-group-item list-group-item-action "
                      onClick={handleSort}
                      value="ranking"
                    >
                      <FaCrown></FaCrown>카티 랭킹순
                    </button>
                    <button
                      className="list-group-item list-group-item-action"
                      onClick={handleSort}
                      value="reviewCount"
                    >
                      <IoIosPaper></IoIosPaper>리뷰순
                    </button>
                    <button
                      className="list-group-item list-group-item-action"
                      onClick={handleSort}
                      value="manufacturer"
                    >
                      <FaBuilding></FaBuilding>제조사 별
                    </button>
                   
                  </div>
                   <SearchResult className="searchResult" loading={loading} result={result} />
          </div>
        
      </div>
      
      </div>
    );
}
export default SearchTab;