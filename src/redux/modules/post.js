import { handleActions, createAction } from 'redux-actions';
import {produce} from "immer";
import { api } from '../../shared/Api';

//액션

const ADD_POST = 'ADD_POST';
const GET_POST = 'GET_POST';
const DELETE_POST = "DELETE_POST";
const EDIT_POST = "EDIT_POST";
const GET_POSTONE="GET_POSTONE";


//initialState
const initialState = {
    post:[],
    target:[]
}

//액션생성함수
const addPost = createAction(ADD_POST, (postData) => ({ postData }))
const getPost = createAction(GET_POST, (postList) => ({ postList }))
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const editPost = createAction(EDIT_POST, (postId) => ({ postId }));
const getPostOne = createAction(GET_POSTONE, (post_one) => ({ post_one }));


const addPostDB = (content = "", image="",location = "") => {
    return function (dispatch, getState, { history }) {
      const formData = new FormData();
      const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("content",content);
    formData.append("image",image);
    formData.append("location",location);
    api
    .post("/api/posts",formData,config)
    .then((res)=>{
    history.replace("/")
    console.log(res);
    return;
        })
        .catch((err) => {
          window.alert("포스트 작성 실패");
        });
    };
  };

  const getPostDB = () => {
    return async function (dispatch, getState, { history }) {
      try {
        const { data } = await api.get("/api/posts");
        dispatch(getPost(data));
      } catch (error) {
        alert("데이터를 불러오지 못했습니다");
      }
    };
  };

  const getPostOneDB = (postId) => {
    return async function (dispatch, getState, { history }) {
      try {
        const { data } = await api.get(`/api/posts/${postId}`,postId);
        console.log(data);
        dispatch(getPostOne(data));
      } catch (error) {
        alert("데이터를 불러오지 못했습니다");
      }
    };
  };

  const deletePostDB = (postId) => {
    return function (dispatch, getState, { history }) {
      api
        .delete(`/api/posts/${postId}`,postId)
        .then(function (response) {
          console.log(response);
          history.replace("/");
          window.location.reload();
        })
        .catch(function (err) {
          alert("본인이 작성한 글이 아닙니다");
        });
    };
  };

  const editPostDB = (postId,content) => {
    return function (dispatch, getState, { history }) {
      api
        .patch(`/api/posts/${postId}`,postId,content)
        .then(function (response) {
          console.log(response);
          history.replace("/");
          window.location.reload();
        })
        .catch(function (err) {
          alert("본인이 작성한 글이 아닙니다");
        });
    };
  };





//리듀서
export default handleActions({
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post=action.payload.postList.data;
      }),
    [GET_POSTONE]: (state, action) =>
      produce(state, (draft) => {
        draft.target=action.payload.post_one;
      }),  


      
}, initialState);

const actionCreators = {
    addPost,
    addPostDB,
    getPostDB,
    deletePostDB,
    editPostDB,
    getPostOneDB,
  };
  
  export { actionCreators };