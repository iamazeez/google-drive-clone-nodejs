const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `${__dirname}/../public/${req.query.id}/`;
    if (req.query.folder != "") {
      dir += `${req.query.foldername}`;
    }
    console.log("MULTER DIRECTORY NAME BEFORE SUBMIT ", req.query.foldername);
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    console.log("MULTER file" + JSON.stringify(file));
    const filename = "" + Date.now() + "-" + file.originalname;
    console.log("MULTER FILE NAME ", filename);
    // req.filename = filename;
    callback(null, filename);
  },
});

var upload = multer({
  storage: storage,
});

module.exports = { upload: upload };
