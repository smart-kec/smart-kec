const { Router } = require("express");
const router = Router();

//Controllers
const accountCreation = require("../controller/SignUp/createAccount");
const saveInfo = require("../controller/SignUp/signupController");
const otpController = require("../controller/SignUp/otpController");
const authorizationController = require("../controller/AuthController/authorizationController");

router.route("/*").post(authorizationController.beforeAuthorization);

router
  .route("/generateotp")
  .post(otpController.checkUser, otpController.generateAndSendEmailOtp);

router.route("/student/isvalidotp").post(otpController.isValidOtp);
router.route("/student/verifyotp").post(otpController.verifyotp);
router
  .route("/student/resendotp")
  .post(
    otpController.resendOtp,
    otpController.checkUser,
    otpController.generateAndSendEmailOtp
  );

router.route("/student/isuserverified").post(otpController.isVerifiedUser);

router
  .route("/student/details")
  .post(
    otpController.verifyUser,
    accountCreation.saveAccount,
    saveInfo.studentInfo,
    otpController.deleteOtp
  );

module.exports = router;
