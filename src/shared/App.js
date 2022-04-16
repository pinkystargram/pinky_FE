import "./App.css";

import React, { useEffect } from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";

import { _loginCheckFX } from "../redux/modules/user";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import WritePost from "../pages/WritePost";
import ImagePost from "../pages/ImagePost";
import MyPage from "../pages/MyPage";
import Header from "../components/Header";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (document.cookie) {
      dispatch(_loginCheckFX());
      // dispatch(setPostDB());
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header></Header>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/WritePost" exact component={WritePost} />
        <Route path="/ImagePost" exact component={ImagePost} />
        <Route path="/MyPage" exact component={MyPage} />
        <Route path="/Detail/:id" exact component={Detail} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
