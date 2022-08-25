const accountModel = require("../../model/accountsModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const handleError = require("../HandleError/handleError");

module.exports = async (req, res) => {
  const {
    staffName,
    staffDesignation,
    staffIdNo,
    qualificationDetails,
    staffGender,
    staffDepartment,
    userEmail,
    contact,
  } = req.body;
  try {
    await staffInfoModel.create({
      name: staffName,
      designation: staffDesignation,
      idNo: staffIdNo,
      qualification: qualificationDetails,
      gender: staffGender,
      department: staffDepartment,
      email: userEmail,
      phoneNumber: contact,
    });
    res.status(201).json({
      status: "success",
      message: "New staff created... Login for more",
    });
  } catch (error) {
    try {
      await accountModel.deleteOne({ email: userEmail });
      res.status(400).json(
        handleError(
          error,
          {
            status: "failed",
            name: "",
            designation: "",
            idNo: "",
            qualification: "",
            gender: "",
            department: "",
            email: "",
            phoneNumber: "",
          },
          "staffinfo"
        )
      );
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message:
          "Account model not deleted but constraints available in dept info",
      });
    }
  }
};
