import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

//액션

const ADD_ROOM = "ADD_ROOM";


//initialState
const initialState = {

};

//액션생성함수
const addRoom = createAction(ADD_ROOM, (userId) => ({ userId}));
// const getChatRoom = createAction(GET_CHATROOM, (postList,paging) => ({ postList,paging }));


//채팅방 생성
const addRoomDB = (userId) => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/chat/rooms/${userId}`)
      .then(function (response) {
        console.log(response);
        // const data=response.data.data
        // dispatch(addLike(data));
      })
      .catch(function (err) {
        alert("채팅방 생성 실패!!!!");
      });
  };
};




//리듀서
export default handleActions(
  {
    // [ADD_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list.unshift(action.payload.post);
    //   }),
    // [GET_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.post.push(...action.payload.postList.data);
    //     draft.is_loading=false;
    //     console.log(action.payload);
    //     console.log(action.payload.postList.data)
    // if (action.payload.paging) {
    //   draft.paging = action.payload.paging;
    // }
    //   }),
    // [GET_POSTONE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.target = action.payload.post_one;
    //   }),
    // [ADD_LIKE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.post=action.payload.like_data;
    //   }),  
    //   [CANCLE_LIKE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.post=action.payload.like_data;
    //   }),
    // [ADD_BOOKMARK]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.post=action.payload.postId;
    //   }),
    // [DELETE_BOOKMARK]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.post=action.payload.postId;
    //   }),
    // [LOADING]:(state,action)=>produce(state,(draft)=>{
    //   console.log(action.payload);
    //     draft.is_loading=action.payload.is_loading;
    // })     
  },
  initialState
);

const actionCreators = {
  addRoomDB
};

export { actionCreators };