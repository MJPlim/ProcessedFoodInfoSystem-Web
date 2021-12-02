import React, {useEffect,useState} from 'react'
import {getUserInfoApi,getReviewByUserIDApi,favouriteApi} from '../../api'
import {AiOutlineUser} from 'react-icons/ai'
import {Badge} from 'reactstrap'
import ResultCard from '../../Components/UI/ResultCard'
import { Link } from 'react-router-dom';
import {Card,CardBody,CardText,CardTitle,CardSubtitle,Button} from 'reactstrap'
import StarRatingComponent from 'react-star-rating-component';
import {AiFillStar} from 'react-icons/ai'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
function MyPage() {
    const [user,setUser] = useState();
    const [fav,setFav] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [reviewCount,setReviewCount] = useState();
    
    const getUserInfo = async () =>{
        await getUserInfoApi
        .gerUserInfo()
        .then((response) => {
         console.log("유저정보:",response)
         var data = response.data
         setUser(data)
        })
        .catch((e) => {
          console.log(e);
        });
    }

    const getUserSummary = async () =>{
        await getReviewByUserIDApi.getReviews(1)
        .then((response) => {
            console.log("리뷰 목록들",response)
            var count = response.data.userReviewCount
            setReviewCount(count)
            var data = response.data.userReviewList
            setReviews(data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const getFavoriteItems= async() =>{
        await favouriteApi.myFavourite()
        .then((response) => {
            console.log("찜 목록",response)
            var data = response.data
            setFav(data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
        getUserInfo()
        getUserSummary()
        getFavoriteItems()
        
      }, []);
    return (
     <div>
        <div style={{display:'flex', flexDirection: "column",
            alignItems: "center",justifyContent: "center"}}>
                <div style={{marginBottom:'20px',fontWeight:"600"}}>마이 페이지</div>
                <div style={{marginBottom:'10px',fontSize:"1.2rem"}}>회원님의 정보를 확인 해 보세요!</div>
                <hr width="80%"/>
                <AiOutlineUser size="50"/> 
                    <div style={{fontSize:"1.5rem",fontWeight:"600",display:'flex', }}> 
                    user.name
                    </div>
                    <div>
                    user.birth user.address
                    </div>
                    <Button
    color="danger"
    onClick={function noRefCheck(){}}
  >
    내정보
  </Button>
  <Modal
    toggle={function noRefCheck(){}}
  >
    <ModalHeader toggle={function noRefCheck(){}}>
      Modal title
    </ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={function noRefCheck(){}}
      >
        Do Something
      </Button>
      {' '}
      <Button onClick={function noRefCheck(){}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
                    
            </div>
            <div>
                    <div style={{display:'flex',flexDirection:'column',marginTop:'50px'}}>
                         <div>
                            <div style={{fontSize:'1.5rem', fontWeight:"600"}}>찜  <Badge color="primary" pill style={{marginLeft:'0.2rem'}}>{fav.length}</Badge> </div>
                            <hr/>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            { <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                                 {fav && fav.length>0 ? 
                                 fav.map((item,idx) => (
                                    <ResultCard 
                                        id={idx} foodId={item.food.foodId} foodImg={item.food.foodImageAddress}
                                        foodName={item.food.foodName} foodCategory={item.food.category} foodManufac={ item.food.manufacturerName}/>        
                                )): <div>No Result</div>}
                                </div>
                            }
                            </div>
                        </div>
                        
                        <div>
                            <div style={{fontSize:'1.5rem', fontWeight:"600",marginTop:'30px'}}>리뷰  <Badge color="primary" pill style={{marginLeft:'0.2rem'}}>{reviewCount}</Badge> </div>
                            <hr/>
                            {reviews.map((item,id)=>(
                                <div style={{paddingRight:"10rem",paddingLeft:"10rem"}}>
                                    <Card id= {id} width="400px" style={{marginBottom:"2rem"}}
                                    >
                                    <Link to ={{ pathname:`search/${item.foodId}`}}>
                                        <CardBody>
                                        <CardTitle tag="h5">
                                            {item.userName}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6">
                                                <StarRatingComponent 
                                                name="rate2" 
                                                editing={false}
                                                renderStarIcon={() => <AiFillStar size="20"/>}
                                                starCount={5}
                                                value={parseFloat(item.reviewRating)}
                                                style={{display:'flex',marginRight:"3rem"}}
                                                />
                                        </CardSubtitle>
                                        <CardText>
                                            <div  style={{display:"flex",flexWrap:'wrap',justifyContent:"space-between",alignItems:'center'}} > 
                                            <div style={{fontSize:"1.5rem",fontWeight:"600"}}>  {item.reviewDescription} </div>
                                            <div>  {item.reviewCreatedDate.substring(0,10)} </div>
                                            </div>
                                                                
                                        </CardText>
                                        </CardBody>
                                        </Link>
                                    </Card>
                                </div>
                            ))}
                           
                        </div>

                    </div>
        </div>
     
     
     </div>
    )
}

export default MyPage
