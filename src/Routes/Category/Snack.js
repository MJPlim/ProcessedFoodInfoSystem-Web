import './CategoryStyle.scss';
import icon1 from '../../image/icon2.PNG';
import {bigCategory,categoryApi} from "../../api";
import { useEffect,useState } from 'react';
import CategoryResult from "./CategoryResult";
import snackImg from "../../image/categoryImg/snack1.jpg";
import { Link } from 'react-router-dom';
import {BsFillGridFill,BsChevronRight} from 'react-icons/bs';
import { FaBuilding, FaCrown } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import SearchResult from '../Search/SearchResult';
import 과자 from "../../image/categoryImg/snack/과자.png";
import 떡 from "../../image/categoryImg/snack/떡.png";
import 빵 from "../../image/categoryImg/snack/빵.png";
import 젤리 from "../../image/categoryImg/snack/젤리.png";
import 아이스크림 from "../../image/categoryImg/snack/아이스크림.png";
import 초콜릿 from "../../image/categoryImg/snack/초콜릿.png";
const Snack=()=>{
    const [result,setResult]=useState([]);
    const [totalResult,setTotalResult]=useState(0);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    const [categoryName,setCategoryName]=useState("");
    const [sort,setSort]=useState();
    useEffect(async()=>{
      console.log("마운트!");
      if(sessionStorage.getItem('categoryData')){
        setResult(JSON.parse(sessionStorage.getItem('categoryData')));
        setTotalResult(sessionStorage.getItem('totalItems'));
        console.log(result);
      }
      
        if(sessionStorage.getItem('categoryName')==="간식"){
          getBigCategory(sort);
        }
        
        
    },[]);

    const getBigCategory=async(sort)=>{
      setCategoryName("간식");
      sessionStorage.setItem('categoryName',"간식");
            
      try{
          setLoading(true);
          const {data}= await bigCategory.gotoCategory("간식",1,sort,10);
          setTotalResult(data.total_elements);
          setResult(data.data);
        sessionStorage.setItem('categoryData', JSON.stringify(data.data));

      }catch(e){
          setError(e);
          console.log(e);
      }finally{
          setLoading(false);
      }
  }

    const handleSort = async (sortType) => {
    setSort(sortType);
    sessionStorage.setItem("sort",sortType);
    if(sessionStorage.getItem('categoryData')=='간식'){
        getBigCategory(sort);
    }else{
        try{
            setLoading(true);
            const {data} = await categoryApi.category(categoryName,1,10,sortType);
            sessionStorage.setItem('totalItems',data.total_elements);
            sessionStorage.setItem('categoryData', JSON.stringify(data.data));
            sessionStorage.setItem('sortType',sortType);
            setResult(data.data);
            setTotalResult(data.total_elements);
           
         }catch(e){
            setError(e);
         }finally{
            setLoading(false);
         }
    }
  };
    const handleCategory=async(e)=>{
         sessionStorage.setItem('category', e.target.value);
         setCategoryName(e.target.value);
         console.log("버튼",categoryName);
         
         try{
            setLoading(true);
            const {data} = await categoryApi.category(categoryName,1,10,sort);
            sessionStorage.setItem('totalItems',data.total_elements);
            sessionStorage.setItem('categoryData', JSON.stringify(data.data));
            setResult(data);
            setTotalResult(data.total_elements);
            console.log("소분류: ",data);
         }catch(e){
            setError(e);
         }finally{
            setLoading(false);
         }
    }
    return (
        <div className="category__container">
            <div className="category__list">
                <div className="item__category list-group category__list">
         
          <Link to="/category/snack"><li class='list-group-item category_big'>간식</li></Link>
          <button
            type='button'
            value='과자'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            과자
          </button>
          <button
            type='button'
            value='떡'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            떡
          </button>
          <button
            type='button'
            value='빵'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            빵
          </button>
          <button
            type='button'
            value='사탕/껌/젤리'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            사탕/껌/젤리
          </button>
          <button
            type='button'
            value='아이스크림'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            아이스크림
          </button>
          <button
            type='button'
            value='초콜릿'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            초콜릿
          </button>

          <Link to="/category/tea">
              <li class='list-group-item category_big'>음료/차</li>
              </Link> 
          <button
            type='button'
            value='음료'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            음료
          </button>
          <button
            type='button'
            value='커피'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            커피
          </button>

          <button
            type='button'
            value='커피/차'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            커피/차
          </button>
          <Link to="/category/milk">
          <li class='list-group-item category_big'>유제품</li>
          </Link>
          <button
            type='button'
            value='유제품'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            유제품
          </button>
          <Link to="/category/food">
          <li class='list-group-item category_big'>농수산물</li>
          </Link>
          <button
            type='button'
            value='계란'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            계란
          </button>
          <button
            type='button'
            value='과일/채소'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            과일/채소
          </button>
          <button
            type='button'
            value='김'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            김
          </button>
          <button
            type='button'
            value='수산물'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            수산물
          </button>
          <button
            type='button'
            value='견과'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            견과
          </button>
          <button
            type='button'
            value='곡류'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            곡류
          </button>
          <Link to="/category/kimchi">
          <li class='list-group-item category_big'>김치</li>
          </Link>
          <button
            type='button'
            value='김치'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            김치
          </button>
          <button
            type='button'
            value='젓갈'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            젓갈
          </button>
            <Link to="/category/con">
          <li class='list-group-item category_big'>조미료</li>
          </Link>
          <button
            type='button'
            value='설탕'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            설탕
          </button>
          <button
            type='button'
            value='소금'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            소금
          </button>
          <button
            type='button'
            value='소스'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            소스
          </button>
          <button
            type='button'
            value='장류'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            장류
          </button>
          <Link to="/category/mealKit">
          <li class='list-group-item category'>즉석조리식품</li>
          </Link>
          <button
            type='button'
            value='즉석조리식품'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            즉석조리식품
          </button>
          <button
            type='button'
            value='국수'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            국수
          </button>
          <button
            type='button'
            value='두부'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            두부
          </button>
          <button
            type='button'
            value='식용유'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            식용유
          </button>
          <button
            type='button'
            value='어묵'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            어묵
          </button>
          <Link to="/category/etc">
          <li class='list-group-item category_big'>기타</li>
          </Link>
          <button
            type='button'
            value='기타가공품'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            기타가공품
          </button>
         </div>
            </div>
            <div className="category__show">
                <div className="category__line">
                   
                <p className="category__title"> <BsFillGridFill/> CATEGORY <BsChevronRight/> 간식</p><hr></hr>
                </div>
                <div className="category__items">
                    <div className="item">
                         <button value="과자"onClick={handleCategory} className="category__item">
                           <img className="item__img" src={과자}/>
                         </button>
                         <p className="category__name">과자</p>
                    </div>
                     <div className="item">
                         <button value="사탕/껌/젤리"onClick={handleCategory} className="category__item">
                           <img className="item__img" src={젤리}/>
                         </button>
                          <p className="category__name">사탕/껌/젤리</p>
                    </div>
                     <div className="item">
                         <button value="떡" onClick={handleCategory} className="category__item">
                            <img className="item__img" src={떡}/>
                         </button>
                          <p className="category__name">떡</p>
                    </div>
                     <div className="item">
                         <button value="빵"onClick={handleCategory} className="category__item">
                           <img className="item__img" src={빵}/>
                         </button>
                          <p className="category__name">빵</p>
                    </div>
                     <div className="item">
                         <button value="아이스크림"onClick={handleCategory} className="category__item">
                            <img className="item__img"src={아이스크림}/>
                         </button>
                         
                          <p className="category__name">아이스크림</p>
                    </div>
                      <div className="item">
                         <button value="초콜릿" onClick={handleCategory} className="category__item">
                           <img className="item__img"src={초콜릿}/>
                         </button>
                          <p className="category__name">초콜릿</p>
                    </div>
            
            </div>
             <div>
                <nav class="navbar navbar-light bg-light justify-content-between">
              <a class="navbar-brand">검색결과({totalResult})</a>
              <div className="form-check__group">
                    <div class='form-check'>
                      <input type='button' onClick={() => handleSort('ranking')} class='form-check-input' type='radio'
                            name='flexRadioDefault' id='flexRadioDefault2' />
                      <label class='form-check-label' for='flexRadioDefault2'>
                        오름차순
                      </label>
                    </div>
                    <div class='form-check'>
                      <input type='button' onClick={() => handleSort('reviewCount')} class='form-check-input' type='radio'
                            name='flexRadioDefault' id='flexRadioDefault2' />
                      <label class='form-check-label' for='flexRadioDefault2'>
                        내림차순
                      </label>
                    </div>

                    <div class='form-check'>
                      <input type='button' onClick={() => handleSort('viewCount')} class='form-check-input' type='radio'
                            name='flexRadioDefault' id='flexRadioDefault2' />
                      <label class='form-check-label' for='flexRadioDefault2'>
                        조회수
                      </label>
                    </div>
              </div>
        </nav>
            </div>
             <SearchResult className='searchResult' loading={loading} result={result} sort={sort}/>
            </div>
        </div>
    );
}
export default Snack;