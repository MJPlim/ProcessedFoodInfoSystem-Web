import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userBirth, setUserBirth] = useState('');

    const login = (userId, userPassword) => {
        const data = {
            userEmail,
            userPassword,
        };
        axios
            .post('/login', data)
            .then((response) => {
                const { accessToken } = response.data;
                axios.defaults.headers.common['Autorization'] = `Bearer ${accessToken}`;
            })
            .catch((error) => {});
        console.log(axios.defaults.headers);
        alert('로그인완료');
    };

    return (
        <div className="login">
            <h1>로그인</h1>
            <input
                type="text"
                onChange={(e) => {
                    setUserEmail(e.target.value);
                }}
                placeholder="이메일을입력하세요"
            />
            <input
                type="password"
                onChange={(e) => {
                    setUserPassword(e.target.value);
                }}
                placeholder="비밀번호입력하세요"
            />
            <button onClick={login}>로그인</button>
        </div>
    );
}

export default Login;
