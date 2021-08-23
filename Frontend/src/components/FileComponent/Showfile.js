import React,{useState} from "react";
import axios from "axios";
import { Filemovecomponent } from "./Filemovecomponent";

export const Showfile = ({key, file, userId , imageState, setImageState,foldername,setMoveFormState,folder,addFileState }) => {
  const filePath = file.path; 
  const filename = file.file.filename;

  const [showMoveForm,setMoveForm] = useState(false);
  
  //let path = `http://localhost:9000/${file.path}${file.file.filename}`;
  let path = `http://localhost:9000/${filePath}${filename}`;

  const deleteFile = () => {
    console.log("CLICK on DELETE FILE");
    axios
      .post("http://localhost:9000/user/delete-file", {
        userId,
        filePath,
        filename,
        foldername
      })
      .then((res) => {
        alert('File deleted successfully')
        setImageState([...res.data.result])
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div style={{ position: "relative" }}>
     
     <span
     onClick={() => setMoveForm(true)}
     style={{
          position: "absolute",
          left: 14,
          top: 15,
          width:30,
          borderRadius: 15,
          padding: 8,
          fontSize: 10,
          cursor: "pointer",
          textAlign:'center',
          backgroundColor: "#fff",
        }}>📁</span>

      <span
        style={{
          position: "absolute",
          top: 10,
          right: 15,
          borderRadius: 20,
          padding: 8,
          fontSize: 10,
          cursor: "pointer",
          backgroundColor: "#fff",
        }}
        onClick={deleteFile}
      >
        ❌
      </span>
      <img
        style={{
          width: 300,
          borderRadius: 10,
          margin: 10,
          cursor: "pointer",
        }}
        src={path}
      />
    </div>

    { showMoveForm ? 
      <Filemovecomponent
      curFolder=""
      key={key}
      userId={userId}
      filename={filename}
      folder={folder}
      setImageState={setImageState}
      curFolder={foldername}
      addFileState={addFileState}
      curFormState={setMoveForm}
      imageState={imageState}
      /> : null }

    </>
  );
};
