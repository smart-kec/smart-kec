const { Router } = require("express");
const router = Router();

//Controllers
const accountCreation = require("../controller/SignUp/createAccount");
const saveInfo = require("../controller/SignUp/signupController");
const otpController = require("../controller/SignUp/otpController");
const authorizationController = require("../controller/AuthController/authorizationController");

router
  .route("/*")
  .post(authorizationController.beforeAuthorization)
  .get(authorizationController.beforeAuthorization);

router
  .route("/student/email/generate/otp")
  .get(otpController.checkUser, otpController.generateAndSendEmailOtp);

router.route("/student/check/otp/valid").get(otpController.isValidOtp);
router.route("/student/otp/verify").post(otpController.verifyotp);
router
  .route("/student/otp/resend")
  .get(
    otpController.resendOtp,
    otpController.checkUser,
    otpController.generateAndSendEmailOtp
  );

router.route("/student/check/verify").get(otpController.isVerifiedUser);

router
  .route("/student/new/details")
  .post(
    otpController.verifyUser,
    accountCreation.saveAccount,
    saveInfo.studentInfo,
    otpController.deleteOtp
  );

module.exports = router;
