import { handleActions, createAction } from 'redux-actions';
import produce from 'immer'
import { api } from '../../shared/Api';

//액션
const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const DEL_POST = 'DEL_POST';


//initialState
const initialState = {
    list: [],
    likeList: [],
}


//액션생성함수
const setPost = createAction(SET_POST, (postList, liked) => ({ postList, liked }));
const addPost = createAction(ADD_POST, (postData) => ({ postData }))
const delPost = createAction(DEL_POST, (postId) => ({ postId }))


//미들웨어
export const setPostDB = () => {
    return function (dispatch, getState, { history }) {
        api.getPost()
        .then((res) => {
            dispatch(setPost(res.data))
            // dispatch(setPost(res.data))
        })
        // dispatch(setPost(data))
            // .then(function (response){
            //     const _postList = response.data
            //     _postList.map((post,i) => {
            //         console.log(post)
            //         dispatch((setPost(post)))
            //     })
            // })
        
    }
}

export const addPostDB = (data) => {
    return function (dispatch, getState, { history }) {
        // 여기서 api통신(add하는 api url로) 한 후에 dispatch한다!!
        dispatch(addPost(data));
        dispatch(setPostDB());
    }
}

export const delPostDB = (postId) => {
    return function (dispatch, getState, { history }) {
        api.deletePost(postId)
            .then((response) => {
                dispatch(delPost(postId));
                dispatch(setPostDB())
            })
    }
}

// expor const delPostAction = (meetingId) => {
//     return function (dispatch, getState, { history }) {
//       apis.delPost(meetingId)
//         .then((res) => {
//           console.log(res)
//           dispatch(delPost(meetingId))
//           document.location.reload('/')
//         })
//         .catch((err) => console.log(err))
//     }
//   }



//리듀서
export default handleActions({
    [SET_POST]: (state, action) => {
        return {
            ...state,
            list: action.payload.postList,
            likeList: action.payload.liked,
        }
    },
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.postData);
    }),
    [DEL_POST]: (state, action) => produce(state, (draft) => {
        draft.list.filter((list) => list.id !== action.payload.postId)
    }),

}, initialState);
