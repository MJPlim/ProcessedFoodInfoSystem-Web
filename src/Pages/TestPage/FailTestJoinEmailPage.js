import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { userJoin } from "../../api";
import moment from "moment/moment";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
function JoinEmailPage(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState(moment(new Date()).format("yyyy-MM-DD"));
  const [error, setError] = useState({
    conPasswordError: null,
  });
  const [loading, setLoading] = useState(null);
  registerLocale("ko", ko);

  useEffect(() => {
    setName("육도선인");
    setPassword("wjdgns12");
    setConPassword("wjdgns12");
    setEmail("zhengxun1218@naver.com");
    setAddress("두꺼비마을");
    setBirth("1950-12-18");
    let autoRegi = setTimeout(() => {
      setLoading(true);
      if (
        conPassword === "" ||
        error.conPasswordError !== null ||
        address === "" ||
        birth === moment(new Date()).format("yyyy-MM-DD")
      ) {
        alert("정확히 입력해 주세요.");
        setLoading(false);
      } else {
        userJoin
          .userRegister(
            "육도선인",
            "wjdgns12",
            "두꺼비마을",
            "1950-12-18",
            "zhengxun1218@naver.com"
          )
          .then(() => {
            alert("입력하신 " + email + "주소로 인증메일이 발송되었습니다");
            setLoading(false);
            props.history.goBack();
          })
          .catch((e) => {
            console.log(e);
            alert("틀린 정보입니다.");
            setLoading(false);
          });
      }
    }, 3000);
  }, []);

  const cancel = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (conPassword !== password) {
      setError({ ...error, conPasswordError: "비밀번호가 일치하지 않습니다." });
    } else {
      setError({ ...error, conPasswordError: null });
    }
  }, [password, conPassword]);

  return (
    <div style={{ width: "50%", margin: "30px auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
          margin: "20px",
        }}
      >
        <div style={{ marginBottom: "30px" }}>회원가입</div>

        <div style={{ fontSize: "0.8rem", marginLeft: "1.2rem" }}>
          회원가입을 위해 필요한 정보들을 입력해 주세요.
        </div>
        <hr width="120%" />
      </div>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">이메일</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="zhengxun1218@naver.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">비밀번호</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="wjdgns12"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">비밀번호 확인</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="wjdgns12"
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">이름</Label>
          <Input type="text" placeholder="육도선인" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">주소</Label>
          <Input type="text" placeholder="두꺼비마을" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">생년월일</Label>
          <DatePicker
            id="inputBirth"
            wrapperClassName="birthDayPicker"
            dateFormat="yyyy-MM-dd"
            placeholderText={"1950-06-25"}
            maxDate={new Date()}
            popperPlacement="bottom-start"
            showYearDropdown={"true"}
            showMonthDropdown={"true"}
            dropdownMode={"select"}
            locale="ko"
          />
        </FormGroup>

        <Button style={loading ? { cursor: "not-allowed" } : null}>완료</Button>
      </Form>
    </div>
  );
}

export default JoinEmailPage;
