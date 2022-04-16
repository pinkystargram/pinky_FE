import axios from "axios";
import { api, apis } from "../../shared/Api";
import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";

// Action
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOGOUT_USER = "LOGOUT_USER";

// Action creators
export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

// 초기값
const initialState = {
  user: { email: "", nickname: "", password: "" },
  is_login: false,
};

// 미들웨어
export const _signUpFX = (email, nickname, password) => {
  // console.log("회원가입 정보", email, nickname, password);
  return function (dispatch, getState, { history }) {
    apis
      .signup(email, nickname, password)
      .then((res) => {
        console.log(res);
        alert("회원가입이 완료되었습니다.");
        history.push("/login");
      })

      .catch((error) => {
        alert("회원가입에 실패했습니다.");
        console.log(error);
      });
  };
};

export const _loginFX = (email, password) => {
  console.log("로그인 정보", email, password);
  return function (dispatch, getState, { history }) {
    apis
      .login(email, password)
      .then((res) => {
        console.log(res);

        setCookie("ACCESS_TOKEN", res.data.atoken, 1);
        setCookie("REFRESH_TOKEN", res.data.rtoken, 1);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("is_login", true);

        //   res.cookie('user', token, {
        //     httpOnly: true,
        // });

        //       Domain : dingrr.com
        // SameSite: LAX
        // HttpOnly : True

        dispatch(setUser({ email: email, nickname: res.data.nickname }));
        history.replace("/");
      })

      .catch((error) => {
        alert("로그인에 실패했습니다.");
        console.log(error);
      });
  };
};

// Reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return;
    }

    default:
      return state;
  }
};

export default user;
