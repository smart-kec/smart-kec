const { Router } = require("express");
const router = Router();

//Controllers
//Auth
const beforeAuthorization = require("../controller/AuthController/beforeAuthorization");

//Account
const saveAccount = require("../controller/Account/saveAccountController");

//Student
const newStudentInfoController = require("../controller/Student/newStudentInfoController");

//OTP
const generateAndSendEmailOtp = require("../controller/otp/generateAndSendEmailOtp");
const checkUser = require("../controller/otp/checkUser");
const checkOtpExpiry = require("../controller/otp/checkOtpExpiry");
const verifyOtp = require("../controller/otp/verifyOtp");
const checkVerifiedStatus = require("../controller/otp/checkVerifiedStatus");
const verifyUser = require("../controller/otp/verifyUser");
const deleteOtp = require("../controller/otp/deleteOtp");
const resendOtp = require("../controller/otp/resendOtp");
const dupResponse = require("../controller/Student/dupResponse");
const listAllBranch = require("../controller/Department/listAllBranch");

router.route("/*").post(beforeAuthorization).get(beforeAuthorization);

router
  .route("/student/email/generate/otp")
  .put(checkUser, generateAndSendEmailOtp);

router.route("/student/check/otp/valid").get(checkOtpExpiry);
router.route("/student/otp/verify").post(verifyOtp);
router
  .route("/student/otp/resend")
  .get(resendOtp, checkUser, generateAndSendEmailOtp);

router.route("/student/check/verify").get(checkVerifiedStatus);

router
  .route("/student/new/details")
  .post(verifyUser, saveAccount, newStudentInfoController, deleteOtp);

router
  .route("/student/new/detailsdup")
  .post(saveAccount, newStudentInfoController);

router.route("/student/new/branch").get(listAllBranch);
module.exports = router;
