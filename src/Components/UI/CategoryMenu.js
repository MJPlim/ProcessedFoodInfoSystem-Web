import React from 'react'
import './CategoryMenuStyle.scss'
import {FiArrowRightCircle} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import 간식 from '../../Images/bigCategory/간식.jpg'
import 김치 from '../../Images/bigCategory/김치.jpg';
import 농수산물 from '../../Images/bigCategory/농수산물.jpg';
import 유제품 from '../../Images/bigCategory/유제품.jpg';
import 조미료 from '../../Images/bigCategory/조미료.jpg';
import 차음료 from '../../Images/bigCategory/차음료.jpg';
import 육류 from '../../Images/bigCategory/육류.jpg';
import 식재료 from '../../Images/bigCategory/식재료.jpg';
import 즉석조리식품 from '../../Images/bigCategory/즉석조리식품.jpg';
import 기타 from '../../Images/bigCategory/기타.jpg';
function CategoryMenu() {
  const categoryItems =[
    {
      name:"간식",
      info:"과자/떡/빵/사탕.껌.젤리/아이스크림/초콜릿",
      src:간식,
      link:"/category/snack"
    },
    {
      name:"차/음료",
      info:"음료/커피/커피.차",
      src:차음료,
      link:"/category/drink"
    },
    {
      name:"유제품",
      info:"유제품",
      src:유제품,
      link:"/category/milk"
    },
    {
      name:"육류",
      info:"육류/햄.소시지",
      src:육류,
      link:"/category/meat"
    },
    {
      name:"식재료",
      info:"국수/두부/식용유/어묵",
      src:식재료,
      link:"/category/material"
    },
    {
      name:"농수산물",
      info:"계란/과일.채소/김/수산물/견과/곡류",
      src:농수산물,
      link:"/category/food"
    },
    {
      name:"조미료",
      info:"설탕/소금/소스/장류",
      src:조미료,
      link:"/category/con"
    },
    {
      name:"김치",
      info:"김치/젓갈",
      src:김치,
      link:"/category/kimchi"
    },
    {
      name:"즉석조리식품",
      info:"즉석조리식품",
      src:즉석조리식품,
      link:"/category/mealkit"
    },
    {
      name:"기타가공품",
      info:"기타가공품",
      src:기타,
      link:"/category/etc"
    },
  ]
    return (
            <div className='category__items'>
             {categoryItems.map((item,idx)=>(
                <div className='item' id={idx} >
                <Link to={item.link}>
                    <figure class="snip1384">
                    <img src={item.src} alt="sample83" />
                    <figcaption>
                      <h3>{item.name}</h3>
                      <p>{item.info}</p>
                      <i class="ion-ios-arrow-right"><FiArrowRightCircle /></i>
                    </figcaption>
                    </figure>
                </Link>
              </div>
             ))}
        </div> 
    )
}

export default CategoryMenu
