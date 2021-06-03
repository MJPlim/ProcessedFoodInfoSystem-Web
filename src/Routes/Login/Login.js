import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import './LoginStyle.scss';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { MdAssignmentInd } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUsersCog } from 'react-icons/fa';
import { userLogin } from 'api';

var token;

function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bChecked, setChecked] = useState(false);
  const [bSave, setSave] = useState(false);

  const login = () => {
    userLogin
      .userLoginApi(email, password)
      .then((response) => {
        token = response.headers.authorization;
        localStorage.setItem('authorization', token);
        props.history.goBack();
      })
      .catch((error) => {
        alert('잘못된 정보입니다', error);
      });
    if (bSave) {
      localStorage.setItem('userLoginEmail', email);
      localStorage.setItem('userLoginPassword', password);
      localStorage.setItem('userBEmail', email);
      localStorage.setItem('userBPassword', password);
    } else if (!bSave) {
      localStorage.setItem('userLoginEmail', null);
      localStorage.setItem('userLoginPassword', null);
      localStorage.setItem('userBEmail', email);
      localStorage.setItem('userBPassword', password);
    }
  };

  const checkedItemHandler = (isChecked) => {
    if (isChecked) {
      setSave(true);
    } else if (!isChecked) {
      setSave(false);
    }
  };

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(target.checked);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log(localStorage.getItem('authorization'));
    if (localStorage.getItem('authorization') !== 'null') {
      alert('이미 로그인되어 있습니다.');
      props.history.goBack();
    }
  }, []);

  return (
    <div className="loginPage">
      <div className="katiLogin">
        <Container className="container">
          <p className="title">로그인</p>
          <Card body className="formBody">
            <Form>
              <FormGroup>
                <Label>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="이메일"
                    onChange={onEmailChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup className="inputGroup">
                <Label>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="비밀번호"
                    onChange={onPasswordChange}
                  />
                </Label>
              </FormGroup>
              <Row form className="loginGroup">
                <Col md={7} className="rememberLogin">
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={(e) => checkHandler(e)}
                      />
                      자동로그인
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={5} className="loginButton">
                  <FormGroup>
                    <Label>
                      <Button outline color="success" onClick={login}>
                        로그인
                      </Button>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col xs={3} className="userConTrol">
                  <Link to="/findUser/email" className="userGroup">
                    <b className="userSection">아이디</b>
                  </Link>
                </Col>
                <Col xs={5} className="userConTrol">
                  <Link to="/findUser/password" className="userGroup">
                    <b className="userSection">비밀번호 찾기</b>
                  </Link>
                </Col>
                <Col xs={4} className="userConTrol">
                  <Link to="/join" className="userGroup">
                    <b className="userSection">회원가입</b>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card>
        </Container>
      </div>
      {/* <div className="socialLogin">
        <Container>
          <p className="title">소셜 로그인</p>

          <Card body>
            <button type="submit" class="btn btn-light btn-lg">
              <Link to="http://kkati.ml:8080/oauth2/authorization/google">
                <FcGoogle size="30" />
                구글로 로그인하기
              </Link>
            </button>
          </Card>
        </Container>
      </div> */}
    </div>
  );
}

export default Login;
