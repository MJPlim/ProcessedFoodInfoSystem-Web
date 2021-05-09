import axios from "axios";
import React, {useEffect, useState} from "react";
import {favouriteApi} from "../../api";
import {Link} from "react-router-dom";
import "./MyFavouriteStyle.scss";
function MyFavourite(){
    const [data,setData]=useState(null);
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(async() => {
       console.log("즐겨찾기 목록 반환");
           try{
            setError(null);
            setLoading(true);
            console.log("--즐찾목록--");
            const {data}=await favouriteApi.myFavourite();
    
            setData(data);
            console.log("결과:",data);
            //console.log("결과:",foodId);
           }catch(e){
               setError(e);
           }finally{
               setLoading(false);
           };
       
    }, []);
    return(
        <div>
            {data==null?<div>즐찾없음</div>:
            (
                <div className="myFavourite">
                    {data.map((result, index) => (
                        
                                    <div class="list-group" key={index}>
                                        <button type="button" class="list-group-item list-group-item-action">
                                            <Link to={`food/${result.food.foodId}`}>
                                                <div className="searchResult">
                                                    <div><img className="foodImg" src={result.food.foodImageAddress}/></div>
                                                    <div className="foodInfo">
                                                        <div className="foodName">{result.food.foodName}</div>
                                                        <div className="bshName">{result.food.manufacturerName}</div>
                                                    </div>

                                                </div>


                                            </Link>
                                        </button>
                                    </div>

                                ))}
                </div>
            )}
        </div>
    );

}
export default MyFavourite;
