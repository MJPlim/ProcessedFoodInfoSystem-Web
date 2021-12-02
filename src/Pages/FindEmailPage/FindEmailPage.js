import React, { useState } from 'react';
import { Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import isEmail from 'validator/es/lib/isEmail';
import { findEmail } from '../../api';
function FindEmailPage() {

  const [secondEmail, setSecondEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const onChange = (e) => {
    setSecondEmail(e.target.value);
    console.log(secondEmail);
  };

  const emailSubmit = () => {
    //setLoading(true);

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
          window.location.href = '/login';
         
        })
        .catch((error) => {
          alert('잘못된 이메일 주소입니다', error);
       
        });
    }
  };

    return (
        <div style={{width: '50%', margin: '30px auto'}}>
        <div style={{display:'flex', flexDirection: "column",
              alignItems: "center",justifyContent: "center",fontSize:'1.5rem',margin:'20px'}}>
              <div style={{marginBottom:'20px'}}>이메일 찾기</div>
              <hr width="120%"/>
             
        </div>
        <Form>
        <FormGroup>
          <Label for="exampleEmail">2차 보안 이메일</Label>
          <Input  onChange={onChange} type="email" name="email" id="exampleEmail" placeholder="2차 이메일을 입력하세요" />
        </FormGroup>
        <Label className={'alertArea'}>
                {message != null ? (
                  <Alert color="danger">{message}</Alert>
                ) : null}
              </Label>
        <Button   onClick={!loading ? emailSubmit : (e) => e.preventDefault()}>완료</Button>
      </Form>
     
        </div>
    )
}

export default FindEmailPage
