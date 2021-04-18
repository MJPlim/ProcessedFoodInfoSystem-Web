import React, {useState} from 'react';
import axios from 'axios';

function deleteUser() {
  const [userDelete, setUserDelete] = useState('');

  const withdrawal = () => {
    axios
      .post('/withdraw', {
        password: userDelete,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="withdrawal">
      <input
        type="text"
        onChange={(e) => {
          setUserDelete(e.target.value);
        }}
        placeholder="비밀번호 확인"
      />
      <button onClick={withdrawal}>회원탈퇴</button>
    </div>
  );
}

export default deleteUser;
