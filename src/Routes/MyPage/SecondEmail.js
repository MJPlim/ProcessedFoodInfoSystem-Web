import React, { useState } from 'react';
import './ChangePasswordStyle.scss';
import { Container, Card } from 'reactstrap';
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
                onChange={onChange}
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
