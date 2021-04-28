import React, { useState } from "react";
import axios from "axios";
import { Button, Card, CardTitle, Col, Container} from "reactstrap";
import { useHistory } from 'react-router-dom';

function DeleteUser() {
    const [password, setPassword] = useState("");
    const history=useHistory();
    const withdrawal = () => {
        axios({
            url: "http://13.124.55.59:8080/withdraw",
            method: "POST",
            data: {
                password: password,
            },
            headers: {
                Authorization: localStorage.getItem("authorization"),
            },
        }).then((response) => {
            console.log(response);
            alert("탈퇴하셨습니다");
            history.push("/");//메인으로
        })
        .catch((error)=>{
             alert("비밀번호가 틀렸습니다.");
              const status = error.response.status;
                if (status === 401) {
                    //console.log("fail");
                   
                }
        })
        ;
    };

    return (
      <div className="FindUser">
            <Container>
                <p className="title">탈퇴하기</p>
                <Card body>
                    <Col>
                        <CardTitle className="card-title">비밀번호를 입력해주세요.</CardTitle>
                    </Col>
                    <Col md="6">
                        <div class="form-group">
                            <label for="exampleDropdownFormPassword1">비밀번호</label>
                            <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password"
                            onChange={(e) => {
                    setPassword(e.target.value);
                }}
      />
    </div>
                    </Col>
                    <Col>
                        <Button onClick={withdrawal} className="submitButton">탈퇴하기</Button>
                    </Col>
                </Card>

            </Container>

        </div>
    );
}

export default DeleteUser;