import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

// actions
// const MY_POST = "MY_POST";
const GET_MY_POST = "GET_MY_POST";
// const SET_POST = "SET_POST";

//action creators

export const getMyPost = (payload) => ({
  type: GET_MY_POST,
  payload,
});

//initialState
const initialState = {
  list: [],
};

// middleware actions
export const _getMyPost = (userId) => {
  return function (dispatch, { history }) {
    console.log(userId);
    api
      .post(`/api/users/${userId}/mypage`)
      .then((res) => {
        console.log(res);
        dispatch(getMyPost(res));
        window.alert("댓글 등록 완료");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [GET_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = { ...action.payload };
      }),
    // [SET_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(state);
    //     console.log(action);
    //     draft.list = { ...action.payload.mypost };
    //   }),
  },
  initialState
);
