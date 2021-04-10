import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirth, setUserBirth] = useState("");

  return (
      <div className="login">
        <h1>로그인</h1>
        <input type="text" placeholder="아이디입력하세요" />
        <input type="password" placeholder="비밀번호입력하세요" />
        <button>로그인</button>
      </div>
  );
}

export default Login;