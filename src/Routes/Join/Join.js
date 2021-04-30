import React, { useState } from "react";
import axios from "axios";
import { Card, Container} from "reactstrap";
import { useHistory } from 'react-router-dom';

function Join() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBrith] = useState("");
    const history = useHistory();

    const register = () => {
        axios.create({ headers: { "Content-Type": "application/json" } });
        axios
            .post("http://13.124.55.59:8080/signup", {
                name: name,
                password: password,
                address: address,
                birth: birth,
                email: email,
            })
            .then((response) => {
                console.log(response);
            })
            .then((json) => console.log(json));
            alert("인증메일이 발송되었습니다");
            history.pushState("/");
          
    };

    return (
         <div className="FindUser">
            <Container>
                <p className="title">회원가입</p>
                <Card body>
                    <form>
                         <div class="form-group">
                         <label for="inputAddress">name</label>
                         <input type="text" class="form-control" id="inputAddress" placeholder="이름을 입력하세요"
                             onChange={(e) => {
                        setName(e.target.value);
                    }}
                         />
                         </div>

                        <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                         onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                        />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                         onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                        />
                        </div>
                        
                        <div class="form-group">
                         <label for="inputAddress">주소</label>
                         <input type="text" class="form-control" id="inputAddress" placeholder="ex)서울"
                             onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                         />
                         </div>

                         <div class="form-group">
                         <label for="inputAddress">생년월일</label>
                         <input type="text" class="form-control" id="inputAddress" placeholder="ex)1999-09-09"
                          onChange={(e) => {
                        setBrith(e.target.value);
                    }}
                         />
                         </div>
                        

                        <button type="submit" class="btn btn-danger"
                        onClick={register}
                        >회원가입</button>
                    </form>
                </Card>

            </Container>

        </div>
    );
   
}

export default Join;