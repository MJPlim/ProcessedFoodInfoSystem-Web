import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardTitle, Col, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { userWithdrawal } from 'api';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

function DeleteUser() {
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const withdrawal = async () => {
    try {
      await userWithdrawal.deleteUser(password);
      alert('탈퇴완료');
    } catch (e) {
      console.log(e);
      alert('탈퇴실패');
    }
  };

  return (
    <div className="FindUser">
      <Container>
        <p className="title">탈퇴하기</p>
        <Card body>
          <Col>
            <CardTitle className="card-title">
              비밀번호를 입력해주세요.
            </CardTitle>
          </Col>
          <Col md="6">
            <div class="form-group">
              <label for="exampleDropdownFormPassword1">비밀번호</label>
              <input
                type="password"
                class="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="Password"
                onChange={onChange}
              />
            </div>
          </Col>
          <Col>
            <Button onClick={withdrawal} className="submitButton">
              탈퇴하기
            </Button>
          </Col>
        </Card>
      </Container>
    </div>
  );
}

export default DeleteUser;
