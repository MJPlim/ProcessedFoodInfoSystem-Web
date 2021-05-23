import React,{useEffect,useState} from 'react';
import './SearchTabStyle.scss';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse, Button, CardBody, Card
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
import { FaBuilding, FaCrown,FaAllergies } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';


const SearchTab=(props)=>{

    
    //드롭다운 부분
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
    //알러지 토글 부분
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

    //옵션 선택
    const [option, setOption] = useState('식품명');
    //초기 설정 부분
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    //검색어부분
    const [searchTerm,setSearchTerm]=useState(null);
    //검색결과 데이터
    const [result,setResult]=useState(null);
    //이전 검색 결과
    const [data, setData] = useState(null); 
    //정렬방식 선택
    const [sort,setSort]=useState('ranking');
    //알레르기 배열
    let allergyList=[];
    const [allergies,setAllergies]=useState([]);
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
    console.log(allergyList);
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
   const handleSort=async(sortType)=>{
     console.log("정렬방법: ",sortType);
     console.log("검색어:",searchTerm);
     try{
      setLoading(true);
      const {data:{resultList}}=await  sortApi.sortBy(searchTerm,sortType);
      console.log(resultList);
      setResult(resultList);
      sessionStorage.setItem('data', JSON.stringify(resultList));
     }catch(sortType){
      setError(sortType);
     }finally{
       setLoading(false);
     }
   }
   const handleAllergy=(allergy)=>{
     console.log("--알러지--",allergy);
    allergyList.push(allergy);
   }

    return(
        <div className="tabResult">

          {/* 검색창 */}
         <div className="inputGroup">
            <InputGroup>
        <InputGroupButtonDropdown
          addonType="prepend"
          isOpen={splitButtonOpen}
          toggle={toggleSplit}
        >
          <Button className="dropdown" outline>
            {option}
          </Button>
          <DropdownToggle className="dropdown dropdownArrow" split />
          <DropdownMenu className="dropdown">
            <DropdownItem onClick={() => setOption('식품명')}>
              식품명
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => setOption('제조사명')}>
              제조사명
            </DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input
          placeholder="검색어를 입력하세요"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="search"
          className="input"
        />
       
        <InputGroupAddon addonType="append">
          <Button onClick={handleSubmit}>🔍</Button>
        </InputGroupAddon>
      </InputGroup>
      <Button className="allergyBtn" onClick={toggle} >
       <FaAllergies/> 
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
          <p>알레르기를 체크하세요</p>
          <div class="form-check">
          <input onClick={()=>handleAllergy("아몬드")} class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
          <label class="form-check-label" for="defaultCheck1">
            아몬드
          </label>
          </div>
          <div class="form-check">
          <input onClick={()=>handleAllergy("우유")} class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
          <label class="form-check-label" for="defaultCheck1">
            우유
          </label>
          </div>
          <div class="form-check">
          <input onClick={()=>handleAllergy("밀")}  class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
          <label class="form-check-label" for="defaultCheck1">
            밀
          </label>
          </div>
          </CardBody>
        </Card>
      </Collapse>
        </div>
      
      <div className="downSection">
            {/* 카테고리 */}
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
            {/* 정렬방식 */}
          <div className="selectType list-group resultPage sortBy">
                   <div class="form-check">
                  <input type="button" onClick={()=>handleSort("ranking")}class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                 <label class="form-check-label" for="flexRadioDefault2">
                      <FaCrown></FaCrown>랭킹순
                  </label>
                </div>
                <div class="form-check">
                  <input type="button" onClick={()=>handleSort("reviewCount")} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                  <label class="form-check-label" for="flexRadioDefault2">
                     <IoIosPaper></IoIosPaper>리뷰순
                 </label>
                </div>

                <div class="form-check">
                  <input type="button" onClick={()=>handleSort("manufacturer")} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                  <label class="form-check-label" for="flexRadioDefault2">
                    <FaBuilding></FaBuilding>제조사별
                  </label>
                </div>
              </div>
          <SearchResult className="searchResult" loading={loading} result={result} />
          
          </div>
        
      </div>
      
      </div>
    );
}
export default SearchTab;