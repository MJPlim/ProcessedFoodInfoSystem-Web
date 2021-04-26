import React, { useState } from 'react';
import axios from 'axios';

function Logout() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userBirth, setUserBirth] = useState('');

  const logout = () => {
    localStorage.setItem("authorization", null);
      alert('로그아웃!');
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Logout;
