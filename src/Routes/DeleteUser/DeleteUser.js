import React, { useState } from "react";
import axios from "axios";

function DeleteUser() {
    const [password, setPassword] = useState("");

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
        });
    };

    return (
        <div className="withdrawal">
            <input
                type="text"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="비밀번호 확인"
            />
            <button onClick={withdrawal}>회원탈퇴</button>
        </div>
    );
}

export default DeleteUser;