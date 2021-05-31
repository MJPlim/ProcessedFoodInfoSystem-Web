import './CategoryStyle.scss';
import 간식 from '../../image/categoryImg/간식.jpg';
import {bigCategory} from "../../api";
import { useEffect,useState } from 'react';
import CategoryResult from "./CategoryResult";
const Snack=()=>{
    return (
        <div className="category__container">
            <header className="category__header">
                <div className="category__searchTab">
                    검색창🔍
                </div>
            </header>
            <div className="category__show">
                <div className="category__line">
                <p className>CATEGORY</p><hr></hr>
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
                <CategoryResult category="간식"/>
            </div>
            </div>
        </div>
    );
}
export default Snack;