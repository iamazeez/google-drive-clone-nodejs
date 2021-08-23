const User = require("./../model/UserModel");
const fs = require("fs");
const multer = require("multer");
const { upload } = require("../config/multerconfig");
const path = require("path");

const sortFileByFolder = (res,result,foldername,id) => {
  const files = [...result.files];

      let searchQuery = "";
      if (foldername == "") {
        searchQuery = `${id}/`;
      } else {
        searchQuery = `${id}/${foldername}/`;
      }
      let images = files.filter((el) => el.path === searchQuery);
     return res.json({ result: images, data: "Image uploaded" });
}

/**************CREATE FOLDER MIDDLEWARE***************** */

exports.createFolderMiddleware = (req, res, next) => {
  let id, foldername;
  console.log("Comes in folder middleware")
  if (req.query.id != undefined) {
    id = req.query.id;
    foldername = req.query.foldername;
  }

  if (req.body.id != undefined) {
    id = req.body.id;
    foldername = req.body.foldername;
  }

  if (!fs.existsSync(`${__dirname}/../public/${id}`)) {
    fs.mkdirSync(`${__dirname}/../public/${id}`,err => {
      if (err) return err;
      if(foldername == ""){
        next();
      }
    });
    
  }

  if (req.query.userPage || req.query.fileUpload) {
    return next();
  }

  const folderExists = `${__dirname}/../public/${id}/${foldername}`;

  if (fs.existsSync(folderExists)) {
    return res.json({ message: "Folder already exists" });
    return next();
  } else {
    User.findOneAndUpdate({ _id: id }, { $push: { folders: foldername } })
      .then((result) => {
        fs.mkdirSync(folderExists);
        req.result = result;
        next();
      })
      .catch((err) => res.send(err));
  }
};

/**************CREATE FOLDER***************** */

exports.createFolder = (req, res) => {
  res.status(200).json({ message: "Folder Created", data: req.result });
};

/**************SHOW ALL FOLDER BY USER***************** */

exports.getAllFolderByUser = (req, res) => {
  const { id } = req.body;
  User.findOne({ _id: id })
    .then((result) => res.json({ result: result.folders, message: "done" }))
    .catch((err) => res.send(err));
};

/**************UPLOAD IMAGE***************** */

exports.addFileToFolder = (req, res) => {
  const { id, foldername, title, descreption } = req.query;
  let path = `${id}/`;
  if (req.query.foldername != "") {
    path = path + foldername + "/";
  }

  const fileDetails = {
    path,
    file: {
      filename: req.files[0].filename,
      title,
      descreption,
    },
  };
  console.log(JSON.stringify(fileDetails));
  User.findOneAndUpdate(
    { _id: id },
    { $push: { files: fileDetails } },
    { new: true }
  )
    .then((result) => {
      sortFileByFolder(res,result,foldername,id);
    })
    .catch((err) => res.send({ message: "Failed to upload file" }));
};

/**************SHOW ALL IMAGES***************** */

exports.getAllImages = (req, res) => {
  const { id, foldername } = req.body;
  console.log(req.body);
  User.findOne({ _id: id })
    .then((result) => {
      sortFileByFolder(res,result,foldername,id);
    })
    .catch((err) => res.send(err));
};

/* **********  DELETE Folder ********************** */

exports.deleteFolder = (req, res) => {
  let { userId, path, folder } = req.body;

  fs.rmdirSync(`${__dirname}/../public/${path}`, {
    recursive: true,
  });
  //Adding / to match value from the database userid/foldername/
  path += "/";

  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { files: { path: { $in: [path] } }, folders: { $in: [folder] } } },
    { new: true }
  )
    .then((result) => {
      res.send({ message: "Folder deleted",data:result.folders });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Failed to delete folder" });
    });
};

/* **********  DELETE FILE ********************** */

exports.deleteFile = (req, res) => {
  let { userId, filePath, filename,foldername } = req.body;

  fs.unlink(`${__dirname}/../public/${filePath}${filename}`, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });

  console.log(filename);

  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { files: { "file.filename": { $in: [filename] } } } },
    { new: true }
  )
    .then((result) => {
      sortFileByFolder(res,result,foldername,userId);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Failed to delete file" });
    });
};

/* **********  MOVE FILE ********************** */

exports.moveFile = (req, res) => {

  const {userId,curPath,destinationPath,filename,curFolder} = req.body;

  console.log(userId + " " + curPath + " " + destinationPath + " " + filename + " " + curFolder);
  
  const currentPath = `${__dirname}/../public/${curPath}/${filename}`;
  const moveDestinationPath =`${__dirname}/../public/${destinationPath}/${filename}`;
  
  fs.rename(currentPath, moveDestinationPath, function (err) {
    if (err) {
        console.log(err)
        return res.json(err);
    } else {
      User.findOneAndUpdate(
        { $and:[{_id: userId},{'files.file.filename' : filename}] },
        { $set: { "files.$.path": `${destinationPath}/` }},
        { new: true }
      ).then(result => {
        console.log(result);
        sortFileByFolder(res,result,curFolder,userid);
      }).catch(err => {
         res.json(err);
      })
     
    }
});

 

}
