const staffInfoModel = require("../../model/InfoCollections/staffInfoModel");
const updateHandler = require("../HandleError/updateHandler");

module.exports = async (req, res) => {
  const {
    userId,
    staffDesignation,
    qualificationDetails,
    deptOfStaff,
    contactNo,
  } = req.body;
  try {
    if (await staffInfoModel.findOne({ _id: userId })) {
      await staffInfoModel.updateOne(
        { _id: userId },
        {
          $set: {
            designation: staffDesignation,
            qualification: qualificationDetails,
            department: deptOfStaff,
            phoneNumber: contactNo,
          },
        },
        { new: true, upsert: true, runValidators: true }
      );
      res
        .status(200)
        .json({ status: "success", message: "Staff details updated" });
    } else {
      res.status(400).json({ status: "failed", message: "Id not found" });
    }
  } catch (error) {
    res.status(400).json(
      updateHandler(error, {
        status: "failed",
        designation: "",
        qualification: "",
        department: "",
        phoneNumber: "",
      })
    );
  }
};
