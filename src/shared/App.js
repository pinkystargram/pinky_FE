import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import PostWrite from "./pages/PostWrite";
import MyPage from "../pages/MyPage";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/PostWrite" exact component={PostWrite} />
          <Route path="/MyPage" exact component={MyPage} />
          <Route path="/Detail" exact component={Detail} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}
