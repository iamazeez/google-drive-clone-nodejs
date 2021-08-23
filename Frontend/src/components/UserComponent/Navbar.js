import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./../../Context/GlobalContext";

export const Navbar = () => {
  const { authState, authDispatch } = useContext(GlobalContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authState.auth.isLogin ? (
          <li>
            <Link to="/user">User</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
