import './CategoryStyle.scss';
import { bigCategory, getUserAllergyInfo, searchApi } from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight, BsFillGridFill } from 'react-icons/bs';
import { AiOutlineFilter } from 'react-icons/ai';
import { RiSearch2Line } from 'react-icons/ri';
import { FaBuilding } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { GiFruitBowl } from 'react-icons/gi';
import SearchResult from '../Search/SearchResult';
import 과자 from '../../image/categoryImg/snack/과자.png';
import 떡 from '../../image/categoryImg/snack/떡.png';
import 빵 from '../../image/categoryImg/snack/빵.png';
import 젤리 from '../../image/categoryImg/snack/젤리.png';
import 아이스크림 from '../../image/categoryImg/snack/아이스크림.png';
import 초콜릿 from '../../image/categoryImg/snack/초콜릿.png';
import { Collapse, InputGroupAddon } from 'reactstrap';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/all';


const Snack = (props) => {

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
  //파라미터
  const [searchTerm, setSearchTerm] = useState(null);
  const [categoryName, setCategoryName] = useState('간식');
  const [sort, setSort] = useState(sessionStorage.getItem('selectedSort') !== null ? sessionStorage.getItem('selectedSort') : 'ranking');
  const [order, setOrder] = useState('desc');
  const [allergyList, setAllergyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('selectedPage') > 1 ? sessionStorage.getItem('selectedPage') : 1);
  const [pageSize, setPageSize] = useState(0);
  const [isSmallCategory, setIsSmallCategory] = useState(false);

  useEffect(async () => {
    console.log('마운트!');
    console.log(sort);
    setCategoryName('간식');
    if (sessionStorage.getItem('categoryName') === '간식' || sessionStorage.getItem('categoryName') === null) {
      console.log('대분류를 눌럿음');
      getBigCategory(sort, currentPage);
    } else {
      setCategoryName(sessionStorage.getItem('categoryName'));
      console.log('이미 소분류를 눌럿엇음', categoryName);

      setResult(JSON.parse(sessionStorage.getItem('categoryData')));
      console.log('소분류 결과: ', result);
    }

  }, []);

  const getBigCategory = async (sort, pageNum, state) => {
    setIsSmallCategory(false);
    setCategoryName('간식');
    sessionStorage.setItem('category', '간식');

    try {
      state === 'init' && setLoading(true);

      const { data } = await bigCategory.gotoCategory('간식', pageNum, sort, 12);
      console.log('대분류 호출', data);

      setTotalResult(data.total_elements);
      setPageSize(data.total_page);
      setResult(data.data);
      sessionStorage.setItem('categoryData', JSON.stringify(data.data));

    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async (sortType) => {
    setSort(sortType);
    setCurrentPage(1);
    sessionStorage.removeItem('selectedPage');
    sessionStorage.setItem('selectedSort', sortType);
    console.log(sortType);
    // getSmallCategory(currentPage);
  };
  const handleCategory = async (e) => {
    sessionStorage.removeItem('selectedPage');
    setCurrentPage(1);
    console.log('소분류 클릭');
    sessionStorage.setItem('categoryName', e);
    setCategoryName(e);
    setIsSmallCategory(true);
    // getSmallCategory(currentPage, 'init');
  };

  const getSmallCategory = async (pageNum, state) => {
    try {
      state === 'init' && setLoading(true);

      const { data } = await searchApi.search(allergyList, categoryName, '', '', order, pageNum, 12, sort);
      sessionStorage.setItem('totalItems', data.total_elements);
      sessionStorage.setItem('categoryData', JSON.stringify(data.data));
      console.log('소분류 호출', data);
      setPageSize(data.total_page);
      setResult(data.data);
      setTotalResult(data.total_elements);
      console.log('소분류: ', result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (categoryName !== '간식') {
      await getSmallCategory(currentPage, 'init');
    }

  }, [categoryName, sort, currentPage]);

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

  const onClickPage = async (pageNum) => {
    setCurrentPage(pageNum.selected + 1);
    sessionStorage.setItem('selectedPage', pageNum.selected + 1);

    console.log('페이징 클릭 ', pageNum);

    if (categoryName !== '간식') {
      // getSmallCategory(pageNum.selected + 1);
    } else {
      getBigCategory(sort, pageNum.selected + 1);
    }
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
            <p className='category__title'><BsFillGridFill /> 카테고리 <BsChevronRight />
              <button className='category__btn' onClick={() => getBigCategory(sort, 1)}>간식</button>
            </p>
            <header className='item__header'>
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
                  state: {
                    searchTerm: searchTerm,
                  },
                }}>
                  <button onClick={() => {
                    console.log('click');
                  }} className='searchBtn'>
                    <RiSearch2Line size='40'></RiSearch2Line>
                  </button>
                </Link>
              </InputGroupAddon>

            </header>

          </nav>
          <hr></hr>
        </div>
        <div className='category__items'>
          <div className='item'>
            <button value='과자' onClick={() => handleCategory('과자')} className='category__item'>
              <img className='item__img' src={과자} />
            </button>
            <p className='category__name'>과자</p>
          </div>
          <div className='item'>
            <button value='사탕/껌/젤리' onClick={() => handleCategory('젤리')} className='category__item'>
              <img className='item__img' src={젤리} />
            </button>
            <p className='category__name'>사탕/껌/젤리</p>
          </div>
          <div className='item'>
            <button value='떡' onClick={() => handleCategory('떡')} className='category__item'>
              <img className='item__img' src={떡} />
            </button>
            <p className='category__name'>떡</p>
          </div>
          <div className='item'>
            <button value='빵' onClick={() => handleCategory('빵')} className='category__item'>
              <img className='item__img' src={빵} />
            </button>
            <p className='category__name'>빵</p>
          </div>
          <div className='item'>
            <button value='아이스크림' onClick={() => handleCategory('아이스크림')} className='category__item'>
              <img className='item__img' src={아이스크림} />
            </button>

            <p className='category__name'>아이스크림</p>
          </div>
          <div className='item'>
            <button value='초콜릿' onClick={() => handleCategory('초콜릿')} className='category__item'>
              <img className='item__img' src={초콜릿} />
            </button>
            <p className='category__name'>초콜릿</p>
          </div>

        </div>
        <div>


          <nav className='navbar navbar-light bg-light justify-content-between'>
            <div className='result_allergy'>
              {categoryName !== '간식' &&
              <AiOutlineFilter type='button' onClick={handleAllergy} data-toggle='tooltip' data-placement='bottom'
                               title='알레르기 필터 기능입니다.' size='40' />}


              <div className='navbar-brand nav__result'>검색결과({totalResult})</div>

            </div>
            {categoryName !== '간식' &&
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
            </div>}
          </nav>

        </div>
        <SearchResult className='searchResult' loading={loading} result={result} sort={sort} pageSize={pageSize}
                      onClickPage={(pageNum) => onClickPage(pageNum)} selectedPage={currentPage} />
      </div>
    </div>
  );
};
export default Snack;