import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import { Container, Card } from 'reactstrap';
import axios from 'axios';

var token;

function SecondEmail() {
  const [secondEmail, setSecondEmail] = useState('');

  token = localStorage.getItem('authorization');

  const pushEmail = () => {
    console.log('이메일 설정부분');
    axios({
      url: 'http://13.124.55.59:8080/api/v1/user/set-secondEmail',
      method: 'POST', //set secondemail 로 post
      data: {
        secondEmail: secondEmail,
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response); // 200 : 패스워드 변경 완료
        if (response.status === 200) {
          alert('설정이 완료되었습니다');
        }
      })
      .catch((error) => {
        const status = error.response.status;
        console.log(status);
      });
  };

  return (
    <div className="setEmail">
      <Container>
        <Card body>
          <form>
            <p>2차 보안용 이메일 설정하기</p>
            <hr />
            <div class="form-group">
              <label for="exampleDropdownFormEmail1">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="설정할 이메일을 입력해주세요"
                onChange={(e) => {
                  setSecondEmail(e.target.value);
                }}
              />
            </div>
          </form>
          <div>
            <button onClick={pushEmail} type="submit" class="btn btn-danger">
              설정하기
            </button>
          </div>
          <div class="dropdown-divider"></div>
        </Card>
      </Container>
    </div>
  );
}

export default SecondEmail;
