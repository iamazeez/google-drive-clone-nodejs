import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

export const AddFileModel = ({
  curstate,
  curstateMethod,
  foldername,
  userPage,
  userId,
  setImageState,
  imageState,
}) => {
  const [title, setTitle] = useState("");
  const [descreption, setDescreption] = useState("");
  const [file, setFile] = useState(null);
  

  const uploadFile = (e) => {
    e.preventDefault();
    if (title == "" || descreption == "") {
      alert("Please give title and descreption to the image");
      return;
    }

    if (document.getElementById("file").value == "") {
      alert("Please first select any file");
      return;
    }

    const dataFile = new FormData();
    dataFile.append("file", file);


    axios
      .post("http://localhost:9000/user/add-file", dataFile, {
        params: {
          id: userId,
          foldername,
          title,
          descreption,
          userPage,
          fileUpload: true,
        },
      })
      .then((res) => {
        alert("File added successfully");
        curstateMethod(false);
        setImageState([...res.data.result])
        console.log("RESPONSE AFTER DATA HAS BEEN ADDED ",res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        height: 500,
        width: 500,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%",
        backgroundColor: "dodgerblue",
        borderRadius: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:199,
        alignContent: "center",
      }}
    >
      <span
        onClick={() => curstateMethod(!curstate)}
        style={{
          position: "absolute",
          right: "5%",
          top: "5%",
          cursor: "pointer",
        }}
      >
        ❌
      </span>

      <form style={{ display: "flex", flexDirection: "column", gap: "10%" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="add image title"
        />

        <textarea
          value={descreption}
          onChange={(e) => setDescreption(e.target.value)}
          placeholder="Enter file descreption"
        ></textarea>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          id="file"
          type="file"
        />
        <button onClick={uploadFile}>Add file</button>
      </form>
    </div>
  );
};
