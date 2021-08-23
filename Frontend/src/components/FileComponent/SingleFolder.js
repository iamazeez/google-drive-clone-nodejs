import React, { useState, useEffect } from "react";
import { AddFileModel } from "./AddFileModel";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Showfile } from "./Showfile";
import { Filemovecomponent } from "./Filemovecomponent";

export const SingleFolder = () => {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [folder, setFolder] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPage, setShowPage] = useState(true);
  const [images, setImages] = useState([]);
  const [imageUi,setImageUi] = useState('');

  const path = location.pathname;
  const foldername = path.split("/")[2];

  const userAuthenticated = () => {
    axios
      .get("http://localhost:9000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setUserId(res.data.user))
      .catch((err) => console.log(err));
  };

  const getAllFolder = () => {
    if (userId != "") {
      console.log("run");
      axios
        .post("http://localhost:9000/user/get-all-folder", {
          id: userId,
        })
        .then((res) => {
          const { result } = res.data;
          setShowPage(true);
          setFolder([...result]);
        });
    }
  };

  const getAllImage = () => {
    axios
      .post("http://localhost:9000/user/get-all-images", {
        id: userId,
        foldername: foldername,
      })
      .then((res) => {
        console.log(res);
        const { result } = res.data;
        console.log("RESULT", result);
        setImages([...result]);
      })
      .catch((err) => console.log(err));
  };


  //Set image ui
  useEffect(() => {
    if(images.length > 0){
      const imgData = images.map((file, i) => (
        <Showfile 
        imageState={images}
        setImageState={setImages} 
        key={i} 
        file={file}
        folder={folder}
        addFileState={setShowForm} 
        user={true} 
        userId={userId}
        foldername={foldername}
        />
      ));
      setImageUi(imgData);
    }
}, [images]);


  //First get userId
  useEffect(() => {
    userAuthenticated();
  }, []);
  //After that get all images of this folder and getAll folder by user
  useEffect(() => {
    getAllFolder();
    getAllImage();
  }, [userId]);

  //Check if that folder exists or not
  useEffect(() => {
    if (!folder.includes(foldername)) {
      setShowPage(false);
    } else {
      setShowPage(true);
    }
  }, [folder]);

  return (
    <div>
      {showPage ? (
        <>
          <button onClick={() => setShowForm(!showForm)}>
            Add File to this folder
          </button>
          {showForm ? (
            <AddFileModel
              userPage={false}
              curstate={showForm}
              foldername={foldername}
              curstateMethod={setShowForm}
              userId={userId}
              imageState={images}
              setImageState={setImages}
            />
          ) : null}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.length > 0 ? imageUi : null}
          </div>

          

        </>
      ) : (
        <h1>This page does not exists</h1>
      )}
    </div>
  );
};
