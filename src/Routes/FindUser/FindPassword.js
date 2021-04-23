import React, {useState} from 'react';
import "./FindUserStyle.scss"
import {Alert, Button, Card, CardTitle, Col, Container, Input} from "reactstrap";
import isEmail from "validator/es/lib/isEmail";
import axios from "axios";
import {findPasswordApi} from "../../api";

const FindPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);


    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const emailSubmit = () => {
        if (!isEmail(email)) {
            setMessage('잘못된 이메일 형식 입니다.')
        } else {
            setMessage(null)
            findPasswordApi.postEmail(email)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error.response)
                    setError(error.response);
                })
        }
    };

    // if (error.status == 400) {
    //     setMessage('가입되지 않은 이메일 입니다.')
    // }

    return (
        <div className="FindUser">
            <Container>
                <p className="title">비밀번호 찾기</p>
                <Card body>
                    <Col>
                        <CardTitle className="card-title">조회하고자 하는 이메일을 입력해주세요.</CardTitle>
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
                        <Button onClick={emailSubmit} className="submitButton">확인</Button>
                    </Col>
                </Card>

            </Container>

        </div>
    );
};

export default FindPassword;