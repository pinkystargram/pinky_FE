import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

// actions
const GET_MY_PROFILE = "GET_MY_PROFILE";
const GET_MY_POST = "GET_MY_POST";

//action creators

export const getMyProfile = (payload) => ({
  type: GET_MY_PROFILE,
  payload,
});

export const getMyPost = (payload) => ({
  type: GET_MY_POST,
  payload,
});

//initialState
const initialState = {
  list: [],
};

// middleware actions
export const _getMyProfileFX = (userId) => {
  return function (dispatch, { history }) {
    console.log(userId);
    api
      .get(`/api/users/${userId}/info`)
      .then((res) => {
        console.log(res);
        dispatch(getMyProfile(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// middleware actions
export const _getMyPostFX = (userId) => {
  return function (dispatch, { history }) {
    console.log(userId);
    api
      .get(`/api/users/${userId}/mypage`)
      .then((res) => {
        console.log(res);
        dispatch(getMyPost(res.data.data));
        // dispatch(
        //   getMyPost({
        //     imageUrl: res.data.data.imageUrl,
        //     postId: res.data.postId,
        //   })
        // );
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
    [GET_MY_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = action.payload;
      }),
    [GET_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.mypost = action.payload;
      }),
  },
  initialState
);
