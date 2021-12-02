import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MainPage from "../../Pages/MainPage/MainPage";
import RankingPage from "../../Pages/RankingPage/RankingPage";
import AdPage from "../../Pages/AdPage/AdPage";
import JoinPage from "../../Pages/JoinPage/JoinPage";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import SocialLoginPage from "../../Pages/MainPage/SocialLoginPage";
import Topbar from "./Topbar";
import FindEmailPage from "../../Pages/FindEmailPage/FindEmailPage";
import FindPwPage from "../../Pages/FindPwPage/FindPwPage";
import JoinEmailPage from "../../Pages/JoinEmailPage/JoinEmailPage";
import MyPage from "../../Pages/MyPage/MyPage";
import ItemDetailPage from "../../Pages/ItemDetailPage/ItemDetailPage";
// test pages
import TestPage from "../../Pages/TestPage/TestPage";
import LoginPageTest from "../../Pages/TestPage/TestLoginPage";
import FailLoginPageTest from "../../Pages/TestPage/FailTestLoginPage";
import JoinPageTest from "../../Pages/TestPage/TestJoinEmailPage";
const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/search" exact component={SearchPage}/>
      <Route path="/search/:id" exact component={ItemDetailPage} />
      <Route path="/ad" exact component={AdPage} />
      <Route path="/ranking" exact component={RankingPage} />
      <Route path="/join" exact component={JoinPage} />
      <Route path="/join/email" exact component={JoinEmailPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/find/email" exact component={FindEmailPage} />
      <Route path="/find/pw" exact component={FindPwPage} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/test" exact component={TestPage} />
      <Route path="/loginTest" exact component={LoginPageTest} />
      <Route path="/failloginTest" exact component={FailLoginPageTest} />
      <Route path="/joinTest" exact component={JoinPageTest} />
      <Route
        path="/login/ouath2/code/kakao"
        exact
        component={SocialLoginPage}
      />
      {/* url잘못치면 메인으로 */}
      <Redirect from="*" to="/" />
    </Switch>
  </Container>
);

export default Content;
