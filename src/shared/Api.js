import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";

const tokencheck = document.cookie;
const token = tokencheck.split("=")[1];

export const api = axios.create({
  // 실제 베이스 유알엘
  baseURL: "http://52.79.81.116:3000/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

// api.interceptors.request.use(function (config) {
//   const accessToken = document.cookie.split("=")[1];
//   config.headers.common["authorization"] = `${accessToken}`;
//   return config;
// });

api.interceptors.request.use((config) => {
  const atoken = getCookie("ACCESS_TOKEN");
  const rtoken = getCookie("REFRESH_TOKEN");

  config.headers.common["Authorization"] = `Bearer ${atoken}`;
  config.headers.common["reAuthorization"] = `Bearer ${rtoken}`;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { res, config } = error;
    const originalRequest = config;
    if (res.status === 401) {
      if (res.data.atoken) {
        setCookie("ACCESS_TOKEN", res.data.atoken, 1);

        originalRequest.headers.authorization = `Bearer ${res.data.atoken}`;
      }
      return axios(originalRequest);
    }

    if (res.status === 403) {
      if (res.data.message === "로그인을 다시 해주세요?") {
        deleteCookie("ACCESS_TOKEN");
        deleteCookie("REFRESH_TOKEN");

        return;
      }
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const apis = {
  login: (email, password) =>
    api.post("/api/users/login", { email: email, password: password }),

  signup: (email, nickname, password) =>
    api.post("/api/users/signup", {
      email: email,
      nickname: nickname,
      password: password,
    }),

  loginCheck: () => api.get("/api/users/auth"),

  //댓글
  // getComment: (postId) => api.get(`/api/comment/${postId}`, {}),

  addComment: (postId, content) =>
    api.post(`/api/comments/${postId}`, { content: content }),

  // deleteComment: (commentId) => api.delete(`/api/comment/${commentId}`, {}),
};
