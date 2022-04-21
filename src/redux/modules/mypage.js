import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

// actions
const GET_MY_PROFILE = "GET_MY_PROFILE";
const GET_MY_POST = "GET_MY_POST";
const GET_FOLLOWING = "GET_FOLLOWING";
const GET_FOLLOWER = "GET_FOLLOWER";

//action creators

export const getMyProfile = (payload) => ({
  type: GET_MY_PROFILE,
  payload,
});

export const getMyPost = (payload) => ({
  type: GET_MY_POST,
  payload,
});

export const getFollowing = (payload) => ({
  type: GET_FOLLOWING,
  payload,
});

export const getFollower = (payload) => ({
  type: GET_FOLLOWER,
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const _getFollowingFX = (userId) => {
  return function (dispatch, { history }) {
    console.log(userId);
    api
      .get(`/api/users/${userId}/follow`)
      .then((res) => {
        console.log(res);
        dispatch(getFollowing(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const _getFollowerFX = (userId) => {
  return function (dispatch, { history }) {
    console.log(userId);
    api
      .get(`/api/users/${userId}/follower`)
      .then((res) => {
        console.log(res);
        dispatch(getFollower(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const _editProfileFX = (nickname, profileImageUrl, bio, userId) => {
  return function (dispatch, getState, { history }) {
    console.log(nickname, profileImageUrl, bio, userId);
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("nickname", nickname);
    formData.append("profileImageUrl", profileImageUrl);
    formData.append("bio", bio);
    api
      .put("/api/users/info", formData, config)
      .then((res) => {
        history.replace(`/MyPage/${userId}`);
        console.log(res);
        return;
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
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
    [GET_FOLLOWER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.follower = action.payload;
      }),
    [GET_FOLLOWING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.following = action.payload;
      }),
  },
  initialState
);
