import './SearchStyle.scss';
import {searchApi,getUserAllergyInfo } from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillGridFill, BsChevronRight } from 'react-icons/bs';
import{RiSearch2Line}from 'react-icons/ri';
import { FaBuilding } from 'react-icons/fa';
import {HiEye} from 'react-icons/hi';
import {GiFruitBowl}from 'react-icons/gi';
import {AiOutlineFilter} from 'react-icons/ai';
import SearchResult from '../Search/SearchResult';
import {
  InputGroupAddon,Collapse, Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import 광고1 from '../../image/ad/광고1.jpg';
import 광고2 from '../../image/ad/광고2.jpg';
import 광고3 from '../../image/ad/광고3.jpg';

const SearchProductFood = (props) => {
  //광고 이미지
  const items = [
   {
      src: 광고1,
    },
    {
      src: 광고2,
    },
    {
      src:광고3,
    }
];

  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle2 = () => setIsOpen2(!isOpen2);
   const [isOpen3, setIsOpen3] = useState(false);
  const toggle3 = () => setIsOpen3(!isOpen3);
  const [isOpen4, setIsOpen4] = useState(false);
  const toggle4 = () => setIsOpen4(!isOpen4);
   const [isOpen5, setIsOpen5] = useState(false);
  const toggle5 = () => setIsOpen5(!isOpen5);
  const [isOpen6, setIsOpen6] = useState(false);
  const toggle6 = () => setIsOpen6(!isOpen6);
   const [isOpen7, setIsOpen7] = useState(false);
  const toggle7 = () => setIsOpen7(!isOpen7);
  const [isOpen8, setIsOpen8] = useState(false);
  const toggle8 = () => setIsOpen8(!isOpen8);

   //알러지
  const [allergyLoading,setAllergyLoading]=useState(false);

  const [result, setResult] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //옵션 선택
  const [option, setOption] = useState('식품명');
  //파라미터
  const [searchTerm,setSearchTerm]=useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [sort, setSort] = useState('ranking');
  const [order,setOrder]=useState('asc');
  const [allergyList,setAllergyList]=useState([]);

  // 검색 기록을 위한 state
  const [foodKeywords, setFoodKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForName') || '[]'),
  );
  const [bsshKeywords, setBsshKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForBssh') || '[]'),
  );
  const NUM_OF_SHOW_ROWS = 5; // 최대 저장 검색어
  //페이징 부분
  const [pageSize,setPageSize]=useState(10);
  const [totalItems,setTotalItems]=useState(0);
  const [currentPage,setCurrentPage]=useState(1);
  const [lastPage,setLastPage]=useState(1);
  
  //광고부분
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });
  useEffect(()=>{
    setting();
  },[foodKeywords, bsshKeywords,sort,totalItems]);

  const setting=()=>{

    if(props.location.state!==undefined){
        setSearchTerm(props.location.state.searchTerm);
        console.log("전달된 값",searchTerm);
        handleSubmit();
        console.log(totalItems);
        props.location.state.searchTerm=null;
        
    }else{
      if (sessionStorage.getItem('searchTerm') && sessionStorage.getItem('data')) {
      //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
      localStorage.setItem('keywordsFoodForName', JSON.stringify(foodKeywords));
      localStorage.setItem('keywordsFoodForBssh', JSON.stringify(bsshKeywords));

      setSearchTerm(sessionStorage.getItem('searchTerm'));
      console.log('이전 검색어: ', searchTerm);
      setResult(JSON.parse(sessionStorage.getItem('data')));

      console.log('이전 검색 결과', result);
    }
  }
  };
  //검색버튼 누를때
  const handleSubmit = async () => {
  
    console.log('체크된 알러지',allergyList);
    if (searchTerm !== null && searchTerm.length !== 0) {
      sessionStorage.setItem('searchTerm', searchTerm);
      try {
     
          if (option === '식품명') {
             const {data}= await searchApi.search(allergyList,"",searchTerm,"",order,currentPage,pageSize,sort);
             setTotalItems(data.total_elements);
             setLastPage(data.total_page);
             
             console.log("결과",data.data);
             sessionStorage.setItem('data', JSON.stringify(data.data));
             setResult(data.data);
     
          } else {
            const {data}= await searchApi.search(allergyList,"","",searchTerm,order,currentPage,pageSize,sort);
           setTotalItems(data.total_elements);
             setLastPage(data.total_page);
             
             console.log("결과",data.data);
             sessionStorage.setItem('data', JSON.stringify(data.data));
             setResult(data.data);
          }
       
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      handleAddKeyword();
     
    } else {
      setError('검색결과가 없습니다!');
    }
  };
  const handleSort=()=>{
    console.log("asd");
  }

   // 검색어 입력시 keywords에 추가
  const handleAddKeyword = () => {
    if (option === '식품명') {
      for (let i = 0; i < Math.min(foodKeywords.length, NUM_OF_SHOW_ROWS); i++) {
        // 중복 저장 방지 (보여지는 부분 만큼만 처리)
        if (foodKeywords[i].text === searchTerm) {
          return;
        }
      }
      const newKeyword = {
        id: Date.now(),
        text: searchTerm,
      };
      if (foodKeywords.length > 100) {
        // 최대 100건만 저장
        foodKeywords.length = 100;
      }
      setFoodKeywords([newKeyword, ...foodKeywords]);
    } else {
      for (let i = 0; i < Math.min(bsshKeywords.length, NUM_OF_SHOW_ROWS); i++) {
        // 중복 저장 방지 (보여지는 부분 만큼만 처리)
        if (bsshKeywords[i].text === searchTerm) {
          return;
        }
      }
      const newKeyword = {
        id: Date.now(),
        text: searchTerm,
      };
      if (bsshKeywords.length > 100) {
        // 최대 100건만 저장
        bsshKeywords.length = 100;
      }
      setBsshKeywords([newKeyword, ...bsshKeywords]);
    }

  };
  const handleAllergy=async()=>{
      setAllergyLoading(true);
     await getUserAllergyInfo
        .userAllergies()
        .then((response) => {
          const result = response.data.userAllergyMaterials;
          console.log("알러지",result);
          setAllergyList(result);
          alert(result);
         
        })
        .catch((error) => {
          alert("로그인을 하세요");
        });

  }
  return (
    <div className='category__container'>
      <div className='category__list'>
      <div className='item__category list-group category__list'>
      <button className="bigCategoryBtn list-group-item" color="primary" onClick={toggle1} style={{ marginBottom: '1rem' }}>간식</button>
      <Collapse className="category__big"isOpen={isOpen1}>
       
          <Link to='/category/snack'>
          <button
            type='button'
            value='과자'
            className='list-group-item list-group-item-action'
            
          >
            과자
          </button>
          </Link>
          <Link to='/category/snack'>
          <button
            type='button'
            value='떡'
            className='list-group-item list-group-item-action'
    
          >
            떡
          </button>
          </Link>
          <Link to='/category/snack'>
          <button
            type='button'
            value='빵'
            className='list-group-item list-group-item-action'
    
          >
            빵
          </button>
          </Link>
          <Link to='/category/snack'>
          <button
            type='button'
            value='사탕/껌/젤리'
            className='list-group-item list-group-item-action'
            on
          >
            사탕/껌/젤리
          </button>
          </Link>
          <Link to='/category/snack'>
          <button
            type='button'
            value='아이스크림'
            className='list-group-item list-group-item-action'
            
          >
            아이스크림
          </button>
          </Link>
          <Link to='/category/snack'>
          <button
            type='button'
            value='초콜릿'
            className='list-group-item list-group-item-action'
        
          >
            초콜릿
          </button>
           </Link>
         
      </Collapse>


      <button className="bigCategoryBtn list-group-item" onClick={toggle2} style={{ marginBottom: '1rem' }}>음료/차</button>
      <Collapse isOpen={isOpen2}>
       
          <Link to='/category/tea'>
          <button
            type='button'
            value='음료'
            className='list-group-item list-group-item-action'

          >
            음료
          </button>
          </Link>
          <Link to='/category/tea'>
          <button
            type='button'
            value='커피'
            className='list-group-item list-group-item-action'
          >
            커피
          </button>
           </Link>
            <Link to='/category/tea'>
          <button
            type='button'
            value='커피/차'
            className='list-group-item list-group-item-action'

          >
            커피/차
          </button>
           </Link>
      </Collapse>

      <button className="bigCategoryBtn list-group-item" onClick={toggle3} style={{ marginBottom: '1rem' }}>유제품</button>
      <Collapse isOpen={isOpen3}>
     
         <Link to='/category/milk'>
          <button
            type='button'
            value='유제품'
            className='list-group-item list-group-item-action'
        
          >
            유제품
          </button>
          </Link>
       
      </Collapse>

         
      <button className="bigCategoryBtn list-group-item" onClick={toggle4} style={{ marginBottom: '1rem' }}>농수산물</button>
      <Collapse isOpen={isOpen4}>
       
             <Link to='/category/food'>
          <button
            type='button'
            value='계란'
            className='list-group-item list-group-item-action'
      
          >
            계란
          </button>
           </Link>
           <Link to='/category/food'>
          <button
            type='button'
            value='과일/채소'
            className='list-group-item list-group-item-action'
            
          >
            과일/채소
          </button>
          </Link>
          <Link to='/category/food'>
          <button
            type='button'
            value='김'
            className='list-group-item list-group-item-action'
    
          >
            김
          </button>
          </Link>
          <Link to='/category/food'>
          <button
            type='button'
            value='수산물'
            className='list-group-item list-group-item-action'
        
          >
            수산물
          </button>
          </Link>
          <Link to='/category/food'>
          <button
            type='button'
            value='견과'
            className='list-group-item list-group-item-action'
      
          >
            견과
          </button>
          </Link>
          <Link to='/category/food'>
          <button
            type='button'
            value='곡류'
            className='list-group-item list-group-item-action'
      
          >
            곡류
          </button>
          </Link>
        
      </Collapse>   
         
      <button className="bigCategoryBtn list-group-item" onClick={toggle5} style={{ marginBottom: '1rem' }}>김치</button>
      <Collapse isOpen={isOpen5}>
      
                 <Link to='/category/kimchi'>
          <button
            type='button'
            value='김치'
            className='list-group-item list-group-item-action'
      
          >
            김치
          </button>
          </Link>
            <Link to='/category/kimchi'>
          <button
            type='button'
            value='젓갈'
            className='list-group-item list-group-item-action'
      
          >
            젓갈
          </button>
           </Link>
       
      </Collapse>    
      
      <button className="bigCategoryBtn list-group-item" onClick={toggle6} style={{ marginBottom: '1rem' }}>조미료</button>
      <Collapse isOpen={isOpen6}>
       
          <Link to='/category/con'>
          <button
            type='button'
            value='설탕'
            className='list-group-item list-group-item-action'
      
          >
            설탕
          </button>
          </Link>
          <Link to='/category/con'>
          <button
            type='button'
            value='소금'
            className='list-group-item list-group-item-action'
      
          >
            소금
          </button>
          </Link>
          <Link to='/category/con'>
          <button
            type='button'
            value='소스'
            className='list-group-item list-group-item-action'
      
          >
            소스
          </button>
          </Link>
          <Link to='/category/con'>
          <button
            type='button'
            value='장류'
            className='list-group-item list-group-item-action'
      
          >
            장류
          </button>
          </Link>
      
      </Collapse>
      
      <button className="bigCategoryBtn list-group-item" onClick={toggle7} style={{ marginBottom: '1rem' }}>즉석조리식품</button>
      <Collapse isOpen={isOpen7}>
       
             <Link to='/category/mealKit'>
          <button
            type='button'
            value='즉석조리식품'
            className='list-group-item list-group-item-action'
            o
          >
            즉석조리식품
          </button>
          </Link>
          <Link to='/category/mealKit'>
          <button
            type='button'
            value='국수'
            className='list-group-item list-group-item-action'
      
          >
            국수
          </button>
          </Link>
          <Link to='/category/mealKit'>
          <button
            type='button'
            value='두부'
            className='list-group-item list-group-item-action'
      
          >
            두부
          </button>
          </Link>
          <Link to='/category/mealKit'>
          <button
            type='button'
            value='식용유'
            className='list-group-item list-group-item-action'
        
          >
            식용유
          </button>
          </Link>
          <Link to='/category/mealKit'>
          <button
            type='button'
            value='어묵'
            className='list-group-item list-group-item-action'
      
          >
            어묵
          </button>
          </Link>
         
      </Collapse>
         
      <button className="bigCategoryBtn list-group-item" onClick={toggle8} style={{ marginBottom: '1rem' }}>기타</button>
      <Collapse isOpen={isOpen8}>
       
            <Link to='/category/etc'>
          <button
            type='button'
            value='기타가공품'
            className='list-group-item list-group-item-action'
            
          >
            기타가공품
          </button>
          </Link>
   
      </Collapse>    
        </div>
      </div>
      <div className='category__show'>
        <div className='category__line'>
                <nav class='navbar  justify-content-between'>
                <p className='category__title'><BsFillGridFill /> 메뉴 <BsChevronRight />
                <Link to="/searchProduct/food"><button className="category__btn">상품찾기</button></Link>
                 </p>
                 <header className="item__header">
         {searchTerm === null ? <input
              placeholder='검색어를 입력하세요'
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type='search'
              className='input'
            /> :
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type='search'
              className='input'
            />
          }
             <InputGroupAddon addonType='append'>
               <Link to={{
                 pathname:'/searchProduct/food',
                 state:{
                   searchTerm:searchTerm
                 }
               }} >
            <button onClick={handleSubmit} className="searchBtn">
              <RiSearch2Line size="40"></RiSearch2Line>
            </button>
            </Link>
          </InputGroupAddon>
         
      </header>
            
          </nav>
           <hr></hr>
        </div>
        <div className='category__items'>
         <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>

        </div>
        <div>
          <nav class='navbar navbar-light bg-light justify-content-between'>
            <div className="result_allergy">
            <AiOutlineFilter type="button"  onClick={handleAllergy} data-toggle="tooltip" data-placement="bottom" title="알레르기 필터 기능입니다."size="40"/>
           <div className='navbar-brand nav__result'>검색결과({totalResult})</div>
            
            </div>
            <div className='form-check__group'>
              <div class='form-check'>
                <input type='button' onClick={() => handleSort('ranking')} className={sort==="ranking"?"form-check-input checked":"form-check-input"} type='radio'
                       name='flexRadioDefault' id='flexRadioDefault2' value="category"/>
                <label class='form-check-label' for='flexRadioDefault2'>
                 <GiFruitBowl/>랭킹순
                </label>
              </div>
              <div class='form-check'>
                <input type='button' onClick={() => handleSort('manufacturer')} class='form-check-input' type='radio'
                       name='flexRadioDefault' id='flexRadioDefault2' />
                <label class='form-check-label' for='flexRadioDefault2'>
                  <FaBuilding/>제조사
                </label>
              </div>

              <div class='form-check'>
                <input type='button' onClick={() => handleSort('reviewCount')} class='form-check-input' type='radio'
                       name='flexRadioDefault' id='flexRadioDefault2' />
                <label class='form-check-label' for='flexRadioDefault2'>
                  <HiEye/>리뷰순
                </label>
              </div>
            </div>
          </nav>
        </div>
        <SearchResult className='searchResult' loading={loading} result={result} sort={sort} />
      </div>
    </div>
  );
};
export default SearchProductFood;