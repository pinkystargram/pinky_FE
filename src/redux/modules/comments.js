import { apis } from "../../shared/Api";
import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";

// Action
const ADD_COMM = "ADD_COMM";
const GET_COMM = "GET_COMM";
const DELETE_COMM = "DELETE_COMM";

// Action creators
export const getComm = (payload) => ({
  type: GET_COMM,
  payload,
});

export const addComm = (payload) => ({
  type: ADD_COMM,
  payload,
});

export const deleteComm = (payload) => ({
  type: DELETE_COMM,
  payload,
});

// 초기값
const initialState = {
  list: [],
};

export const _getCommentFX = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/api/posts/${postId}`);
      console.log(data);
      dispatch(getComm(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _addCommentFX = (postId, content) => {
  return function (dispatch, { history }) {
    console.log(postId, content);
    api
      .post(`/api/comments/${postId}`, { content: content })
      .then((res) => {
        console.log(res.data.data);
        dispatch(addComm(res.data.data.commentList));
        window.alert("댓글 등록 완료");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const _deleteCommentFX = (commentId) => {
  return function (dispatch, { history }) {
    console.log(commentId);
    api
      .delete(`/api/comments/${commentId}`)
      .then((res) => {
        console.log(res);
        dispatch(deleteComm(commentId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Reducer
export default handleActions(
  {
    [GET_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.data.commentList;
      }),

    [ADD_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload);
      }),
    [DELETE_COMM]: (state, action) =>
      produce(state, (draft) => {
        const new_list = draft.list.filter(
          (list) => list.commentId !== action.payload
        );
        draft.list = new_list;
      }),
  },
  initialState
);
