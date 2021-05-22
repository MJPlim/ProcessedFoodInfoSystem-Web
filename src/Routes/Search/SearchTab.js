import React,{useEffect,useState} from 'react';
import './SearchTabStyle.scss';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
const SearchTab=()=>{
   // console.log("searchTab: ",searchTerm);
    
    //드롭다운 부분
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [splitButtonOpen, setSplitButtonOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
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

    //마운팅 될 때
    useEffect(()=>{
      if(sessionStorage.getItem('searchTerm') && sessionStorage.getItem('data')){
        setSearchTerm(sessionStorage.getItem('searchTerm'));
        console.log('이전 검색어: ',searchTerm);
        setResult(JSON.parse(sessionStorage.getItem('data')));
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
    return(
        <div className="tabResult">
         <InputGroup className="inputGroup">
        <InputGroupButtonDropdown
          addonType="prepend"
          isOpen={splitButtonOpen}
          toggle={toggleSplit}
          className="searchTab"
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
        <Input className="input"
          placeholder="검색어를 입력하세요"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="search"
          list="searchHistory"
        />

        <InputGroupAddon >
          <Button  onClick={handleSubmit} >🔍</Button>
        </InputGroupAddon>
      </InputGroup>
      <div className="result">
      <SearchResult className="searchResult" loading={loading} result={result} />
      </div>
      </div>
    );
}
export default SearchTab;