const express = require("express");
const fileController = require("./../controller/fileController");
const router = express.Router();
const { upload } = require("../config/multerconfig");

router.post(
  "/create-folder",
  fileController.createFolderMiddleware,
  fileController.createFolder
);
router.post("/get-all-folder", fileController.getAllFolderByUser);
router.post(
  "/add-file",
  fileController.createFolderMiddleware,
  upload.any(),
  fileController.addFileToFolder
);

router.post("/delete-folder", fileController.deleteFolder);

router.post("/get-all-images", fileController.getAllImages);

router.post("/delete-file", fileController.deleteFile);

router.post('/move-file', fileController.moveFile);

module.exports = router;
