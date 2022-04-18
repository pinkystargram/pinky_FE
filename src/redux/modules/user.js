import { apis } from "../../shared/Api";
import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { handleActions } from "redux-actions";

// Action
const LOG_IN = "LOG_IN";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

// Action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = (payload) => ({
  type: LOG_OUT,
  payload,
});

// 초기값
const initialState = {
  user: { email: null, nickname: null, atoken: null },
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
        // localStorage.setItem("nickname", res.data.nickname);
        // localStorage.setItem("email", res.data.email);
        // localStorage.setItem("is_login", true);

        dispatch(
          logIn({
            email: res.data.email,
            nickname: res.data.nickname,
          })
        );
        window.location.replace("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

// export const _loginCheckFX = () => {
//   return function (dispatch, getState, { history }) {
//     const nickname = localStorage.getItem("username");
//     const email = localStorage.getItem("email");
//     const atoken = getCookie("ACCESS_TOKEN");
//     const rtoken = getCookie("REFRESH_TOKEN");

//     if ((atoken, rtoken)) {
//       dispatch(logIn({ email: email, nickname: nickname }));
//     } else {
//       dispatch(logOut());
//     }
//   };
// };

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
            })
          );
        })
        .catch((error) => {
          console.log(error);
          window.alert("로그인 시간이 만료되었습니다.");
          history.push("/login");
        });
    }
  };
};

// export const _loginCheckFX = () => {
//   return function (dispatch, getState, { history }) {
//     const atoken = getCookie("ACCESS_TOKEN");
//     const rtoken = getCookie("REFRESH_TOKEN");

//     if ((atoken, rtoken)) {
//       apis
//         .loginCheck()
//         .then((res) => {
//           console.log(res);

//           if (res.data.result === false) {
//             window.alert(res.data.message);
//             return dispatch(_logoutFX());
//           }

//           if (res.data.atoken) {
//             setCookie("ACCESS_TOKEN", res.data.atoken, 1);

//             // localStorage.setItem("nickname", res.data.nickname);

//             dispatch(
//               logIn({
//                 email: res.data.email,
//                 nickname: res.data.nickname,
//               })
//             );
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           window.alert("로그인 시간이 만료되었습니다.");
//           history.push("/login");
//         });
//     }
//   };
// };

export const _logoutFX = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("ACCESS_TOKEN");
    deleteCookie("REFRESH_TOKEN");

    dispatch(logOut());
    history.replace("/login");
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
        draft.user.email = null;
        draft.user.nickname = null;
      }),
  },
  initialState
);
