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

router.route("/*").post(beforeAuthorization).get(beforeAuthorization);

router
  .route("/student/email/generate/otp")
  .get(checkUser, generateAndSendEmailOtp);

router.route("/student/check/otp/valid").get(checkOtpExpiry);
router.route("/student/otp/verify").post(verifyOtp);
router
  .route("/student/otp/resend")
  .get(resendOtp, checkUser, generateAndSendEmailOtp);

router.route("/student/check/verify").get(checkVerifiedStatus);

router
  .route("/student/new/details")
  .post(verifyUser, saveAccount, newStudentInfoController, deleteOtp);

<<<<<<< HEAD
// routwe for duplicate  data entry
router
  .route("/sanjeev/entry/duplicates")
  .post(saveAccount, newStudentInfoController, dupResponse);
=======
// route for duplicate  data entry
router.route("/sanjeev/entry/duplicates").post(saveAccount,newStudentInfoController,)
>>>>>>> 5bc5fcb22cc055ebc63b80e7edd3b134f11c35f1

module.exports = router;
