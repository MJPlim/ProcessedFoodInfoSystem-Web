import React, {useEffect, useState} from 'react'
import { getReviewsByFoodId, getUserAllergyInfo, getUserSummary, postReviewApi } from '../../api'
import {Card,CardBody,CardText,CardTitle,CardSubtitle,Button} from 'reactstrap'
import StarRatingComponent from 'react-star-rating-component';
import {AiFillStar} from 'react-icons/ai'

function Review({foodId}) {
    const [reviews,setReviews]=useState([]);
    const [review,setReview]=useState('');
    const [user,setUser] = useState();
    const [log,setLog] = useState(false);
    var result=[];

    const getReviews= async()=>{
      console.log("리뷰목록:",foodId)
        await getReviewsByFoodId.getReviews(foodId,1)
        .then((response)=>{
            result = response.data.readReviewResponse
            setReviews(result)
            console.log( "result",result)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    const getUser= async()=>{
       var token = localStorage.getItem("authorization")
      if(token != null){
        setLog(true)
        await getUserSummary.userSummary()
       .then((response)=>{
         console.log(response.data)
         var data = response.data.user_name
         setUser(data)
       })
       .catch((e)=>{
         console.log(e)
       })
      }
    }
    const goLogin =() => {
      if(window.confirm("로그인을 하세요") == true){
        window.location.href = '/login'
    }
    else{
        return ;
    }
    }
    const onChangeReview =(e)=>{
      setReview(e.target.value);
    }
    const addReview=async (e)=>{
      console.log("리뷰 내용",review)
      e.preventDefault();
      if(review == null){
        alert("내용을 입력해주세요!")
      }else{
        await postReviewApi.postReview(foodId,review,3)
        .then(()=>{
          alert("리뷰 작성 완료");
          this.getPosts()
        }).catch(e => {
          console.log(e)
        })
        
      }
    }
    useEffect(()=>{
      console.log("review",foodId)
        getUser()
        getReviews()
    },[])
    
    return (
        <div>
           <div style={{fontSize:'1.5rem',fontWeight:'600',marginTop:'2rem'}}>리뷰({reviews.length})</div>
           <hr/>
        {reviews.map((item,id)=>(
          <div style={{paddingRight:"10rem",paddingLeft:"10rem"}}>
              <Card width="400px" style={{marginBottom:"2rem"}}
              >
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
              </Card>
          </div>
        ))}

        <div style={{paddingRight:"10rem",paddingLeft:"10rem"}}>
              <Card width="400px" style={{marginBottom:"2rem"}} 
              >
               {log? 
               <CardBody className="log_review" style={{border:'1.5px solid #FE6F6E'}}>
                  <CardTitle tag="h5">
                    {user}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6">
                          <StarRatingComponent 
                          name="rate2" 
                          editing={true}
                          renderStarIcon={() => <AiFillStar size="20"/>}
                          starCount={5}
                          value={parseFloat(5)}
                          style={{display:'flex',marginRight:"3rem"}}
                          />
                  </CardSubtitle>
                  <CardText>
                    <div  style={{display:"flex",flexWrap:'wrap',justifyContent:"space-between",alignItems:'center'}} > 
                      <input placeholder="리뷰를 작성하세요"onChange={onChangeReview} style={{fontSize:"1.5rem",fontWeight:"600",border:'none',outline:'none'}}/>
                      <Button onClick={addReview} style={{background:'#FE6F6E',color:'white',border:'none'}}>작성완료</Button>
                    </div>
                   
                  </CardText>
                </CardBody>:
                 <CardBody className="review" onClick={goLogin}>
                 <CardTitle tag="h5">
                   리뷰 작성
                 </CardTitle>
                 <CardSubtitle
                   className="mb-2 text-muted"
                   tag="h6">
                         <StarRatingComponent 
                         name="rate2" 
                         editing={true}
                         renderStarIcon={() => <AiFillStar size="20"/>}
                         starCount={5}
                         value={parseFloat(0)}
                         style={{display:'flex',marginRight:"3rem"}}
                         />
                 </CardSubtitle>
                 <CardText>
                   <div  style={{display:"flex",flexWrap:'wrap',justifyContent:"space-between",alignItems:'center'}} > 
                     <div style={{fontSize:"1.5rem",fontWeight:"600",color:'gray'}}>  로그인이 필요한 서비스입니다. </div>
                     <div> 어떠셨나요? </div>
                   </div>
                  
                 </CardText>
               </CardBody>}
              </Card>
          </div>
       
        </div>
    )
}

export default Review
