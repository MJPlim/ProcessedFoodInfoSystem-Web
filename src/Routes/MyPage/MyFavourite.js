import axios from "axios";
import React, {useEffect, useState} from "react";
import {favouriteApi} from "../../api";

function MyFavourite(){
    const [data,setData]=useState(null);
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
       console.log("즐겨찾기 목록 반환");
       const favouriteList=async()=>{
           try{
            setError(null);
            setLoading(true);
            console.log("--즐찾목록--");
            const list=await favouriteApi.myFavourite();
            setData(list);
           }catch(e){
               setError(e);
           }finally{
               setLoading(false);
           };
       }
       
    }, []);
    return(
        <div>
            {data==null?<div>즐찾목록 없음</div>:
            (
                <div>
                    {data.map((result,index)=>{
                        (
                            <div>
                                {result.favoriteId}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );

}
export default MyFavourite;
