const { Router } = require("express");
const router = Router();

//Comtrollers

//Account Creation
const saveAccount = require("../controller/Account/saveAccountController");

//Authorization
const afterAuthorization = require("../controller/AuthController/afterAuthorization");
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
const addAdvisor = require("../controller/Class/addAdvisor");
const removeAdvisor = require("../controller/Class/removeAdvisor");
const endAdvisor = require("../controller/Class/endAdvisor");
const editClassDetails = require("../controller/Class/editClassDetails");
const enrollStudents = require("../controller/Class/enrollStudents");
const classStudents = require("../controller/Class/classStudents");
const unEnrollStd = require("../controller/Class/unEnrollStd");
const chooseRep = require("../controller/Class/chooseRep");
const listRep = require("../controller/Class/listRep");
const endClass = require("../controller/Class/endClass");

// For Dropdown and others
const listAllDeptDD = require("../controller/Department/listAllDeptDD");
const listAdvisorsDD = require("../controller/Staff/listAdvisorsDD");
const studentsListDD = require("../controller/Student/studentsListDD");

//Routes
//Check for Jwt and verifying AdminSignature
router.use("/*", afterAuthorization);

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
router.route("/class/new/create").post(createClass);
router.route("/class/update/add/advisors").get(addAdvisor);
router.route("/class/delete/advisor").get(removeAdvisor);
router.route("/class/advisor/end/work").get(endAdvisor);
router.route("/class/edit/details").get(editClassDetails);
router.route("/class/enroll/students").put(enrollStudents);
router.route("/class/list/student").get(classStudents);
router.route("/class/unenroll/student").get(unEnrollStd);
router.route("/class/choose/rep").get(chooseRep);
router.route("/class/list/rep").get(listRep);
router.route("/class/end").get(endClass);

//For Dropdown and others

router.route("/dept/list/all").get(listAllDeptDD);
router.route("/staff/list/advisor/dd").get(listAdvisorsDD);
router.route("/student/list/class/enroll").get(studentsListDD);

module.exports = router;
