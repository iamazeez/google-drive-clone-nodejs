import React, { useState, useEffect } from "react";
import axios from "axios";

export const Createfolder = () => {
  const [foldername, setFoldername] = useState("");
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");

  const userAuthenticated = () => {
    axios
      .get("http://localhost:9000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setUserId(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userAuthenticated();
  }, []);

  const createFolderMethod = (e) => {
    if (foldername == "") {
      alert("Please give your folder name");
      return;
    }

    e.preventDefault();
    setMsg("");
    axios
      .post("http://localhost:9000/user/create-folder", {
        id: userId,
        foldername: foldername,
      })
      .then((res) => {
        console.log(res);
        setMsg(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <input
          value={foldername}
          onChange={(e) => setFoldername(e.target.value)}
          type="text"
          placeholder="Type folder name"
        />
        <br />
        <button onClick={createFolderMethod}>Create Folder ✔</button>
        <br />
        {msg != "" ? msg : null}
      </form>
    </div>
  );
};
