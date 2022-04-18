import { handleActions, createAction } from 'redux-actions';
import {produce} from "immer";
import { api } from '../../shared/Api';

//액션

const ADD_POST = 'ADD_POST';



//initialState
const initialState = {
    post:{
        userId:"skdmflks",
        content:"안녕하세요",
        image:null,
        location:"서울 용산구"
    }
}


//액션생성함수

const addPost = createAction(ADD_POST, (postData) => ({ postData }))


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
const addPostDB = (userId="",content = "", location = "", image="", ) => {
    return function (dispatch, getState, { history }) {
      const formData = new FormData();
      const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append(userId);
    formData.append(content);
    formData.append(location);
    formData.append(image);
    api
    .post("/sdflsk",formData,config)
    .then((res)=>{
    console.log(res);
    return;
       
          
        })
        .catch((err) => {
          window.alert("포스트 작성 실패");
        });
    };
  };


//리듀서
export default handleActions({
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
}, initialState);

const actionCreators = {
    addPost,
    addPostDB,
  };
  
  export { actionCreators };