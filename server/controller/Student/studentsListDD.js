const studentInfoModel = require("../../model/InfoCollections/studentInfoModel");
module.exports = async (req, res) => {
  const { deptKey } = req.body;
  try {
    const stdList = await studentInfoModel
      .find(
        { deptId: deptKey, section: "Not Assigned" },
        { _id: 1, rollNo: 1, name: 1 }
      )
      .sort({ rollNo: 1 });
    res.status(200).json({
      STATUS: "success",
      data: stdList,
    });
  } catch (error) {
    res.status(400).json({
      STATUS: "failed",
      message: "Error in finding students list",
    });
  }
};
