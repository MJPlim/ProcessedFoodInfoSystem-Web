import { useState } from "react";
import { useEffect } from "react";
import { FaBuilding, FaCrown, FaAllergies } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import SearchResult from '../Search/SearchResult';
import {
  sortApi,bigCategory
} from '../../api';
const CategoryResult=(category)=>{
    useEffect(async()=>{
        const {data}=bigCategory.gotoCategory(category,1,sort,10);
        console.log(data);
      
    },[]);
    const [categoryName,setCategoryName]=useState("");
 const [result, setResult] = useState(null);
  //이전 검색 결과
  const [data, setData] = useState(null);
  //정렬방식 선택
  const [sort, setSort] = useState('ranking');
    //초기 설정 부분
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //검색어부분
  const [searchTerm, setSearchTerm] = useState(null);
    //정렬방법

  const [allergyLoading,setAllergyLoading]=useState(false);
  const [allergyList,setAllergyList]=useState([]);

  const handleSort = async (sortType) => {
    console.log('정렬방법: ', sortType);
    console.log('검색어:', searchTerm);
    try {
      setLoading(true);
      const { data: { data } } = await sortApi.sortBy(searchTerm, sortType,allergyList);
      console.log(data);
      setResult(data);
      sessionStorage.setItem('data', JSON.stringify(data));
    } catch (sortType) {
      setError(sortType);
    } finally {
      setLoading(false);
    }
  };

    return(
        <div>
             <div className='selectType list-group resultPage sortBy'>
         <p className="result">검색결과</p>
         <div className="form-check__group">
            <div class='form-check'>
              <input type='button' onClick={() => handleSort('ranking')} class='form-check-input' type='radio'
                     name='flexRadioDefault' id='flexRadioDefault2' />
              <label class='form-check-label' for='flexRadioDefault2'>
                <FaCrown></FaCrown>랭킹순
              </label>
            </div>
            <div class='form-check'>
              <input type='button' onClick={() => handleSort('reviewCount')} class='form-check-input' type='radio'
                     name='flexRadioDefault' id='flexRadioDefault2' />
              <label class='form-check-label' for='flexRadioDefault2'>
                <IoIosPaper></IoIosPaper>리뷰순
              </label>
            </div>

            <div class='form-check'>
              <input type='button' onClick={() => handleSort('manufacturer')} class='form-check-input' type='radio'
                     name='flexRadioDefault' id='flexRadioDefault2' />
              <label class='form-check-label' for='flexRadioDefault2'>
                <FaBuilding></FaBuilding>제조사별
              </label>
            </div>
          </div>
          </div>
          {/* 결과부분 */}
        <SearchResult className='searchResult' loading={loading} result={result}/>
        </div>
    );
}
export default CategoryResult;