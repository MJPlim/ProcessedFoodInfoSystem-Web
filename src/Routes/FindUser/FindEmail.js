import React, {useState} from 'react';
import {Alert, Button, Card, CardTitle, Col, Container, Form, Input} from "reactstrap";
import "./FindEmail.scss"
import axios from "axios";
import isEmail from "validator/es/lib/isEmail";

const FindEmail = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setEmail(e.target.value);
        console.log(email)
    };

    const emailSubmit = () => {
        if (!isEmail(email)) {
            setError('잘못된 이메일 형식 입니다.')
        } else {
            setError(null)
        }
    };


    return (
        <div className="FindEmail">
            <Container>
                <p className="title">이메일 조회</p>
                <Card body>
                    <Col>
                        <CardTitle className="card-title">조회하고자 하는 이메일을 입력해주세요.</CardTitle>
                    </Col>
                    <Col md="6">
                        <Input className="inputEmail" type="email" value={email} onChange={onChange}
                               placeholder="이메일을 입력해주세요."/>
                    </Col>
                    <Col md="6">
                        {error != null ?

                                <Alert color="danger">
                                    {error}
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

export default FindEmail;