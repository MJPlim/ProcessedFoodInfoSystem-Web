import React, { useEffect, useState } from 'react';
import {
  Col,
  Alert,
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
import { useHistory } from 'react-router-dom';
import { userJoin } from 'api';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import '../Join/JoinStyle.scss';

function Join(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState(moment(new Date()).format('yyyy-MM-DD'));
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

  const cancel = () => {
    props.history.goBack();
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
    <div className="joinPage">
      <Container className="container">
        <p className="title">회원가입</p>

        <Card body>
          <Form>
            <FormGroup>
              <Label className="inputLabel">
                <Input type="text" placeholder="이름" onChange={onNameChange} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label className="inputLabel">
                <Input
                  type="email"
                  placeholder="아이디"
                  onChange={onEmailChange}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label className="inputLabel">
                <Input
                  type="password"
                  placeholder="비밀번호"
                  onChange={onPasswordChange}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label className="inputLabel">
                <Input
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={onConPasswordChange}
                />
              </Label>
            </FormGroup>
            {error.conPasswordError !== null && (
              <Alert color={'danger'}>{error.conPasswordError} </Alert>
            )}
            <FormGroup>
              <Label className="inputLabel">
                <Input
                  type="text"
                  placeholder="주소"
                  onChange={onAddressChange}
                />
              </Label>
            </FormGroup>
            <FormGroup className="birthGroup">
              <Row>
                <Col>
                  <Label for="inputBirth">생년월일</Label>
                </Col>
                <Col className={'pickerRow'}>
                  <DatePicker
                    id="inputBirth"
                    wrapperClassName="birthDayPicker"
                    dateFormat="yyyy-MM-dd"
                    selected={new Date(birth)}
                    maxDate={new Date()}
                    onChange={(date) => setUserBirth(date)}
                    popperPlacement="bottom-start"
                    showYearDropdown={'true'}
                    showMonthDropdown={'true'}
                    dropdownMode={'select'}
                    locale="ko"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup className="regiButton">
              <Row>
                <Col>
                  <Label>
                    <Button outline color="warning" onClick={cancel}>
                      취소
                    </Button>
                  </Label>
                </Col>
                <Col>
                  <Label>
                    <Button outline color="danger" onClick={register}>
                      가입
                    </Button>
                  </Label>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Join;
