import React, {useEffect,useState} from 'react'
import Review from '../../Components/UI/Review';
import { foodDetailApi } from '../../api';
import StarRatingComponent from 'react-star-rating-component';
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {BsHeart,BsFillHeartFill} from 'react-icons/bs'
import {Badge} from 'reactstrap';
import { checkFavoriteApi, addFavoriteApi, deleteFavoriteApi } from '../../api';
import '../../Components/UI/ResultPageStyle.scss'

function ItemDetailPage(props) {
   const [foodId,setFoodId] = useState('')
   const [data,setData] = useState('');
    const [allergies,setAllergies] = useState([])
    const [isLike,setIsLike] = useState(null);
    const [log,setLog] = useState(false);
  
    var info='';
    var newArr=[];
    var id 
   const getFoodDetail =async() =>{
        id= props.match.params.id
        setFoodId(id)
        console.log("foodId",foodId)
       await foodDetailApi.search(id)
       .then((response) => {
           info = response.data;
           setData(info)

           // 알러지 배열
           var array = info.allergyMaterials.split(" ")
           const set = new Set(array);
           newArr=[...set]
           setAllergies(newArr)
           console.log(allergies.length)
       })
       .catch((e)=>{
           console.log(e)
       })
    }
    const setLike =async()=>{
        if(log){
          if(isLike){
            // 즐겨찾기 삭제
            await deleteFavoriteApi.deleteFavorite(id)
            .then((response)=>{
              console.log("삭제성공", response.data)
              setIsLike(false)
            }).catch(e => {
              console.log(e)
            })
          }else{
            // 즐겨찾기 추가
            await addFavoriteApi.addFavorite(id)
            .then((response) => {
            setIsLike(true)
          }).catch(e => {
            console.log(e)
          })
          }
        }else{
          alert("로그인을 해주세요")
        }
      }
      const checkFavorite = async()=>{
        await checkFavoriteApi.checkFavorite(id)
        .then(async (response) => {
          setIsLike(response.data)
        }).catch(e => {
          console.log(e);
        })
      }
    useEffect(() => {
        
        getFoodDetail()
        console.log("id",id)
        var user= localStorage.getItem('authorization')
        if(user){
            setLog(true)
            checkFavorite()
        }
    },[isLike])


    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',}}>
            <div style={{display:'flex',flexWrap:'wrap', justifyContent:'space-evenly',}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <img width="500px" height="350px" src={data.foodImageAddress} />
                    <img width="500px" height="350px" src={data.foodMeteImageAddress} />
                </div>
                <div style={{display:'grid'}}>
                    <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
                    <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    renderStarIcon={() => <AiFillStar size="20"/>}
                    starCount={5}
                    value={parseFloat(data.reviewRate)}
                    style={{display:'flex'}}
                    />
                    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',marginTop:'2rem'}}>
                    <div style={{fontSize:'2rem',fontWeight:'600'}}>{data.foodName}</div>
                    
                    {!log?  <div color="gray" onClick={setLike}><BsHeart className="item_heart"  size="30"/></div> :
                        isLike?  <div onClick={setLike}><BsFillHeartFill className="item_heart" color="#FE6F6E" size="30"/></div>:  <div onClick={setLike}><BsHeart className="item_heart"  size="30"/></div>}
                    
                    </div>
                  <hr/>
                  <div style={{lineHeight:'2.5rem'}}>
                    <div style={{fontSize:'1.2rem'}}>{data.foodId}</div>
                    <div>
                        <Link>
                        <div style={{color:'blue',fontSize:'1rem'}}>
                            {data.category}
                        </div>
                        </Link>  
                    </div>
                     <div style={{display:'flex',flexWrap:"wrap",marginBottom:"50px"}}>{data.manufacturerName} </div>
                     <div>
                       {allergies.map((item, index) => (
                         <Badge color="primary" pill style={{background:'#FE8887',fontSize:'1rem',marginRight:'1rem'}}>
                         {item}
                         </Badge>
                       ))}
                     </div>
                     <div style={{width:'400px',wordBreak:'break-all',fontSize:'0.7rem'}}>{data.materials}</div>
                </div>
                </div>
            </div>
          
        </div>
        <Review foodId={foodId}/>
        </div>
    )
}

export default ItemDetailPage
