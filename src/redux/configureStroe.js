//configStore.js
//리듀스가 전부 묶어서(combine) 만드는 store
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import User from "./modules/user";
import Comments from "./modules/comments";
import Image from "./modules/image";
import Mypage from "./modules/mypage";
import Post from "./modules/post";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//리덕스 내에서 히스토리를 쓸수 있게하는 기능
export const history = createBrowserHistory();

//미들웨어 썽크
//히스토리를 안쓰고 thunk만 쓰는 경우는 주석
// const middlewares = [thunk];
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서쓰는 로거
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  user: User,
  comments: Comments,
  image: Image,
  mypage: Mypage,
  post: Post,
  router: connectRouter(history),
});

//리듀서 말고 추가로 묶어줄 모음
const enhancer = applyMiddleware(...middlewares);

//스토어를 만들고 그안에 리듀서의 묶음을 넣어준다
const store = createStore(rootReducer, enhancer);

export default store;
