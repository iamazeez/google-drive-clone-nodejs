import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { token } = useParams();
 

  const resetPasswordMethod = (e) => {
    setMsg("");
    if(password === ""){
      alert('Please type password');
      return;
    }
    e.preventDefault();
    axios
      .post("http://localhost:9000/reset-password", {
        token,
        password,
      })
      .then((res) => {
        console.log(res)
        setPassword("");
        setMsg(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        placeholder="Create new password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={resetPasswordMethod}>Reset password</button>
      <br />
      {msg != "" ? msg : null}
    </div>
  );
};
