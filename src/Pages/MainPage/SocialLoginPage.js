import React, { useState, useEffect } from "react";
import axios from "axios";
import { kakaoSocialLogin } from "../../api";
import { createDispatchHook } from "react-redux";

function SocialLoginPage() {
  const REDIRECT_URI = "http://localhost:3000/login/ouath2/code/kakao";
  const REST_API_KEY = "59ef8c79f653ad3c9c526a94827124a9";
  const CLIENT_SECRET = "Rf1yNHjgzlieBWNm7T4ZOvSaASvNZ8UV";

  useEffect(() => {
    const code = window.location.search.split("?code=")[1];
    if (code !== undefined) {
      requestToken(code)
        .then(({ data }) => {
          console.log("requestToken:", data);
          const accessToken = data.access_token;
          console.log(accessToken, "aceessToken 부분");
          localStorage.setItem("accessToken", accessToken);
          console.log(
            "로컬스토리지에 액세스토큰 저장 확인",
            localStorage.getItem("accessToken")
          );
          if (localStorage.getItem("accessToken") !== null) {
            fetchKakao(localStorage.getItem("accessToken"));
          } else {
            console.log("fetchKAKAO넘어가는 부분에서 안넘어감");
          }
        })
        .catch((err) => {
          console.log("requestTokenErr:", err.response);
          console.log("requestTokenErr:", err);
        });
    }
  }, []);

  const fetchKakao = (accessTT) => {
    kakaoSocialLogin
      .kakaoToken(accessTT)
      .then((response) => {
        console.log("잘들어옴 ㅇㅇ::", response);
      })
      .catch((error) => {
        console.log("밑 fetch", error.response);
        console.log(error, "에러발생 발생");
      });
  };

  function requestToken(code) {
    const makeFormData = (params) => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key]);
      });
      return searchParams;
    };
    return axios({
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      url: "https://kauth.kakao.com/oauth/token",
      data: makeFormData({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });
  }

  // useEffect(() => {
  //   console.log("소셜로그인 useEffect");
  //   let socialCode = new URL(window.location.href).searchParams.get("code");
  //   setCode(socialCode);
  //   console.log("여기서 카카오 토큰 발행");
  //   axios
  //     .post("https://kauth.kakao.com/oauth/token", {
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //       },
  //       data: {
  //         grant_type: "authorization_code",
  //         client_id: REST_API_KEY,
  //         redirect_uri: REDIRECT_URI,
  //         code,
  //         client_secret: CLIENT_SECRET,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response, "useEffect Response 출력 부분");
  //     })
  //     .catch((error) => {
  //       console.log(error, "useEffect 에러 부분");
  //     });
  // }, []);

  return (
    <div>
      소셜성공
      {/* <br /> {code} */}
      <br /> 페이지 입니다 🎈
    </div>
  );
}

export default SocialLoginPage;
