import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirth, setUserBirth] = useState("");

  const register = () => {
    axios.create({ headers: { "Content-Type": "application/json" } });
    axios
      .post("http://13.124.55.59:8080/signup", {
        name: userId,
        password: userPassword,
        address: userAddress,
        birth: userBirth,
        email: userEmail,
      })
      .then((response) => {
        console.log(response);
      })
      .then((json) => console.log(json));
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>회원가입</h1>
        <label>ID</label>
        <input
          type="text"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <br />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <br />
        <label>Address</label>
        <input
          type="text"
          onChange={(e) => {
            setUserAddress(e.target.value);
          }}
        />
        <br />
        <label>Birth</label>
        <input
          type="text"
          onChange={(e) => {
            setUserBirth(e.target.value);
          }}
        />
        <br />
        <button onClick={register}>가입</button>
      </div>
    </div>
  );
}

export default Login;