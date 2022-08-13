const express = require("express");

const loginController = require("../controller/Login/loginController");
const authorizationController = require("../controller/AuthController/authorizationController");
const resetPassword = require("../controller/Login/PasswordReset");
const router = express.Router();

router.route("*").post(authorizationController.beforeAuthorization);

router.route("/").post(loginController.loginAuthentication);

router
  .route("/requestResetPassword")
  .post(resetPassword.checkUser, resetPassword.sendLink);

router.route("/getEmail").post(resetPassword.getEmail);

router
  .route("/reset")
  .post(resetPassword.checkForValidToken, resetPassword.resetPassword);
module.exports = router;
