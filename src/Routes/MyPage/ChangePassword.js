import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import { Container, Card } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { userChangePW } from 'api';

var token;

function ChangePassword() {
  const [beforePassword, setBeforePassword] = useState('');
  const [afterPassword, setAfterPassword] = useState('');

  token = localStorage.getItem('authorization');

  const history = useHistory();

  const passwordSubmit = async () => {
    try {
      await userChangePW.changePW(beforePassword, afterPassword);
      alert('변경 완료');
    } catch (e) {
      alert('입력하신 비밀번호가 동일 혹은 다릅니다');
    }
  };

  return (
    <div className="changePassword">
      <Container>
        <Card body>
          <form>
            <p>비밀번호 변경하기</p>
            <hr />
            <div class="form-group">
              <label for="exampleDropdownFormEmail1">현재 비밀번호</label>
              <input
                type="password"
                class="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="현재 비밀번호를 입력해주세요"
                onChange={(e) => {
                  setBeforePassword(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <label for="exampleDropdownFormPassword1">변경 비밀번호</label>
              <input
                type="password"
                class="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="희망 비밀번호를 입력해주세요"
                onChange={(e) => {
                  setAfterPassword(e.target.value);
                }}
              />
            </div>
          </form>
          <div>
            <button
              onClick={passwordSubmit}
              type="submit"
              class="btn btn-danger"
            >
              변경하기
            </button>
          </div>
          <div class="dropdown-divider"></div>
        </Card>
      </Container>
    </div>
  );
}

export default ChangePassword;
