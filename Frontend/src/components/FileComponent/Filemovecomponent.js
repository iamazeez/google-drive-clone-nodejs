import React,{useState} from 'react'
import axios from "axios";

export const Filemovecomponent = ({addFileState,curFormState,folder,userId,curFolder,filename,setImageState,imageState}) => {

    addFileState(false);

    const [destinationPath,setDestinationPath] = useState('')

    const moveFile = (e) => {
        e.preventDefault();
        if(destinationPath == '' || destinationPath === '---'){
            alert('Please select any folder');
            return;
        }

        let curPath;
        if(curFolder === ""){
             curPath = `${userId}`;
       }else{
            curPath = `${userId}/${curFolder}`;
       }

       if(destinationPath === curPath){
           alert('Please choose any other folder to move , your are moving in current folder');
           return;
       }

       axios.post("http://localhost:9000/user/move-file",{
        userId,
        curPath,
        destinationPath,
        filename,
        curFolder
       })
       .then(res => {
           alert('File moved successfully');
           const newArray = imageState.filter(el => el.file.filename !== filename);
           setImageState([...newArray]);
           console.log(res)
        })
       .catch(err => console.log(err));
       
        curFormState(false);
    }

    return (
        <div style={{
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
            alignContent: "center",}}>

        <span
        onClick={() => curFormState(false)}
        style={{
          position: "absolute",
          right: "5%",
          top: "5%",
          cursor: "pointer",
        }}
      >
        ❌
      </span>

            <form>
            <label style={{color:'#fff'}}>Move to folder</label><br />    
            <select onChange={(e) => setDestinationPath(e.target.value)} id="folder" name="folder">
            <option value="---">---</option>
                <option value={`${userId}`}>/</option>
                { folder.map(el => {
                    if(el !== curFolder){
                        return (  <option value={`${userId}/${el}`}>{el}</option> );
                    }
                })}
                
            </select> <br /><br />
            <button onClick={moveFile}>Move 📁</button>
            </form>    
            
        </div>
    )
}
