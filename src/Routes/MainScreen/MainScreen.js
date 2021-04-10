import React from "react";
import axios from 'axios';
import Food from './FoodPresenter';
import {Spinner} from 'reactstrap';

class MainScreen extends React.Component{
    state={
        isLoading:true,
        foodlist:[]
    };
    getFood=async()=>{
        const{data:{C002:{row}}}=await axios.get("http://openapi.foodsafetykorea.go.kr/api/eaac3b4e7dc04339b011/C002/json/1/10");
        this.setState({foodlist:row,isLoading:false});
    };
    componentDidMount(){
        this.getFood();
    }
    render(){
      const {isLoading,foodlist}=this.state;
      return(
          <div>
              {isLoading?
              <Spinner color="warning" />
              :foodlist.map(food=>(
                  <Food
                  key={food.LCNS_NO} id={food.LCNS_NO} 
                  nm={food.PRDLST_NM} dcnm={food.PRDLST_DCNM}
                  dt={food.PRMS_DT} raw_nm={food.RAWMTRL_NM}
                  report_no={food.PRDLST_REPORT_NO}
                  />
              ))
            }
          </div>
      )
    }
}
export default MainScreen;