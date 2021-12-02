import React from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row, NavLink} from "reactstrap";
import { Link } from "react-router-dom";
import { getKakaoLogin, userLogin } from "../../api";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import {AiOutlineMail} from "react-icons/ai";
import "./JoinPageStyle.scss";
function JoinPage() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
     <div style={{display:'flex', flexDirection: "column",
      alignItems: "center",justifyContent: "center",fontSize:'1.5rem',fontWeight:"600",margin:'30px'}}>
      <div style={{marginBottom:'30px'}}>카티에 오신 것을 환영합니다!</div>
      <hr width="140%"/>
     </div>
     <div style={{marginBottom:'30px',fontSize:"1.2rem"}}>카티 회원가입 방식을 선택하세요</div>
      
     <NavLink className="social_join_btn" tag={Link} to={"/join/email"}>
        <div><AiOutlineMail size="30" color="gray" /></div>
        <div style={{fontSize:"1rem", marginLeft:"1rem",color:"black"}}>이메일 회원가입</div>
        <div style={{fontSize:"0.8rem", marginLeft:"1rem",color:"#A8A8A8"}}>이메일로 인증하여 회원가입</div>
      </NavLink>

      <div className="social_join_btn">
        <div><SiKakaotalk size="30" color="#3a1c1c"/></div>
        <div style={{fontSize:"1rem", marginLeft:"1rem"}}>카카오 회원가입</div>
        <div style={{fontSize:"0.8rem", marginLeft:"1rem",color:"#A8A8A8"}}>카카오로 인증하여 회원가입</div>
      </div>

      <div className="social_join_btn">
        <div><SiNaver size="30" color="#2DB400"/></div>
        <div style={{fontSize:"1rem", marginLeft:"1rem"}}>네이버 회원가입</div>
        <div style={{fontSize:"0.8rem", marginLeft:"1rem",color:"#A8A8A8"}}>네이버로 인증하여 회원가입</div>
      </div>
 
   </div>
  );
}

export default JoinPage;
