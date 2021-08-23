import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SingleFolderUi } from "./../FileComponent/SingleFolderUi";
import { AddFileModel } from "./../FileComponent/AddFileModel";
import { Showfile } from "./../FileComponent/Showfile";
import { Filemovecomponent } from "./../FileComponent/Filemovecomponent";

export const User = () => {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [folder, setFolder] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMoveForm,setMoveForm] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUi,setImageUi] = useState('');
  const [folderUi,setFolderUi] = useState('');

  const userAuthenticated = () => {
    console.log('Authentication function ')
    axios
      .get("http://localhost:9000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.user)
        setUserId(res.data.user)})
      .catch((err) => console.log(err));
  };

  const getAllImage = () => {
    axios
      .post("http://localhost:9000/user/get-all-images", {
        id: userId,
        foldername: "",
      })
      .then((res) => {
        console.log(res);
        const { result } = res.data;
        setImages([...result]);
      })
      .catch((err) => console.log(err));
  };


  const getAllFolder = () => {
    if (userId != "") {
      axios
        .post("http://localhost:9000/user/get-all-folder", {
          id: userId,
        })
        .then((res) => {
          const { result } = res.data;
          if (result) {
            setFolder([...result]);
          }
        });
    }
  };

  useEffect(() => {
    userAuthenticated();
  }, []);

  useEffect(() => {
    getAllFolder();
    getAllImage();
  }, [userId]);

  useEffect(() => {
    if(folder.length > 0){
       const folderData = folder.map((singleFolder, i) => (
        <SingleFolderUi setFolderState={setFolder} key={i} folder={singleFolder} userId={userId} />
      ));
      setFolderUi(folderData);
    }
  },[folder]);

    //If get images from the server add it in imageUi state
    useEffect(() => {
      if(images.length > 0){
        const imgData = images.map((file, i) => (
          <Showfile 
          imageState={images}
          setImageState={setImages}
          key={i}
          foldername=""
          folder={folder}
          addFileState={setShowForm}
          file={file}
          user={true}
          userId={userId}
          />
        ));
        setImageUi(imgData);
        console.log("IMAGE DATA " + imgData);
      }
  }, [images]);


  console.log("USER ID USER PAGE ",userId)

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Create File</button>
      <button
        onClick={() => {
          history.push("/user/create-folder");
        }}
      >
        Create Folder
      </button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {folder.length > 0 ? folderUi : null}
        {images.length > 0 ? imageUi : null}
      </div>

      {showForm ? (
        <AddFileModel
          foldername=""
          curstate={showForm}
          curstateMethod={setShowForm}
          userPage={true}
          userId={userId}
          imageState={images}
          setImageState={setImages}
        />
      ) : null}
    </div>
  );
};
