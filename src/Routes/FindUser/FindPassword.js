import React, {useState} from 'react';
import "./FindUserStyle.scss"
import {Alert, Button, Card, CardTitle, Col, Container, Input, Spinner} from "reactstrap";
import isEmail from "validator/es/lib/isEmail";
import axios from "axios";
import {findPasswordApi} from "../../api";

const FindPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(null);


    const onChange = (e) => {
        setEmail(e.target.value);
    };

    const makeErrorMessage = (e) => {
        if (e === 400) {
            setMessage('가입되지 않은 이메일 입니다.')
        }
        setLoading(false);
    }


    const emailSubmit = () => {
        setLoading(true);
        if (!isEmail(email)) {
            setMessage('잘못된 이메일 형식 입니다.')
            setLoading(false);
        } else {
            setMessage(null)
            findPasswordApi.postEmail(email)
                .then(function (response) {
                    setLoading(false);
                    alert('입력하신 이메일로 임시번호를 발송하였습니다.')
                })
                .catch(function (error) {
                    makeErrorMessage(error.response.status);
                    console.log(error.response.status);
                })
        }
    };


    return (
        <div className="FindUser">
            <Container>
                <p className="title">비밀번호 찾기</p>
                <Card body>
                    <Col>
                        <CardTitle className="card-title">비밀번호를 찾을 이메일을 입력해주세요.</CardTitle>
                    </Col>
                    <Col md="6">
                        <Input className="inputEmail" type="email" value={email} onChange={onChange}
                               placeholder="이메일을 입력해주세요."/>
                    </Col>
                    <Col md="6">
                        {message != null ?

                            <Alert color="danger">
                                {message}
                            </Alert>
                            : null}
                    </Col>
                    <Col>

                        {loading ?
                            <Spinner className="loadingSpinner" color="secondary"/> :
                            <Button onClick={emailSubmit} className="submitButton">확인</Button>}
                    </Col>
                </Card>

            </Container>

        </div>
    );
};

export default FindPassword;