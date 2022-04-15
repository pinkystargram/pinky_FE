import axios from "axios";
import { api, apis } from "../../shared/Api";
import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";

// Action
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOGOUT_USER = "LOGOUT_USER";

// Action creators
export const serUser = (payload) => ({
  type: SET_USER,
  payload,
});

// 초기값
const initialState = {
  user_info: { email: "", nickname: "" },
  is_login: false,
};

// 미들웨어
export const _signUpFX = (email, nickname, password) => {
  return function (dispatch, getState, { history }) {
    apis.signup(email, nickname, password);
    console
      .log("response")

      .then((res) => {
        alert("회원가입이 완료되었습니다.");
        history.push("/login");
      })

      .catch((error) => {
        alert("회원가입에 실패했습니다.");
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
