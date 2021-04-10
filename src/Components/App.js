import React, {Component} from "react";
import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
class App extends Component {
  render(){
    return (
    <>
    <GlobalStyle/>
    <Router/>
    </>
    );
  }
}
export default App;
