import { apis } from "../../shared/Api";
import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";

// Action
const ADD_COMM = "ADD_COMM";
const GET_COMM = "GET_COMM";

// Action creators
export const getComm = (payload) => ({
  type: GET_COMM,
  payload,
});

export const addComm = (payload) => ({
  type: ADD_COMM,
  payload,
});

// 초기값
const initialState = {
  list: [],
};

// 미들웨어
// export const _getCommentFX = (openApiId) => {
//   return async function (dispatch, getState) {
//     api.
//     } catch (error) {
//       alert("댓글 가져오기 에러");
//       console.log(error);
//     }
//   };
// };

export const _addCommentFX = (postId, content) => {
  return function (dispatch) {
    console.log(postId, content);
    api
      .post(`/api/comments/${postId}`, { content: content })
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
