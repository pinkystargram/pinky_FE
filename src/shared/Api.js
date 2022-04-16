import axios from "axios";
const BASEURL = process.env.REACT_APP_BASEURL;

const tokencheck = document.cookie;
const token = tokencheck.split("=")[1];

export const api = axios.create({
  // 실제 베이스 유알엘
  baseURL: BASEURL,

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",

    token: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  login: (email, password) =>
    api.post("/api/users/login", { email: email, password: password }),

  signup: (email, nickname, password) =>
    api.post("/api/users/signup", {
      email: email,
      nickname: nickname,
      password: password,
    }),
};
