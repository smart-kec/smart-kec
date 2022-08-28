const accountModel = require("../../model/accountsModel");
const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const departmentModel = require("../../model/InfoCollections/departmentInfo");
const handleError = require("../HandleError/handleError");

const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
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
    deptId,
  } = req.body;
  try {
    const dept = await departmentModel.findOne({ _id: deptId }, { _id: 1 });
    if (!dept) {
      throw "invalid dept";
    }
    await staffInfoModel.create({
      name: staffName,
      designation: staffDesignation,
      idNo: staffIdNo,
      qualification: qualificationDetails,
      gender: staffGender,
      department: staffDepartment,
      deptId: ObjectId(deptId),
      email: userEmail,
      phoneNumber: contact,
    });
    res.status(201).json({
      status: "success",
      message: "New staff created... Login for more",
    });
  } catch (error) {
    console.log(error);
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
            deptId: "",
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
