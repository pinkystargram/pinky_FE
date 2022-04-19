import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

//액션

const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";
const DELETE_POST = "DELETE_POST";
const EDIT_POST = "EDIT_POST";
const GET_POSTONE = "GET_POSTONE";
const ADD_LIKE ="ADD_LIKE";
const CANCLE_LIKE ="CANCLE_LIKE";
const ADD_BOOKMARK= "ADD_BOOKMARK";
const DELETE_BOOKMARK= "DELETE_BOOKMARK";
const LOADING = "LOADING"

//initialState
const initialState = {
  post: [],
  target: [],
  paging:{page:1, size:3},
  is_loading:false,
};

//액션생성함수
const addPost = createAction(ADD_POST, (postData) => ({ postData }));
const getPost = createAction(GET_POST, (postList,paging) => ({ postList,paging }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const editPost = createAction(EDIT_POST, (postId) => ({ postId }));
const getPostOne = createAction(GET_POSTONE, (post_one) => ({ post_one }));
const addLike = createAction(ADD_LIKE, (like_data) => ({ like_data }));
const cancleLike = createAction(CANCLE_LIKE, (like_data) => ({ like_data }));
const addBookmark =createAction(ADD_BOOKMARK,(postId)=>({postId}));
const delelteBookmark =createAction(DELETE_BOOKMARK,(postId)=>({postId}));
const loading =createAction(LOADING,(is_loading)=>({is_loading}));

//좋아요 추가
const addLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/likes/${postId}`)
      .then(function (response) {
        console.log(response);
        const data=response.data.data
        dispatch(addLike(data));
      })
      .catch(function (err) {
        alert("좋아요 실패!!!!");
      });
  };
};
//좋아요 취소
const minusLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/likes/${postId}`)
      .then(function (response) {
        console.log(response);
        const data=response.data.data
        dispatch(cancleLike(data));
        return;
      })
      .catch(function (err) {
        alert("좋아요 실패!!!!");
      });
  };
};

//북마크 추가
const addBookmarkDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/bookmarks/${postId}`)
      .then(function (response) {
        const data=response.data.data

        console.log(data);
        dispatch(addBookmark(data));
      })
      .catch(function (err) {
        alert("북마크 등록 실패!!!!");
      });
  };
};

const cancleBookmarkDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/bookmarks/${postId}`)
      .then(function (response) {
        console.log(response);
        const data=response.data.data
        dispatch(delelteBookmark(data));
        return;
      })
      .catch(function (err) {
        alert("북마크 취소 실패!!!!");
      });
  };
};


const addPostDB = (content = "", image = "", location = "") => {
  return function (dispatch, getState, { history }) {
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("content", content);
    formData.append("image", image);
    formData.append("location", location);
    api
      .post("/api/posts", formData, config)
      .then((res) => {
        history.replace("/");
        console.log(res);
        return;
      })
      .catch((err) => {
        window.alert("포스트 작성 실패");
      });
  };
};

const getPostDB = (page=1,size=3) => {
  return async function (dispatch, getState, { history }) {
    const _paging=getState().post.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    try {
      const { data } = await api.get(`/api/posts?size=${size}&page=${page}`);
      console.log(data.data);
      console.log(data.data.length);
      let paging={
        page:data.data.length===size?page+1:null,
        size:size,
      };
      console.log(paging)
      dispatch(getPost(data,paging));
    } catch (error) {
      console.log(error);
    }
  };
};

// `http://spt-prac.shop/api/postsWithPage?page=${page}&size=8&sortBy=id&isAsc=true`
  const getPostOneDB = (postId) => {
    return async function (dispatch, getState, { history }) {
      try {
        const { data } = await api.get(`/api/posts/${postId}`,postId);
        dispatch(getPostOne(data));
      } catch (error) {
        console.log(error);
      }
    };
  }


const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .delete(`/api/posts/${postId}`, postId)
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


  const editPostDB = (postId="",content="",location="") => {
    return function (dispatch, getState, { history }) {
      api
        .patch(`/api/posts/${postId}`,{"content":content,"location":location})
        .then(function (response) {
          console.log(response);
          history.replace("/");
     
        })
        .catch(function (err) {
          alert("본인이 작성한 글이 아닙니다");
        });
    };
  }



//리듀서
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post.push(...action.payload.postList.data);
        draft.is_loading=false;
        console.log(action.payload);
        console.log(action.payload.postList.data)
    if (action.payload.paging) {
      draft.paging = action.payload.paging;
    }
      }),
    [GET_POSTONE]: (state, action) =>
      produce(state, (draft) => {
        draft.target = action.payload.post_one;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.post=action.payload.like_data;
      }),  
      [CANCLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.post=action.payload.like_data;
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.post=action.payload.postId;
      }),
    [DELETE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.post=action.payload.postId;
      }),
    [LOADING]:(state,action)=>produce(state,(draft)=>{
      console.log(action.payload);
        draft.is_loading=action.payload.is_loading;
    })     
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostDB,
  getPostDB,
  deletePostDB,
  editPostDB,
  getPostOneDB,
  addLikeDB,
  minusLikeDB,
  addBookmarkDB,
  cancleBookmarkDB,
};

export { actionCreators };
