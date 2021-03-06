import "./App.css";

import React, { useEffect } from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";

import { _loginCheckFX, logIn } from "../redux/modules/user";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import ImagePost from "../pages/ImagePost";
import MyPage from "../pages/MyPage";
import Header from "../components/Header";
import EditPost from "../pages/EditPost";
import Follower from "../pages/Follower";
import Following from "../pages/Following";
import ProfileEdit from "../pages/ProfileEdit";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (document.cookie) {
      dispatch(_loginCheckFX());
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header></Header>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/edit/:id" exact component={EditPost} />
        <Route path="/ImagePost" exact component={ImagePost} />
        <Route path="/MyPage/:userId" exact component={MyPage} />
        <Route path="/MyPage/:userId/followers" exact component={Follower} />
        <Route path="/MyPage/:userId/following" exact component={Following} />
        <Route path="/post/:id" exact component={Detail} />
        <Route path="/profileEdit/:userId" exact component={ProfileEdit} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
