import './CategoryStyle.scss';
import icon1 from '../../image/icon2.PNG';
import {bigCategory} from "../../api";
import { useEffect,useState } from 'react';
import CategoryResult from "./CategoryResult";
import snackImg from "../../image/categoryImg/snack1.jpg";
import { Link } from 'react-router-dom';
import {BsFillGridFill,BsChevronRight} from 'react-icons/bs';

const Snack=()=>{
    const [result,setResult]=useState([]);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    const [categoryName,setCategoryName]=useState("");
    useEffect(async()=>{
        const getBigCategory=async()=>{
            setCategoryName("간식");
            try{
                setLoading(true);
                const {data:{data}}= await bigCategory.gotoCategory("간식",1,"ranking",10);
                setResult(data);

            }catch(e){
                setError(e);
                console.log(e);
            }finally{
                setLoading(false);
            }
        }
        getBigCategory();
        
    },[]);

    const handleCategory=()=>{
        console.log("sda");
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
                         <button className="category__item">사진넣을거</button>
                         <p className="category__name">과자</p>
                    </div>
                     <div className="item">
                         <button className="category__item">사진넣을거</button>
                         <p className="category__name">사탕/껌/젤리</p>
                    </div>
                     <div className="item">
                         <button className="category__item">사진넣을거</button>
                          <p className="category__name">떡</p>
                    </div>
                     <div className="item">
                         <button className="category__item">사진넣을거</button>
                          <p className="category__name">빵</p>
                    </div>
                     <div className="item">
                         <button className="category__item">사진넣을거</button>
                          <p className="category__name">아이스크림</p>
                    </div>
                      <div className="item">
                         <button className="category__item">사진넣을거</button>
                          <p className="category__name">초콜릿</p>
                    </div>
            
            </div>
             <div>
                <CategoryResult category={categoryName} loading={loading} result={result}/>
            </div>
            </div>
        </div>
    );
}
export default Snack;