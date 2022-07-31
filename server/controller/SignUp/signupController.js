const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
const accountsModel = require("../../model/accountsModel");
const handleStudentError = (err) => {
  let errors = {
    name: "",
    rollNo: "",
    programme: "",
    branch: "",
    yearOfStudy: "",
    graduationYear: "",
    email: "",
    phoneNumber: "",
    hackerRankId: "",
  };
  console.log(err);

  //Duplicate key error
  if (err.code == 11000) {
    return { duplicate: "Duplicates Values already available" };
  }
  //Validation Error
  if (err.message.includes("studentinfo validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};
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
    var errors = handleStudentError(err);
    try {
      await accountsModel.deleteOne({ email });
    } catch (er) {
      res.status(400).send(er);
    }
    res.status(400).json(errors);
  }
};
