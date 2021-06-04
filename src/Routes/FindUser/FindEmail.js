import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Input,
  CardText,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  ButtonToggle,
} from 'reactstrap';
import '../FindUser/FindEmailStyle.scss';
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
    <div className="findEmail">
      <Container className="container">
        <p className="title">이메일 찾기</p>
        <Card body>
          <FormGroup>
            <Label className="secondEmailInput">
              <Input
                type="email"
                placeholder="2차 보안 이메일"
                onChange={onChange}
              />
            </Label>
            <Label>
              <Button outline color="danger" onClick={emailSubmit}>
                찾기
              </Button>
            </Label>
          </FormGroup>
        </Card>
      </Container>
    </div>
  );
};

export default FindEmail;
