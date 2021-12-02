// import * as React from "react";
// import queryString from "query-string";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// const Login = (props: any) => {
//   const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=e44c5d0df42c6613c266e56204d9457b&redirect_uri=http://localhost:3000/login/ouath2/code/kakao&response_type=code`;
//   const query = queryString.parse(window.location.search);
//   React.useEffect(() => {
//     if (query.code) {
//       getKakaoTokenHandler(query.code.toString());
//     }
//   }, []);
//   const getKakaoTokenHandler = async (code: string) => {
//     const data: any = {
//       grant_type: "authorization_code",
//       client_id: process.env.REACT_APP_KAKAO_REST_KEY,
//       redirect_uri: "redirect URI 입력",
//       code: code,
//     };
//     const queryString = Object.keys(data)
//       .map(
//         (k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
//       )
//       .join("&");

//     //토큰 발급 REST API
//     axios
//       .post("https://kauth.kakao.com/oauth/token", queryString, {
//         headers: {
//           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//         },
//       })
//       .then((res) => {
//         //서버에 토큰 전송
//         sendKakaoTokenToServer(res.data.access_token);
//       });
//   };
//   return (
//     <>
//       <a href={kauthUrl}>
//         <img src="kakao_login.png" id="kakao-login-btn" width="250px" />
//       </a>
//     </>
//   );
// };
