const { Router } = require("express");
const router = Router();

//Controllers
const accountCreation = require("../controller/SignUp/createAccount");
const saveInfo = require("../controller/SignUp/signupController");

router
  .route("/student")
  .post(accountCreation.saveAccount, saveInfo.studentInfo);

module.exports = router;
