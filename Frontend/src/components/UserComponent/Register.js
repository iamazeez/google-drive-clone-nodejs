import React, { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    if (email == "" || password == "") {
      setMsg("Please fill form properly");
      return;
    }

    axios
      .post("http://localhost:9000/register", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.request.status == 200) {
          setMsg(res.data.message);
        } else {
          setMsg(res.data.message);
        }
        setEmail("");
        setPassword("");
      })
      .catch((err) => setMsg(err.message));
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={registerUser}>Register</button>
        <br />
        {msg != "" ? msg : null}
      </form>
    </div>
  );
};
