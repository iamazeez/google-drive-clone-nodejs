import React, { useState } from "react";
import axios from "axios";

export const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const forgetPassMethod = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/forget-password", {
        email,
      })
      .then((res) => {
        console.log(res);
        setMsg(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        placeholder="type your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={forgetPassMethod}>Forget password</button>
      <br />
      {msg != "" ? msg : null}
    </div>
  );
};
