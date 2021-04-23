import React, { useState } from "react";
import axios from "axios";

var token;

function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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
    };

    return (
        <div className="login">
            <h1>로그인</h1>
            <input
                type="text"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="이메일을입력하세요"
            />
            <input
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="비밀번호입력하세요"
            />
            <button onClick={login}>로그인</button>
        </div>
    );
}

export default Login;