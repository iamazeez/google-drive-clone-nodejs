const express = require("express");
const userController = require("./../controller/auth-controller");
const router = express.Router();

//router.get('/',scoreController.getAllScore);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/isUserAuth", userController.verifyJWT);
router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
