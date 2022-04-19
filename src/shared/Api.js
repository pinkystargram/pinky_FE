import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";
import { history } from "../redux/configStore";

export const api = axios.create({
  // 실제 베이스 유알엘
  baseURL: "https://ggulduk2.shop",
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
    const {
      config,
      response: { status },
      response,
    } = error;

    const originalRequest = config;

    if (status === 401) {
      if (response.data.atoken) {
        console.log(response);
        setCookie("ACCESS_TOKEN", response.data.atoken);
        originalRequest.headers.Authorization = `Bearer ${response.data.atoken}`;
        return axios(originalRequest);
      }

      if (response.data.reason === "리프레쉬 토큰까지 만료됐어요") {
        deleteCookie("ACCESS_TOKEN");
        deleteCookie("REFRESH_TOKEN");
        history.push("/login");
      }
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
  getComment: (postId) => api.get(`/api/comment/${postId}`, {}),

  addComment: (postId, content) =>
    api.post(`/api/comments/${postId}`, { content: content }),

  // deleteComment: (commentId) => api.delete(`/api/comment/${commentId}`, {}),
};
