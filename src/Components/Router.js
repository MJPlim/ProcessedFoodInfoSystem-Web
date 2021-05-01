import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Header';

import MS from '../Routes/MainScreen/MainScreen';
import CP from '../Routes/CommercialProduct';
import RP from '../Routes/RecommendedProduct';
import SP from '../Routes/Search/SearchProduct';
import SPF from '../Routes/Search/SearchProductFood';
import SPB from '../Routes/Search/SearchProductBssh';
import CM from '../Routes/Community';

import UR from '../Routes/UserRanking';
import PR from '../Routes/ProductRanking';
import RV from '../Routes/Reviews';
import WK from '../Routes/WhatsKati';
import HU from '../Routes/HowToUse';
import FD from '../Routes/Food/FoodDetail';
import FUE from '../Routes/FindUser/FindEmail';
import FUP from '../Routes/FindUser/FindPassword';

import LG from '../Routes/Login/Login';
import Join from '../Routes/Join/Join';
import DU from '../Routes/DeleteUser/DeleteUser';
import MP from '../Routes/MyPage/MyPage';
import CUP from '../Routes/MyPage/ChangePassword';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={MS} />
        <Route path="/commercialProduct" exact component={CP} />
        <Route path="/recommendedProduct" exact component={RP} />
        <Route path="/searchProduct" exact component={SP} />
        <Route path="/searchProduct/food" exact component={SPF} />
        <Route path="/searchProduct/bssh" exact component={SPB} />

        <Route path="/community" exact component={CM} />
        <Route path="/userRanking" exact component={UR} />
        <Route path="/productRanking" exact component={PR} />
        <Route path="/reviews" exact component={RV} />
        <Route path="/whatsKati" exact component={WK} />
        <Route path="/howToUse" exact component={HU} />
        <Route path="/searchProduct/food/:id" exact component={FD} />
        <Route path="/searchProduct/bssh/:id" exact component={FD} />
        <Route path="/login" exact component={LG} />
        <Route path="/join" exact component={Join} />
        <Route path="/delete" exact component={DU} />
        <Route path="/mypage" exact component={MP} />
        <Route path="/changePassword" exact component={CUP} />

        <Route path="/findUser/email" exact component={FUE} />
        <Route path="/findUser/password" exact component={FUP} />

        {/* url잘못치면 메인으로 */}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
