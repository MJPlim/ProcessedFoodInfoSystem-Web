import React from 'react';
import {Bar} from "react-chartjs-2";

const ReviewSummaryChart = ({reviewSummary}) => {
        console.log(reviewSummary);
        const data = {
            labels: ['5', '4', '3', '2', '1'],
            datasets: [
                {
                    data: [reviewSummary['fiveCount'], reviewSummary['fourCount'], reviewSummary['threeCount'], reviewSummary['twoCount'], reviewSummary['oneCount']],
                    lineTension: 0,
                    backgroundColor: "#fe9b5a",
                    borderWidth: 1,
                    borderColor: "#fe9b5a",
                    fill: true,
                }
            ]
        };
        const options = {
            responsive: true,
            indexAxis: 'y',
            // scales: {
            //     xAxes: [{
            //         display: true,
            //         scaleLabel: {
            //             display: true,
            //             labelString: 'x축'
            //         },
            //         ticks: {
            //             autoSkip: false
            //         }
            //     }],
            //     yAxes: [{
            //         display: true,
            //         ticks: {
            //             suggestedMin: 0,
            //         },
            //         scaleLabel: {
            //             display: true,
            //             labelString: 'y축'
            //         }
            //     }]
            // },

            animations: {
                tension: {
                    duration: 2000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: false
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            },

            maintainAspectRatio: true // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
        }

        return (
            <div>
                <Bar data={data}
                     options={options}
                     width={300}
                     height={100}
                     />
            </div>
        )
            ;
    }
;

export default ReviewSummaryChart;