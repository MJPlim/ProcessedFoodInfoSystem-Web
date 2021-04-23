import React, { useState } from "react";
import axios from "axios";

function Join() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBrith] = useState("");

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
    };

    return (
        <div className="App">
            <div className="registration">
                <h1>회원가입</h1>
                <label>ID</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <br />
                <label>Password</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <label>Email</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <br />
                <label>Address</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
                <br />
                <label>Birth</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setBrith(e.target.value);
                    }}
                />
                <br />
                <button onClick={register}>가입</button>
            </div>
        </div>
    );
}

export default Join;