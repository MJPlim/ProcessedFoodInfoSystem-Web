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
        alert('로그인 완료');
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
                    type="email"
                    placeholder="이메일"
                    onChange={onEmailChange}
                  />
                </Label>
                <Label>
                  <Input
                    type="password"
                    placeholder="비밀번호"
                    onChange={onPasswordChange}
                  />
                </Label>
              </FormGroup>
            </Form>
            <div>
              <div>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => checkHandler(e)} />
                    자동로그인
                  </Label>
                </FormGroup>
                <button
                  onClick={login}
                  type="submit"
                  className="btn btn-outline-danger"
                >
                  로그인
                </button>
              </div>
            </div>

            <Link to="/join">
              <MdAssignmentInd size="20" color="#3a8082" />
              회원가입하기
            </Link>
            <Link to="/findUser/email">
              <FaUsersCog size="20" color="#3a8082" />
              아이디 찾기
            </Link>
            <Link to="/findUser/password">
              <RiLockPasswordFill size="20" color="#3a8082" />
              비밀번호를 잊으셨나요?
            </Link>
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
