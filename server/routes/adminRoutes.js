const { Router } = require("express");
const router = Router();

//Comtrollers

//Account Creation
const createAccount = require("../controller/SignUp/createAccount");

//Authorization
const authUser = require("../controller/AuthController/authorizationController");

//Home
const insertDetails = require("../controller/Home/insertDetails");

//Department
const deptAdd = require("../controller/Department/addDeptInfo");
const listAllDept = require("../controller/Department/listAllDept");
const hodUpdate = require("../controller/Department/changeHoD");
const editDept = require("../controller/Department/updateDetails");
const deleteDept = require("../controller/Department/deleteDept");

//Check for Jwt and verifying AdminSignature
router.route("/*").post(authUser.afterAdminAuthorization);

//Home Data Insertion
router.route("/home/add/data").post(insertDetails);

//Department Routes
router
  .route("/department/add")
  .post(createAccount.saveAccount, deptAdd.addDeptInfo);

router.route("/department/yearincharge").post(deptAdd.addYI);

router.route("/department/all").post(listAllDept);

router.route("/department/hod").post(hodUpdate);
router.route("/department/edit").post(editDept);
router.route("/department/delete").post(deleteDept);
module.exports = router;
