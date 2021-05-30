import React, { useState } from 'react';
import axios from 'axios';
import { Card, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { userJoin } from 'api';

function Join() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBrith] = useState('');
  const history = useHistory();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onBirthChange = (e) => {
    setBrith(e.target.value);
  };

  const register = async () => {
    try {
      await userJoin.userRegister(name, password, address, birth, email);
      alert('입력하신 ' + email + '주소로 인증메일이 발송되었습니다');
    } catch (e) {
      console.log(e);
      alert('틀린 정보입니다.');
    }
  };

  // const register = () => {
  //   userJoin
  //     .userRegister(name, password, address, birth, email)
  //     .then((response) => {
  //       alert('입력하신 ' + email + '주소로 인증메일이 발송되었습니다');
  //     })
  //     .catch((error) => {
  //       alert('잘못된 정보입니다', error);
  //     });
  // };

  return (
    <div className="FindUser">
      <Container>
        <p className="title">회원가입</p>
        <Card body>
          <form>
            <div class="form-group">
              <label for="inputAddress">name</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="이름을 입력하세요"
                onChange={onNameChange}
              />
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={onEmailChange}
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </div>

            <div class="form-group">
              <label for="inputAddress">주소</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="ex)서울"
                onChange={onAddressChange}
              />
            </div>

            <div class="form-group">
              <label for="inputAddress">생년월일</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="ex)1999-09-09"
                onChange={onBirthChange}
              />
            </div>

            <button type="submit" class="btn btn-danger" onClick={register}>
              회원가입
            </button>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default Join;
