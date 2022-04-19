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
  return function (dispatch) {
    console.log(postId, content);
    api
      .post(`/api/comments/${postId}`, { content: content })
      .then((res) => {
        console.log(res.data.data);
        dispatch(addComm(res.data.data.commentList));
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
        console.log(action.payload);
        draft.list = action.payload.data.commentList;
        console.log(draft);
      }),

    [ADD_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action.payload);
        draft.list.push(action.payload);
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
