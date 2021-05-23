import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Input,
} from 'reactstrap';
import './FindUserStyle.scss';
import isEmail from 'validator/es/lib/isEmail';
import axios from 'axios';
import { findEmail } from 'api';

const FindEmail = () => {
  const [secondEmail, setSecondEmail] = useState('');
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setSecondEmail(e.target.value);
    console.log(secondEmail);
  };

  const emailSubmit = () => {
    if (!isEmail(secondEmail)) {
      setMessage('잘못된 이메일 형식 입니다.');
    } else {
      setMessage(null);
      findEmail
        .findUserEmail(secondEmail)
        .then((response) => {
          alert(
            ' 입력하신 ' + secondEmail + '로 이메일을 발송했습니다',
            response,
          );
        })
        .catch((error) => {
          alert('잘못된 이메일 주소입니다', error);
        });
    }
  };

  return (
    <div className="FindUser">
      <Container>
        <p className="title">이메일 조회</p>
        <Card body>
          <Col>
            <CardTitle className="card-title">
              아이디를 찾을 계정의 2차 메일을 입력해주세요.
            </CardTitle>
          </Col>
          <Col md="6">
            <Input
              className="inputEmail"
              type="email"
              value={secondEmail}
              onChange={onChange}
              placeholder="이메일을 입력해주세요."
            />
          </Col>
          <Col md="6">
            {message != null ? <Alert color="danger">{message}</Alert> : null}
          </Col>
          <Col>
            <Button onClick={emailSubmit} className="submitButton">
              확인
            </Button>
          </Col>
        </Card>
      </Container>
    </div>
  );
};

export default FindEmail;
