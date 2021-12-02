import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { getKakaoLogin, testTest, userLogin } from "../../api";
import "./LoginPageStyle.scss";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import queryString from "query-string";
import { KAKAO_AUTH_URL } from "./KakaoAuth";
import axios from "axios";

var token;

function LoginTestPage() {
  const [okLogin, setOkLogin] = useState(false);

  useEffect(() => {
    let autoLogin = setTimeout(() => {
      userLogin
        .userLoginApi("cksgh3421@nate.com", "1234569")
        .then((response) => {
          console.log(response);
          console.log(response.headers.authorization);
          token = response.headers.authorization;
          localStorage.setItem("authorization", token);
          console.log("성공함");
          console.log(
            "토큰 저장 완료 : ",
            localStorage.getItem("authorization")
          );
          setOkLogin(true);
          window.location.href = "/";
        })
        .catch((error) => {
          alert("로그인 실패", error);
          console.log(error);
          console.log(error.response);
          console.log("LoginPage.js <- 여기서 login 부분 실패");
        });
    }, 3000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "2rem" }}>KATI</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="cksgh3421@nate.com"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="1234569"
                  type="password"
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup check>
            <Input id="exampleCheck" name="check" type="checkbox" />
            <Label check for="exampleCheck" style={{ fontSize: "small" }}>
              이메일 기억하기
            </Label>
          </FormGroup>
          <button
            className="login_btn"
            style={{ width: "100%", height: "50px" }}
          >
            로그인
          </button>
          <div
            style={{ display: "flex", marginTop: "10px", marginBottom: "50px" }}
          >
            <NavLink className="select_btn" tag={Link} to={"/join"}>
              회원가입
            </NavLink>
            <NavLink className="select_btn" tag={Link} to={"/find/email"}>
              이메일 찾기
            </NavLink>
            <NavLink className="select_btn" tag={Link} to={"/find/pw"}>
              비밀번호 찾기
            </NavLink>
          </div>
          <Button
            className="social_login_btn"
            style={{ backgroundColor: "white", border: "1px solid #B1B1B1" }}
            href={KAKAO_AUTH_URL}
          >
            <div>
              <SiKakaotalk size="30" color="#3a1c1c" />
            </div>
            <div>카카오 로그인</div>
          </Button>

          <Button
            className="social_login_btn"
            style={{ backgroundColor: "white", border: "1px solid #B1B1B1" }}
            href="http://3.38.97.234:8000/core-service/oauth2/authorization/naver"
          >
            <div>
              <SiNaver size="30" color="#2DB400" />
            </div>
            <div>네이버 로그인</div>
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginTestPage;
