import React, { useState,useEffect } from 'react';
import { getAds } from '../../api';
import {Card,CardImg,CardImgOverlay,CardTitle,CardText} from 'reactstrap'
import ResultPage from '../../Components/UI/ResultPage'
import adImg from '../../Images/ad/adPage4.jpg'
function CategoryPage() {
    const [adLoad, setAdLoad] = useState(true);
    const [ad, setAd] = useState(null);
    const getAdItems = async () =>{
        await getAds
        .getAdItems(10)
        .then((response) => {
          setAd(response.data);
          setAdLoad(false);
        })
        .catch((e) => {
          console.log(e);
        });
      }

      useEffect(() => {
        getAdItems()
      }, []);

    return (
        <div>
            <div style={{marginBottom:'30px'}}>
            <Card inverse>
                <CardImg
                alt="Card image cap"
                src={adImg}
                height="450px"
                />
                <CardImgOverlay style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'50px'}}>
                <CardTitle tag="h1" style={{fontStyle:'italic'}}>
                    Merry Christmas ⛄
                </CardTitle>
                <CardText>
                   크리스마스에 과자를 선물해보면 어떨까요?
                </CardText>
                </CardImgOverlay>
            </Card>
            </div>
        <ResultPage items={ad} loading={adLoad}/>
        </div>
    )
}

export default CategoryPage
