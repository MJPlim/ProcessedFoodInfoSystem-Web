import React, { useState } from 'react';
import './FindUserStyle.scss';
import { Alert, Button, Card, Container, FormGroup, Input, Label, Spinner } from 'reactstrap';
import isEmail from 'validator/es/lib/isEmail';
import { findPasswordApi } from '../../api';
import Loading from '../ErrorPage/Loading';
const FindPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const makeErrorMessage = (e) => {
    if (e === 400) {
      setMessage('가입되지 않은 이메일 입니다.');
    }
    setLoading(false);
  };

  const emailSubmit = () => {
    setLoading(true);
    if (!isEmail(email)) {
      setMessage('잘못된 이메일 형식 입니다.');
      setLoading(false);
    } else {
      setMessage(null);
      findPasswordApi
        .postEmail(email)
        .then(function(response) {
          setLoading(false);
          alert('입력하신 이메일로 임시번호를 발송하였습니다.');
        })
        .catch(function(error) {
          makeErrorMessage(error.response.status);
          console.log(error.response.status);
        });
    }
  };

  return (
    <div className='FindUser'>
      {!loading?(<Container >
        <Loading className="loading__now"/>
        <p className='title loading__ui'>비밀번호 찾기</p>
        <Card body  className="loading__ui">
          <FormGroup className='formGroup loading__ui'>
            <Label className='inputEmail loading__ui'>
              <Input
                type='email'
                value={email}
                onChange={onChange}
                placeholder='가입한 이메일'
              />
            </Label>
            <Label className='buttonArea loading__ui'>
               <Button className="loading__ui">
                  확인
                </Button>
            </Label>
            <Label className='alertArea loading__ui'>
              {message != null ? <Alert color='danger'>{message}</Alert> : null}
            </Label>
          </FormGroup>
        </Card>
      </Container>):
      <Container>
        <p className='title'>비밀번호 찾기</p>
        <Card body>
          <FormGroup className={'formGroup'}>
            <Label className='inputEmail'>
              <Input
                type='email'
                value={email}
                onChange={onChange}
                placeholder='가입한 이메일'
              />
            </Label>
            <Label className='buttonArea'>
               <Button onClick={emailSubmit} className='submitButton'>
                  확인
                </Button>
            </Label>
            <Label className={'alertArea'}>
              {message != null ? <Alert color='danger'>{message}</Alert> : null}
            </Label>
          </FormGroup>
        </Card>
      </Container>
      }
    </div>
  );
};

export default FindPassword;
