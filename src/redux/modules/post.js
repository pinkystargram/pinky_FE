import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

//액션

const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";
const DELETE_POST = "DELETE_POST";

//initialState
const initialState = {
  post: [],
};

//액션생성함수

const addPost = createAction(ADD_POST, (postData) => ({ postData }));
const getPost = createAction(GET_POST, (postList) => ({ postList }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));

//미들웨어
//  const onDrop = useCallback(async acceptedFiles => {
//     const myFile=acceptedFiles[0];
//     console.log(myFile);
//     return;
//     const formData = new FormData();
//     const config = {
//       header: {
//         "content-type": "multipart/form-data",
//       },
//     };
//     formData.append("file", acceptedFiles[0]);
//         console.log(acceptedFiles[0])
//     await axios.post("/api/image/upload",formData,config).then((res)=>{
//       console.log(res);
//     });
//   }, [])
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

const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get("/api/posts");
      dispatch(getPost(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .post("/api/posts/:postId", postId)
      .then(function (response) {
        console.log(response);
        return;
        history.replace("/");
      })
      .catch(function (err) {
        alert("삭제 실패");
      });
  };
};

//리듀서
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.postList.data;
        console.log(draft.post);
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostDB,
  getPostDB,
  deletePostDB,
};

export { actionCreators };
