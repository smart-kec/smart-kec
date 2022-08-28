const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const accountsModel = require("../../model/accountsModel");
const handleError = require("../HandleError/handleError");
const mongoose = require("mongoose");
const departmentModel = require("../../model/InfoCollections/departmentInfo");
const ObjectId = mongoose.Types.ObjectId;
module.exports = async (req, res, next) => {
  const {
    studentName,
    studentRollNo,
    stdDob,
    stdprogramme,
    stdbranch,
    stdDeptId,
    stdyearOfStudy,
    stdsemesterNo,
    stdgender,
    stdgraduationYear,
    userEmail,
    stdPhoneNumber,
    stdHackerRankId,
  } = req.body;

  try {
    const dept = await departmentModel.findOne({ _id: stdDeptId }, { _id: 1 });
    if (!dept) {
      throw "invalid dept";
    }
    await studentInfoModel.create({
      name: studentName,
      rollNo: studentRollNo,
      dob: stdDob,
      programme: stdprogramme,
      branch: stdbranch,
      deptId: ObjectId(stdDeptId),
      yearOfStudy: stdyearOfStudy,
      semesterNo: stdsemesterNo,
      gender: stdgender,
      graduationYear: stdgraduationYear,
      email: userEmail,
      phoneNumber: stdPhoneNumber,
      hackerRankId: stdHackerRankId,
    });
    // next();
    res.status(201).json({
      STATUS: "success",
    });
  } catch (err) {
    console.log(err);
    const errors = handleError(
      err,
      {
        status: "failed",
        name: "",
        rollNo: "",
        dob: "",
        programme: "",
        branch: "",
        deptId: "",
        yearOfStudy: "",
        semesterNo: "",
        gender: "",
        graduationYear: "",
        email: "",
        phoneNumber: "",
        hackerRankId: "",
      },
      "studentinfos"
    );
    try {
      await accountsModel.deleteOne({ email: userEmail });
    } catch (er) {
      res.status(400).json({
        status: "failed",
        message:
          "Account model not deleted but constraints available in student info",
      });
    }
    res.status(400).json(errors);
  }
};
