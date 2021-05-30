import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card } from 'reactstrap';
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
    <div className="FindUser">
      <div className="katiLogin">
        <Container>
          <p className="title">로그인</p>
          <Card body>
            <form>
              <div class="form-group">
                <label for="exampleDropdownFormEmail1">이메일</label>

                <input
                  type="email"
                  class="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="email@example.com"
                  onChange={onEmailChange}
                />
              </div>

              <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
                  onChange={onPasswordChange}
                />
              </div>

              <div class="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="dropdownCheck"
                  onChange={(e) => checkHandler(e)}
                />
                <label className="form-check-label" for="dropdownCheck">
                  자동 로그인
                </label>
              </div>
            </form>
            <div>
              <button
                onClick={login}
                type="submit"
                className="btn btn-outline-danger"
              >
                로그인
              </button>
            </div>
            <div class="dropdown-divider"></div>

            <Link class="dropdown-item" to="/join">
              <MdAssignmentInd size="20" color="#3a8082" />
              회원가입하기
            </Link>
            <Link class="dropdown-item" to="/findUser/email">
              <FaUsersCog size="20" color="#3a8082" />
              아이디 찾기
            </Link>
            <Link class="dropdown-item" to="/findUser/password">
              <RiLockPasswordFill size="20" color="#3a8082" />
              비밀번호를 잊으셨나요?
            </Link>
          </Card>
        </Container>
      </div>
      <div className="socialLogin">
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
      </div>
    </div>
  );
}

export default Login;
