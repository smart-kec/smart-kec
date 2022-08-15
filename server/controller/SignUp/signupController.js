const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const accountsModel = require("../../model/accountsModel");
const handleError = require("../HandleError/handleError");
module.exports.studentInfo = async (req, res, next) => {
  const {
    studentName,
    studentRollNo,
    stdprogramme,
    stdbranch,
    stdyearOfStudy,
    stdsemesterNo,
    stdgender,
    stdgraduationYear,
    userEmail,
    stdPhoneNumber,
    stdHackerRankId,
  } = req.body;

  try {
    await studentInfoModel.create({
      name: studentName,
      rollNo: studentRollNo,
      programme: stdprogramme,
      branch: stdbranch,
      yearOfStudy: stdyearOfStudy,
      semesterNo: stdsemesterNo,
      gender: stdgender,
      graduationYear: stdgraduationYear,
      email: userEmail,
      phoneNumber: stdPhoneNumber,
      hackerRankId: stdHackerRankId,
    });
    next();
  } catch (err) {
    const errors = handleError(
      err,
      {
        status: "failed",
        name: "",
        rollNo: "",
        programme: "",
        branch: "",
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
    console.log(errors);
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
