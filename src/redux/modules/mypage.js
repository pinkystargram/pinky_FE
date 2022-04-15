import axios from "axios";

// Action
const ADD_COMM = "comment/ADD_COMM";

// Action creators
export const addComment = (payload) => ({
  type: ADD_COMM,
  payload,
});

// 초기값
const initialState = {
  comments: [],
};

// 미들웨어

// Reducer
const mypage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMM: {
      return;
    }

    default:
      return state;
  }
};

export default mypage;
