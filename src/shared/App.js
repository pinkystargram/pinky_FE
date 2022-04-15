import "./App.css";

import React from "react";

import { Route } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import PostWrite from "../pages/PostWrite";
import MyPage from "../pages/MyPage";
import Header from "../components/Header";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/PostWrite" exact component={PostWrite} />
        <Route path="/MyPage" exact component={MyPage} />
        <Route path="/Detail" exact component={Detail} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
