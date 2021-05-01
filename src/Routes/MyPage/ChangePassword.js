import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import {
  Alert,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Input,
  Spinner,
} from 'reactstrap';
import axios from 'axios';
import { findPasswordApi } from '../../api';

//modify-password 로 post
// 400: 기존 패스워드와 동일합니다 or 패스워드가 일치하지 안습니다
// 200 : 패스워드 변경 완료
const ChangePassword = () => {
  const [beforePassword, setBeforePassword] = useState('');
  const [afterPassword, setAfterPassword] = useState('');

  const passwordSubmit = () => {
    console.log('Start Submit');
    axios({
      url: 'http://13.124.55.59:8080/modify-password',
      method: 'POST',
      data: {
        beforePassword: beforePassword,
        afterPassword: afterPassword,
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      },
    })
      .then((response) => {
        console.log('데이터 보내고 받는 것 까지 ㅇㅋㅇㅋ');
        alert('완료임 response');
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 400) {
          alert(status);
        } else {
          alert('비밀번호 변경 완료');
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
};

export default ChangePassword;
