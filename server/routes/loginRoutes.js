const express = require("express");

const loginController = require("../controller/Login/loginController");
const resetPassword = require("../controller/Login/PasswordReset");
const adminLogin = require("../controller/Login/adminLogin");
const beforeAuthorization = require("../controller/AuthController/beforeAuthorization");
const router = express.Router();

router.route("*").post(beforeAuthorization).get(beforeAuthorization);

router.route("/user/authenticate").post(loginController.loginAuthentication);

router
  .route("/user/reset/token")
  .get(resetPassword.checkUser, resetPassword.sendLink);

router.route("/user/reset/get/email").get(resetPassword.getEmail);

router
  .route("/user/reset/pwd")
  .post(resetPassword.checkForValidToken, resetPassword.resetPassword);

//Admin

router.route("/admin/smart/kec/control").post(adminLogin);

module.exports = router;
