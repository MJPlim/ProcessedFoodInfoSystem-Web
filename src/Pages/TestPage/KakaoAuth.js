const CLIENT_ID = "e44c5d0df42c6613c266e56204d9457b";
const REDIRECT_URI = "http://localhost:3000/login/ouath2/code/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
