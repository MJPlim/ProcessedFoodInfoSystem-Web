import React, {useEffect, useRef, useState} from 'react';
import {foodDetailApi, getReviewRankingApi} from "../../api";

const ProductReviewRanking = () => {
    const [rankingList, setRankingList] = useState(null);
    const [rankingDetail, setRankingDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const detailInfo = useRef();
    let detailArray = [];


    const fetchRanking = async () => {

        await getReviewRankingApi.getReviewRanking().then(response => {
            setRankingList(response.data);
            setLoading(false);

            // response.data.forEach(async (res, i) => {
            //    await foodDetailApi.search(res.foodId).then(detailResponse => {
            //         detailArray.push(detailResponse.data);
            //         // detailArray[i]['avgRating'] = res.avgRating
            //
            //         console.log(detailArray);
            //     }).catch(e => {
            //        console.log('랭킹 상품 상세 정보 에러', e);
            //    })
            // })

        }).catch(e => {
            console.log('랭킹리스트 에러', e);
        });

    }

    useEffect(() => {
        fetchRanking();
    }, []);


    return (
        <div>
            asda
        </div>
    );
};


export default ProductReviewRanking;