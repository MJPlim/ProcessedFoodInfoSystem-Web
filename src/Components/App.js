import React, { Component } from 'react';
import Router from './Router';
import GlobalStyle from './GlobalStyle';
import axios from 'axios';

class App extends Component {
  componentWillMount() {
    axios({
      url: 'http://13.124.55.59:8080/login',
      method: 'POST',
      data: {
        email: localStorage.getItem('userLoginEmail'),
        password: localStorage.getItem('userLoginPassword'),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('새롭게 토큰 받아오기 ------------------');
        localStorage.setItem('authorization', response.headers.authorization);
        console.log(localStorage.getItem('authorization'));
        console.log('새로운 토큰 잘 받아왔슴 땡큐 베리 머치');
      })
      .catch((error) => {
        const status = error.response.status;
        console.log(status);
      });
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Router />
      </>
    );
  }
}
export default App;
