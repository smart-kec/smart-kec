const { Router } = require("express");
const router = Router();

//Account Creation
const createAccount = require("../controller/SignUp/createAccount");

//Authorization
const authUser = require("../controller/AuthController/authorizationController");

//Department
const deptAdd = require("../controller/Department/addDeptInfo");
const listAllDept = require("../controller/Department/listAllDept");
const hodUpdate = require("../controller/Department/changeHoD");
const editDept = require("../controller/Department/updateDetails");
//Check for Jwt and verifying AdminSignature
router.route("/*").post(authUser.afterAdminAuthorization);

//Department Routes
router
  .route("/department/add")
  .post(createAccount.saveAccount, deptAdd.addDeptInfo);

router.route("/department/yearincharge").post(deptAdd.addYI);

router.route("/department/all").post(listAllDept);

router.route("/department/hod").post(hodUpdate);
router.route("/department/edit").post(editDept);
module.exports = router;
