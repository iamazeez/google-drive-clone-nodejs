import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "./../../Context/GlobalContext";
import { login as loginUserAction } from "./../../Context/Actions/authAction";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const { authDispatch } = useContext(GlobalContext);

  const loginUser = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setErrorMsg("Please fill form properly");
      return;
    }

    axios
      .post("http://localhost:9000/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.auth) {
          localStorage.setItem("token", res.data.token);
          loginUserAction(res.data.token)(authDispatch);
          history.push("/");
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={email}
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => loginUser(e)}>Login</button>
        <br />
        forget password ?
        <span
          onClick={() => {
            history.push("/forget-password");
          }}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Click here
        </span>
        <br />
        {errorMsg != "" ? errorMsg : null}
      </form>
    </div>
  );
};
