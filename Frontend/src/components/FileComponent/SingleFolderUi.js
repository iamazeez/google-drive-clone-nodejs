import React from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

export const SingleFolderUi = ({ folder, userId,setFolderState }) => {
  const path = `${userId}/${folder}`;

  const deleteFolder = () => {
    axios
      .post("http://localhost:9000/user/delete-folder", {
        userId,
        path,
        folder,
      })
      .then((res) => {
        console.log(res);
        alert('Folder deleted');
        setFolderState([...res.data.data]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          zIndex: 99,
          position: "absolute",
          top: 14,
          right: 14,
          cursor: "pointer",
          borderRadius: 20,
          padding: 5,
          fontSize: 10,
          backgroundColor: "#fff",
        }}
        onClick={deleteFolder}
      >
        ❌
      </span>
      <Link
        to={{ pathname: `/user/${folder}` }}
        style={{
          display: "flex",
          backgroundColor: "dodgerblue",
          width: 100,
          height: 100,
          borderRadius: 10,
          padding: 10,
          margin: 10,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {folder}
      </Link>
    </div>
  );
};
