const { Router } = require("express");
const router = Router();

//Comtrollers

//Account Creation
const saveAccount = require("../controller/Account/saveAccountController");

//Authorization
const afterAdminAuthorization = require("../controller/AuthController/afterAdminAuthorization");

//Home
const insertDetails = require("../controller/Home/insertDetails");

//Department
const addDeptInfo = require("../controller/Department/addDeptInfo");
const addOrUpdateYearIncharge = require("../controller/Department/addOrUpdateYearIncharge");
const listAllDept = require("../controller/Department/listAllDept");
const hodUpdate = require("../controller/Department/changeHoD");
const editDept = require("../controller/Department/updateDetails");
const deleteDept = require("../controller/Department/deleteDept");

//Check for Jwt and verifying AdminSignature
router.route("/*").post(afterAdminAuthorization);

//Home Data Insertion
router.route("/home/add/data").post(insertDetails);

//Department Routes
router.route("/department/add/create").post(saveAccount, addDeptInfo);

router
  .route("/department/update/add/year/incharge")
  .get(addOrUpdateYearIncharge);

router.route("/department/all").post(listAllDept);

router.route("/department/hod").post(hodUpdate);
router.route("/department/edit").post(editDept);
router.route("/department/delete").post(deleteDept);
module.exports = router;
