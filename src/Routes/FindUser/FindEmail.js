import React, {useState} from 'react';
import {Alert, Button, Card, CardTitle, Col, Container, Input} from "reactstrap";
import "./FindUserStyle.scss"
import isEmail from "validator/es/lib/isEmail";

const FindEmail = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const onChange = (e) => {
        setEmail(e.target.value);
        console.log(email)
    };

    const emailSubmit = () => {
        if (!isEmail(email)) {
            setMessage('잘못된 이메일 형식 입니다.')
        } else {
            setMessage(null)
        }
    };


    return (
        <div className="FindUser">
            <Container>
                <p className="title">이메일 조회</p>
                <Card body>
                    <Col>
                        <CardTitle className="card-title">비밀번호를 찾을 계정을 입력해주세요.</CardTitle>
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

export default FindEmail;