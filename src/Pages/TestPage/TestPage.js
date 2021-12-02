import React from "react";
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

function TestPage() {
  return (
    <div>
      Test 페이지 입니다 ~
      <div>
        <NavLink className="select_btn" tag={Link} to={"/loginTest"}>
          로그인 테스트 `(아이디 비밀번호 전부 맞는 것)`
        </NavLink>
        <NavLink className="select_btn" tag={Link} to={"/failloginTest"}>
          로그인 테스트 `(아이디 비밀번호 전부 틀린 것)`
        </NavLink>
        <NavLink className="select_btn" tag={Link} to={"/joinTest"}>
          회원가입 테스트 `(맞는것)`
        </NavLink>
      </div>
    </div>
  );
}

export default TestPage;
