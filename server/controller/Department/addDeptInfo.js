const departmentModel = require("../../model/InfoCollections/departmentInfo");
const accountsModel = require("../../model/accountsModel");
const handleError = require("../HandleError/handleError");
module.exports = async (req, res) => {
  const {
    deptFullName,
    deptShortCode,
    userEmail,
    semesterCount,
    yearStarted,
    DeptHODEmail,
  } = req.body;

  try {
    await departmentModel.create({
      fullName: deptFullName,
      aliasName: deptShortCode,
      email: userEmail,
      noOfSemesters: semesterCount,
      establishedYear: yearStarted,
      hodEmail: DeptHODEmail,
    });
    res.status(201).json({
      status: "success",
      message: "New department created... Login for more",
    });
  } catch (err) {
    var errors = handleError(
      err,
      {
        status: "failed",
        fullName: "",
        aliasName: "",
        email: "",
        noOfSemesters: "",
        establishedYear: "",
        hodEmail: "",
      },
      "departments"
    );
    try {
      await accountsModel.deleteOne({ email });
    } catch (er) {
      res.status(400).json({
        status: "failed",
        message:
          "Account model not deleted but constraints available in dept info",
      });
    }
    res.status(400).json(errors);
  }
};
