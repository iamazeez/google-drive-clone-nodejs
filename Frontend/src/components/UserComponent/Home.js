import React, { useContext, useEffect, useState } from "react";
import { logout } from "./../../Context/Actions/authAction";
import { GlobalContext } from "./../../Context/GlobalContext";

export const Home = () => {
  const { authState, authDispatch } = useContext(GlobalContext);

  const [loginStatus, setLoginStatus] = useState(authState.auth.isLogin);

  const logoutUser = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      logout()(authDispatch);
      setLoginStatus(false);
    } else {
      console.log("You need to login first");
    }
  };

  useState(() => {
    console.log("Status changed");
  }, [loginStatus]);

  return (
    <div>
      <h1>Hello</h1>
      {authState.auth.isLogin ? (
        <button onClick={logoutUser}>Logout</button>
      ) : null}
    </div>
  );
};
