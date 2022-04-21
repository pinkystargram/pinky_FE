import { apis, api } from "../../shared/Api";

import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { handleActions } from "redux-actions";

// Action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_RECOMMEND = "GET_RECOMMEND";
const FOLLOWING_USER = "FOLLOWING_USER";
const SEARCH_USER = "SEARCH_USER";

// Action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = (payload) => ({
  type: LOG_OUT,
  payload,
});

export const getRecommend = (payload) => ({
  type: GET_RECOMMEND,
  payload,
});

export const followingUser = (payload) => ({
  type: FOLLOWING_USER,
  payload,
});

export const searchUser = (payload) => ({
  type: SEARCH_USER,
  payload,
});

// 초기값
const initialState = {
  user: { email: null, nickname: null, atoken: null },
  recommend: {},
  is_login: false,
};

// 미들웨어
export const _signUpFX = (email, nickname, password) => {
  console.log("회원가입 정보", email, nickname, password);
  return function (dispatch, getState, { history }) {
    apis
      .signup(email, nickname, password)
      .then((res) => {
        console.log(res);
        if (res.message == "닉네임은 영어/숫자만 가능합니다") {
          return window.alert(res.message);
        }

        if (res.result == true) {
          return window.alert("회원가입이 완료되었습니다.");
        }
        history.push("/login");
      })

      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response);
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

        if (res.data.result === false) {
          history.replace("/login");
          return window.alert(res.data.message);
        }

        setCookie("ACCESS_TOKEN", res.data.atoken, 1);
        setCookie("REFRESH_TOKEN", res.data.rtoken, 1);
        localStorage.setItem("userId", res.data.userId);

        dispatch(
          logIn({
            email: res.data.email,
            nickname: res.data.nickname,
            userId: res.data.userId,
            profileImageUrl: res.data.profileImageUrl,
          })
        );
        history.replace("/");
      })

      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };
};

//카카오로그인
export const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    api
      .get("/api/auth/kakao")
      .then((res) => {
        console.log("카카오 로그인 성공", res);
        // const token = res.data.token;
        // const userId = res.data.userId;
        // const snsId = res.data.snsId;
        // localStorage.setItem("token", token); //예시로 로컬에 저장
        // localStorage.setItem("userId", userId);
        // localStorage.setItem("snsId", snsId);
        // localStorage.setItem("newChat", "false");
        // localStorage.setItem("mainNotice", "false");
        // dispatch(checkUserDB());
        // window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
      })
      .catch((err) => {
        console.log("카카오 로그인 에러", err);
        // window.alert("로그인에 실패하였습니다.");
        // window.location.replace("/"); // 로그인 실패하면 로그인화면으로 보내기
      });
  };
};

export const _loginCheckFX = () => {
  return function (dispatch, getState, { history }) {
    const atoken = getCookie("ACCESS_TOKEN");
    const rtoken = getCookie("REFRESH_TOKEN");

    if ((atoken, rtoken)) {
      apis
        .loginCheck()
        .then((res) => {
          console.log(res);

          dispatch(
            logIn({
              email: res.data.email,
              nickname: res.data.nickname,
              userId: res.data.userId,
              profileImageUrl: res.data.profileImageUrl,
            })
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(_logoutFX());
        });
    } else {
      dispatch(_logoutFX());
    }
  };
};

export const _logoutFX = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("ACCESS_TOKEN");
    deleteCookie("REFRESH_TOKEN");
    localStorage.removeItem("userId");

    dispatch(logOut());
    // window.location.reload();
    history.push("/login");
  };
};

export const _getRecommendFX = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get("/api/users/recommend");
      console.log(data);

      let recommend_list = [];

      data.data.map((data) => {
        recommend_list.push({ following_edit: false, ...data });
      });

      console.log(recommend_list);
      dispatch(getRecommend(recommend_list));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _FollowingUserFX = (userId) => {
  return async function (dispatch, getState, { history }) {
    console.log(userId);
    try {
      const { data } = await api.post(`/api/users/${userId}/follow`);
      console.log(getState());

      dispatch(followingUser(userId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _searchUserFX = (searchText) => {
  return async function (dispatch, getState, { history }) {
    console.log(searchText);
    try {
      const { data } = await api.get(`/api/searches?searchText=${searchText}`);
      console.log(data);

      dispatch(searchUser(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, draft, action.payload);
        draft.user = action.payload;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, draft, action.payload);
        draft.user = null;
        draft.is_login = false;
      }),

    [GET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.recommend = action.payload;
      }),

    [SEARCH_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.search_user = action.payload;
      }),

    [FOLLOWING_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action.payload);
        draft.recommend.map((e) => {
          if (action.payload === e.userId) {
            return (e.following_edit = !e.following_edit);
          }
        });
      }),
  },
  initialState
);
