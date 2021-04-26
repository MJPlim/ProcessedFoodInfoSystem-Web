import React, { useState } from "react";
import axios from "axios";
import {Container,Card} from "reactstrap";
import  "./LoginStyle.scss";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
var token;

function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    const login = () => {
        axios({
            url: "http://13.124.55.59:8080/login",
            method: "POST",
            data: {
                email: email,
                password: password,
            },
        })
            .then((response) => {
                console.log(12345);
                token = response.headers.authorization;
                console.log(token);
                localStorage.setItem("authorization", token);
              
            })
            .catch((error) => {
                const status = error.response.status;
                if (status === 401) {
                    console.log("fail");
                  
                }
            });
             history.push('/');//로그인 후 메인페이지로..
    };

    return (
     <div className="login">
            <Container>
            <p className="title">로그인</p>
                <Card body>
              <form >
    <div class="form-group">
      <label for="exampleDropdownFormEmail1">이메일</label>
      <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"
       onChange={(e) => {
                    setEmail(e.target.value);
                }}
      />
    </div>
    <div class="form-group">
      <label for="exampleDropdownFormPassword1">비밀번호</label>
      <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password"
        onChange={(e) => {
                    setPassword(e.target.value);
                }}
      />
    </div>
     <div class="form-check">
      <input type="checkbox" class="form-check-input" id="dropdownCheck"/>
      <label class="form-check-label" for="dropdownCheck">
        자동 로그인
      </label>
    </div>
     <button onClick={login} type="submit" class="btn btn-danger">로그인</button>
  </form>
  <div class="dropdown-divider"></div>
  <Link class="dropdown-item" to="/join">회원가입하기</Link>
  <Link class="dropdown-item" to="/findUser/password">비밀번호를 잊으셨나요?</Link>
</Card>
            </Container>

        </div>
    );
}

export default Login;