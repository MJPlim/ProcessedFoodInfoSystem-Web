import './SearchStyle.scss';
import { searchApi, getUserAllergyInfo } from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillGridFill, BsChevronRight } from 'react-icons/bs';
import { RiSearch2Line } from 'react-icons/ri';
import { FaBuilding } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { GiFruitBowl } from 'react-icons/gi';
import { AiOutlineFilter } from 'react-icons/ai';
import SearchResult from '../Search/SearchResult';
import {
  InputGroupAddon, Collapse, Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import 광고1 from '../../image/ad/광고1.jpg';
import 광고2 from '../../image/ad/광고2.jpg';
import 광고3 from '../../image/ad/광고3.jpg';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/all';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SearchProductFood = (props) => {
  //드롭다운
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  //광고 이미지
  const items = [
    {
      src: 광고1,
    },
    {
      src: 광고2,
    },
    {
      src: 광고3,
    },
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
  const [allergyLoading, setAllergyLoading] = useState(false);

  const [result, setResult] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //옵션 선택
  const [option, setOption] = useState(sessionStorage.getItem('selectedOption') === '제조사명' ? '제조사명' : '식품명');
  //파라미터
  const [searchTerm, setSearchTerm] = useState(null);
  const [sort, setSort] = useState(sessionStorage.getItem('selectedSort') !== null ? sessionStorage.getItem('selectedSort') : 'ranking');
  const [order, setOrder] = useState('desc');
  const [allergyList, setAllergyList] = useState([]);

  // 검색 기록을 위한 state
  const [foodKeywords, setFoodKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForName') || '[]'),
  );
  const [bsshKeywords, setBsshKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForBssh') || '[]'),
  );
  const NUM_OF_SHOW_ROWS = 5; // 최대 저장 검색어
  //페이징 부분
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('selectedPage') > 1 ? sessionStorage.getItem('selectedPage') : 1);
  const [pageSize, setPageSize] = useState(0);

  //광고부분
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
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
  useEffect(() => {
    console.log('setting 부분 마운트');
    setting();
  }, []);


  useEffect(() => {
    console.log('페이지 바껴서 useEffect');
    getSearchResult(sessionStorage.getItem('searchTerm'));

  }, [currentPage, sort]);


  const setting = () => {

    if (props.location.state !== undefined) {
      console.log(props.location.state.searchTerm);
      setSearchTerm(props.location.state.searchTerm);
      setOption(props.location.state.option);
      console.log('전달된 값', searchTerm);
      getSearchResult(props.location.state.searchTerm);
      props.location.state = undefined;

    } else {
      if (sessionStorage.getItem('searchTerm') && sessionStorage.getItem('data')) {
        //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
        localStorage.setItem('keywordsFoodForName', JSON.stringify(foodKeywords));
        localStorage.setItem('keywordsFoodForBssh', JSON.stringify(bsshKeywords));

        setSearchTerm(sessionStorage.getItem('searchTerm'));
        console.log('이전 검색어: ', searchTerm);

        // 이전 데이터 세션에서 불러왔을때 페이징 처리 어케해야할지.....
        // setResult(JSON.parse(sessionStorage.getItem('data')));
        // console.log('이전 검색 결과', JSON.parse(sessionStorage.getItem('data')));
      }
    }
  };

  const getSearchResult = async (term) => {
    try {

      if (option === '식품명') {
        const { data } = await searchApi.search(allergyList, '', term, '', order, currentPage, 12, sort);
        setTotalResult(data.total_elements);
        setPageSize(data.total_page);

        console.log('결과', data.data);
        sessionStorage.setItem('data', JSON.stringify(data.data));
        sessionStorage.setItem('pageSize', data.total_page);
        setResult(data.data);

      } else {
        const { data } = await searchApi.search(allergyList, '', '', term, order, currentPage, 12, sort);
        setTotalResult(data.total_elements);
        setPageSize(data.total_page);

        console.log('결과', data.data);
        sessionStorage.setItem('data', JSON.stringify(data.data));
        setResult(data.data);
      }

    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  //검색버튼 누를때
  const handleSubmit = () => {
    sessionStorage.removeItem('selectedPage');
    sessionStorage.setItem('selectedOption', option);
    setCurrentPage(1);
    console.log('체크된 알러지', allergyList);
    if (searchTerm !== null && searchTerm.length !== 0) {
      sessionStorage.setItem('searchTerm', searchTerm);
      getSearchResult(searchTerm);
      handleAddKeyword();

    } else {
      setError('검색결과가 없습니다!');
    }
  };
  const handleSort = async (sortType) => {
    setSort(sortType);
    setCurrentPage(1);
    sessionStorage.removeItem('selectedPage');
    sessionStorage.setItem('selectedSort', sortType);
    console.log(sortType);
  };

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
  const handleAllergy = async () => {
    setAllergyLoading(true);
    await getUserAllergyInfo
      .userAllergies()
      .then((response) => {
        const result = response.data.userAllergyMaterials;
        console.log('알러지', result);
        setAllergyList(result);
        alert(result);

      })
      .catch((error) => {
        alert('로그인을 하세요');
      });

  };

  const handleCategory = async (e) => {
    sessionStorage.removeItem('selectedPage');
    sessionStorage.removeItem('selectedSort');
    sessionStorage.setItem('selectedOption', option);


    setCurrentPage(1);
    console.log('소분류 클릭');
    sessionStorage.setItem('categoryName', e);
    // getSmallCategory(currentPage, 'init');
  };

  const onClickPage = async (pageNum) => {
    setCurrentPage(pageNum.selected + 1);
    sessionStorage.setItem('selectedPage', pageNum.selected + 1);

    console.log('페이징 클릭 ', pageNum);

  };

  return (
    <div className='category__container'>
      <div className='category__list'>
        <div className='item__category list-group category__list'>
          <button className='bigCategoryBtn list-group-item' color='primary' onClick={toggle1}>간식
            <div style={{ float: 'right' }}>
              {!isOpen1 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen1}>
            <Link to='/category/snack'>
              <button
                type='button'
                value='과자'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('과자')}
              >
                과자
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='떡'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('떡')}
              >
                떡
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='빵'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('빵')}
              >
                빵
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='사탕/껌/젤리'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('사탕/껌/젤리')}
              >
                사탕/껌/젤리
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='아이스크림'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('아이스크림')}
              >
                아이스크림
              </button>
            </Link>
            <Link to='/category/snack'>
              <button
                type='button'
                value='초콜릿'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('초콜릿')}
              >
                초콜릿
              </button>
            </Link>

          </Collapse>

          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle2}>음료/차
            <div style={{ float: 'right' }}>
              {!isOpen2 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>

          </button>
          <Collapse isOpen={isOpen2}>
            <Link to='/category/tea'>
              <button
                type='button'
                value='음료'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('음료/차')}
              >
                음료
              </button>
            </Link>
            <Link to='/category/tea'>
              <button
                type='button'
                value='커피'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('커피')}
              >
                커피
              </button>
            </Link>
            <Link to='/category/tea'>
              <button
                type='button'
                value='커피/차'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('커피/차')}
              >
                커피/차
              </button>
            </Link>
          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle3}>유제품
            <div style={{ float: 'right' }}>
              {!isOpen3 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen3}>

            <Link to='/category/milk'>
              <button
                type='button'
                value='유제품'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('유제품')}
              >
                유제품
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />


          <button className='bigCategoryBtn list-group-item' onClick={toggle4}>농수산물
            <div style={{ float: 'right' }}>
              {!isOpen4 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen4}>

            <Link to='/category/food'>
              <button
                type='button'
                value='계란'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('계란')}
              >
                계란
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='과일/채소'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('과일/채소')}
              >
                과일/채소
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='김'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('김')}
              >
                김
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='수산물'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('수산물')}
              >
                수산물
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='견과'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('견과')}
              >
                견과
              </button>
            </Link>
            <Link to='/category/food'>
              <button
                type='button'
                value='곡류'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('견과')}
              >
                곡류
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle5}>김치
            <div style={{ float: 'right' }}>
              {!isOpen5 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen5}>

            <Link to='/category/kimchi'>
              <button
                type='button'
                value='김치'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('김치')}
              >
                김치
              </button>
            </Link>
            <Link to='/category/kimchi'>
              <button
                type='button'
                value='젓갈'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('젓갈')}
              >
                젓갈
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />


          <button className='bigCategoryBtn list-group-item' onClick={toggle6}>조미료
            <div style={{ float: 'right' }}>
              {!isOpen6 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen6}>

            <Link to='/category/con'>
              <button
                type='button'
                value='설탕'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('설탕')}
              >
                설탕
              </button>
            </Link>
            <Link to='/category/con'>
              <button
                type='button'
                value='소금'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('소금')}
              >
                소금
              </button>
            </Link>
            <Link to='/category/con'>
              <button
                type='button'
                value='소스'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('소스')}
              >
                소스
              </button>
            </Link>
            <Link to='/category/con'>
              <button
                type='button'
                value='장류'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('장류')}
              >
                장류
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />

          <button className='bigCategoryBtn list-group-item' onClick={toggle7}>즉석조리식품
            <div style={{ float: 'right' }}>
              {!isOpen7 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen7}>

            <Link to='/category/mealKit'>
              <button
                type='button'
                value='즉석조리식품'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('즉석조리식품')}
              >
                즉석조리식품
              </button>
            </Link>
            <Link to='/category/mealKit'>
              <button
                type='button'
                value='국수'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('국수')}
              >
                국수
              </button>
            </Link>
            <Link to='/category/mealKit'>
              <button
                type='button'
                value='두부'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('두부')}
              >
                두부
              </button>
            </Link>
            <Link to='/category/mealKit'>
              <button
                type='button'
                value='식용유'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('식용유')}
              >
                식용유
              </button>
            </Link>
            <Link to='/category/mealKit'>
              <button
                type='button'
                value='어묵'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('어묵')}
              >
                어묵
              </button>
            </Link>

          </Collapse>
          <div style={{ marginBottom: '1rem' }} />


          <button className='bigCategoryBtn list-group-item' onClick={toggle8}>기타
            <div style={{ float: 'right' }}>
              {!isOpen8 ?
                <IoIosArrowDown style={{ marginLeft: 'auto', float: 'right', position: 'absolute' }} /> :
                <IoIosArrowUp style={{ marginLeft: 'auto', position: 'absolute' }} />
              }
            </div>
          </button>
          <Collapse isOpen={isOpen8}>

            <Link to='/category/etc'>
              <button
                type='button'
                value='기타가공품'
                className='list-group-item list-group-item-action'
                onClick={() => handleCategory('기타가공품')}
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
              <Link to='/searchProduct/food'>
                <button className='category__btn' onClick={() => {
                  sessionStorage.removeItem('selectedPage');
                  sessionStorage.removeItem('searchTerm');
                  sessionStorage.removeItem('selectedOption');

                }}>상품찾기
                </button>
              </Link>
            </p>
            <header className='item__header'>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  {option}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => {
                    setOption('식품명');
                  }}>식품명</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {
                    setOption('제조사명');
                  }}>제조사명</DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
                  pathname: '/searchProduct/food',
                }}>
                  <button onClick={handleSubmit} className='searchBtn'>
                    <RiSearch2Line size='40'></RiSearch2Line>
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
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
            <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
          </Carousel>

        </div>
        <div>
          <nav class='navbar navbar-light bg-light justify-content-between'>
            <div className='result_allergy'>
              <AiOutlineFilter type='button' onClick={handleAllergy} data-toggle='tooltip' data-placement='bottom'
                               title='알레르기 필터 기능입니다.' size='40' />
              <div className='navbar-brand nav__result'>검색결과({totalResult})</div>

            </div>
            <div className='form-check__group'>
              <div className='form-check'>
                <input type='radio' onClick={() => handleSort('ranking')}
                       className={sort === 'ranking' ? 'form-check-input checked' : 'form-check-input'}
                       name='flexRadioDefault' id='flexRadioDefault2' value='category'
                       checked={sort === 'ranking' && true} />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  <GiFruitBowl />랭킹순
                </label>
              </div>
              <div className='form-check'>
                <input type='radio' onClick={() => handleSort('manufacturer')} className='form-check-input'
                       name='flexRadioDefault' id='flexRadioDefault2' checked={sort === 'manufacturer' && true} />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  <FaBuilding />제조사
                </label>
              </div>

              <div className='form-check'>
                <input type='radio' onClick={() => handleSort('reviewCount')} className='form-check-input'
                       name='flexRadioDefault' id='flexRadioDefault2' checked={sort === 'reviewCount' && true} />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  <HiEye />리뷰순
                </label>
              </div>
            </div>
          </nav>
        </div>
        <SearchResult className='searchResult' loading={loading} result={result} sort={sort} pageSize={pageSize}
                      onClickPage={(pageNum) => onClickPage(pageNum)} selectedPage={currentPage} />
      </div>
    </div>
  );
};
export default SearchProductFood;