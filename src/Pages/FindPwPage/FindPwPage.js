import React, { useState } from 'react';
import { Alert,Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import isEmail from 'validator/es/lib/isEmail';
import { findPasswordApi } from '../../api';

function FindPwPage() {

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
        .then(function (response) {
          setLoading(false);
          alert('입력하신 이메일로 임시번호를 발송하였습니다.');
          window.location.href = '/login';
        })
        .catch(function (error) {
          setLoading(false);
          makeErrorMessage(error.response);
          console.log(error.response);
        });
    }
  };

    return (
        <div style={{width: '50%', margin: '30px auto'}}>
        <div style={{display:'flex', flexDirection: "column",
              alignItems: "center",justifyContent: "center",fontSize:'1.5rem',margin:'20px'}}>
              <div style={{marginBottom:'20px'}}>비밀번호 찾기</div>
              <hr width="120%"/>
             
        </div>
        <Form>
        <FormGroup>
          <Label for="exampleEmail">이메일</Label>
          <Input  onChange={onChange} type="email" name="email" id="exampleEmail" placeholder="가입한 이메일을 입력하세요" />
        </FormGroup>

        <Button  onClick={!loading ? emailSubmit : (e) => e.preventDefault()} >완료</Button>
        <Label className={'alertArea'}>
                {message != null ? (
                  <Alert color="danger">{message}</Alert>
                ) : null}
              </Label>
      </Form>
     
        </div>
    )
}

export default FindPwPage
