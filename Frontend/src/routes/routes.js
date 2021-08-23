import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Protectedroute } from "./protectedroute";
import React, { useState, useEffect, useContext } from "react";
import { Guestroutes } from "./guestroutes";
import {
  Login,
  Register,
  Home,
  User,
  Navbar,
  Forgetpassword,
  Resetpassword,
} from "./../components/UserComponent/index";

import { Createfolder, SingleFolder } from "../components/FileComponent/index";

import { login, logout } from "./../Context/Actions/authAction";
import { GlobalContext } from "../Context/GlobalContext";

export const Routes = () => {
  const {
    authState: {
      auth: { isLogin },
    },
    authDispatch,
  } = useContext(GlobalContext);

  console.log(`isLogin = ${isLogin}`);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("token"))(authDispatch);
    } else {
      logout()(authDispatch);
    }
  }, [isLogin]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Guestroutes
          exact
          path="/register"
          component={Register}
          isAuth={isLogin}
        />
        <Guestroutes exact path="/login" component={Login} isAuth={isLogin} />
        <Guestroutes
          exact
          path="/forget-password"
          component={Forgetpassword}
          isAuth={isLogin}
        />
        <Guestroutes
          exact
          path="/reset-password/:token"
          component={Resetpassword}
          isAuth={isLogin}
        />
        <Route exact path="/" component={Home} />
        <Protectedroute exact path="/user" component={User} isAuth={isLogin} />
        <Protectedroute
          exact
          path="/user/create-folder"
          component={Createfolder}
          isAuth={isLogin}
        />

        <Protectedroute
          exact
          path="/user/:foldername"
          component={SingleFolder}
          isAuth={isLogin}
        />
      </Switch>
    </Router>
  );
};
