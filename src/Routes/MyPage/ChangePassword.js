import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import axios from 'axios';

var token;

function ChangePassword() {
  const [beforePassword, setBeforePassword] = useState('');
  const [afterPassword, setAfterPassword] = useState('');

  token = localStorage.getItem('authorization');

  const passwordSubmit = () => {
    console.log('Start Submit');
    axios({
      url: 'http://13.124.55.59:8080/modify-password',
      method: 'POST', //modify-password 로 post
      data: {
        beforePassword: beforePassword,
        afterPassword: afterPassword,
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response); // 200 : 패스워드 변경 완료
        alert('비밀번호 변경이 완료되었습니다');
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 400) {
          // 400: 기존 패스워드와 동일합니다 or 패스워드가 일치하지 안습니다
          alert('동일한 비밀번호 혹은 현 비밀번호가 다릅니다.');
        } else {
          alert('몰랑 왜이러냐');
        }
      });
  };

  return (
    <div className="changePassword">
      <form>
        <label>
          <input
            type="password"
            onChange={(e) => {
              setBeforePassword(e.target.value);
            }}
            placeholder="현재 비밀번호를 입력해주세요"
          />
        </label>
        <label>
          <input
            type="password"
            onChange={(e) => {
              setAfterPassword(e.target.value);
            }}
            placeholder="희망 비밀번호를 입력해주세요"
          />
        </label>
        <button onClick={passwordSubmit} type="submit">
          변경하기
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
