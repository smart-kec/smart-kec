const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const accountsModel = require("../../model/accountsModel");
const handleError = require("../HandleError/handleError");
module.exports.studentInfo = async (req, res, next) => {
  const {
    name,
    rollNo,
    programme,
    branch,
    yearOfStudy,
    gender,
    graduationYear,
    email,
    phoneNumber,
    hackerRankId,
  } = req.body;

  try {
    await studentInfoModel.create({
      name,
      rollNo,
      programme,
      branch,
      yearOfStudy,
      gender,
      graduationYear,
      email,
      phoneNumber,
      hackerRankId,
    });
    next();
  } catch (err) {
    var errors = handleError(
      err,
      {
        status: "failed",
        name: "",
        rollNo: "",
        programme: "",
        branch: "",
        yearOfStudy: "",
        gender: "",
        graduationYear: "",
        email: "",
        phoneNumber: "",
        hackerRankId: "",
      },
      "studentinfo"
    );
    try {
      await accountsModel.deleteOne({ email });
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
