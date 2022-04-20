import { apis, api } from "../../shared/Api";

import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { handleActions } from "redux-actions";

// Action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_RECOMMEND = "GET_RECOMMEND";
const FOLLOWING_USER = "FOLLOWING_USER";

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

        if (res.data.result === false) {
          history.replace("/login");
          return window.alert(res.data.message);
        }

        setCookie("ACCESS_TOKEN", res.data.atoken, 1);
        setCookie("REFRESH_TOKEN", res.data.rtoken, 1);

        dispatch(
          logIn({
            email: res.data.email,
            nickname: res.data.nickname,
            userId: res.data.userId,
            profileImageUrl: res.data.profileImageUrl,
          })
        );
        history.push("/");
      })

      .catch((error) => {
        console.log(error);
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
          window.alert("로그인 시간이 만료되었습니다.");
          history.push("/login");
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

    [FOLLOWING_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action.payload);
        draft.recommend.map((e) => {
          if (action.payload === e.userId) {
            return (e.following_edit = !e.following_edit);
          }
        });
        // draft.recommend = action.payload.data;
      }),
  },
  initialState
);
