import React from "react";
import {BrowserRouter as Router,Redirect,Route,Switch} from "react-router-dom";
import Header from "./Header";

import MS from "../Routes/MainScreen/MainScreen";
import CP from "../Routes/CommercialProduct";
import RP from "../Routes/RecommendedProduct";
import SP from "../Routes/Search/SearchProduct";
import CM from "../Routes/Community";

import UR from "../Routes/UserRanking";
import PR from "../Routes/ProductRanking";
import RV from "../Routes/Reviews";
import WK from "../Routes/WhatsKati";
import HU from "../Routes/HowToUse";
import FD from "../Routes/Food/FoodDetail";

import LG from "../Routes/Login/Login";
import Join from "../Routes/Join/Join";

export default()=>(
    <Router>
        <>
            <Header/>
            <Switch>
                <Route path="/" exact component={MS}/>
                <Route path="/commercialProduct" exact component={CP}/>
                <Route path="/recommendedProduct" exact component={RP}/>
                <Route path="/searchProduct" exact component={SP}/>


                <Route path="/community" exact component={CM}/>
                <Route path="/userRanking" exact component={UR}/>
                <Route path="/productRanking" exact component={PR}/>
                <Route path="/reviews" exact component={RV}/>
                <Route path="/whatsKati" exact component={WK}/>
                <Route path="/howToUse" exact component={HU}/>
                <Route path="/food/:id" exact component={FD}/>
                <Route path="/login" exact component={LG}/>
                <Route path="/join" exact component={Join}/>
            </Switch>
        </>
    </Router>
);