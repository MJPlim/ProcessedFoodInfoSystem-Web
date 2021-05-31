import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { userJoin } from 'api';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

function Join() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState(moment(new Date).format('yyyy-MM-DD'));
  const [error, setError] = useState({
    conPasswordError: null,
  });
  const history = useHistory();

  registerLocale('ko', ko);


  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConPasswordChange = (e) => {
    setConPassword(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const setUserBirth = (date) => {
    setBirth(moment(date).format('yyyy-MM-DD'));
  };

  const register = async () => {
    if (conPassword === '' || error.conPasswordError !== null) {
      alert('틀린 정보입니다.');

    } else {
      try {
        await userJoin.userRegister(name, password, address, birth, email);
        alert('입력하신 ' + email + '주소로 인증메일이 발송되었습니다');
      } catch (e) {
        console.log(e);
        alert('틀린 정보입니다.');
      }
    }

  };

  useEffect(() => {
    if (conPassword !== password) {
      setError({ ...error, conPasswordError: '비밀번호가 일치하지 않습니다.' });
    } else {
      setError({ ...error, conPasswordError: null });
    }
  }, [password, conPassword]);

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
    <div className='FindUser'>
      <Container>
        <p className='title'>회원가입</p>
        <Card body>
          <form>
            <div class='form-group'>
              <label for='inputAddress'>name</label>
              <input
                type='text'
                class='form-control'
                id='inputAddress'
                placeholder='이름을 입력하세요'
                onChange={onNameChange}
              />
            </div>

            <div class='form-group'>
              <label for='exampleInputEmail1'>Email address</label>
              <input
                type='email'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                onChange={onEmailChange}
              />
              <small id='emailHelp' class='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>

            <div class='form-group'>
              <label for='exampleInputPassword1'>Password</label>
              <input
                type='password'
                class='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
                onChange={onPasswordChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='exampleInputPassword1'>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Confirm Password'
                onChange={onConPasswordChange}
              />
            </div>

            {error.conPasswordError !== null && <Alert color={'danger'}>{error.conPasswordError} </Alert>}


            <div class='form-group'>
              <label for='inputAddress'>Address</label>
              <input
                type='text'
                class='form-control'
                id='inputAddress'
                placeholder='ex)서울'
                onChange={onAddressChange}
              />
            </div>

            <div class='form-group'>
              <label for='inputBirth'>Birth</label>
              <Row className={'pickerRow'}>
                <DatePicker
                  id='inputBirth'
                  wrapperClassName='birthDayPicker'
                  dateFormat='yyyy-MM-dd'
                  selected={new Date(birth)}
                  maxDate={new Date()}
                  onChange={(date) => setUserBirth(date)}
                  popperPlacement='bottom-start'
                  showYearDropdown={'true'}
                  showMonthDropdown={'true'}
                  dropdownMode={'select'}
                  locale='ko'
                />
              </Row>

            </div>
          </form>
          <button type='submit' class='btn btn-danger' onClick={register}>
            회원가입
          </button>
        </Card>
      </Container>
    </div>
  );
}

export default Join;
