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

//Staff
const newStaff = require("../controller/Staff/newStaff");
const updateStaff = require("../controller/Staff/updateStaff");
const deleteStaff = require("../controller/Staff/deleteStaff");

//Class
const createClass = require("../controller/Class/createClass");

//Routes
//Check for Jwt and verifying AdminSignature
router.use("/*", afterAdminAuthorization);

//Home Data Insertion
router.route("/home/add/data").post(insertDetails);

//Department Routes
router.route("/department/add/create").post(saveAccount, addDeptInfo);

router
  .route("/department/update/add/year/incharge")
  .get(addOrUpdateYearIncharge);

router.route("/department/get/all").get(listAllDept);

router.route("/department/hod/update").get(hodUpdate);
router.route("/department/edit/details").get(editDept);
router.route("/department/delete/account").get(deleteDept);

//Staff Routes
router.route("/staff/new/add/details").post(saveAccount, newStaff);
router.route("/staff/edit/update/details").get(updateStaff);
router.route("/staff/delete/account/details").get(deleteStaff);

//Class Routes
router.route("/class/new/create").post(createClass)
module.exports = router;
