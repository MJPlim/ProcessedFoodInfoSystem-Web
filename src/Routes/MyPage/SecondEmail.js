import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import {
  Col,
  Container,
  Button,
  Card,
  CardText,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonToggle,
} from 'reactstrap';
import { setSecurityEmail } from 'api';

function SecondEmail() {
  const [secondEmail, setSecondEmail] = useState('');

  const onChange = (e) => {
    setSecondEmail(e.target.value);
  };

  const pushEmail = async () => {
    try {
      await setSecurityEmail.securityEmail(secondEmail);
      alert('2차 보안용 이메일이 ' + secondEmail + '로 설정되었습니다');
    } catch (e) {
      alert('실패');
    }
  };

  return (
    <div className="setEmail">
      <Container>
        <div className="secondEmailContainer">
          <p className="title">2차 보안 설정</p>
          <Card body>
            <Form>
              <FormGroup>
                <Label className="secondEmail">
                  <Input
                    type="email"
                    placeholder="2차 보안용 이메일"
                    onChange={onChange}
                  />
                </Label>
                <Label className="secondEmailButton">
                  <Button
                    color="danger"
                    onClick={pushEmail}
                    className="submitButton"
                  >
                    설정
                  </Button>
                </Label>
              </FormGroup>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default SecondEmail;
