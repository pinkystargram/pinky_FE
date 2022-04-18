import { apis } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";

// Action
const ADD_COMM = "comment/ADD_COMM";

// Action creators
export const addComm = (payload) => ({
  type: ADD_COMM,
  payload,
});

// 초기값
const initialState = {
  list: [],
};

// 미들웨어
export const _addCommentFX = (postId, content) => {
  return function (dispatch) {
    apis
      .addComment(postId, content)
      .then((res) => {
        console.log(res);
        alert("댓글달기 성공!");
        dispatch(addComm(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Reducer
export default handleActions(
  {
    // [LOAD]: (state, action) => {
    //   return {
    //     ...state,
    //     list: action.payload.comment,
    //   };
    // },
    [ADD_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.comment);
        draft.list.push(action.payload.commentId);
      }),
    // [DELETE]: (state, action) => {
    //   return {
    //     ...state,
    //     list: state.list.filter((list) => list.id !== action.payload.commentId),
    //   };
    // },
  },
  initialState
);
