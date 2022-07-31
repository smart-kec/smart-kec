const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const accountsModel = require("../../model/accountsModel");
const handleError = require("./handleErrors");
module.exports.studentInfo = async (req, res) => {
  const {
    name,
    rollNo,
    programme,
    branch,
    yearOfStudy,
    graduationYear,
    email,
    phoneNumber,
    hackerRankId,
  } = req.body;

  try {
    const studDetails = await studentInfoModel.create({
      name,
      rollNo,
      programme,
      branch,
      yearOfStudy,
      graduationYear,
      email,
      phoneNumber,
      hackerRankId,
    });
    console.log(studDetails);
    res.status(201).send("User Created Successfully");
  } catch (err) {
    var errors = handleError.handleStudentError(err);
    try {
      await accountsModel.deleteOne({ email });
    } catch (er) {
      res.status(400).send(er);
    }
    res.status(400).json(errors);
  }
};
